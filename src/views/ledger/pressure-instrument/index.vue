<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item class="search-buttons" label="位号">
          <el-input v-model="queryParams.pressureTag"></el-input>
        </el-form-item>
        <el-form-item class="search-buttons" label="装置名称">
          <el-input v-model="queryParams.pressureDevice"></el-input>
        </el-form-item>
        <el-form-item class="search-buttons">
          <el-button type="primary" icon="search" @click="pressureHandleQuery">搜索</el-button>
          <el-button icon="refresh" @click="pressureHandleResetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="data-table__toolbar">
        <div class="data-table__toolbar--actions">
          <el-button
            v-hasPerm="['ledger:pressure-instrument:add']"
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
        @edit="editDvPressure"
        @detail="detailDvPressure"
        @handle-selection-change="handleSelectionChange"
      ></table-data>
      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="pressureHandleQuery()"
      />
    </el-card>
    <drawer-plus
      :formdata="formData"
      :visable="drawerVisable"
      @cancel="cancel"
      @confirm="confirm"
    />
    <drawer-detail :visable="detailDrawerVisiable" :page-data="detailsInfo" @close="close" />
    <!-- 用户导入 -->
    <PressureInstrumentImport
      v-model="importDialogVisible"
      @import-success="pressureHandleResetQuery()"
    />
  </div>
</template>

<script setup lang="ts">
import drawerPlus from "./components/drawer-plus.vue";
import tableData from "./components/table-data.vue";

defineOptions({
  name: "DvPressureInstrument",
  inheritAttrs: false,
});

import DvPressureInstrumentAPI, {
  DvPressureInstrumentPageVO,
  DvPressureInstrumentForm,
  DvPressureInstrumentPageQuery,
} from "@/api/ledger/pressure-instrument-api";
const queryFormRef = ref();
const loading = ref(false);

const removeIds = ref<number[]>([]);
const total = ref(0);
const drawerVisable: Ref<boolean> = ref(false);
const option = ref<string>("");
const detailDrawerVisiable = ref<boolean>(false);
// 导入弹窗显示状态
const importDialogVisible = ref(false);
const queryParams = reactive<DvPressureInstrumentPageQuery>({
  pageNum: 1,
  pageSize: 10,
  pressureTag: "",
  pressureDevice: "",
});

// 压力表格数据
const pageData = ref<DvPressureInstrumentPageVO[]>([]);
// 压力表单数据
const formData = reactive<DvPressureInstrumentForm>({});
const detailsInfo = ref<DvPressureInstrumentPageVO>({});
const editDvPressure = (args: any) => {
  const [data] = args;
  formData.id = data.row.id;
  formData.pressureDevice = data.row.pressureDevice;
  formData.pressureTag = data.row.pressureTag;
  formData.pressureLocation = data.row.pressureLocation;
  formData.pressureEquip = data.row.pressureEquip;
  formData.pressureModel = data.row.pressureModel;
  formData.pressureManu = data.row.pressureManu;
  formData.pressureRange = data.row.pressureRange;
  formData.pressureConnection = data.row.pressureConnection;
  formData.pressureAccuracy = data.row.pressureAccuracy;
  formData.pressurePower = data.row.pressurePower;
  formData.pressureOutput = data.row.pressureOutput;
  formData.pressureHeat = data.row.pressureHeat;
  formData.pressureInterlock = data.row.pressureInterlock;
  formData.pressureInterlockVal = data.row.pressureInterlock_val;
  formData.pressureRemark = data.row.pressureRemark;
  openDrawer("edit");
};

const detailDvPressure = (data: any) => {
  const [detail] = data;
  detailsInfo.value = detail.row;
  detailDrawerVisiable.value = !detailDrawerVisiable.value;
};
/** 查询压力 */
function pressureHandleQuery() {
  loading.value = true;
  DvPressureInstrumentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

const openDrawer = (args?: any) => {
  drawerVisable.value = true;
  switch (args) {
    case "edit":
      option.value = "edit";
      break;
    case "add":
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
  queryParams.pressureDevice = "";
  queryParams.pressureTag = "";
};

/** 重置压力查询 */
function pressureHandleResetQuery() {
  queryFormRef.value!.resetFields();
  resetQuery();
  pressureHandleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

const confirm = () => {
  if (option.value === "add") {
    DvPressureInstrumentAPI.create(formData).finally(() => {
      drawerVisable.value = false;
      pressureHandleResetQuery();
    });
  }
  if (option.value === "edit") {
    DvPressureInstrumentAPI.update(formData!.id!.toString(), formData).finally(() => {
      drawerVisable.value = false;
      pressureHandleResetQuery();
    });
  }
};

const cancel = () => {
  drawerVisable.value = false;
};
const close = () => {
  detailDrawerVisiable.value = !detailDrawerVisiable.value;
};

// 打开导入弹窗
function handleOpenImportDialog() {
  importDialogVisible.value = true;
}

// 导出用户
function handleExport() {
  DvPressureInstrumentAPI.export(queryParams).then((response: any) => {
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
}

onMounted(() => {
  pressureHandleResetQuery();
});
</script>
