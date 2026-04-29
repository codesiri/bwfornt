<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item class="search-buttons" label="位号">
          <el-input v-model="queryParams.tagNumber" placeholder="请输入位号"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="queryParams.dvName" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备状态">
          <dict v-model="queryParams.status" code="status" />
        </el-form-item>

        <el-form-item class="search-buttons">
          <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
          <el-button icon="refresh" @click="handleResetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="data-table__toolbar">
        <div class="data-table__toolbar--actions">
          <el-button
            v-hasPerm="['ledger:dv-temperature-gauge:add']"
            type="success"
            icon="plus"
            @click="openDrawer('add')"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:dv-temperature-gauge:delete']"
            type="danger"
            icon="delete"
            :disabled="removeIds.length === 0"
            @click="handleBatchDelete"
          >
            批量删除
          </el-button>
        </div>

        <div class="data-table__toolbar--tools">
          <el-button
            v-hasPerm="'ledger:pressure-instrument:import'"
            icon="upload"
            @click="handleOpenImportDialog"
          >
            导入
          </el-button>

          <el-button
            v-hasPerm="'ledger:pressure-instrument:export'"
            icon="download"
            @click="handleExport"
          >
            导出
          </el-button>
        </div>
      </div>

      <table-data
        :loading="loading"
        :page-data="pageData"
        :page-num="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        @edit="editDv"
        @repair="repairDv"
        @delete="deleteDv"
        @handle-selection-change="handleSelectionChange"
      ></table-data>
      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery()"
      />
    </el-card>
    <drawer-plus
      :formdata="formData"
      :visable="drawerVisable"
      @cancel="cancel"
      @confirm="confirm"
    />
    <maintance
      :formdata="maintanceFormData"
      :visable="maintanceDrawerVisible"
      @cancel="cancel"
      @confirm="confirm"
    />
    <export-data
      v-model="importDialogVisible"
      @import-success="pressureHandleResetQuery()"
      @importttemplate="downtemplate()"
    ></export-data>
  </div>
</template>

<script setup lang="ts">
import drawerPlus from "./componets/drawer-plus.vue";
import tableData from "./componets/table-data.vue";
import exportData from "./componets/export-data.vue";
import maintance from "./componets/maintance.vue";
defineOptions({
  name: "DvTemperatureGauge",
  inheritAttrs: false,
});

import DvTemperatureGaugeAPI, {
  DvTemperatureGaugePageVO,
  DvTemperatureGaugeForm,
  DvTemperatureGaugePageQuery,
} from "@/api/ledger/dv-temperature-gauge-api";
import { DvTemperatureGaugeMaintenanceForm } from ".";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { ElMessage, ElMessageBox } from "element-plus";
const queryFormRef = ref();
const loading = ref(false);
const importDialogVisible = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const drawerVisable: Ref<boolean> = ref(false);
const maintanceDrawerVisible: Ref<boolean> = ref(false);
const option = ref<string>("");
const queryParams = reactive<DvTemperatureGaugePageQuery>({
  pageNum: 1,
  pageSize: 10,
  tagNumber: "",
  status: undefined,
  dvName: undefined,
});

// 温度表格数据
const pageData = ref<DvTemperatureGaugePageVO[]>([]);
// 温度表单数据
const formData = reactive<DvTemperatureGaugeForm>({});
const maintanceFormData = reactive<DvTemperatureGaugeMaintenanceForm>({});
const editDv = (args: any) => {
  const [data] = args;
  Object.assign(formData, data.row);
  openDrawer("edit");
};

const repairDv = (args: any) => {
  const [data] = args;
  Object.assign(formData, data.row);
  openDrawer("repair");
};
/** 查询温度 */
function handleQuery() {
  loading.value = true;
  DvTemperatureGaugeAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}
