import React, { useState } from "react";
import io from "socket.io-client";
import axios from "axios";

// Connect to backend Socket.IO server
const socket = io("http://localhost:3000"); // Update if using different host

interface FormData {
  name: string;
  fname: string;
  mname: string;
  dob: string;
  address: string;
  nid: string;
}

const Registration = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    fname: "",
    mname: "",
    dob: "",
    address: "",
    nid: "",
  });

  const [status, setStatus] = useState<string>("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Waiting for fingerprint scan...");
    try {
      const temp = await axios.post(
        "http://localhost:3000/temp-store",
        formData
      );
      console.log(temp.data);
      if (!temp.data.success) throw new Error("Failed to hold form Data");
    } catch (error) {
      console.error("Error storing form data:", error);
      setStatus("cannot send to backend...");
      return;
    }
    socket.emit("StartFingerprintEnrollment");
    socket.once("fingerorintEnrolled", async (fingerprintId: number) => {
      console.log("Fingerprint enrolled with ID:", fingerprintId);
      setStatus("Fingerprint enrolled successfully!");
      try {
        const finalRes = await axios.post("http://localhost:3000/register", {
          ...formData,
          fingerprintId: fingerprintId,
        });
        if (finalRes.data.success) {
          setStatus("Registration successful.");
        } else {
          setStatus("Registration failed.");
        }
      } catch (error) {
        console.error("Error storing fingerprint ID:", error);
        setStatus("cannot send to backend...");
      }
    });

    socket.once("fingerprintEnrollmentFailed", () => {
      setStatus("Fingerprint enrollment failed. Please try again.");
    });
  };

  return (
    <div className="container-fluid text-center py-4 bg-dark text-white mt-0">
      <h2 className="text-xl font-bold mb-4 text-primary">Voter Registration</h2>
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="fname"
            placeholder="Father's Name"
            value={formData.fname}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="mname"
            placeholder="Mother's Name"
            value={formData.mname}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="nid"
            placeholder="NID Number"
            value={formData.nid}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className=""
          >
            Submit & Scan Fingerprint
          </button>
        </form>
      </div>

      {status && (
        <p className="mt-4 text-center font-medium text-gray-700">{status}</p>
      )}
    </div>
  );
};

export default Registration;
