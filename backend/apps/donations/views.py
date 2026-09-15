import uuid, os, hmac, hashlib, logging
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Donation
from .serializers import DonationSerializer, DonationCreateSerializer
from apps.accounts.permissions import IsAdminOrReadOnly

logger = logging.getLogger(__name__)


def _razorpay_key():
    return os.environ.get("RAZORPAY_KEY_ID", "")


def _razorpay_secret():
    return os.environ.get("RAZORPAY_KEY_SECRET", "")


def verify_razorpay_signature(order_id, payment_id, signature):
    secret = _razorpay_secret()
    if not secret:
        return False
    try:
        body = str(order_id) + "|" + str(payment_id)
        body = body.encode()
        expected = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
        return hmac.compare_digest(expected, signature or "")
    except Exception:
        return False


class DonationViewSet(viewsets.ModelViewSet):
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Donation.objects.all()
        status = self.request.query_params.get("status")
        if status:
            qs = qs.filter(status=status)
        return qs


class CreateOrderView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        amount = request.data.get("amount")
        try:
            amount = float(amount)
        except (TypeError, ValueError):
            return Response({"error": "Invalid amount"}, status=400)
        if amount <= 0:
            return Response({"error": "Amount must be greater than zero"}, status=400)

        amount_paise = int(round(amount * 100))
        key_id = _razorpay_key()
        key_secret = _razorpay_secret()

        if key_id and key_secret:
            try:
                import razorpay
                client = razorpay.Client(auth=(key_id, key_secret))
                order = client.order.create({
                    "amount": amount_paise,
                    "currency": "INR",
                    "payment_capture": 1,
                    "notes": {
                        "project_id": request.data.get("project_id") or "",
                        "donor_name": request.data.get("donor_name") or "",
                    },
                })
                return Response({
                    "order_id": order["id"],
                    "amount": amount,
                    "amount_paise": amount_paise,
                    "key_id": key_id,
                })
            except ImportError:
                pass
            except Exception as exc:
                logger.exception("Razorpay order creation failed: %s", exc)
                return Response({"error": "Payment gateway unavailable"}, status=502)

        order_id = "order_" + uuid.uuid4().hex[:16]
        return Response({
            "order_id": order_id,
            "amount": amount,
            "amount_paise": amount_paise,
            "key_id": key_id or "rzp_test_demo",
        })


class VerifyPaymentView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        order_id = data.get("order_id", "")
        payment_id = data.get("payment_id", "")
        signature = data.get("signature", "")

        if _razorpay_secret():
            if not verify_razorpay_signature(order_id, payment_id, signature):
                return Response({"error": "Invalid payment signature"}, status=400)

        serializer = DonationCreateSerializer(data=data)
        if serializer.is_valid():
            donation = serializer.save()
            donation.payment_order_id = order_id
            donation.payment_payment_id = payment_id
            donation.payment_signature = signature
            donation.status = "success"
            donation.payment_method = data.get("payment_method", "")
            donation.save()
            return Response(DonationSerializer(donation).data)
        return Response(serializer.errors, status=400)


class WebhookView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        payload = request.data
        event = payload.get("event", "")
        payment_entity = payload.get("payload", {}).get("payment", {}).get("entity", {})

        if event in ("payment.captured", "payment.failed"):
            razorpay_payment_id = payment_entity.get("id", "")
            order_id = payment_entity.get("order_id", "")
            try:
                donation = (
                    Donation.objects.get(payment_payment_id=razorpay_payment_id)
                    if razorpay_payment_id
                    else Donation.objects.get(payment_order_id=order_id)
                )
            except Donation.DoesNotExist:
                return Response({"status": "no_matching_donation"})

            donation.status = "success" if event == "payment.captured" else "failed"
            donation.save()
            return Response({"status": "ok", "donation_id": donation.id})

        return Response({"status": "ignored"})