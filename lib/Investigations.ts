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
]