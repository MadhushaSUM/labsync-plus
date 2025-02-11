import { DataEmptyTests, FlattenedDataEmptyTests, NormalRange } from "@/types/entity/investigation";
import { PDFGenerator } from "./pdfGenerator";
import { getRBSTemplate } from "./templates/RBS";
import { formatISO } from "date-fns";
import { calculateAge } from "../date-utils";
import { getFBSTemplate } from "./templates/FBS";
import { getPPBSTemplate } from "./templates/PPBS";
import { getOralGlucoseTemplate } from "./templates/OralGlucose";
import { getLipidProfileTemplate } from "./templates/LipidProfile";
import { getFBCTemplate } from "./templates/FBC";
import { getWBCDCTemplate } from "./templates/WBCDC";
import { getHBTemplate } from "./templates/HB";
import { getESRTemplate } from "./templates/ESR";
import { getCRPTemplate } from "./templates/CRP";
import { getUFRTemplate } from "./templates/UFR";
import { getOTPTTemplate } from "./templates/OTPT";
import { getSCalciumTemplate } from "./templates/SCalcium";
import { getSElectrolyteTemplate } from "./templates/SElectrolyte";
import { getSCholesterolTemplate } from "./templates/SCholesterol";
import { getRCholesterolTemplate } from "./templates/RCholesterol";
import { getSAlkPhosphataseTemplate } from "./templates/SAlkPhosphatase";
import { getSCreatinineTemplate } from "./templates/SCreatinine";
import { getEGFRTemplate } from "./templates/EGFR";
import { getRhFactorTemplate } from "./templates/RhFactor";
import { getUrineHCGTemplate } from "./templates/UrineHCG";
import { getDengueTestTemplate } from "./templates/DengueTest";
import { getLFTTemplate } from "./templates/LFT";
import { getSFRTemplate } from "./templates/SFR";
import { getBloodUreaTemplate } from "./templates/BloodUrea";
import { getSProteinsTemplate } from "./templates/SProteins";
import { getSBilirubinTemplate } from "./templates/SBilirubin";
import { getGammaGTTemplate } from "./templates/GammaGT";
import { getGlycoHbTemplate } from "./templates/GlycoHb";
import { getHIVTemplate } from "./templates/HIV";
import { getBloodGroupTemplate } from "./templates/BloodGroup";
import { getBloodSugarSeriesTemplate } from "./templates/BloodSugarSeries";
import { getUrineSugarTemplate } from "./templates/UrineSugar";
import { getCardiacTroponinTTemplate } from "./templates/CardiacTroponinT";
import { getCardiacTroponinITemplate } from "./templates/CardiacTroponinI";

