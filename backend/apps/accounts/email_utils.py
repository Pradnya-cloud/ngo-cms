from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_donation_receipt(donation):
    """Send a thank-you email to the donor after a successful donation."""
    subject = f"Thank you for your donation, {donation.donor_name}!"
    html_message = render_to_string("emails/donation_receipt.html", {
        "donor_name": donation.donor_name,
        "amount": donation.amount,
        "project": donation.project.title if donation.project else "General fund",
        "donation_id": donation.id,
    })
    plain_message = strip_tags(html_message)
    try:
        send_mail(
            subject=subject,
            message=plain_message,
            html_message=html_message,
            from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@umangfoundation.org"),
            recipient_list=[donation.donor_email],
            fail_silently=True,
        )
    except Exception:
        pass


def send_volunteer_confirmation(volunteer):
    """Send a confirmation email when a volunteer application is approved."""
    subject = f"Volunteer application approved, {volunteer.name}!"
    html_message = render_to_string("emails/volunteer_confirmation.html", {
        "name": volunteer.name,
    })
    plain_message = strip_tags(html_message)
    try:
        send_mail(
            subject=subject,
            message=plain_message,
            html_message=html_message,
            from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@umangfoundation.org"),
            recipient_list=[volunteer.email],
            fail_silently=True,
        )
    except Exception:
        pass


def send_enquiry_reply(enquiry):
    """Send an email reply to an enquiry."""
    subject = f"Re: {enquiry.subject}"
    html_message = render_to_string("emails/enquiry_reply.html", {
        "name": enquiry.name,
        "subject": enquiry.subject,
        "reply": enquiry.admin_reply,
    })
    plain_message = strip_tags(html_message)
    try:
        send_mail(
            subject=subject,
            message=plain_message,
            html_message=html_message,
            from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@umangfoundation.org"),
            recipient_list=[enquiry.email],
            fail_silently=True,
        )
    except Exception:
        pass