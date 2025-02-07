
export interface NormalRangeType {
    id?: string;
    genders: ("Male" | "Female" | "Other")[],
    ageLowerBound: number,
    ageUpperBound: number,
    valueLowerBound: number,
    valueUpperBound: number
}