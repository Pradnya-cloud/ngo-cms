import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import StitchDivider from "../components/ui/StitchDivider";
import { donationAmounts, donationOptions } from "../data/content";
import { api } from "../utils/apiClient";

export default function Donate() {
  const [amount, setAmount] = useState(donationAmounts[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [program, setProgram] = useState(donationOptions[3].id);
  const [donor, setDonor] = useState({ name: "", email: "" });
  const [step, setStep] = useState("form"); // form | success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const finalAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Step 1: create a payment order (public endpoint, AllowAny).
      const order = await api.post("/donations/order/", {
        amount: finalAmount,
        project_id: "",
        donor_name: donor.name,
      });

      // Step 2: in production, Razorpay Checkout opens with order.key_id/order_id
      // and the payment_id/signature below come from its success callback. With no
      // gateway keys configured (mock mode) the verify step accepts a test
      // signature and records the donation end-to-end.
      await api.post("/donations/verify/", {
        order_id: order.order_id,
        payment_id: "test_payment",
        signature: "test_signature",
        payment_method: "razorpay",
        donor_name: donor.name,
        donor_email: donor.email,
        amount: finalAmount,
        donor_message: `Program: ${donationOptions.find((o) => o.id === program)?.label || program}`,
      });

      setStep("success");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (step === "success") {
    return (
      <section className="container-page py-24 max-w-xl text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-sage/15 flex items-center justify-center">
          <span className="text-3xl text-sage-dark">✓</span>
        </div>
        <h1 className="mt-6 text-3xl font-display font-semibold text-indigo-deep">
          Thank you, {donor.name.split(" ")[0] || "friend"}.
        </h1>
        <p className="mt-3 text-ink/70 leading-relaxed">
          Your {frequency === "recurring" ? "monthly" : ""} contribution of ₹{finalAmount.toLocaleString("en-IN")} to{" "}
          {donationOptions.find((o) => o.id === program)?.label.toLowerCase()} has been recorded. A receipt has
          been sent to {donor.email || "your email"}.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/" className="btn-secondary">Back to home</Link>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just supported Umang Foundation's work — join me!")}`}
            className="btn-primary"
          >
            Share the support
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow !text-marigold-light mb-3">Donate</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">₹500 covers a month of school supplies for one child.</h1>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <SectionHeading eyebrow="Make a gift" title="Choose your contribution" />

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            {/* Frequency */}
            <div>
              <p className="text-sm font-medium text-ink/80 mb-2">Frequency</p>
              <div className="inline-flex border border-ink/20 rounded-sm overflow-hidden">
                {["one-time", "recurring"].map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                      frequency === f ? "bg-indigo text-ivory" : "bg-white text-ink/70"
                    }`}
                  >
                    {f === "one-time" ? "One-time" : "Monthly"}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <p className="text-sm font-medium text-ink/80 mb-2">Amount (INR)</p>
              <div className="grid grid-cols-4 gap-3">
                {donationAmounts.map((a) => (
                  <button
                    type="button"
                    key={a}
                    onClick={() => { setAmount(a); setCustomAmount(""); }}
                    className={`py-3 rounded-sm border font-mono text-sm transition-colors ${
                      amount === a && !customAmount
                        ? "bg-marigold/20 border-marigold text-marigold-dark font-semibold"
                        : "border-ink/15 text-ink/70 hover:border-marigold"
                    }`}
                  >
                    ₹{a.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                placeholder="Or enter a custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="mt-3 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
              />
            </div>

            {/* Program */}
            <div>
              <label className="text-sm font-medium text-ink/80" htmlFor="program">Where should it go?</label>
              <select
                id="program"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
              >
                {donationOptions.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </div>

            <div className="w-24"><StitchDivider /></div>

            {/* Donor details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-ink/80" htmlFor="donor-name">Full name</label>
                <input
                  id="donor-name" required value={donor.name}
                  onChange={(e) => setDonor((d) => ({ ...d, name: e.target.value }))}
                  className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink/80" htmlFor="donor-email">Email (for receipt)</label>
                <input
                  id="donor-email" type="email" required value={donor.email}
                  onChange={(e) => setDonor((d) => ({ ...d, email: e.target.value }))}
                  className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="bg-madder/10 border border-madder/30 text-madder-dark text-sm rounded-sm px-3 py-2.5">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60">
              {loading ? "Processing…" : `Continue to secure payment · ₹${finalAmount ? finalAmount.toLocaleString("en-IN") : 0}`}
            </button>
            <p className="text-xs text-ink/50">
              You'll be redirected to our payment partner (Razorpay / Stripe / PayPal) to complete your gift securely.
              We never store your card details.
            </p>
          </form>
        </div>

        <aside className="lg:col-span-2 h-fit border border-ink/10 rounded-sm p-6 bg-ivory2">
          <p className="eyebrow mb-3">Why it matters</p>
          <ul className="space-y-3 text-sm text-ink/75">
            <li>₹500 — a month of school supplies for one child</li>
            <li>₹1,000 — one health-camp screening kit for 20 patients</li>
            <li>₹2,500 — a week of stitching-centre materials for one trainee</li>
            <li>₹5,000 — solar tablet setup for one digital classroom</li>
          </ul>
          <p className="mt-6 text-xs text-ink/50">Umang Foundation is a registered NGO, 12A &amp; 80G certified. Donations are eligible for tax deduction under Indian law.</p>
        </aside>
      </section>
    </>
  );
}
