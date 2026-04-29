<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="仪表位号" prop="tagNumber">
          <el-input
            v-model="queryParams.tagNumber"
            placeholder="仪表位号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="仪表名称" prop="instrumentName">
          <el-input
            v-model="queryParams.instrumentName"
            placeholder="仪表名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <Dict v-model="queryParams.status" code="status" />
        </el-form-item>
        <el-form-item label="设备类型" prop="dvType">
          <el-input
            v-model="queryParams.dvType"
            placeholder="设备类型"
            clearable
            @keyup.enter="handleQuery()"
          />
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
            v-hasPerm="['ledger:dv-flowmetre-info:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:dv-flowmetre-info:delete']"
            type="danger"
            :disabled="removeIds.length === 0"
            icon="delete"
            @click="handleDelete()"
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
        :page-data="pageData"
        :page-num="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        @delete="handleDelete2"
        @edit="handleEdit"
        @repair="handleRepair"
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

    <!-- 流量计表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="仪表位号" prop="tagNumber">
          <el-input v-model="formData.tagNumber" placeholder="仪表位号" />
        </el-form-item>

        <el-form-item label="装置" prop="device">
          <el-input v-model="formData.device" placeholder="装置" />
        </el-form-item>

        <el-form-item label="用途" prop="purpose">
          <el-input v-model="formData.purpose" placeholder="用途" />
        </el-form-item>

        <el-form-item label="仪表名称" prop="instrumentName">
          <el-input v-model="formData.instrumentName" placeholder="仪表名称" />
        </el-form-item>

        <el-form-item label="量程" prop="measurementRange">
          <el-input v-model="formData.measurementRange" placeholder="量程" />
        </el-form-item>

        <el-form-item label="厂家" prop="manufacturer">
          <el-input v-model="formData.manufacturer" placeholder="厂家" />
        </el-form-item>

        <el-form-item label="工艺介质-介质" prop="medium">
          <el-input v-model="formData.medium" placeholder="工艺介质-介质" />
        </el-form-item>

        <el-form-item label="工艺介质-状态" prop="mediumStatus">
          <Dict v-model="formData.mediumStatus" code="craft-status" />
        </el-form-item>

        <el-form-item label="工艺介质-压力" prop="mediumPressure">
          <el-input v-model="formData.mediumPressure" placeholder="工艺介质-压力" />
        </el-form-item>

        <el-form-item label="工艺介质-温度" prop="mediumTemperature">
          <el-input v-model="formData.mediumTemperature" placeholder="工艺介质-温度" />
        </el-form-item>

        <el-form-item label="出厂编号" prop="factoryNumber">
          <el-input v-model="formData.factoryNumber" placeholder="出厂编号" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="备注" />
        </el-form-item>

        <el-form-item label="设备状态" prop="status">
          <Dict v-model="formData.status" code="status" />
        </el-form-item>

        <el-form-item label="设备类型" prop="dvType">
          <el-input v-model="formData.dvType" placeholder="设备类型" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <maintance
      :formdata="maintanceFormData"
      :visable="maintanceDrawerVisible"
      @cancel="handleCloseMaintanceDrawer"
      @confirm="handleSubmitMaintance"
    />
    <export-data v-model="importVisible"></export-data>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "DvFlowmetreInfo",
  inheritAttrs: false,
});

import DvFlowmetreInfoAPI, {
  DvFlowmetreInfoPageVO,
  DvFlowmetreInfoForm,
  DvFlowmetreInfoPageQuery,
} from "@/api/ledger/dv-flowmetre-info-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { DvFlowmetreInfoMaintenanceForm } from "./index";
import tableData from "./componets/table-data.vue";
import exportData from "./componets/export-data.vue";
import maintance from "./componets/maintance.vue";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<DvFlowmetreInfoPageQuery>({
  pageNum: 1,
  pageSize: 10,
  dvType: undefined,
  status: undefined,
  tagNumber: undefined,
  instrumentName: undefined,
});
const importVisible = ref(false);
const maintanceDrawerVisible = ref(false);
// 流量计表格数据
const pageData = ref<DvFlowmetreInfoPageVO[]>([]);
// 报修表单数据
const maintanceFormData = reactive<DvFlowmetreInfoMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 流量计表单数据
const formData = reactive<DvFlowmetreInfoForm>({});

// 流量计表单校验规则
const rules = reactive({
  tagNumber: [{ required: true, message: "请输入仪表位号", trigger: "blur" }],
  device: [{ required: true, message: "请输入装置", trigger: "blur" }],
  instrumentName: [{ required: true, message: "请输入仪表名称", trigger: "blur" }],
  medium: [{ required: true, message: "请输入工艺介质-介质", trigger: "blur" }],
  status: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
  dvType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
});

const resetAddFormData = () => {
  //证明是新增
  formData.id = undefined;
  formData.device = undefined;
  formData.dvType = undefined;
  formData.factoryNumber = undefined;
  formData.instrumentName = undefined;
  formData.manufacturer = undefined;
  formData.measurementRange = undefined;
  formData.medium = undefined;
  formData.mediumPressure = undefined;
  formData.mediumStatus = undefined;
  formData.mediumTemperature = undefined;
  formData.purpose = undefined;
  formData.remark = undefined;
  formData.status = undefined;
  formData.tagNumber = undefined;
};
/** 查询流量计 */
function handleQuery() {
  loading.value = true;
  DvFlowmetreInfoAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置流量计查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开流量计弹窗 */
function handleOpenDialog(item?: any) {
  dialog.visible = true;
  if (item) {
    //证明是修改
    Object.assign(formData, item);
    dialog.title = "修改差压流量计";
  } else {
    resetAddFormData();
  }
}

const handleEdit = (data: any) => {
  const [row] = data;
  handleOpenDialog(row);
};

/** 打开报修弹窗 */
const handleRepair = (data: any) => {
  const [row] = data;
  maintanceDrawerVisible.value = true;
  maintanceFormData.tagNumber = row.tagNumber;
};

/** 关闭报修弹窗 */
const handleCloseMaintanceDrawer = () => {
  maintanceDrawerVisible.value = false;
};

/** 提交报修表单 */
const handleSubmitMaintance = () => {
  loading.value = true;
  MaintainPlanAPI.create(maintanceFormData)
    .then(() => {
      ElMessage.success("报修成功");
      handleCloseMaintanceDrawer();
    })
    .finally(() => (loading.value = false));
};

/** 提交流量计表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      console.log(id);
      if (id) {
        DvFlowmetreInfoAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        DvFlowmetreInfoAPI.create(formData)
          .then(() => {
            ElMessage.success("新增成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
  });
}

/** 关闭流量计弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除流量计 */
function handleDelete(id?: number) {
  const ids = [id || removeIds.value].join(",");
  if (!ids) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(
    () => {
      loading.value = true;
      DvFlowmetreInfoAPI.deleteByIds(ids)
        .then(() => {
          ElMessage.success("删除成功");
          handleResetQuery();
        })
        .finally(() => (loading.value = false));
    },
    () => {
      ElMessage.info("已取消删除");
    }
  );
}

const handleDelete2 = (scope: any) => {
  const [data] = scope;
  handleDelete(data.id);
};
const handleExport = () => {
  DvFlowmetreInfoAPI.export({
    dvType: queryParams.dvType,
    status: queryParams.status,
    tagNumber: queryParams.tagNumber,
    instrumentName: queryParams.instrumentName,
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
const handleOpenImportDialog = () => {
  importVisible.value = true;
};
onMounted(() => {
  handleQuery();
});
</script>
