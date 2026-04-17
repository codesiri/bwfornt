import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ElectricCabinetRecordMaintenanceForm = MaintainPlanForm & {
  ecrInspectItem?: string;
};
