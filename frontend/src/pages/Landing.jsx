import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Card from "../components/Card.jsx";
import SuitabilityDial from "../components/SuitabilityDial.jsx";
import useAuth from "../hooks/useAuth.js";

const steps = [
  {
    label: "Pincode + business type",
    detail: "Tell it where you're looking and what you want to open."
  },
  {
    label: "AI reads the area",
    detail: "It weighs footfall, competition, connectivity, and access."
  },
  {
    label: "A clear verdict",
    detail: "Score, recommendation, pros, cons, in plain language."
  }
];

const Landing = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <section className="grid lg:grid-cols-2 gap-10 items-center py-8">
        <div>
          <p className="text-sm uppercase tracking-widest text-brand-600 font-medium mb-4">
            Location intelligence for small business
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            Know if a location fits your business, before you sign the lease.
          </h1>
          <p className="text-muted mt-5 text-base leading-relaxed max-w-md">
            Enter a pincode and a business type. The analyzer reads the area
            like a scout would, then hands you a straight answer: score,
            recommendation, pros, and cons.
          </p>
          <div className="mt-8">
            <Link
              to={user ? "/dashboard" : "/register"}
              className="inline-block px-6 py-3 rounded-full bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
            >
              {user ? "Go to dashboard" : "Analyze your first location"}
            </Link>
          </div>
        </div>

        <Card className="flex flex-col items-center">
          <p className="text-xs uppercase tracking-wide text-muted mb-2 self-start">
            Example &middot; Coffee Shop &middot; 641004
          </p>
          <SuitabilityDial score={82} />
          <p className="text-sm text-ink/80 mt-3 text-center max-w-xs">
            High residential density and few competitors nearby &mdash;{" "}
            <span className="text-brand-600 font-medium">Suitable</span>.
          </p>
        </Card>
      </section>

      <section className="mt-6 mb-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <div key={step.label} className="relative">
              <Card className="h-full">
                <p className="font-mono text-xs text-brand-600 mb-2">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display font-medium text-ink text-lg">{step.label}</h3>
                <p className="text-sm text-muted mt-1.5">{step.detail}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Landing;
