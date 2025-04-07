import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Landing.css";
import evoting from "../../public/images/evoting.png";
import fingerprint from "../../public/images/fingerprint.jpg";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isErnpmror, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleFingerprintClick = async () => {
    setIsLoading(true);
    // setIsError(false);
    navigate("/profile");

    // try {
    //   const response = await axios.get(
    //     "http://localhost:5000/verifyfingerprint"
    //   );

    //   if (response.data.success) {
    //     setIsLoading(false);
    //     navigate("/profile");
    //   } else {
    //     alert("You are not Valid.");
    //     setIsLoading(false);
    //     setIsError(true);
    //   }
    // } catch (error) {
    //   alert("Error while verification");
    //   console.error("Error verifying fingerprint:", error);
    //   setIsLoading(false);
    //   setIsError(true);
    // }
  };

  return (
    <>
      {/* Main Header Section */}
      <div className="container-fluid text-center py-4 bg-dark text-white mt-0">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5">VoteChain: One Person One Vote</h2>
          </div>
          <div className="col-12 mt-2">
            <div className="d-flex justify-content-center gap-3 fs-5">
              <span
                className="badge bg-primary"
                data-bs-toggle="tooltip"
                title="Security ensures the integrity of votes through cryptographic methods."
              >
                Security
              </span>
              <span
                className="badge bg-secondary"
                data-bs-toggle="tooltip"
                title="Transparency ensures that the voting process and results are visible and verifiable."
              >
                Transparency
              </span>
              <span
                className="badge bg-success"
                data-bs-toggle="tooltip"
                title="Decentralized Vote allows voting without a central authority, ensuring no manipulation."
              >
                Decentralized Vote
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="container my-3">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <h1 className="display-5">
              Welcome to{" "}
              <span className="text-primary fst-normal">VoteChain</span>
              <br />
              <span className="text-success">
                A Comprehensive E-Voting System
              </span>
            </h1>
            <p className="lead">
              A beautiful, user-friendly, comprehensive web platform for casting
              votes securely and transparently using blockchain technology.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src={evoting}
              alt="Illustration of an e-voting system"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </section>

      {/* Fingerprint Verification Section */}
      <section>
        <div className="container my-1">
          <div className="row align-items-center">
            <div className="col-12 gap-4 d-flex justify-content-center align-items-center">
              {isLoading ? (
                <>
                  <div className="fingerprint-line bg-dark px-5 py-3 d-flex justify-content-between align-items-center">
                    <span>Place your finger on the sensor</span>
                    <i className="fas fa-arrow-alt-circle-right fingerprint-icon"></i>
                  </div>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="fingerprint-line px-5 py-3 d-flex justify-content-between align-items-center">
                    <span>Click here to verify Fingerprint</span>
                    <i className="fas fa-arrow-alt-circle-right fingerprint-icon"></i>
                  </div>
                  <div>
                    <img
                      src={fingerprint}
                      alt="Fingerprint icon for verification"
                      className="rounded fingerprint-img"
                      style={{
                        width: "100px",
                        height: "100px",
                        cursor: "pointer",
                      }}
                      onClick={handleFingerprintClick}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
