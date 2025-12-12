import React, { useState } from "react";

type TourStatus = "Requested" | "Confirmed" | "Completed" | "Cancelled";

interface TourRequest {
  id: string;
  parentName: string;
  parentEmail: string;
  daycareName: string;
  childAge: string;
  date: string;
  time: string;
  status: TourStatus;
  notes?: string;
}

const AdminTours: React.FC = () => {
  const [requests, setRequests] = useState<TourRequest[]>([
    {
      id: "tour-001",
      parentName: "Sarah Johnson",
      parentEmail: "sarah@example.com",
      daycareName: "Elite Little Stars Daycare",
      childAge: "3 years",
      date: "2025-01-12",
      time: "10:00 AM",
      status: "Requested",
      notes: "Prefer morning visit. Child is shy in new settings.",
    },
    {
      id: "tour-002",
      parentName: "Daniel Kim",
      parentEmail: "daniel@example.com",
      daycareName: "Wonder Nest – Burnaby",
      childAge: "4 years",
      date: "2025-01-15",
      time: "2:00 PM",
      status: "Confirmed",
      notes: "Both parents will attend.",
    },
  ]);

  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<TourStatus | "All">("All");

  const [selected, setSelected] = useState<TourRequest | null>(null);

  const changeStatus = (id: string, newStatus: TourStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  const filteredRequests =
    selectedStatusFilter === "All"
      ? requests
      : requests.filter((r) => r.status === selectedStatusFilter);

  const statusBadgeClass = (status: TourStatus) => {
    switch (status) {
      case "Requested":
        return "bg-amber-50 text-amber-700";
      case "Confirmed":
        return "bg-blue-50 text-blue-700";
      case "Completed":
        return "bg-emerald-50 text-emerald-700";
      case "Cancelled":
        return "bg-red-50 text-red-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Tour / Visit Requests</h1>
      <p className="text-sm text-slate-600 mb-6">
        This view helps the Elite team track and update tour requests from
        families to daycares in the Elite network.
      </p>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-xs text-slate-600">Filter by status:</span>
        {["All", "Requested", "Confirmed", "Completed", "Cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() =>
                setSelectedStatusFilter(status as TourStatus | "All")
              }
              className={`px-3 py-1 rounded-full text-xs border ${
                selectedStatusFilter === status
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Requests table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600 text-xs">
            <tr>
              <th className="p-3 text-left">Parent</th>
              <th className="p-3 text-left">Daycare</th>
              <th className="p-3 text-left">Child age</th>
              <th className="p-3 text-left">Date & time</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id} className="border-t">
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-800 text-sm">
                      {req.parentName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {req.parentEmail}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-slate-700">{req.daycareName}</td>
                <td className="p-3 text-slate-600">{req.childAge}</td>
                <td className="p-3 text-slate-600">
                  {req.date} – {req.time}
                </td>
                <td className="p-3">
                  <span
                    className={
                      "text-[11px] px-2 py-1 rounded-full font-semibold " +
                      statusBadgeClass(req.status)
                    }
                  >
                    {req.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => setSelected(req)}
                    className="px-3 py-1 text-xs bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100"
                  >
                    View
                  </button>
                  {req.status !== "Confirmed" && (
                    <button
                      onClick={() => changeStatus(req.id, "Confirmed")}
                      className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                    >
                      Mark as confirmed
                    </button>
                  )}
                  {req.status !== "Completed" && (
                    <button
                      onClick={() => changeStatus(req.id, "Completed")}
                      className="px-3 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100"
                    >
                      Mark as completed
                    </button>
                  )}
                  {req.status !== "Cancelled" && (
                    <button
                      onClick={() => changeStatus(req.id, "Cancelled")}
                      className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-slate-500">
                  No tour requests found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail side modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Tour request details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <div className="text-xs text-slate-500">Parent</div>
                <div className="text-slate-800 font-medium">
                  {selected.parentName}
                </div>
                <div className="text-xs text-slate-500">
                  {selected.parentEmail}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Daycare</div>
                <div className="text-slate-800 font-medium">
                  {selected.daycareName}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-slate-500">Child age</div>
                  <div className="text-slate-800">{selected.childAge}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Requested time</div>
                  <div className="text-slate-800">
                    {selected.date} – {selected.time}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Status</div>
                <span
                  className={
                    "inline-flex mt-1 text-[11px] px-2 py-1 rounded-full font-semibold " +
                    statusBadgeClass(selected.status)
                  }
                >
                  {selected.status}
                </span>
              </div>

              {selected.notes && (
                <div>
                  <div className="text-xs text-slate-500 mb-1">Notes</div>
                  <p className="text-xs text-slate-700 bg-slate-50 rounded-lg p-3">
                    {selected.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs hover:bg-slate-200"
              >
                Close
              </button>
              {selected.status !== "Confirmed" && (
                <button
                  onClick={() => {
                    changeStatus(selected.id, "Confirmed");
                    setSelected({ ...selected, status: "Confirmed" });
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700"
                >
                  Mark as confirmed
                </button>
              )}
              {selected.status !== "Completed" && (
                <button
                  onClick={() => {
                    changeStatus(selected.id, "Completed");
                    setSelected({ ...selected, status: "Completed" });
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs hover:bg-emerald-700"
                >
                  Mark as completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <p className="text-[10px] text-slate-500 mt-4">
        Demo data only. In the live Elite platform, this view will be connected
        to the backend where tour requests are created by parents and updated by
        the Elite team.
      </p>
    </div>
  );
};

export default AdminTours;
