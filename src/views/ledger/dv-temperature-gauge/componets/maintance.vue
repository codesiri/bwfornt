<template>
  <!-- 温度表单弹窗 -->
  <el-drawer
    v-model="visable"
    :close-on-click-modal="false"
    :modal="true"
    :resizable="true"
    :size="'50%'"
    :direction="direction"
    :with-header="false"
  >
    <template #header>
      <h4>编辑</h4>
    </template>
    <template #default>
      <el-form
        ref="dataFormRef"
        :label-position="labelPosition"
        label-width="auto"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="位号" prop="tagNumber">
          <el-input v-model="formData.tagNumber" :disabled="true" placeholder="位号" />
        </el-form-item>
        <el-form-item label="计划类型" prop="maintainPlanType">
          <el-input v-model="formData.maintainPlanType" placeholder="计划类型" />
        </el-form-item>
        <el-form-item label="计划年度" prop="maintainPlanYear">
          <el-input v-model="formData.maintainPlanYear" placeholder="计划年度" />
        </el-form-item>

        <el-form-item label="计划月份" prop="deviceNameSuffix">
          <el-input v-model="formData.maintainPlanMonth" placeholder="计划月份" />
        </el-form-item>
        <el-form-item label="设备编号" prop="maintainPlanEquipCode">
          <el-input v-model="formData.maintainPlanEquipCode" placeholder="设备编号" />
        </el-form-item>
        <el-form-item label="设备名称" prop="maintainPlanEquipName">
          <el-input v-model="formData.maintainPlanEquipName" placeholder="设备名称" />
        </el-form-item>
        <el-form-item label="设备类型" prop="maintainPlanEquipType">
          <el-input v-model="formData.maintainPlanEquipType" placeholder="设备类型" />
        </el-form-item>

        <el-form-item label="维修/检修内容" prop="maintainPlanContent">
          <el-input
            v-model="formData.maintainPlanContent"
            type="textarea"
            placeholder="维修/检修内容"
          />
        </el-form-item>

        <!-- <el-form-item label="计划执行日期" prop="maintainPlanScheduleDate">
          <el-input v-model="formData.maintainPlanScheduleDate" placeholder="计划执行日期" />
        </el-form-item> -->

        <el-form-item label="计划时长" prop="maintainPlanDuration">
          <el-input v-model="formData.maintainPlanDuration" placeholder="计划时长" />
        </el-form-item>

        <el-form-item label="负责部门" prop="maintainPlanDept">
          <el-input v-model="formData.maintainPlanDept" placeholder="负责部门" />
        </el-form-item>

        <el-form-item label="负责人" prop="maintainPlanPerson">
          <el-input v-model="formData.maintainPlanPerson" placeholder="负责人" />
        </el-form-item>

        <el-form-item label="安全风险等级" prop="maintainPlanSafetyLevel">
          <el-input v-model="formData.maintainPlanSafetyLevel" placeholder="安全风险等级" />
        </el-form-item>

        <el-form-item label="安全防护措施" prop="maintainPlanSafetyMeasure">
          <el-input v-model="formData.maintainPlanSafetyMeasure" placeholder="安全防护措施" />
        </el-form-item>

        <el-form-item label="计划状态" prop="maintainPlanStatus">
          <el-input v-model="formData.maintainPlanStatus" placeholder="计划状态 " />
        </el-form-item>

        <!-- <el-form-item label="实际执行日期" prop="maintainPlanActualDate ">
          <el-input v-model="formData.maintainPlanActualDate" placeholder="实际执行日期" />
        </el-form-item> -->
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { DrawerProps, FormProps } from "element-plus";
import { DvTemperatureGaugeForm } from "@/api/ledger/dv-temperature-gauge-api";
import { DvTemperatureGaugeMaintenanceForm } from "@/views/ledger/dv-temperature-gauge";
const visable = defineModel<boolean>("visable", { required: true });
const direction = ref<DrawerProps["direction"]>("rtl");
const formData = defineModel<DvTemperatureGaugeMaintenanceForm>("formdata", { required: true });
const labelPosition = ref<FormProps["labelPosition"]>("right");
const tableSelectRef = ref();
const popoverWidth = ref<string>("100%");
const dataFormRef = ref();
// 温度表单校验规则
const rules = reactive({
  deviceName: [{ required: true, message: "请输入装置名称", trigger: "blur" }],
  tagNumber: [{ required: true, message: "请输入位号", trigger: "blur" }],
  deviceNameSuffix: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  dvType: [{ requried: true, message: "请选择设备类型", trigger: "blur" }],
});

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "confirm"): void;
  (e: "selectedRow", data: DvTemperatureGaugeForm): void;
}>();

useResizeObserver(tableSelectRef, (entries) => {
  popoverWidth.value = `${entries[0].contentRect.width + entries[1].contentRect.width + entries[2].contentRect.width}px`;
});
const cancelClick = () => {
  emit("cancel");
};

const confirmClick = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (valid) {
      emit("confirm");
      dataFormRef.value.resetFields();
    }
  });
};
</script>

<style scoped lang="scss">
.reference :deep(.el-input__wrapper),
.reference :deep(.el-input__inner) {
  cursor: pointer;
}
.feedback {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
}
</style>
