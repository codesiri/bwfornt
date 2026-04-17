import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type GroundSystemEquipmentMaintenanceForm = MaintainPlanForm & {
  gseGroundCode?: string;
};
