import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type AnalyInstrumentMaintenanceForm = MaintainPlanForm & {
  analyInstrumentCode?: string;
};
