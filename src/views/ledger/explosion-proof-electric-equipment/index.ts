import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ExplosionProofElectricEquipmentMaintenanceForm = MaintainPlanForm & {
  equipmentCode?: string;
};
