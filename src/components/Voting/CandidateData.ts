export interface CandidateData {
  cid: number;
  cimage: any;
  cname: string;
  location: string;
  party: string;
  symbolimg: any;
  symbolname: string;
}

export const Candidates: CandidateData[] = [
  //Tangail Zilla
  {
    cid: 1,
    cimage: "/images/c1.png",
    cname: "Md. Shahidul Islam",
    location: "Tangail 01",
    party: "Awami League",
    symbolimg: "/images/marka1.png",
    symbolname: "Murgi",
  },
  {
    cid: 2,
    cimage: "/images/c2.png",
    cname: "Shariful Islam",
    location: "Tangail 01",
    party: "BNP",
    symbolimg: "/images/marka2.png",
    symbolname: "Nouka",
  },
  {
    cid: 3,
    cimage: "/images/c3.png",
    cname: "Jamilur Rahman",
    location: "Tangail 01",
    party: "Jamat-E-islami",
    symbolimg: "/images/marka3.png",
    symbolname: "Hatpakha",
  },
  {
    cid: 4,
    cimage: "/images/c1.png",
    cname: "Jalal Uddin",
    location: "Tangail 02",
    party: "Awami League",
    symbolimg: "/images/marka1.png",
    symbolname: "Murgi",
  },
  {
    cid: 5,
    cimage: "/images/c2.png",
    cname: "Jolil Khan",
    location: "Tangail 02",
    party: "BNP",
    symbolimg: "/images/marka2.png",
    symbolname: "Boat",
  },
  {
    cid: 6,
    cimage: "/images/c3.png",
    cname: "Jahed Hasan",
    location: "Tangail 02",
    party: "Jamat-E-Islami",
    symbolimg: "/images/marka3.png",
    symbolname: "Hatpakha",
  },
];
