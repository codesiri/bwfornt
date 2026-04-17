import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ElectricLightEquipmentMaintenanceForm = MaintainPlanForm & {
  eleLightCode?: string;
};
