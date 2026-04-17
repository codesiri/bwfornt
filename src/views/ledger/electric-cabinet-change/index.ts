import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ElectricCabinetChangeMaintenanceForm = MaintainPlanForm & {
  eccChangeContent?: string;
};
