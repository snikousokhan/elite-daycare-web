import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartSearch = () => {
    navigate("/search");
  };

  // می‌توانیم بعداً اینها را از data/daycares.ts بگیریم
  const featuredDaycares = [
    {
      id: "elite-van-001",
      name: "Elite Little Stars Daycare",
      area: "Vancouver – Mount Pleasant",
      ageRange: "12 months – 5 years",
      badge: "Elite Certified",
      note: "Warm, structured, play-based program with daily outdoor time.",
    },
    {
      id: "elite-bby-002",
      name: "Wonder Nest – Burnaby",
      area: "Burnaby – Metrotown",
      ageRange: "2 – 5 years",
      badge: "Elite Certified",
      note: "Small groups, bilingual staff and strong school-readiness focus.",
    },
  ];

  const featuredProviders = [
    {
      name: "Happy Steps Music Classes",
      type: "Kids Activities",
      offer: "15% off for Elite families",
    },
    {
      name: "Family Wellness Centre",
      type: "Family Services",
      offer: "Free first consultation",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-gradient-to-b from-sky-700 to-sky-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Left: main hero copy */}
          <div className="flex-1">
            <p className="uppercase text-xs tracking-wide mb-2 text-sky-100">
              Elite Childcare · For Families
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-3">
              Find trusted,{" "}
              <span className="underline decoration-sky-200">
                Elite-certified
              </span>{" "}
              childcare near your home.
            </h1>
            <p className="text-sm md:text-base text-sky-50 mb-5">
              Elite connects families with licensed, regularly inspected
              daycares across Metro Vancouver — at no cost to parents. We do
              the vetting, so you can focus on your child.
            </p>

            {/* bullets */}
            <ul className="space-y-1.5 mb-5 text-xs md:text-sm text-sky-50">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>Only licensed and verified centres in our network.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>Monthly Elite quality visits and support for daycares.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>Free guidance and matching service for families.</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <button
                onClick={handleStartSearch}
                className="px-4 py-2.5 rounded-full bg-white text-sky-700 font-medium text-sm shadow-sm hover:bg-sky-50"
              >
                Start daycare search
              </button>

              {/* اگر route /providers نداری، این Link را فعلاً کامنت کن */}
              <Link
                to="/providers"
                className="px-4 py-2.5 rounded-full border border-sky-100 text-white text-sm hover:bg-sky-500/40"
              >
                View family special offers
              </Link>
            </div>

            <p className="text-xs text-sky-100">
              All Elite services for families are completely free.
            </p>
          </div>

          {/* Right: “visual” card (فعلاً سرچ، بعداً می‌توانی تصویر جایگزین کنی) */}
          <div className="flex-1 w-full">
            <div className="bg-white/95 text-slate-900 rounded-2xl shadow-lg p-4 space-y-3">
              <h2 className="text-sm font-semibold mb-1">
                Quick search – near your home
              </h2>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter your address or neighbourhood"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <select className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm">
                    <option>Distance – within 5 km</option>
                    <option>Within 2 km</option>
                    <option>Within 10 km</option>
                    <option>Public transit friendly</option>
                  </select>
                  <select className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm">
                    <option>Age group – All</option>
                    <option>Infant</option>
                    <option>Toddler</option>
                    <option>Preschool</option>
                    <option>School-age</option>
                  </select>
                </div>
                <button
                  onClick={handleStartSearch}
                  className="w-full bg-sky-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-sky-700"
                >
                  Search daycares
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Demo search box. In the full Elite platform, your preferences
                will be saved to your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FAMILIES CHOOSE ELITE */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-slate-900">
          Why families choose Elite
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Elite is more than a directory — we actively inspect, support and
          monitor daycares in our network.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-semibold mb-1 text-sm">Peace of mind</h3>
            <p className="text-xs text-slate-600">
              Daycares are licensed, inspected and supported by childcare
              experts.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-semibold mb-1 text-sm">Real trust</h3>
            <p className="text-xs text-slate-600">
              Elite-certified means clear standards for safety, hygiene,
              communication and curriculum.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-semibold mb-1 text-sm">Less stress</h3>
            <p className="text-xs text-slate-600">
              We collect and analyze information so you don’t have to compare
              dozens of centres manually.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-semibold mb-1 text-sm">Close to home</h3>
            <p className="text-xs text-slate-600">
              Find daycares on a map and filter by distance, transit and
              neighbourhood.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-semibold mb-1 text-sm">Consistent quality</h3>
            <p className="text-xs text-slate-600">
              Elite provides tools and training to help daycares maintain high
              quality.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-semibold mb-1 text-sm">Free for families</h3>
            <p className="text-xs text-slate-600">
              Our service is free forever for parents.
            </p>
          </div>
        </div>
      </section>

      {/* HOW ELITE WORKS */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-slate-900">
            How Elite works
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            A simple path from feeling overwhelmed to feeling confident in your
            childcare choice.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-sky-700 mb-1">
                STEP 1
              </div>
              <h3 className="font-semibold mb-1 text-sm">
                Tell us what you need
              </h3>
              <p className="text-xs text-slate-600">
                Create a free profile and share your child’s age, schedule and
                preferred location.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-sky-700 mb-1">
                STEP 2
              </div>
              <h3 className="font-semibold mb-1 text-sm">
                Explore Elite-certified options
              </h3>
              <p className="text-xs text-slate-600">
                Use our filters and map to see daycares that match your needs.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-sky-700 mb-1">
                STEP 3
              </div>
              <h3 className="font-semibold mb-1 text-sm">Book a tour</h3>
              <p className="text-xs text-slate-600">
                Request a visit. Elite helps coordinate and support your
                decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DAYCARES & PROVIDERS */}
      <section className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Featured daycares */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Featured Elite daycares
              </h2>
              <button
                onClick={handleStartSearch}
                className="text-xs text-sky-700 hover:underline"
              >
                View all on map
              </button>
            </div>

            <div className="space-y-3">
              {featuredDaycares.map((dc) => (
                <Link
                  key={dc.id}
                  to={`/daycare/${dc.id}`}
                  className="block border border-slate-100 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-slate-900">
                      {dc.name}
                    </h3>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-sky-50 text-sky-700">
                      {dc.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{dc.area}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Age range: {dc.ageRange}
                  </p>
                  <p className="text-xs text-slate-600 mt-2">{dc.note}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured providers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Special offers for Elite families
              </h2>
              <Link
                to="/providers"
                className="text-xs text-sky-700 hover:underline"
              >
                See all providers
              </Link>
            </div>

            <div className="space-y-3">
              {featuredProviders.map((p, idx) => (
                <div
                  key={idx}
                  className="border border-slate-100 rounded-2xl p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-slate-900">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500">{p.type}</p>
                    </div>
                    <span className="text-[11px] text-sky-700 font-semibold">
                      {p.offer}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 mt-3">
              Elite carefully selects providers who align with our standards for
              child safety, family well-being and community impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
