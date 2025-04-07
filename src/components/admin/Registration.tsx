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
    <div
      className="container-fluid text-center p-2 mt-0 text-white"
      style={{ backgroundColor: "#340052" }}
    >
      <h2
        className="mb-4 p-2 bg-dark"
        style={{ color: "white", fontSize: "2.5rem", borderRadius: "10px" }}
      >
        Voter Registration
      </h2>

      <div className="d-flex justify-content-center align-items-center">
        <div className="w-100" style={{ maxWidth: "700px" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="name"
                className="col-sm-4 col-form-label text-start"
              >
                Full Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label
                htmlFor="fname"
                className="col-sm-4 col-form-label text-start"
              >
                Father's Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label
                htmlFor="mname"
                className="col-sm-4 col-form-label text-start"
              >
                Mother's Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="mname"
                  name="mname"
                  value={formData.mname}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label
                htmlFor="dob"
                className="col-sm-4 col-form-label text-start"
              >
                Date of Birth
              </label>
              <div className="col-sm-8">
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="mb-3 row align-items-center">
              <label
                htmlFor="address"
                className="col-sm-4 col-form-label text-start"
              >
                Address
              </label>
              <div className="col-sm-8">
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="mb-4 row align-items-center">
              <label
                htmlFor="nid"
                className="col-sm-4 col-form-label text-start"
              >
                NID Number
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="nid"
                  name="nid"
                  value={formData.nid}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit & Scan Fingerprint
            </button>
          </form>

          {status && (
            <p className="mt-4 text-center text-light fw-medium">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
