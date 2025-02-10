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
    3: LipidProfileForm,
    4: UFRForm,
    5: CRPForm,
    6: ESRForm,
    7: OTPTForm,
    8: HCGForm,
    9: DengueTestForm,
    10: HBForm,
    11: WBCDCForm,
    12: RHFactorForm,
    13: SCalciumForm,
    14: SElectrolyteForm,
    15: OralGlucoseForm,
    16: PPBSForm,
    17: SFRForm,
    18: LFTForm,
    19: SCreatinineForm,
    20: BloodUreaForm,
    21: SProteinsForm,
    22: BilirubinForm,
    23: SAlkPhosphataseForm,
    24: SCholesterolForm,
    25: GammaGTForm,
    26: FBCForm,
    27: EGFRForm,
    28: GlycosilatedHBForm,
    29: HIVForm,
    30: BloodGroupForm,
    31: BloodSugarProfileForm,
    32: UrineSugarForm,
    33: CardiacTroponinTForm,
    34: CardiacTroponinIForm,
    35: RCholesterolForm,
};

export default formMapper;
