import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ElectricCabinetSparePartMaintenanceForm = MaintainPlanForm & {
  ecspPartName?: string;
};
