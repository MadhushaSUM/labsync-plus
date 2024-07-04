import { NormalRangesDto } from "@/types/commonTypes";

export const fbsNormalRanges: NormalRangesDto = {
    investigationId: 1,
    data: [
        {
            fieldName: "fbsValue",
            normalRanges: [
                {
                    genders: ["Male", "Female"],
                    ageLowerBound: 0,
                    ageUpperBound: 120,
                    valueLowerBound: 75.0,
                    valueUpperBound: 120.0
                },
            ]
        },
    ]
}

export const serumCalciumNormalRanges: NormalRangesDto = {
    investigationId: 2,
    data: [
        {
            fieldName: "totalCalcium",
            normalRanges: [
                {
                    genders: ["Male", "Female"],
                    ageLowerBound: 0,
                    ageUpperBound: 120,
                    valueLowerBound: 2.2,
                    valueUpperBound: 2.6
                },
            ]
        },
        {
            fieldName: "ionizedCalcium",
            normalRanges: [
                {
                    genders: ["Male", "Female"],
                    ageLowerBound: 0,
                    ageUpperBound: 120,
                    valueLowerBound: 1.1,
                    valueUpperBound: 1.3
                },
            ]
        },
    ]
}

export const fbcNormalRanges: NormalRangesDto = {
    investigationId: 5,
    data: []
}