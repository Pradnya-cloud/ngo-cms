import { Link } from "react-router-dom";
import StitchDivider from "../components/ui/StitchDivider";

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center max-w-lg mx-auto">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-3xl font-display font-semibold text-indigo-deep">This thread doesn't connect to anything.</h1>
      <div className="mt-4 w-24 mx-auto"><StitchDivider /></div>
      <p className="mt-4 text-ink/70">The page you're looking for may have moved or no longer exists.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">Back to home</Link>
    </section>
  );
}
