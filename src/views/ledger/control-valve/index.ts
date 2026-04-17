import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ControlValveMaintenanceForm = MaintainPlanForm & {
  tagNo?: string;
};
