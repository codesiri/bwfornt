<template>
  <el-drawer
    v-model="visableDrawer"
    :close-on-click-modal="false"
    :modal="true"
    :resizable="true"
    :size="'50%'"
    :with-header="false"
  >
    <el-form :inline="true">
      <el-form-item label="位号">{{ dvData?.tagNumber }}</el-form-item>
      <el-form-item label="设备名称">
        {{ dvData?.deviceName }}
      </el-form-item>
      <el-form-item label="装置名称">{{ dvData?.deviceNameSuffix }}</el-form-item>
      <el-form-item label="生产厂商">{{ dvData?.manufacturer }}</el-form-item>
      <el-form-item label=""></el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">关闭</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { DvTemperatureGaugePageVO } from "@/api/ledger/dv-temperature-gauge-api";
const visableDrawer = defineModel<boolean>("visable", { required: true });
const dvData = defineModel<DvTemperatureGaugePageVO>("pageData");
const emit = defineEmits(["close"]);
const cancelClick = () => {
  emit("close");
};
</script>

<style lang="scss" scoped></style>
