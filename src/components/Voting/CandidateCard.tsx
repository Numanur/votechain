import { CandidateData } from "./CandidateData";
import "./CandidateCard.css";

interface CandidateProps {
  candidate: CandidateData;
  onSelect: (candidate: CandidateData) => void;
}

const CandidateCard: React.FC<CandidateProps> = ({ candidate, onSelect }) => {
  return (
    <div className="candidate-card">
      <div className="row">
        <div className="cols-12">
          <div className="card d-flex flex-row justify-content-between">
            <div className="col-md-6 col-sm-5 d-flex justify-content-start align-items-center">
              <div className="cimage">
                <img
                  src={candidate.cimage}
                  alt={candidate.cname}
                  className="candidate-image"
                />
              </div>
              <div className="d-flex flex-column justify-content-center">
                <h5 className="candidate-name">{candidate.cname}</h5>
                <p className="candidate-sublocation">{candidate.location}</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-5 mx-2 d-flex flex-row justify-content-between align-items-center symbol-div">
              <img
                src={candidate.symbolimg}
                alt={candidate.symbolname}
                className="symbol-image"
              />
              <h5 className="symbol-name">{candidate.symbolname}</h5>
            </div>
            <div className="col-md-2 col-sm-2 d-flex justify-content-center">
              <button className="vote-btn" onClick={() => onSelect(candidate)}>
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
