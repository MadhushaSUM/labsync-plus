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

export const FullBloodCountFormSchema = z.object({
    wbcCount: z.number(),
    neutrophils: z.number().min(0).max(100),
    lymphocytes: z.number().min(0).max(100),
    eosinophils: z.number().min(0).max(100),
    monocytes: z.number().min(0).max(100),
    basophils: z.number().min(0).max(100),
    haemoglobin: z.number(),
    rbcCount: z.number(),
    pcv: z.number(),
    mcv: z.number(),
    mch: z.number(),
    mchc: z.number(),
    plateletCount: z.number(),
    wbcCountFlag: z.string(),
    neutrophilsFlag: z.string(),
    lymphocytesFlag: z.string(),
    eosinophilsFlag: z.string(),
    monocytesFlag: z.string(),
    basophilsFlag: z.string(),
    haemoglobinFlag: z.string(),
    rbcCountFlag: z.string(),
    pcvFlag: z.string(),
    mcvFlag: z.string(),
    mchFlag: z.string(),
    mchcFlag: z.string(),
    plateletCountFlag: z.string(),
});