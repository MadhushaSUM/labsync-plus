import CRPForm from "./CRPForm";
import DengueTestForm from "./DengueTestForm";
import ESRForm from "./ESRForm";
import FBCForm from "./FBCForm";
import FBSForm from "./FBSForm";
import HBForm from "./HBForm";
import HCGForm from "./HCGForm";
import LipidProfileForm from "./LipidProfileForm";
import OTPTForm from "./OTPTForm";
import RHFactorForm from "./RHFactorForm";
import SCalciumForm from "./SCalcium";
import UFRForm from "./UFRForm";
import WBCDCForm from "./WBCDCForm";
import SElectrolyteForm from "./SElectrolytes";
import OralGlucoseForm from "./OralGlucoseForm";
import PPBSForm from "./PPBSForm";
import SFRForm from "./SFRForm";
import LFTForm from "./LFTForm";
import SCreatinineForm from "./SCreatinineForm";
import BloodUreaForm from "./BloodUreaForm";
import SProteinsForm from "./SProteinsForm";
import BilirubinForm from "./BilirubinForm";
import SAlkPhosphataseForm from "./SAlkPhosphataseForm";
import SCholesterolForm from "./SCholesterol";
import GammaGTForm from "./GammaGTForm";
import RBSForm from "./RBSForm";
import EGFRForm from "./EGFRForm";
import GlycosilatedHBForm from "./GlycosilatedHBForm";
import HIVForm from "./HIVForm";
import BloodGroupForm from "./BloodGroupForm";
import BloodSugarProfileForm from "./BloodSugarProfile";
import UrineSugarForm from "./UrineSugarForm";
import CardiacTroponinTForm from "./CardiacTroponinTForm";
import CardiacTroponinIForm from "./CardiacTroponinIForm";
import RCholesterolForm from "./rCholesterolForm";
import { DataEmptyTests } from "@/types/entity/investigation";


const formMapper: { [key: number]: React.ComponentType<{ data: DataEmptyTests, clearScreen: (testRegisterId: number, testId: number) => void }> } = {
    1: FBSForm,
    2: RBSForm,
    3: PPBSForm,
    4: OralGlucoseForm,
    5: LipidProfileForm,
    6: FBCForm,
    7: WBCDCForm,
    8: HBForm,
    9: ESRForm,
    10: CRPForm,
    11: UFRForm,
    12: OTPTForm,
    13: SCalciumForm,
    14: SElectrolyteForm,
    15: SCholesterolForm,
    16: RCholesterolForm,
    17: SAlkPhosphataseForm,
    18: SCreatinineForm,
    19: EGFRForm,
    20: HCGForm,
    21: DengueTestForm,
    22: RHFactorForm,
    23: LFTForm,
    24: SFRForm,
    25: BloodUreaForm,
    26: SProteinsForm,
    27: BilirubinForm,
    28: GammaGTForm,
    29: GlycosilatedHBForm,
    30: HIVForm,
    31: BloodGroupForm,
    32: BloodSugarProfileForm,
    33: UrineSugarForm,
    34: CardiacTroponinTForm,
    35: CardiacTroponinIForm,
};

export default formMapper;
