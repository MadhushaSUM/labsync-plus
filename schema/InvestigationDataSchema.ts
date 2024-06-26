import { epithelialCellsOptions } from "@/components/investigation-forms/UFRChoices";
import { z } from "zod";

export const FBSFormSchema = z.object({
    fbsValue: z.number(),
    fbsValueFlag: z.string()
});

export const SerumCalciumFormSchema = z.object({
    totalCalcium: z.number(),
    totalCalciumFlag: z.string(),
    ionizedCalcium: z.number(),
    ionizedCalciumFlag: z.string()
});

export const LipidProfileFormSchema = z.object({
    totalCholesterol: z.number(),
    hdlCholesterol: z.number(),
    triglycerides: z.number(),
    ldlCholesterol: z.number(),
    vldlCholesterol: z.number(),
    totalCholToHdl: z.number(),
    totalCholesterolFlag: z.string(),
    hdlCholesterolFlag: z.string(),
    triglyceridesFlag: z.string(),
    ldlCholesterolFlag: z.string(),
    vldlCholesterolFlag: z.string(),
});

export const UrineFullReportFormSchema = z.object({
    colour: z.string(),
    appearance: z.string(),
    reaction: z.string(),
    albumin: z.string(),
    reducingSubs: z.string(),
    bile: z.string(),
    urobilinogen: z.string(),
    pusCells: z.string(),
    redCells: z.string(),
    epithelialCells: z.string(),
    casts: z.string(),
    crystals: z.string(),
    organisms: z.string(),
});