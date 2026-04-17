import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type LevelGaugeMaintenanceForm = MaintainPlanForm & {
  levelTag?: string;
};
