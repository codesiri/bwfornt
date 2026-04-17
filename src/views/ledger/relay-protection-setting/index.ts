import { MaintainPlanForm } from "@/api/maintenance/maintain-plan-api";

export type RelayProtectionSettingMaintenanceForm = MaintainPlanForm & {
  rpsRelayCode?: string;
};