//清空要添加的表单
const resetAddFormData = () => {
  formData.id = undefined;
  formData.indexNumber = "";
  formData.insertionDepth = "";
  formData.installationLocationAndPurpose = "";
  formData.interlockSetValue = "";
  formData.interlocked = 0;
  formData.manufacturer = "";
  formData.measurementRange = "";
  formData.precision = "";
  formData.remark = "";
  formData.specificationModel = "";
  formData.tagNumber = "";
  formData.status = 1;
  formData.deviceName = "";
  formData.deviceNameSuffix = "";
  formData.factory = "";
  formData.dvType = "";
};
const openDrawer = (args?: any) => {
  switch (args) {
    case "edit":
      drawerVisable.value = true;
      option.value = "edit";
      break;
    case "repair":
      maintanceDrawerVisible.value = true;
      maintanceFormData.tagNumber = formData.tagNumber;
      option.value = "repair";
      break;
    case "add":
      drawerVisable.value = true;
      resetAddFormData();
      option.value = "add";
      break;
    case "delete":
      drawerVisable.value = true;
      option.value = "delete";
      break;
  }
};

const resetQuery = () => {
  queryParams.pageNum = 1;
  queryParams.pageSize = 10;
  queryParams.status = undefined;
  queryParams.tagNumber = "";
  queryParams.dvName = undefined;
};

const deleteDv = (args?: any) => {
  const [data] = args;
  ElMessageBox.confirm("确认删除该数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    DvTemperatureGaugeAPI.deleteByIds(data.row.id)
      .then(() => {
        ElMessage.success("删除成功");
        handleResetQuery();
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

/** 批量删除 */
function handleBatchDelete() {
  if (removeIds.value.length === 0) {
    ElMessage.warning("请选择要删除的数据");
    return;
  }

  ElMessageBox.confirm(`确认删除选中的${removeIds.value.length}条数据吗?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    loading.value = true;
    DvTemperatureGaugeAPI.deleteByIds(removeIds.value.join(","))
      .then(() => {
        ElMessage.success("删除成功");
        handleResetQuery();
      })
      .finally(() => {
        loading.value = false;
      });
  });
}
/** 重置温度查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  resetQuery();
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  console.log(selection);
  removeIds.value = selection.map((item: any) => {
    console.log(item.id);
    return item.id;
  });
}

const confirm = () => {
  if (option.value === "add") {
    loading.value = true;
    DvTemperatureGaugeAPI.create(formData)
      .then(() => {
        ElMessage.success("新增成功");
        drawerVisable.value = false;
        handleResetQuery();
      })
      .finally(() => {
        loading.value = false;
      });
  }
  if (option.value === "edit") {
    loading.value = true;
    DvTemperatureGaugeAPI.update(formData!.id!.toString(), formData)
      .then(() => {
        ElMessage.success("修改成功");
        drawerVisable.value = false;
        handleResetQuery();
      })
      .finally(() => {
        loading.value = false;
      });
  }
  if (option.value === "repair") {
    loading.value = true;
    DvTemperatureGaugeAPI.update(formData!.id!.toString(), formData)
      .then(() => {
        ElMessage.success("修改成功");
        maintanceDrawerVisible.value = false;
        handleResetQuery();
      })
      .finally(() => {
        loading.value = false;
      });
  }
};

const cancel = () => {
  drawerVisable.value = false;
  maintanceDrawerVisible.value = false;
};

const handleOpenImportDialog = () => {
  importDialogVisible.value = true;
};
const handleExport = () => {
  DvTemperatureGaugeAPI.export({
    status: queryParams.status,
    tagNumber: queryParams.tagNumber,
    dvName: queryParams.dvName,
  }).then((response: any) => {
    const fileData = response.data;
    const fileName = decodeURI(response.headers["content-disposition"].split(";")[1].split("=")[1]);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";

    const blob = new Blob([fileData], { type: fileType });
    const downloadUrl = window.URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadUrl);
  });
};
const pressureHandleResetQuery = () => {};
const downtemplate = () => {
  DvTemperatureGaugeAPI.downloadtemplate().then((response: any) => {
    const fileData = response.data;
    const fileName = decodeURI(response.headers["content-disposition"].split(";")[1].split("=")[1]);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";

    const blob = new Blob([fileData], { type: fileType });
    const downloadUrl = window.URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadUrl);
  });
};
onMounted(() => {
  handleResetQuery();
});
</script>
