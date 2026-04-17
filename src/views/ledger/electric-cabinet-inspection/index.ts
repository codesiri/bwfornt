import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ElectricCabinetInspectionMaintenanceForm = MaintainPlanForm & {
  eciInspectItem?: string;
};
