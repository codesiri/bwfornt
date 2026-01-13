<template>
  <!-- 压力表单弹窗 -->
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
        <el-form-item label="位号" prop="pressureTag">
          <el-input v-model="formData.pressureTag" placeholder="位号" />
        </el-form-item>
        <el-form-item label="装置名称" prop="pressureDevice">
          <el-input v-model="formData.pressureDevice" placeholder="装置名称" />
        </el-form-item>

        <el-form-item label="设备名称" prop="pressureEquip">
          <el-input v-model="formData.pressureEquip" placeholder="设备名称" />
        </el-form-item>
        <el-form-item label="安装位置以及用途" prop="pressureLocation">
          <el-input
            v-model="formData.pressureLocation"
            type="textarea"
            placeholder="安装位置以及用途"
          />
        </el-form-item>

        <el-form-item label="规格型号" prop="pressureModel">
          <el-input v-model="formData.pressureModel" placeholder="规格型号" />
        </el-form-item>
        <el-form-item label="生产厂家" prop="pressureManu">
          <el-input v-model="formData.pressureManu" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="测量范围" prop="pressureRange">
          <el-input v-model="formData.pressureRange" placeholder="测量范围" />
        </el-form-item>

        <el-form-item label="精度" prop="pressureAccuracy">
          <el-input v-model="formData.pressureAccuracy" placeholder="精度" />
        </el-form-item>
        <el-form-item label="连接方式及规格" prop="pressureConnection">
          <el-input v-model="formData.pressureConnection" placeholder="连接方式及规格" />
        </el-form-item>

        <el-form-item label="电源（如 24V DC）" prop="pressurePower">
          <el-input v-model="formData.pressurePower" placeholder="电源（如 24V DC）" />
        </el-form-item>

        <el-form-item label="输出信号（如 4-20mA）" prop="pressureOutput">
          <el-input v-model="formData.pressureOutput" placeholder="输出信号（如 4-20mA）" />
        </el-form-item>
        <el-form-item label="是否伴热" prop="pressureHeat">
          <dict v-model="formData.pressureHeat" code="heat" />
        </el-form-item>
        <el-form-item label="是否带连锁" prop="pressureInterlock">
          <dict v-model="formData.pressureInterlock" code="interlocked" />
        </el-form-item>

        <el-form-item label="联锁设定值" prop="pressureInterlock_val">
          <el-input
            v-model="formData.pressureInterlockVal"
            :disabled="formData.pressureInterlock == 0"
            placeholder="联锁设定值"
          />
        </el-form-item>

        <el-form-item label="备注" prop="pressureRemark">
          <el-input v-model="formData.pressureRemark" placeholder="备注" />
        </el-form-item>
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
import { DvPressureInstrumentForm } from "@/api/ledger/pressure-instrument-api";
const visable = defineModel<boolean>("visable", { required: true });
const direction = ref<DrawerProps["direction"]>("rtl");
const formData = defineModel<DvPressureInstrumentForm>("formdata", { required: true });
const labelPosition = ref<FormProps["labelPosition"]>("right");

const dataFormRef = ref();
// 压力表单校验规则
const rules = reactive({
  pressureDevice: [{ required: true, message: "请输入装置名称", trigger: "blur" }],
  pressureTag: [{ required: true, message: "请输入位号", trigger: "blur" }],
  pressureEquip: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
});

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "confirm"): void;
  (e: "selectedRow", data: DvPressureInstrumentForm): void;
}>();

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
