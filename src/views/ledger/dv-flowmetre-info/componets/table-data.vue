<template>
  <el-table
    ref="dataTableRef"
    v-loading="loading"
    :data="pageData"
    highlight-current-row
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column label="序号" width="80" align="center">
      <template #default="scope">
        {{ (props.pageNum - 1) * props.pageSize + scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column
      key="tagNumber"
      label="仪表位号"
      prop="tagNumber"
      min-width="150"
      align="center"
    />
    <el-table-column key="device" label="装置" prop="device" min-width="150" align="center" />
    <el-table-column key="purpose" label="用途" prop="purpose" min-width="150" align="center" />
    <el-table-column
      key="instrumentName"
      label="仪表名称"
      prop="instrumentName"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="measurementRange"
      label="量程"
      prop="measurementRange"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="manufacturer"
      label="厂家"
      prop="manufacturer"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="medium"
      label="工艺介质-介质"
      prop="medium"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="mediumStatus"
      label="工艺介质-状态"
      prop="mediumStatus"
      min-width="150"
      align="center"
    >
      <template #default="scope">
        <DictLabel v-model="scope.row.mediumStatus" code="craft-status" />
      </template>
    </el-table-column>

    <el-table-column
      key="mediumPressure"
      label="工艺介质-压力"
      prop="mediumPressure"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="mediumTemperature"
      label="工艺介质-温度"
      prop="mediumTemperature"
      min-width="150"
      align="center"
    />
    <el-table-column
      key="factoryNumber"
      label="出厂编号"
      prop="factoryNumber"
      min-width="150"
      align="center"
    />
    <el-table-column key="remark" label="备注" prop="remark" min-width="150" align="center" />
    <el-table-column label="设备状态" width="150" align="center">
      <template #default="scope">
        <DictLabel v-model="scope.row.status" code="status" />
      </template>
    </el-table-column>
    <el-table-column key="dvType" label="设备类型" prop="dvType" min-width="150" align="center" />
    <el-table-column fixed="right" label="操作" width="220">
      <template #default="scope">
        <el-button
          v-hasPerm="['ledger:dv-flowmetre-info:edit']"
          type="primary"
          size="small"
          link
          icon="edit"
          @click="handleOpenDialog(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-hasPerm="['ledger:dv-flowmetre-info:repair']"
          type="warning"
          size="small"
          link
          icon="tools"
          @click="handleRepair(scope.row)"
        >
          报修
        </el-button>
        <el-button
          v-hasPerm="['ledger:dv-flowmetre-info:delete']"
          type="danger"
          size="small"
          link
          icon="delete"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { DvFlowmetreInfoPageVO } from "@/api/ledger/dv-flowmetre-info-api";

const loading = defineModel<boolean>("loading");
const pageData = defineModel<DvFlowmetreInfoPageVO[]>("pageData");

interface Props {
  pageNum?: number;
  pageSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  pageNum: 1,
  pageSize: 10
});

const emit = defineEmits(["edit", "delete", "repair", "handleSelectionChange"]);
const handleOpenDialog = (data: any) => {
  emit("edit", [data]);
};

const handleDelete = (data: any) => {
  emit("delete", [data]);
};

const handleRepair = (data: any) => {
  emit("repair", [data]);
};

const handleSelectionChange = (selection: any) => {
  emit("handleSelectionChange", selection);
};
</script>

<style lang="scss"></style>
