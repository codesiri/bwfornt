import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type SwitchValveMaintenanceForm = MaintainPlanForm & {
  switchValveTag?: string;
};
