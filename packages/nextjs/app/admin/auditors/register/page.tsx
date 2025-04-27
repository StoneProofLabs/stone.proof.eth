"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheck, FaLock, FaRegCopy } from "react-icons/fa";
import TopBar from "~~/components/dashboard/topBar";
import { getSidebarItems } from "~~/types/dashboard/sidebarItems";

const AuditorRegisterPage = () => {
  const router = useRouter();
  const sidebarItems = getSidebarItems("/admin");

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    auditorId: "0xffed-ecd3-34fc-2920",
    password: "",
    specialization: "",
    document: null as File | null,
    documentName: "",
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "document" && files && files[0]) {
      setForm(f => ({ ...f, document: files[0], documentName: files[0].name }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(form.auditorId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push("/admin/auditors");
    }, 1200);
  };

  const handleClose = () => {
    router.push("/admin/auditors");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-8 px-2">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8 text-center">Register New Auditor</h1>
       <div className="border-[#323539] p-3">
       <form
          onSubmit={handleSubmit}
          className="w-full max-w-5xl border border-[#323539] rounded-2xl p-4 md:p-8 flex flex-col gap-8"
        >
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Left: Personal Info */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <img src="/dashboard/icon_set/auditors.svg" alt="Auditor Register" className="w-8 h-8" />
                <span className="text-white text-lg font-semibold">Auditor Register</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-xs text-white">First Name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-[#181B20] autofill:!bg-[#181B20] mt-1"
                    placeholder="John"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-white">Last Name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-[#181B20] autofill:!bg-[#181B20] mt-1"
                    placeholder="Doe"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-white">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-[#181B20] autofill:!bg-[#181B20] mt-1"
                  placeholder="johndoe@example.com"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="text-xs text-white">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-[#181B20] autofill:!bg-[#181B20] mt-1"
                  placeholder="+250"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            {/* Right: Account Info */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <div>
                <label className="text-xs text-white">AUDITOR_ID</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center bg-[#23262F] border border-[#323539] rounded-lg px-3 py-2 w-full">
                    <FaLock className="text-gray-400 mr-2" />
                    <span className="text-white font-mono text-base flex-1 truncate">{form.auditorId}</span>
                    <button
                      type="button"
                      className="ml-2 p-1 hover:bg-gray-700 rounded transition-colors"
                      onClick={handleCopy}
                      title="Copy Auditor ID"
                    >
                      <FaRegCopy className="text-gray-400" />
                    </button>
                  </div>
                  {copySuccess && <span className="text-xs text-green-400 ml-2">Copied!</span>}
                </div>
                <span className="text-xs text-gray-400">Valid until sign in of the auditor</span>
              </div>
              <div>
                <label className="text-xs text-white">Password Setup (Temporary)</label>
                <input
                  name="password"
                  type="text"
                  value={form.password}
                  onChange={handleChange}
                  className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-[#181B20] autofill:!bg-[#181B20] mt-1"
                  placeholder="Temporary password"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="text-xs text-white">Specialization (if any)</label>
                <div className="flex gap-2 mt-1">
                  <div className="relative flex-1">
                    <select
                      name="specialization"
                      value={form.specialization}
                      onChange={handleChange}
                      className="appearance-none border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-[#181B20] autofill:!bg-[#181B20] pr-10 cursor-pointer"
                    >
                      <option value="" disabled>
                        Select specialization (optional)
                      </option>
                      <option value="Gold">Gold</option>
                      <option value="Tin">Tin</option>
                      <option value="Tantalum">Tantalum</option>
                      <option value="Cobalt">Cobalt</option>
                      <option value="Copper">Copper</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs text-white">Auditor Legal Document</label>
                <div className="flex gap-2 mt-1 items-center">
                  <input
                    name="document"
                    type="file"
                    accept="application/pdf"
                    onChange={handleChange}
                    className="hidden"
                    id="auditor-doc-upload"
                  />
                  <label
                    htmlFor="auditor-doc-upload"
                    className="flex-1 border border-[#323539] rounded-lg px-3 py-2 text-white bg-[#181B20] cursor-pointer truncate flex items-center"
                  >
                    {form.documentName || "Select the doc"}
                  </label>
                  <label
                    htmlFor="auditor-doc-upload"
                    className="bg-[#23262F] border border-[#323539] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#202634] cursor-pointer"
                  >
                    Upload Legal Document
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                      />
                    </svg>
                  </label>
                  {form.documentName && (
                    <button
                      type="button"
                      className="ml-2 text-xs text-red-400 hover:underline"
                      onClick={() => setForm(f => ({ ...f, document: null, documentName: "" }))}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <span className="text-xs text-gray-400">This should be a valid “.pdf” file</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <button
              type="button"
              className="flex-1 bg-[#EF4444] hover:bg-red-700 text-white font-semibold py-3 rounded-lg text-lg"
              onClick={handleClose}
              disabled={submitting}
            >
              Close
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#0A77FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg flex items-center justify-center gap-2"
              disabled={submitting}
            >
              <FaCheck size={18} className="text-white" /> Submit
            </button>
          </div>
          <p className="text-lg text-gray-400 mt-2 text-center md:text-left">
            The Auditor will receive the email containing the above info for login
          </p>
        </form>
       </div>
      </div>
    </>
  );
};

export default AuditorRegisterPage;
