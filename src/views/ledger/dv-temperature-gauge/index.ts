import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type DvTemperatureGaugeMaintenanceForm = MaintainPlanForm & {
  tagNumber?: string;
};
