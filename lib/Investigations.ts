import { InvestigationType } from "@/types/entity/investigation";

export const investigations: InvestigationType[] = [
    {
        id: 1,
        code: "fbc",
        name: "Fasting blood sugar",
        specimen: "Blood"
    },
    {
        id: 2,
        code: "serum_calcium",
        name: "Serum calcium",
        specimen: "Blood"
    },
    {
        id: 3,
        code: "lipid_profile",
        name: "Lipid profile",
        specimen: "Blood"
    },
    {
        id: 4,
        code: "ufr",
        name: "Urine full report",
        specimen: "Urine"
    },
    {
        id: 5,
        code: "fbc",
        name: "Full blood count",
        specimen: "Blood"
    },
];

export const investigationFields: {
    investigationId: number;
    fields: {
        code: string;
        name: string;
    }[];
}[] = [
        {
            investigationId: 1,
            fields: [
                {
                    code: "fbsValue",
                    name: "FBS value"
                }
            ]
        },
        {
            investigationId: 2,
            fields: [
                {
                    code: "totalCalcium",
                    name: "Total calcium"
                },
                {
                    code: "ionizedCalcium",
                    name: "Ionized calcium"
                }
            ]
        },
        {
            investigationId: 3,
            fields: [
                {
                    code: "totalCholesterol",
                    name: "Total cholesterol"
                },
                {
                    code: "hdlCholesterol",
                    name: "HDL cholesterol"
                },
                {
                    code: "triglycerides",
                    name: "Triglycerides"
                },
                {
                    code: "ldlCholesterol",
                    name: "LDL holesterol"
                },
                {
                    code: "vldlCholesterol",
                    name: "VLDL cholesterol"
                },
                {
                    code: "totalCholToHdl",
                    name: "Total cholesterol to HDL cholesterol ratio"
                }
            ]
        },
        {
            investigationId: 5,
            fields: [
                {
                    code: "wbcCount",
                    name: "WBC count"
                },
                {
                    code: "neutrophils",
                    name: "Neutrophils"
                },
                {
                    code: "lymphocytes",
                    name: "Lymphocytes"
                },
                {
                    code: "eosinophils",
                    name: "Eosinophils"
                },
                {
                    code: "monocytes",
                    name: "Monocytes"
                },
                {
                    code: "basophils",
                    name: "Basophils"
                },
                {
                    code: "haemoglobin",
                    name: "Haemoglobin"
                },
                {
                    code: "rbcCount",
                    name: "RBC count"
                },
                {
                    code: "pcv",
                    name: "PCV"
                },
                {
                    code: "mcv",
                    name: "MCV"
                },
                {
                    code: "mch",
                    name: "MCH"
                },
                {
                    code: "mchc",
                    name: "MCHC"
                }
            ]
        }
    ];