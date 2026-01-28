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
        @edit="editDv"
        @detail="detailDv"
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
    <drawer-detail :visable="detailDrawerVisiable" :page-data="detailsInfo" @close="close" />
    <export-data
      v-model="importDialogVisible"
      @import-success="pressureHandleResetQuery()"
      @importttemplate="downtemplate()"
    ></export-data>
  </div>
</template>

<script setup lang="ts">
import drawerPlus from "./componets/drawer-plus.vue";
import drawerDetail from "./componets/drawer-detail.vue";
import tableData from "./componets/table-data.vue";
import exportData from "./componets/export-data.vue";
defineOptions({
  name: "DvTemperatureGauge",
  inheritAttrs: false,
});

import DvTemperatureGaugeAPI, {
  DvTemperatureGaugePageVO,
  DvTemperatureGaugeForm,
  DvTemperatureGaugePageQuery,
} from "@/api/ledger/dv-temperature-gauge-api";
const queryFormRef = ref();
const loading = ref(false);
const importDialogVisible = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const drawerVisable: Ref<boolean> = ref(false);
const option = ref<string>("");
const detailDrawerVisiable = ref<boolean>(false);
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
const detailsInfo = ref<DvTemperatureGaugePageVO>({});
const editDv = (args: any) => {
  const [data] = args;
  Object.assign(formData, data.row);
  openDrawer("edit");
};

const detailDv = (data: any) => {
  const [detail] = data;
  detailsInfo.value = detail.row;
  detailDrawerVisiable.value = !detailDrawerVisiable.value;
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
  formData.indexNumber = undefined;
  formData.insertionDepth = undefined;
  formData.installationLocationAndPurpose = undefined;
  formData.interlockSetValue = undefined;
  formData.interlocked = 0;
  formData.manufacturer = undefined;
  formData.measurementRange = undefined;
  formData.precision = undefined;
  formData.remark = undefined;
  formData.specificationModel = undefined;
  formData.tagNumber = undefined;
  formData.status = 0;
  formData.deviceName = undefined;
  formData.deviceNameSuffix = undefined;
  formData.dvType = undefined;
};
const openDrawer = (args?: any) => {
  drawerVisable.value = true;
  switch (args) {
    case "edit":
      option.value = "edit";
      break;
    case "add":
      resetAddFormData();
      option.value = "add";
      break;
    case "delete":
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
  DvTemperatureGaugeAPI.deleteByIds(data.row.id).finally(() => {
    handleResetQuery();
  });
};
/** 重置温度查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  resetQuery();
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

const confirm = () => {
  if (option.value === "add") {
    console.log(formData.dvType);
    DvTemperatureGaugeAPI.create(formData).finally(() => {
      drawerVisable.value = false;
      handleResetQuery();
    });
  }
  if (option.value === "edit") {
    DvTemperatureGaugeAPI.update(formData!.id!.toString(), formData).finally(() => {
      drawerVisable.value = false;
      handleResetQuery();
    });
  }
};

const cancel = () => {
  drawerVisable.value = false;
};
const close = () => {
  detailDrawerVisiable.value = !detailDrawerVisiable.value;
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
