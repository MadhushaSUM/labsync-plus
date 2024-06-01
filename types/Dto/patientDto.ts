import { PatientType } from "../entity/patient"

export interface PatientRequestDtoType {
    limit: number,
    skip: number
}

export interface PatientResponseDtoType {
    data: PatientType[]
}