import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Card from "../components/Card.jsx";
import useAuth from "../hooks/useAuth.js";

const Landing = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <section className="text-center py-14 sm:py-20 relative">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600 mb-4">
          Pincode + business type → suitability report
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink-600 leading-[1.1] max-w-2xl mx-auto">
          Know if the location fits <span className="italic text-ink-400">before</span> you sign the lease
        </h1>
        <p className="text-ink-700/70 mt-5 max-w-lg mx-auto leading-relaxed">
          Enter a pincode and a business type. Our AI reads the area like a
          surveyor and hands back a score, a clear recommendation, and the
          pros and cons behind it.
        </p>
        <div className="mt-8">
          <Link
            to={user ? "/dashboard" : "/register"}
            className="inline-block px-6 py-3 rounded-lg bg-ink-500 text-paper font-medium hover:bg-ink-600 transition-colors"
          >
            {user ? "Go to Dashboard" : "Get started free"}
          </Link>
        </div>
      </section>

      <div className="grid sm:grid-cols-3 gap-4 mt-4">
        <Card>
          <p className="font-mono text-xs text-amber-600 mb-2">01 · Enter</p>
          <h3 className="font-display font-semibold text-ink-600">Pincode + business</h3>
          <p className="text-sm text-ink-700/70 mt-1.5">
            Two fields, nothing else to fill in.
          </p>
        </Card>
        <Card>
          <p className="font-mono text-xs text-amber-600 mb-2">02 · Analyze</p>
          <h3 className="font-display font-semibold text-ink-600">AI reads the area</h3>
          <p className="text-sm text-ink-700/70 mt-1.5">
            Density, competition, connectivity, weighed together.
          </p>
        </Card>
        <Card>
          <p className="font-mono text-xs text-amber-600 mb-2">03 · Decide</p>
          <h3 className="font-display font-semibold text-ink-600">A clear verdict</h3>
          <p className="text-sm text-ink-700/70 mt-1.5">
            Score, recommendation, pros, cons, and why.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Landing;
