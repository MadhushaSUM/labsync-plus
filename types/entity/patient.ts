export interface PatientType {
    id?: number;
    name: string;
    dateOfBirth: Date;
    gender: "Male" | "Female" | "Other";
    contactNumber: string;
}