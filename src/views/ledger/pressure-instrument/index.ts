import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type DvPressureInstrumentMaintenanceForm = MaintainPlanForm & {
  pressureTag?: string;
};
