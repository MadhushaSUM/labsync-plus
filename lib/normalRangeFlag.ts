
import { NormalRangeType } from "@/types/commonTypes";
import { PatientType } from "@/types/entity/patient";
import { calculateAge } from "./date-utils";
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns";

export function getNormalRangeFlag(
    patient: PatientType,
    normalRangeDataArr: NormalRangeType[],
    field: string,
    value: number,
    // setFlags: React.Dispatch<React.SetStateAction<any>>
) {

    const patientAge = Number(calculateAge(patient.date_of_birth).slice(0, -5));

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

export function isWithinNormalRange(patientDOB: Date, patientGender: string, normalRange: any) {
    const now = new Date();

    const ageYears = differenceInYears(now, patientDOB);
    const ageMonths = differenceInMonths(now, patientDOB) % 12;
    const ageDays = differenceInDays(now, patientDOB) % 30;

    const ageLowerInDays =
        normalRange.ageLower.y * 365 +
        normalRange.ageLower.m * 30 +
        normalRange.ageLower.d;
    const ageUpperInDays =
        normalRange.ageUpper.y * 365 +
        normalRange.ageUpper.m * 30 +
        normalRange.ageUpper.d;

    const patientAgeInDays = ageYears * 365 + ageMonths * 30 + ageDays;

    const isAgeWithinRange =
        patientAgeInDays >= ageLowerInDays && patientAgeInDays <= ageUpperInDays;

    const isGenderValid = normalRange.gender.includes(patientGender);

    return isAgeWithinRange && isGenderValid;
}