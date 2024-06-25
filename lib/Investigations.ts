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
        name: "Serum Calcium",
        specimen: "Blood"
    },
    // {
    //     id: 3,
    //     code: "ufr",
    //     name: "Urine full report",
    //     specimen: "Urine"
    // },
]