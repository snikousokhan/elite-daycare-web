import React, { useState } from "react";

interface Daycare {
  id: string;
  name: string;
  area: string;
  ageRange: string;
  status: "Active" | "Inactive";
}

const AdminDaycares: React.FC = () => {
  // لیست اولیه‌ی دِیکِرها (همان ۸ موردی که خودت دادی)
  const [daycares, setDaycares] = useState<Daycare[]>([
    {
      id: "dc-001",
      name: "Art History Daycare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-002",
      name: "Mehr Daycare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-003",
      name: "Blossom Valley Kids",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-004",
      name: "Deniz Family Childcare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-005",
      name: "Rose Childcare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-006",
      name: "Lil Bloomers",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-007",
      name: "Happy Kids Daycare",
      area: "North Vancouver",
      ageRange: "",
      status: "Active",
    },
    {
      id: "dc-008",
      name: "Loona Daycare",
      area: "Coquitlam",
      ageRange: "",
      status: "Active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Daycare | null>(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    area: "",
    ageRange: "",
    status: "Active" as "Active" | "Inactive",
  });

  const openAddModal = () => {
    setEditing(null);
    setForm({
      id: "",
      name: "",
      area: "",
      ageRange: "",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (daycare: Daycare) => {
    setEditing(daycare);
    setForm(daycare);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this daycare?")) {
      setDaycares(daycares.filter((d) => d.id !== id));
    }
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    if (editing) {
      // Update existing daycare
      setDaycares(
        daycares.map((d) => (d.id === editing.id ? { ...form } : d))
      );
    } else {
      // Add new daycare
      setDaycares([
        ...daycares,
        { ...form, id: `dc-${Date.now().toString()}` },
      ]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">Manage Daycares</h1>

      {/* ✅ نمایش تعداد دِیکِرها */}
      <p className="text-xs text-slate-500 mb-4">
        Total daycares in this list: <span className="font-semibold">{daycares.length}</span>
      </p>

      <p className="text-sm text-slate-600 mb-6">
        Add, update and organize daycares in the Elite network.
        This section is a demo admin view and is not yet connected to a real backend.
      </p>

      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700"
      >
        + Add daycare
      </button>

      {/* Daycare table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600 text-xs">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Area</th>
              <th className="p-3 text-left">Age Range</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {daycares.map((dc) => (
              <tr key={dc.id} className="border-t">
                <td className="p-3">{dc.name}</td>
                <td className="p-3 text-slate-600">{dc.area}</td>
                <td className="p-3 text-slate-600">{dc.ageRange}</td>
                <td className="p-3">
                  <span
                    className={
                      dc.status === "Active"
                        ? "text-emerald-700 font-semibold text-xs"
                        : "text-red-600 font-semibold text-xs"
                    }
                  >
                    {dc.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(dc)}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dc.id)}
                    className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {daycares.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-slate-500">
                  No daycares found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-3">
              {editing ? "Edit daycare" : "Add daycare"}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Area</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Age range
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g. 12 months – 5 years"
                  value={form.ageRange}
                  onChange={(e) =>
                    setForm({ ...form, ageRange: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as "Active" | "Inactive",
                    })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm hover:bg-slate-200"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDaycares;
