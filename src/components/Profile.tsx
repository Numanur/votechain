import { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { Voters, VoterData } from "./VoterInfo";

const Profile = () => {
  // Initialize userdata with default values to avoid undefined access
  const [voterdata] = useState<VoterData | null>(Voters[0]);
  const navigate = useNavigate();
  const handleCastVoteBtn = () => {
    navigate("/voting");
  }
  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you want to exit?");
    if (confirmExit) {
      navigate("/");
    }
  };
  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-2">
          <div className="row">
            {/* Left Section: User Avatar */}
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">{voterdata?.name || "N/A"}</h5>
                  <p className="text-muted mb-1">
                    User Type:
                    <span className="fw-bold text-success">
                      {" "}
                      {voterdata?.usertype || "N/A"}
                    </span>
                  </p>

                  <p className="text-muted mb-1">
                    Address:
                    <span className="fw-bold text-primary">
                      {" "}
                      {voterdata?.userlocation || "N/A"}
                    </span>
                  </p>

                  <p className="text-muted mb-1">
                    Voting Status:
                    <span
                      className={
                        voterdata?.votingstatus == "NOT DONE"
                          ? "fw-bold text-danger"
                          : "fw-bold text-success"
                      }
                    >
                      {" "}
                      {voterdata?.votingstatus || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button className="exit-btn" onClick={handleExit}>
                  EXIT
                </button>
              </div>
            </div>

            {/* Right Section: User Info */}
            <div className="col-lg-8">
              <div className="card">
                {/* Header */}
                <div className="d-flex bg-info bg-opacity-75 shadow-sm">
                  <h2 className="mx-auto mt-2 mb-3">Voter's Info</h2>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0 fw-bold">Full Name</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="mb-0">{voterdata?.name || "N/A"}</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0 fw-bold">Father's Name</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="mb-0">{voterdata?.fathersname || "N/A"}</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0 fw-bold">Mother's Name</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="mb-0">{voterdata?.mothersname || "N/A"}</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0 fw-bold">Date of Birth</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="mb-0">{voterdata?.dob || "N/A"}</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-4">
                      <p className="mb-0 fw-bold">NID</p>
                    </div>
                    <div className="col-sm-8">
                      <p className="mb-0 text-danger fw-bold">
                        {voterdata?.nid || "N/A"}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
        {voterdata?.votingstatus == "NOT DONE" ? (
          <div className="container d-flex justify-content-center">
            <button className="cast-vote-btn" onClick={handleCastVoteBtn}>CAST YOUR VOTE</button>
          </div>
        ) : (
          ""
        )}
      </section>
      <section></section>
    </>
  );
};

export default Profile;
