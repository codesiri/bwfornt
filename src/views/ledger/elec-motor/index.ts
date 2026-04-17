import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ElecMotorMaintenanceForm = MaintainPlanForm & {
  elecMotorTag?: string;
};
