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
    <el-table-column key="tagNumber" label="位号" prop="tagNumber" min-width="150" align="center" />
    <el-table-column
      key="deviceName"
      label="装置名称"
      prop="deviceName"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="deviceNameSuffix"
      label="设备名称"
      prop="deviceNameSuffix"
      min-width="150"
      align="center"
    />
    <el-table-column key="dvType" label="设备类型" prop="dvType" min-width="150" align="center" />
    <el-table-column key="status" label="设备状态" prop="status" min-width="150" align="center">
      <template #default="scope">
        <DictLabel v-model="scope.row.status" code="status" />
      </template>
    </el-table-column>

    <el-table-column
      key="interlocked"
      label="是否带连锁"
      prop="interlocked"
      min-width="150"
      align="center"
    >
      <template #default="scope">
        <DictLabel v-model="scope.row.interlocked" code="interlocked" />
      </template>
    </el-table-column>
    <el-table-column
      key="interlockSetValue"
      label="联锁设定值"
      prop="interlockSetValue"
      min-width="150"
      align="center"
    />

    <el-table-column
      key="installationLocationAndPurpose"
      label="安装位置以及用途"
      prop="installationLocationAndPurpose"
      min-width="150"
      align="center"
    />

    <el-table-column
      key="indexNumber"
      label="分度号"
      prop="indexNumber"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="specificationModel"
      label="规格型号"
      prop="specificationModel"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="manufacturer"
      label="生产厂家"
      prop="manufacturer"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="measurementRange"
      label="测量范围"
      prop="measurementRange"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="insertionDepth"
      label="插入深度"
      prop="insertionDepth"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="connectionMethodAndSpecifications"
      label="连接方式及规格"
      prop="connectionMethodAndSpecifications"
      min-width="150"
      align="center"
    />
    <el-table-column key="precision" label="精度" prop="precision" min-width="150" align="center" />
    <el-table-column
      key="casingSpecificationsAndMaterial"
      label="套管规格和及材质"
      prop="casingSpecificationsAndMaterial"
      min-width="150"
      align="center"
    />

    <el-table-column key="remark" label="备注" prop="remark" min-width="150" align="center" />
    <el-table-column fixed="right" label="操作" width="220">
      <template #default="scope">
        <el-button
          v-hasPerm="['ledger:dv-temperature-gauge:edit']"
          type="primary"
          size="small"
          link
          icon="edit"
          @click="detailDv(scope)"
        >
          详情
        </el-button>
        <el-button
          v-hasPerm="['ledger:dv-temperature-gauge:edit']"
          type="primary"
          size="small"
          link
          icon="edit"
          @click="editDv(scope)"
        >
          编辑
        </el-button>
        <el-button
          v-hasPerm="['ledger:dv-temperature-gauge:delete']"
          type="danger"
          size="small"
          link
          icon="delete"
          @click="deleteDv(scope)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {
  DvTemperatureGaugePageVO,
  DvTemperatureGaugeForm,
} from "@/api/ledger/dv-temperature-gauge-api";

const pageData = defineModel<DvTemperatureGaugePageVO[]>("pageData", {
  required: true,
});

const loading = defineModel<boolean>("loading", {
  required: true,
});

const emit = defineEmits(["handleSelectionChange", "edit", "detail", "delete"]);

const handleSelectionChange = (selection: any) => {
  emit("handleSelectionChange", [selection]);
};
const editDv = (data: DvTemperatureGaugeForm) => {
  emit("edit", [data]);
};
const detailDv = (data: DvTemperatureGaugePageVO) => {
  emit("detail", [data]);
};
const deleteDv = (data: DvTemperatureGaugeForm) => {
  emit("delete", [data]);
};
//获取字典数据
</script>

<style></style>
