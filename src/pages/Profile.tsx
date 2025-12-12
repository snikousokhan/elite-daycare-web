import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types";
import { Link } from "react-router-dom";

interface ChildProfile {
  id: string;
  name: string;
  age: string;
  ageGroup: string;
  schedule: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real system this would call the backend.
    const current = api.auth.getCurrentUser();
    setUser(current);

    // Demo child data – later this can be managed by Elite admin / parent.
    setChildren([
      {
        id: "child-1",
        name: "Alex",
        age: "3 years 4 months",
        ageGroup: "Preschool (3–5 years)",
        schedule: "Mon–Fri, 9:00 AM – 3:00 PM",
      },
    ]);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm">
        Loading profile…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-sm text-slate-600">
        <p className="mb-2">You are not signed in.</p>
        <Link
          to="/auth"
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700"
        >
          Go to sign in / sign up
        </Link>
      </div>
    );
  }

  const savedDaycares = [
    {
      id: "elite-001",
      name: "Elite Little Stars Daycare",
      area: "Vancouver – Mount Pleasant",
      status: "Shortlisted",
    },
    {
      id: "elite-002",
      name: "Wonder Nest – Burnaby",
      area: "Burnaby – Metrotown",
      status: "Visited",
    },
  ];

  const tourRequests = [
    {
      id: "tour-001",
      daycareName: "Elite Little Stars Daycare",
      date: "2025-01-12",
      time: "10:00 AM",
      status: "Requested",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Header: Parent profile */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <h1 className="text-xl md:text-2xl font-bold mb-1">Parent profile</h1>
          <p className="text-sm text-slate-600 mb-4">
            This profile is used to personalize your daycare search and requests
            in the Elite platform.
          </p>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h2 className="font-semibold text-slate-800 mb-1">
                Account details
              </h2>
              <p className="text-slate-700">
                <span className="text-slate-500 text-xs block">Name</span>
                {user.name || "Not provided"}
              </p>
              <p className="text-slate-700 mt-2">
                <span className="text-slate-500 text-xs block">Email</span>
                {user.email}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 mb-1">
                Preferences (demo)
              </h2>
              <p className="text-slate-700">
                <span className="text-slate-500 text-xs block">
                  Preferred area
                </span>
                Example: Vancouver – Mount Pleasant
              </p>
              <p className="text-slate-700 mt-2">
                <span className="text-slate-500 text-xs block">
                  Priority factors
                </span>
                Safety, small groups, school-readiness
              </p>
            </div>
          </div>
        </section>

        {/* Child / children section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Child profile
            </h2>
            <span className="text-[11px] text-slate-500">
              In the full platform, you can add multiple children and customize
              their needs.
            </span>
          </div>

          {children.length === 0 ? (
            <p className="text-xs text-slate-500">
              No child profile created yet. In the live version, you could add
              your child’s details here.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50"
                >
                  <p className="text-sm font-semibold mb-1">{child.name}</p>
                  <p className="text-xs text-slate-600 mb-1">
                    Age: {child.age}
                  </p>
                  <p className="text-xs text-slate-600 mb-1">
                    Age group: {child.ageGroup}
                  </p>
                  <p className="text-xs text-slate-600">
                    Typical schedule: {child.schedule}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Saved daycares */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Saved daycares
            </h2>
            <Link
              to="/search"
              className="text-xs text-emerald-700 hover:underline"
            >
              Go to search
            </Link>
          </div>

          {savedDaycares.length === 0 ? (
            <p className="text-xs text-slate-500">
              You have not saved any daycares yet.
            </p>
          ) : (
            <div className="space-y-2">
              {savedDaycares.map((dc) => (
                <Link
                  key={dc.id}
                  to={`/daycare/${dc.id}`}
                  className="flex items-center justify-between border border-slate-200 rounded-xl p-3 bg-slate-50 hover:bg-slate-100 transition"
                >
                  <div>
                    <p className="text-sm font-semibold">{dc.name}</p>
                    <p className="text-[11px] text-slate-500">{dc.area}</p>
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {dc.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Tour requests */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Tour / visit requests
            </h2>
            <span className="text-[11px] text-slate-500">
              Managed by the Elite team.
            </span>
          </div>

          {tourRequests.length === 0 ? (
            <p className="text-xs text-slate-500">
              You have not requested any tours yet.
            </p>
          ) : (
            <div className="space-y-2">
              {tourRequests.map((tr) => (
                <div
                  key={tr.id}
                  className="border border-slate-200 rounded-xl p-3 bg-slate-50"
                >
                  <p className="text-sm font-semibold mb-1">
                    {tr.daycareName}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Requested date: {tr.date} at {tr.time}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Status:{" "}
                    <span className="font-semibold text-emerald-700">
                      {tr.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="text-[10px] text-slate-500 mt-3">
            In the live Elite platform, tour requests will sync with the admin
            panel so the team can coordinate with daycares and families.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Profile;
