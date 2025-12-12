// src/pages/DaycareDetail.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { daycareList } from "../data/daycares";

const DaycareDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const daycare = daycareList.find((d) => d.id === id);

  if (!daycare) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-sm text-slate-600 mb-4">
          This daycare could not be found.
        </p>
        <button
          onClick={() => navigate("/search")}
          className="text-sm text-emerald-700 hover:underline"
        >
          Back to search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-xs text-slate-500 hover:text-slate-700 mb-4"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-1">
        {daycare.name}
      </h1>
      <p className="text-sm text-slate-600 mb-2">{daycare.area}</p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {daycare.badge && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
            {daycare.badge}
          </span>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
        <h2 className="text-sm font-semibold text-slate-900 mb-2">
          Contact & location
        </h2>
        <p className="text-sm text-slate-700">{daycare.address}</p>
        <p className="text-sm text-slate-700 mt-1">Phone: {daycare.phone}</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
        <h2 className="text-sm font-semibold text-slate-900 mb-2">
          About this daycare
        </h2>
        <p className="text-sm text-slate-700">
          This Elite-certified daycare is part of the Elite network. Our team
          regularly supports and monitors this center to help families feel more
          confident about their childcare choice.
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-emerald-900 mb-1">
          Ready to learn more?
        </h2>
        <p className="text-xs text-emerald-800 mb-3">
          You can request a tour through Elite. Our team will follow up with the
          daycare and coordinate a time that works for your family.
        </p>
        <button
          onClick={() => navigate(`/tour/${daycare.id}`)}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          Request a tour
        </button>
      </div>
    </div>
  );
};

export default DaycareDetail;
