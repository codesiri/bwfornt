import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type ElectricCabinetDocumentMaintenanceForm = MaintainPlanForm & {
  ecdDocName?: string;
};