export default async function pdfTemplateMapper(reportData: DataEmptyTests, normalRanges?: NormalRange[]) {
    const generator = new PDFGenerator({ width: 595, height: 842 });

    const flattenedTestData = await flattenTestData(reportData);

    let doc;
    switch (Number(reportData.testId)) {
        case 1:
            doc = await generator.generatePDF(
                getFBSTemplate(reportData.patientDOB, reportData.patientGender, normalRanges),
                flattenedTestData
            );
            break;
        case 2:
            doc = await generator.generatePDF(
                getRBSTemplate(reportData.patientDOB, reportData.patientGender, normalRanges),
                flattenedTestData
            );
            break;
        case 3:
            doc = await generator.generatePDF(
                getPPBSTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    reportData.data?.ppbsBfValue != null,
                    reportData.data?.ppbsLnValue != null,
                    reportData.data?.ppbsDnValue != null,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 4:
            doc = await generator.generatePDF(
                getOralGlucoseTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    reportData.data?.fbsValue != null,
                    reportData.data?.firstHourValue != null,
                    reportData.data?.secondHourValue != null,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 5:
            doc = await generator.generatePDF(
                getLipidProfileTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 6:
            doc = await generator.generatePDF(
                getFBCTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 7:
            doc = await generator.generatePDF(
                getWBCDCTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 8:
            doc = await generator.generatePDF(
                getHBTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 9:
            doc = await generator.generatePDF(
                getESRTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 10:
            doc = await generator.generatePDF(
                getCRPTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    reportData.data?.crp == 'Positive',
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 11:
            doc = await generator.generatePDF(
                getUFRTemplate(),
                flattenedTestData
            );
            break;
        case 12:
            doc = await generator.generatePDF(
                getOTPTTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 13:
            doc = await generator.generatePDF(
                getSCalciumTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 14:
            doc = await generator.generatePDF(
                getSElectrolyteTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 15:
            doc = await generator.generatePDF(
                getSCholesterolTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 16:
            doc = await generator.generatePDF(
                getRCholesterolTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 17:
            doc = await generator.generatePDF(
                getSAlkPhosphataseTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 18:
            doc = await generator.generatePDF(
                getSCreatinineTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 19:
            doc = await generator.generatePDF(
                getEGFRTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 20:
            doc = await generator.generatePDF(
                getUrineHCGTemplate(),
                flattenedTestData
            );
            break;
        case 21:
            doc = await generator.generatePDF(
                getDengueTestTemplate(),
                flattenedTestData
            );
            break;
        case 22:
            doc = await generator.generatePDF(
                getRhFactorTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    reportData.data?.rhFactor == 'Positive',
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 23:
            doc = await generator.generatePDF(
                getLFTTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 24:
            doc = await generator.generatePDF(
                getSFRTemplate(),
                flattenedTestData
            );
            break;
        case 25:
            doc = await generator.generatePDF(
                getBloodUreaTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 26:
            doc = await generator.generatePDF(
                getSProteinsTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 27:
            doc = await generator.generatePDF(
                getSBilirubinTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 28:
            doc = await generator.generatePDF(
                getGammaGTTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 29:
            doc = await generator.generatePDF(
                getGlycoHbTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 30:
            doc = await generator.generatePDF(
                getHIVTemplate(),
                flattenedTestData
            );
            break;
        case 31:
            doc = await generator.generatePDF(
                getBloodGroupTemplate(),
                flattenedTestData
            );
            break;
        case 32:
            doc = await generator.generatePDF(
                getBloodSugarSeriesTemplate(
                    reportData.patientDOB,
                    reportData.patientGender,
                    normalRanges
                ),
                flattenedTestData
            );
            break;
        case 33:
            doc = await generator.generatePDF(
                getUrineSugarTemplate(),
                flattenedTestData
            );
            break;
        case 34:
            doc = await generator.generatePDF(
                getCardiacTroponinTTemplate(),
                flattenedTestData
            );
            break;
        case 35:
            doc = await generator.generatePDF(
                getCardiacTroponinITemplate(),
                flattenedTestData
            );
            break;

        default:
            throw new Error(`Invalid investigation id ${reportData.testId}`);
    }

    generator.download(`${reportData.patientName}-${reportData.testName.replaceAll('/', '')}-${formatISO(reportData.date, { representation: 'date' })}.pdf`);
}

async function flattenTestData(test: DataEmptyTests): Promise<FlattenedDataEmptyTests> {
    const flattenedTest: FlattenedDataEmptyTests = { ...test };

    if (flattenedTest.data && typeof flattenedTest.data === 'object') {
        Object.entries(flattenedTest.data).forEach(([key, value]) => {
            if (key in flattenedTest && key !== 'data') {
                // If it exists, create a new key with a suffix to avoid collision
                let newKey = key;
                let counter = 1;
                while (newKey in flattenedTest) {
                    newKey = `${key}_${counter}`;
                    counter++;
                }
                flattenedTest[newKey] = value;
            } else {
                flattenedTest[key] = value;
            }
        });

        flattenedTest.patientAge = await calculateAge(test.patientDOB, test.options.preferred_age_format);
        flattenedTest.date = formatISO(test.date, { representation: "date" });
        delete flattenedTest.data;
    }

    return flattenedTest;
}