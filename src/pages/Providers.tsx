import React from "react";

const Providers: React.FC = () => {
  const demoProviders = [
    {
      id: 1,
      name: "Happy Steps Music Classes",
      category: "Kids Activities",
      city: "Vancouver",
      description: "Group music classes designed for toddlers and preschoolers.",
      offer: "15% off for Elite families",
    },
    {
      id: 2,
      name: "Family Wellness Center",
      category: "Family Services",
      city: "Burnaby",
      description: "Counselling and parenting support for families with young children.",
      offer: "Free initial consultation",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">
        Special Offers for Elite Families
      </h1>
      <p className="text-gray-600 mb-6">
        Here you can find trusted providers in the childcare & family space who
        offer <span className="font-semibold">exclusive discounts</span> for
        Elite-registered families.
      </p>

      <div className="space-y-4">
        {demoProviders.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4 shadow-sm bg-white flex flex-col gap-1"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                {p.category}
              </span>
            </div>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{p.city}</span>
              <span className="text-sm font-semibold text-emerald-700">
                {p.offer}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-6">
        * Demo content – in the real Elite platform, all providers and offers
        are curated and managed by the Elite team.
      </p>
    </div>
  );
};

export default Providers;
