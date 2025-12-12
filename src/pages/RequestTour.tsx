import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const RequestTour: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: later connect to API / backend
    alert(
      "Your tour request has been submitted. The Elite team will contact you shortly."
    );
    navigate("/profile");
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">Request a Visit / Tour</h1>
      <p className="text-gray-600 mb-4">
        You are requesting a visit for daycare:
        <span className="font-semibold"> {id}</span>
        <br />
        In the real system, Elite will send your request to the daycare and
        follow up with you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Preferred date
          </label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Preferred time window
          </label>
          <input
            type="text"
            placeholder="e.g. 9:00–11:00 AM"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Child age</label>
          <input
            type="number"
            min={0}
            max={12}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Notes for Elite / daycare (optional)
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows={3}
            placeholder="Any specific needs, questions or comments?"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm"
        >
          Submit tour request
        </button>
      </form>
    </div>
  );
};

export default RequestTour;
