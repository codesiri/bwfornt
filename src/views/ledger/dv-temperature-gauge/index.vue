<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item class="search-buttons" label="位号">
          <el-input v-model="queryParams.tagNumber"></el-input>
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
      <div class="mb-10px">
        <el-button
          v-hasPerm="['ledger:dv-temperature-gauge:add']"
          type="success"
          icon="plus"
          @click="openDrawer('add')"
        >
          新增
        </el-button>
      </div>
      <table-data
        :loading="loading"
        :page-data="pageData"
        @edit="editDv"
        @detail="detailDv"
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
  </div>
</template>

<script setup lang="ts">
import drawerPlus from "./componets/drawer-plus.vue";
import drawerDetail from "./componets/drawer-detail.vue";
import tableData from "./componets/table-data.vue";
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
});

// 温度表格数据
const pageData = ref<DvTemperatureGaugePageVO[]>([]);
// 温度表单数据
const formData = reactive<DvTemperatureGaugeForm>({});
const detailsInfo = ref<DvTemperatureGaugePageVO>({});
const editDv = (args: any) => {
  const [data] = args;
  formData.id = data.row.id;
  formData.indexNumber = data.row.indexNumber;
  formData.insertionDepth = data.row.insertionDepth;
  formData.installationLocationAndPurpose = data.row.installationLocationAndPurpose;
  formData.interlockSetValue = data.row.interlockSetValue;
  formData.interlocked = data.row.interlocked;
  formData.manufacturer = data.row.manufacturer;
  formData.measurementRange = data.row.measurementRange;
  formData.precision = data.row.precision;
  formData.remark = data.row.remark;
  formData.specificationModel = data.row.specificationModel;
  formData.tagNumber = data.row.tagNumber;
  formData.status = data.row.status;
  formData.deviceName = data.row.deviceName;
  formData.deviceNameSuffix = data.row.deviceNameSuffix;
  formData.dvType = data.row.dvType;
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
  queryParams.status = undefined;
  queryParams.tagNumber = "";
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
onMounted(() => {
  handleResetQuery();
});
</script>
