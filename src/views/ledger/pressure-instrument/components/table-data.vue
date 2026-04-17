<template>
  <el-table
    ref="dataTableRef"
    v-loading="loading"
    :data="pageData"
    highlight-current-row
    label-width="auto"
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      key="pressureTag"
      label="位号"
      prop="pressureTag"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureDevice"
      label="装置名称"
      prop="pressureDevice"
      min-width="150"
      align="center"
    />

    <el-table-column
      key="pressureLocation"
      label="安装位置以及用途"
      prop="pressureLocation"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureEquip"
      label="设备名称"
      prop="pressureEquip"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureModel"
      label="规格型号"
      prop="pressureModel"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureManu"
      label="生产厂家"
      prop="pressureManu"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureRange"
      label="测量范围"
      prop="pressureRange"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureConnection"
      label="连接方式及规格"
      prop="pressureConnection"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureAccuracy"
      label="精度"
      prop="pressureAccuracy"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressurePower"
      label="电源（如 24V DC）"
      prop="pressurePower"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureOutput"
      label="输出信号（如 4-20mA）"
      prop="pressureOutput"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureHeat"
      label="是否伴热（是 / 否）"
      prop="pressureHeat"
      min-width="150"
      align="center"
    >
      <template #default="scope">
        <DictLabel v-model="scope.row.pressureHeat" code="heat" />
      </template>
    </el-table-column>
    <el-table-column
      key="pressureInterlock"
      label="是否带连锁"
      prop="pressureInterlock"
      min-width="150"
      align="center"
    >
      <template #default="scope">
        <DictLabel v-model="scope.row.pressureInterlock" code="interlocked" />
      </template>
    </el-table-column>
    <el-table-column
      key="pressureInterlockVal"
      label="联锁设定值"
      prop="pressureInterlockVal"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="pressureRemark"
      label="备注"
      prop="pressureRemark"
      min-width="150"
      align="center"
    />
    <el-table-column fixed="right" label="操作" width="220">
      <template #default="scope">
        <el-button
          v-hasPerm="['ledger:pressure-instrument:edit']"
          type="primary"
          size="small"
          link
          icon="edit"
          @click="editDv(scope)"
        >
          编辑
        </el-button>
        <el-button
          v-hasPerm="['ledger:pressure-instrument:delete']"
          type="danger"
          size="small"
          link
          icon="delete"
        >
          删除
        </el-button>
        <el-button
          v-hasPerm="['ledger:pressure-instrument:repair']"
          type="warning"
          size="small"
          link
          icon="promotion"
          @click="repairDv(scope)"
        >
          报修
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {
  DvPressureInstrumentPageVO,
  DvPressureInstrumentForm,
} from "@/api/ledger/pressure-instrument-api";
import DictLabel from "@/components/Dict/DictLabel.vue";

const pageData = defineModel<DvPressureInstrumentPageVO[]>("pageData", {
  required: true,
});

const loading = defineModel<boolean>("loading", {
  required: true,
});

const emit = defineEmits(["handleSelectionChange", "edit", "detail", "repair"]);

const handleSelectionChange = (selection: any) => {
  emit("handleSelectionChange", [selection]);
};
const editDv = (data: DvPressureInstrumentForm) => {
  emit("edit", [data]);
};
const detailDv = (data: DvPressureInstrumentPageVO) => {
  emit("detail", [data]);
};
const repairDv = (scope: any) => {
  emit("repair", [scope.row]);
};
//获取字典数据
</script>

<style></style>
