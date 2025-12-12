// src/pages/admin/AdminFilters.tsx
import React, { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { FilterGroups, FilterItem } from "../../types/appTypes";

type FilterGroupKey = keyof FilterGroups;

const groupLabels: Record<FilterGroupKey, string> = {
  ageGroups: "Age groups",
  educationSystems: "Education systems",
  languages: "Languages",
  distances: "Distances",
};

const AdminFilters: React.FC = () => {
  const { filters, updateFilterGroup } = useAppData();

  const [selectedGroup, setSelectedGroup] = useState<FilterGroupKey>("ageGroups");
  const [newLabel, setNewLabel] = useState("");

  const currentItems: FilterItem[] = filters[selectedGroup];

  const handleAddItem = () => {
    if (!newLabel.trim()) return;
    const newItem: FilterItem = {
      id: `flt-${Date.now()}`,
      label: newLabel.trim(),
      active: true,
    };
    const updated = [...currentItems, newItem];
    updateFilterGroup(selectedGroup, updated);
    setNewLabel("");
  };

  const handleToggleActive = (id: string) => {
    const updated = currentItems.map((item) =>
      item.id === id ? { ...item, active: !item.active } : item
    );
    updateFilterGroup(selectedGroup, updated);
  };

  const handleDelete = (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this filter option from this group?"
      )
    ) {
      return;
    }
    const updated = currentItems.filter((item) => item.id !== id);
    updateFilterGroup(selectedGroup, updated);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Search Filters Configuration
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the filter options used by the Elite search page. Families
            will see these options when they search for daycares.
          </p>
        </div>
      </div>

      {/* Group selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(Object.keys(groupLabels) as FilterGroupKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelectedGroup(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
              selectedGroup === key
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {groupLabels[key]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr,1.2fr] gap-6 items-start">
        {/* Existing filter items */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                {groupLabels[selectedGroup]}
              </h2>
              <p className="text-xs text-gray-500">
                Active items are visible to families in the search filters.
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] bg-gray-50 text-gray-600">
              {currentItems.length} options
            </span>
          </div>

          <div className="divide-y divide-gray-100 max-h-[320px] overflow-y-auto">
            {currentItems.length === 0 ? (
              <div className="px-4 py-6 text-sm text-gray-500">
                No options have been configured for this group yet. Use the
                panel on the right to add a new option.
              </div>
            ) : (
              currentItems.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item.id)}
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                        item.active
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      }`}
                    >
                      {item.active ? "Active" : "Hidden"}
                    </button>
                    <span
                      className={`text-sm ${
                        item.active ? "text-gray-900" : "text-gray-400 line-through"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add new item */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Add filter option
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Add a new filter label to{" "}
            <span className="font-semibold">
              {groupLabels[selectedGroup].toLowerCase()}
            </span>
            . For example: &quot;Infant (0–18 months)&quot;, &quot;Montessori&quot;,
            &quot;Farsi&quot; or &quot;Within 5 km&quot;.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Label
              </label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full rounded-lg border-gray-300 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Example: Infant (0–18 months)"
              />
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full inline-flex justify-center items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
              disabled={!newLabel.trim()}
            >
              Add option
            </button>
          </div>

          <p className="mt-4 text-[11px] text-gray-400 leading-snug">
            These settings are stored in the Elite admin demo state. In the full
            platform, they would be saved in the backend and used to render the
            filter options on the family search page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminFilters;
