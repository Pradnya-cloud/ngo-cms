import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";

const adminPanels = [
  { title: "Total Donations", value: "₹8,42,300", color: "text-marigold-dark" },
  { title: "Volunteer Sign-ups", value: "212", color: "text-sage-dark" },
  { title: "Registered Admin Users", value: "6", color: "text-indigo" },
];

const editorPanels = [
  { title: "Draft Blog Posts", value: "3", color: "text-indigo" },
  { title: "Pending Project Updates", value: "2", color: "text-marigold-dark" },
];

export default function Dashboard() {
  const { user, role } = useAuth();
  const panels = role === "admin" ? adminPanels : editorPanels;

  return (
    <div>
      <SectionHeading
        eyebrow={`Welcome, ${user?.name?.split(" ")[0]}`}
        title={role === "admin" ? "Admin Dashboard" : "Content Dashboard"}
        description={
          role === "admin"
            ? "You have full access — manage content, donations, volunteers, and user accounts."
            : "You have content access. Donation and user management are restricted to Admin accounts."
        }
      />

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {panels.map((p) => (
          <div key={p.title} className="border border-ink/10 bg-white rounded-sm p-6">
            <p className="eyebrow mb-2">{p.title}</p>
            <p className={`font-mono text-3xl font-semibold ${p.color}`}>{p.value}</p>
          </div>
        ))}
      </div>

      {role === "admin" && (
        <div className="mt-10 border border-ink/10 bg-white rounded-sm p-6" id="content">
          <h3 className="font-display font-semibold text-indigo-deep">Home page content</h3>
          <p className="mt-2 text-sm text-ink/65">
            Manage the home-page sections: banners/slider, vision &amp; mission, statistics, initiatives, and page text.
          </p>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link to="/admin/banners" className="btn-secondary text-sm">Manage image slider</Link>
            <Link to="/admin/vision-mission" className="btn-secondary text-sm">Vision &amp; Mission</Link>
            <Link to="/admin/statistics" className="btn-secondary text-sm">Statistics</Link>
            <Link to="/admin/initiatives" className="btn-secondary text-sm">Initiatives</Link>
            <Link to="/admin/content" className="btn-secondary text-sm">Page content (text)</Link>
          </div>
        </div>
      )}

      {role === "admin" && (
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          <div className="border border-ink/10 bg-white rounded-sm p-6" id="donations">
            <h3 className="font-display font-semibold text-indigo-deep">Donations</h3>
            <p className="mt-2 text-sm text-ink/65">Transaction history and receipts, pulled from the payment gateway webhook.</p>
          </div>
          <div className="border border-ink/10 bg-white rounded-sm p-6" id="users">
            <h3 className="font-display font-semibold text-indigo-deep">User management</h3>
            <p className="mt-2 text-sm text-ink/65">Invite, edit roles, and deactivate admin/editor accounts.</p>
          </div>
        </div>
      )}
    </div>
  );
}
