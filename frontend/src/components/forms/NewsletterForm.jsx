import { useState } from "react";
import { api, ApiError } from "../utils/apiClient";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await api.post("/enquiries/newsletter/", { email });
      setStatus("success");
    } catch (err) {
      let msg = "Something went wrong. Please try again.";
      if (err instanceof ApiError) msg = err.message;
      else if (err?.message) msg = err.message;
      setError(msg);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sage-dark font-medium">
        You're subscribed — welcome to the community.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-start sm:items-stretch"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none w-full sm:w-auto sm:flex-1"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary shrink-0 w-full sm:w-auto"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-600 w-full">{error}</p>
      )}
    </form>
  );
}
