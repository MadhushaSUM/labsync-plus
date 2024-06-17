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
        code: "crp",
        name: "C. Reactive protein",
        specimen: "Blood"
    },
]