import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type TnkMeterMaintenanceForm = MaintainPlanForm & {
  tnkMeterTag?: string;
};
