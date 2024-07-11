import { InvestigationType } from "./investigation";
import { InvestigationRegisterType } from "./investigationRegister";

export interface investigationData {
    id: number;
    investigation: InvestigationType;
    investigationRegister: InvestigationRegisterType;
    data: any;
}