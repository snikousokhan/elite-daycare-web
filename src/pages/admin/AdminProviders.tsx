import React, { useState } from "react";

interface Provider {
  id: string;
  name: string;
  category: string;
  city: string;
  offer: string;
  status: "Active" | "Hidden";
}

const AdminProviders: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: "prov-001",
      name: "Happy Steps Music Classes",
      category: "Kids Activities",
      city: "Vancouver",
      offer: "15% off for Elite families",
      status: "Active",
    },
    {
      id: "prov-002",
      name: "Family Wellness Centre",
      category: "Family Services",
      city: "Burnaby",
      offer: "Free first consultation",
      status: "Active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Provider | null>(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    city: "",
    offer: "",
    status: "Active" as "Active" | "Hidden",
  });

  const openAddModal = () => {
    setEditing(null);
    setForm({
      id: "",
      name: "",
      category: "",
      city: "",
      offer: "",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prov: Provider) => {
    setEditing(prov);
    setForm(prov);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this provider?")) {
      setProviders(providers.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!form.name.trim()) return alert("Name is required");
    if (!form.category.trim()) return alert("Category is required");

    if (editing) {
      // Update existing provider
      setProviders(
        providers.map((p) => (p.id === editing.id ? { ...form } : p))
      );
    } else {
      // Add new provider
      setProviders([
        ...providers,
        { ...form, id: `prov-${Date.now().toString()}` },
      ]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">
        Manage Providers & Special Offers
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        This section manages family-oriented providers (activities, services,
        products) that appear in the Elite platform with special offers for
        families.
      </p>

      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700"
      >
        + Add provider
      </button>

      {/* Providers table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600 text-xs">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Offer</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3 text-slate-600">{p.category}</td>
                <td className="p-3 text-slate-600">{p.city}</td>
                <td className="p-3 text-slate-600">{p.offer}</td>
                <td className="p-3">
                  <span
                    className={
                      p.status === "Active"
                        ? "text-emerald-700 font-semibold text-xs"
                        : "text-slate-500 font-semibold text-xs"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {providers.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-slate-500">
                  No providers found.
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
              {editing ? "Edit provider" : "Add provider"}
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
                <label className="block text-xs font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g. Kids Activities, Family Services"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">City</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Offer (visible to families)
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g. 10% off for Elite families"
                  value={form.offer}
                  onChange={(e) =>
                    setForm({ ...form, offer: e.target.value })
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
                      status: e.target.value as "Active" | "Hidden",
                    })
                  }
                >
                  <option value="Active">Active (visible in app)</option>
                  <option value="Hidden">Hidden (not visible)</option>
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

export default AdminProviders;
