// src/pages/Search.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { daycareList, Daycare } from "../data/daycares";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState("All");

  const areas = Array.from(new Set(daycareList.map((d) => d.area)));

  const filtered = daycareList.filter((dc) => {
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      dc.name.toLowerCase().includes(q) ||
      dc.address.toLowerCase().includes(q);
    const matchArea = areaFilter === "All" || dc.area === areaFilter;
    return matchQuery && matchArea;
  });

  const handleOpen = (id: string) => {
    navigate(`/daycare/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Find an Elite-certified daycare
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        Browse trusted daycares in the Elite network. Use the search and filters
        to narrow down options close to your home or work.
      </p>

      {/* Filters */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-[2fr,1.3fr] mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Search by name or address
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Type a daycare name or street"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Area
          </label>
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="All">All areas</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-slate-500">
          Showing <span className="font-semibold">{filtered.length}</span> of{" "}
          {daycareList.length} Elite daycares
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((dc: Daycare) => (
          <button
            key={dc.id}
            type="button"
            onClick={() => handleOpen(dc.id)}
            className="text-left bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  {dc.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">{dc.area}</p>
              </div>
              {dc.badge && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium">
                  {dc.badge}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-2">{dc.address}</p>
            <p className="text-xs text-slate-500 mt-1">Phone: {dc.phone}</p>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-sm text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4">
            No daycares match your filters. Try clearing the search or choosing
            &quot;All areas&quot;.
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
