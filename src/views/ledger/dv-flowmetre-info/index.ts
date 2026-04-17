import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type DvFlowmetreInfoMaintenanceForm = MaintainPlanForm & {
  tagNumber?: string;
};
