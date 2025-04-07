export interface VoterData {
  usertype: string;
  userlocation: string;
  votingstatus: string;
  name: string;
  fathersname: string;
  mothersname: string;
  dob: string;
  nid: string;
}
export const Voters: VoterData[] = [
  {
    usertype: "Voter",
    userlocation: "Tangail 02",
    votingstatus: "NOT DONE",
    name: "Md. Numanur Rahman",
    fathersname: "Md. Habibur Rahman",
    mothersname: "Parvin Begum",
    dob: "01 Aug 2002",
    nid: "123456789",
  },
];
