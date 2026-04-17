import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ElectricCabinetMaintenanceMaintenanceForm = MaintainPlanForm & {
  ecmMaintainPerson?: string;
};
