import { useState } from "react";
import { usePageContent, getSection } from "../../hooks/usePageContent";
import { donationAmounts, donationOptions } from "../../data/content";
import { api } from "../../utils/apiClient";

export default function Donate() {
  const { content } = usePageContent("donate", {});
  const heroTitle = getSection(content, "hero_title", "Donate");
  const heroText = getSection(content, "hero_text", "Your contribution helps us run education, healthcare, and livelihood programs.");
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState("");
  const [project, setProject] = useState("wherever");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleDonate = async () => {
    setError("");
    setLoading(true);
    try {
      const finalAmount = Number(custom || amount);
      const order = await api.post("/donations/order/", {
        amount: finalAmount,
        project_id: project === "wherever" ? null : project,
      });
      // In a real Razorpay integration, load the Razorpay SDK and open checkout.
      // For this build we simulate the payment completion and call the verify endpoint.
      const verify = await api.post("/donations/verify/", {
        order_id: order.order_id,
        payment_id: "pay_demo_" + order.order_id.slice(-8),
        signature: "demo_signature",
        donor_name: "Anonymous donor",
        donor_email: "donor@example.com",
        donor_phone: "",
        amount: finalAmount,
        project_id: project === "wherever" ? null : project,
        donor_message: "",
      });
      setReceipt(verify);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success && receipt) {
    return (
      <div className="container-page py-24 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20 text-sage">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-3xl font-bold text-ink">Thank you for your donation</h2>
        <p className="mt-2 text-ink/70">Your contribution makes a real difference.</p>
        <div className="mt-6 inline-block rounded-lg border border-ink/10 bg-ivory p-6 text-left">
          <p className="text-sm text-ink/60">Receipt ID</p>
          <p className="font-mono font-bold text-ink">#{receipt.id}</p>
          <p className="mt-2 text-sm text-ink/60">Amount</p>
          <p className="font-mono text-xl font-bold text-madder">Rs. {Number(receipt.amount).toLocaleString()}</p>
          <p className="mt-2 text-sm text-ink/60">Status</p>
          <p className="font-medium text-sage capitalize">{receipt.status}</p>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/" className="rounded-sm bg-ink px-5 py-2 text-sm font-semibold text-ivory hover:bg-ink/80">Back to home</a>
          <a href="/donate" className="rounded-sm border border-ink/20 px-5 py-2 text-sm font-semibold text-ink hover:bg-ink/5">Donate again</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">Support us</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{heroTitle}</h1>
          <p className="mt-5 text-lg text-ivory/75">{heroText}</p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-xl rounded-lg border border-ink/10 bg-ivory p-8">
          <h2 className="font-display text-xl font-bold text-ink">Choose an amount</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {donationAmounts.map((a) => (
              <button
                key={a}
                onClick={() => { setAmount(a); setCustom(""); }}
                className={`rounded-sm border py-3 text-sm font-medium ${
                  custom === "" && amount === a ? "border-madder bg-madder/5 text-madder" : "border-ink/10 text-ink hover:bg-ink/5"
                }`}
              >
                Rs. {a}
              </button>
            ))}
          </div>
          <input
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setAmount(0); }}
            placeholder="Custom amount (Rs.)"
            className="mt-3 w-full rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none focus:ring-1 focus:ring-madder"
          />

          <h3 className="mt-6 font-display text-lg font-bold text-ink">Apply to</h3>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="mt-2 w-full rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none focus:ring-1 focus:ring-madder"
          >
            {donationOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>

          {error && <p className="mt-4 text-sm text-madder">{error}</p>}
          <button
            onClick={handleDonate}
            disabled={loading}
            className="mt-6 w-full rounded-sm bg-madder py-3 text-sm font-semibold text-ivory hover:bg-madder/90 disabled:opacity-50"
          >
            {loading ? "Processing..." : `Donate Rs. ${custom || amount}`}
          </button>
          <p className="mt-3 text-center text-xs text-ink/50">Demo mode: payment is simulated. In production this opens the Razorpay checkout.</p>
        </div>
      </section>
    </div>
  );
}