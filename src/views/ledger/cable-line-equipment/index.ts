import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type CableLineEquipmentMaintenanceForm = MaintainPlanForm & {
  cleCableCode?: string;
};
