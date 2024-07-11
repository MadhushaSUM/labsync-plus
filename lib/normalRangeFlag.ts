
import { NormalRangeType } from "@/types/commonTypes";
import { PatientType } from "@/types/entity/patient";
import { calculateAge } from "./date-utils";

export function getNormalRangeFlag(
    patient: PatientType,
    normalRangeDataArr: NormalRangeType[],
    field: string,
    value: number,
    // setFlags: React.Dispatch<React.SetStateAction<any>>
) {

    const patientAge = Number(calculateAge(patient.dateOfBirth).slice(0, -5));

    const patientGender = patient.gender;

    const suitableProfile = normalRangeDataArr.find(
        profile =>
        (
            profile.ageLowerBound < patientAge &&
            profile.ageUpperBound >= patientAge &&
            profile.genders.includes(patientGender)
        )
    );

    let flag = "";

    if (suitableProfile) {
        if (suitableProfile.valueLowerBound > value) {
            flag = "Low";
        } else if (suitableProfile.valueUpperBound < value) {
            flag = "High";
        } else {
            flag = "Normal";
        }
    } else {
        flag = "";
    }

    return flag;

    // setFlags((prevFlags: any) => ({
    //     ...prevFlags,
    //     [field]: flag
    // }));    
}