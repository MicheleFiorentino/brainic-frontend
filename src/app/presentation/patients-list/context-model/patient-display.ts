import { Patient } from "src/app/interfaces/patient";

export interface PatientDisplay extends Patient{
  avatarImage: string;
  countryFlagPath: string;
}
