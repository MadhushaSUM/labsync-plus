
import { NormalRangeType } from "@/types/commonTypes";
import { PatientType } from "@/types/entity/patient";
import { calculateAge } from "./date-utils";
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns";
import { FormInstance } from "antd";
import { NormalRange, TestField } from "@/types/entity/investigation";

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

export const setFlag = (
    label: string,
    value: string,
    investigationFieldsResults: TestField[] | undefined,
    normalRangeRulesResults: NormalRange[] | undefined,
    patientDOB: Date,
    patientGender: string,
    form: FormInstance,
) => {
    const valueNum = Number(value);
    const fieldId = investigationFieldsResults?.find((item) => item.code == label)?.id;

    if (fieldId) {
        const normalRangeRules: any = normalRangeRulesResults?.find((item) => item.test_field_id == fieldId)?.rules;
        if (normalRangeRules) {
            for (const rule of normalRangeRules) {
                if (isWithinNormalRange(patientDOB, patientGender, rule))
                    if (rule.type == "range") {
                        if (valueNum > rule.valueUpper) {
                            form.setFieldValue(`${label}Flag`, 'High');
                        } else if (valueNum < rule.valueLower) {
                            form.setFieldValue(`${label}Flag`, 'Low');
                        } else {
                            form.setFieldValue(`${label}Flag`, null);
                        }
                    } else if (rule.type == "≥") {
                        if (valueNum < rule.valueLower) {
                            form.setFieldValue(`${label}Flag`, 'Low');
                        } else {
                            form.setFieldValue(`${label}Flag`, null);
                        }
                    } else {
                        if (valueNum > rule.valueUpper) {
                            form.setFieldValue(`${label}Flag`, 'High');
                        } else {
                            form.setFieldValue(`${label}Flag`, null);
                        }
                    }
                break;
            }
        }
    }
}

export const displayNormalRange = (
    label: string,
    investigationFieldsResults: TestField[] | undefined,
    normalRangeRulesResults: NormalRange[] | undefined,
    patientDOB: Date,
    patientGender: string,
) => {
    const fieldId = investigationFieldsResults?.find((item) => item.code == label)?.id;

    if (fieldId) {
        const normalRangeRules: any = normalRangeRulesResults?.find((item) => item.test_field_id == fieldId)?.rules;
        if (normalRangeRules) {
            for (const rule of normalRangeRules) {
                if (isWithinNormalRange(patientDOB, patientGender, rule)) {
                    if (rule.type == "range") {
                        return `${rule.valueLower} - ${rule.valueUpper}`;
                    } else if (rule.type == "≥") {
                        return `≥ ${rule.valueLower}`;
                    } else {
                        return `≤ ${rule.valueUpper}`;
                    }
                }
            }
        }
    }
}

export function findTheCorrectNormalRangeRule(
    normalRanges: NormalRange[] | undefined,
    testFieldId: number,
    patientDateOfBirth: Date,
    patientGender: string,
    unit: string
) {

    if (testFieldId == -1 || normalRanges == undefined) {
        return "";
    }

    const normalRangeRules: any = normalRanges.find((item) => item.test_field_id == testFieldId)?.rules;
    if (!normalRangeRules) {
        return "";
    }

    for (const rule of normalRangeRules) {
        if (isWithinNormalRange(patientDateOfBirth, patientGender, rule)) {
            if (rule.type == "range") {
                return `${rule.valueLower} - ${rule.valueUpper}`;
            } else if (rule.type == "≥") {
                return `>= ${rule.valueLower}`;
            } else {
                return `<= ${rule.valueUpper}`;
            }
        }
    }

    return "";
}