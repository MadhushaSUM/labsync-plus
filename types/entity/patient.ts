import { SearchBoxItem } from "../commonTypes";

export interface PatientType extends SearchBoxItem{
    id?: number;
    name: string;
    dateOfBirth: Date;
    gender: "Male" | "Female" | "Other";
    contactNumber: string;
}