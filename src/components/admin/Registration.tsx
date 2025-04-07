import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

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
  const [status, setStatus] = useState("");
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("status", (msg) => {
      setStatus(msg);
    });

    socketRef.current.on("enrollmentSuccess", (fingerprintId) => {
      setStatus(`Success! Fingerprint ID: ${fingerprintId}`);
    });

    socketRef.current.on("error", (err) => {
      setStatus(`Error: ${err}`);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Starting enrollment...");

    if (socketRef.current) {
      socketRef.current.emit("formData", formData);
      socketRef.current.emit("startEnrollment");
    } else {
      setStatus("Connection error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
                <input
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
