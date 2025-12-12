import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <header>
          <h1 className="text-2xl font-bold mb-1">Elite Admin Panel</h1>
          <p className="text-sm text-slate-600">
            Internal tools for the Elite team to manage daycares, providers,
            filters and tour requests.
          </p>
        </header>

        {/* Main admin sections */}
        <section className="grid md:grid-cols-2 gap-4">
          <Link
            to="/admin/daycares"
            className="block bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-sm font-semibold mb-1">Daycares</h2>
            <p className="text-xs text-slate-600">
              Add, edit and manage daycare centres in the Elite network.
            </p>
          </Link>

          <Link
            to="/admin/providers"
            className="block bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-sm font-semibold mb-1">Providers & Offers</h2>
            <p className="text-xs text-slate-600">
              Manage family-oriented providers and special offers for Elite
              families.
            </p>
          </Link>

          <Link
            to="/admin/filters"
            className="block bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-sm font-semibold mb-1">Search filters</h2>
            <p className="text-xs text-slate-600">
              Configure age groups, education systems, languages and distance
              options for the search page.
            </p>
          </Link>

          <Link
            to="/admin/tours"
            className="block bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-sm font-semibold mb-1">Tour requests</h2>
            <p className="text-xs text-slate-600">
              View and update tour / visit requests from families.
            </p>
          </Link>
        </section>

        <p className="text-[10px] text-slate-500">
          Demo environment. In the live Elite platform, this panel will be
          available only to authorized Elite team members.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
