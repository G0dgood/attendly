'use client';

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex-grow flex flex-col">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-10 sm:px-12 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-6 h-6 text-blue-200" />
              <span className="text-blue-100 tracking-wider text-xs font-semibold uppercase">Security & Privacy</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="mt-2 text-blue-100 text-sm max-w-xl">
              Last updated: July 8, 2026. Please read this Privacy Policy carefully to understand our practices regarding your data.
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 active:bg-white/35 text-white rounded-lg font-medium text-sm transition-all shadow-sm border border-white/20 whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

        {/* Content body */}
        <div className="px-6 py-10 sm:px-12 text-slate-700 space-y-8 flex-grow">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Lock className="w-5 h-5 text-blue-600" />
              1. Information We Collect
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm">
              We collect information to provide better services to all our users. The types of personal information we collect include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
              <li><strong>Account Credentials:</strong> Email address, full name, phone number, and hashed password.</li>
              <li><strong>Attendance Records:</strong> Time check-in, time check-out, office location, and device ID used during clock-in.</li>
              <li><strong>Biometric Settings:</strong> Mobile application settings regarding biometric enablement (such as Face ID/Touch ID status). We do not store your raw biometric data.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Eye className="w-5 h-5 text-blue-600" />
              2. How We Use Your Information
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm">
              We use the collected information to configure, run, and support your attendance tracking, specifically to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
              <li>Manage your registration, profile, and administrative authentication.</li>
              <li>Provide precise attendance reports, work logs, and geo-located clock-in validations.</li>
              <li>Improve customer service and application optimizations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              3. Data Security and Sharing
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm">
              We adopt robust data collection, storage, and processing practices, as well as security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal data.
            </p>
            <p className="leading-relaxed text-slate-600 text-sm">
              We do not sell, trade, or rent users' personal identification information to others. Any data sharing is restricted to authorization by your employer for organizational attendance logging and administrative review.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              Contact Us
            </h2>
            <p className="leading-relaxed text-slate-600 text-sm">
              If you have any questions about this Privacy Policy, please contact your organization administrator or Outcess Solutions support:
            </p>
            <p className="text-sm font-semibold text-slate-800">
              Email: support@outcess.com
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-6 sm:px-12 border-t border-slate-100 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Attendly by Outcess. All rights reserved.
        </div>
      </div>
    </div>
  );
}
