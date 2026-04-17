import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type RadiationInstrumentMaintenanceForm = MaintainPlanForm & {
  tagNumber?: string;
};
