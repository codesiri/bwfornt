import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type UnitSpecialInstrumentsMaintenanceForm = MaintainPlanForm & {
  tagNumber?: string;
};
