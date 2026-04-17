import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ElectricCabinetMainComponentMaintenanceForm = MaintainPlanForm & {
  ecmComponentName?: string;
};
