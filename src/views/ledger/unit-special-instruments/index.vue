<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item class="search-buttons" label="位号">
          <el-input v-model="queryParams.tagNumber" placeholder="请输入位号"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="queryParams.instrumentName" placeholder="仪表名称"></el-input>
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
            v-hasPerm="['ledger:unit-special-instruments:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:unit-special-instruments:delete']"
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
            {{ getRowIndex(scope.$index) }}
          </template>
        </el-table-column>
        <el-table-column
          key="tagNumber"
          label="位号"
          prop="tagNumber"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="instrumentName"
          label="仪表名称"
          prop="instrumentName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="deviceName"
          label="设备名称"
          prop="deviceName"
          min-width="150"
          align="center"
        />
        <el-table-column key="device" label="装置" prop="device" min-width="150" align="center" />
        <el-table-column
          key="installationLocation"
          label="安装位置及用途"
          prop="installationLocation"
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
          key="measurementRange"
          label="量程"
          prop="measurementRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="quantity"
          label="数量"
          prop="quantity"
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
        <el-table-column label="状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.status" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="unitSpecialCode"
          label="编号"
          prop="unitSpecialCode"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:unit-special-instruments:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:unit-special-instruments:repair']"
              type="warning"
              size="small"
              link
              icon="tools"
              @click="handleRepair(scope.row)"
            >
              报修
            </el-button>
            <el-button
              v-hasPerm="['ledger:unit-special-instruments:delete']"
              type="danger"
              size="small"
              link
              icon="delete"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery()"
      />
    </el-card>

    <!-- 机组特殊仪表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="位号" prop="tagNumber">
          <el-input v-model="formData.tagNumber" placeholder="位号" />
        </el-form-item>

        <el-form-item label="仪表名称" prop="instrumentName">
          <el-input v-model="formData.instrumentName" placeholder="仪表名称" />
        </el-form-item>

        <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="formData.deviceName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="装置" prop="device">
          <el-input v-model="formData.device" placeholder="装置" />
        </el-form-item>

        <el-form-item label="安装位置及用途" prop="installationLocation">
          <el-input v-model="formData.installationLocation" placeholder="安装位置及用途" />
        </el-form-item>

        <el-form-item label="规格型号" prop="specificationModel">
          <el-input v-model="formData.specificationModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="量程" prop="measurementRange">
          <el-input v-model="formData.measurementRange" placeholder="量程" />
        </el-form-item>

        <el-form-item label="数量" prop="quantity">
          <el-input v-model="formData.quantity" placeholder="数量" />
        </el-form-item>

        <el-form-item label="厂家" prop="manufacturer">
          <el-input v-model="formData.manufacturer" placeholder="厂家" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <Dict v-model="formData.status" code="status" />
        </el-form-item>

        <el-form-item label="编号" prop="unitSpecialCode">
          <el-input v-model="formData.unitSpecialCode" placeholder="编号" />
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
    <!-- 导入 -->
    <UnitSpecialInstrumentsImport
      v-model="importDialogVisible"
      @import-success="handleResetQuery()"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "UnitSpecialInstruments",
  inheritAttrs: false,
});

import UnitSpecialInstrumentsAPI, {
  UnitSpecialInstrumentsPageVO,
  UnitSpecialInstrumentsForm,
  UnitSpecialInstrumentsPageQuery,
} from "@/api/ledger/unit-special-instruments-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { UnitSpecialInstrumentsMaintenanceForm } from "./index";
import maintance from "./maintance.vue";
import UnitSpecialInstrumentsImport from "./UnitSpecialInstrumentsImport.vue";
const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const maintanceDrawerVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<UnitSpecialInstrumentsPageQuery>({
  pageNum: 1,
  pageSize: 10,
  tagNumber: "",
  instrumentName: "",
  status: undefined,
});

const getRowIndex = (index: number) => {
  return (queryParams.pageNum - 1) * queryParams.pageSize + index + 1;
};

// 机组特殊仪表格数据
const pageData = ref<UnitSpecialInstrumentsPageVO[]>([]);
const maintanceFormData = reactive<UnitSpecialInstrumentsMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 机组特殊仪表单数据
const formData = reactive<UnitSpecialInstrumentsForm>({});

// 机组特殊仪表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  tagNumber: [{ required: true, message: "请输入位号", trigger: "blur" }],
  deviceName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  device: [{ required: true, message: "请输入装置", trigger: "blur" }],
  installationLocation: [{ required: true, message: "请输入安装位置及用途", trigger: "blur" }],
  measurementRange: [{ required: true, message: "请输入量程", trigger: "blur" }],
  manufacturer: [{ required: true, message: "请输入厂家", trigger: "blur" }],
  unitSpecialStatus: [{ required: true, message: "请输入状态", trigger: "blur" }],
});

/** 查询机组特殊仪 */
function handleQuery() {
  loading.value = true;
  UnitSpecialInstrumentsAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置机组特殊仪查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开机组特殊仪弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改机组特殊仪";
    UnitSpecialInstrumentsAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增机组特殊仪";
  }
}

/** 提交机组特殊仪表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        UnitSpecialInstrumentsAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        UnitSpecialInstrumentsAPI.create(formData)
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

/** 关闭机组特殊仪弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除机组特殊仪 */
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
      UnitSpecialInstrumentsAPI.deleteByIds(ids)
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
// 打开导入弹窗
function handleOpenImportDialog() {
  importDialogVisible.value = true;
}

// 导出
function handleExport() {
  UnitSpecialInstrumentsAPI.export({
    pressureTag: queryParams.tagNumber as string,
    pressureDevice: queryParams.instrumentName as string,
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
}

const handleRepair = (row: UnitSpecialInstrumentsPageVO) => {
  maintanceFormData.tagNumber = row.tagNumber;
  maintanceDrawerVisible.value = true;
};

const handleCloseMaintanceDrawer = () => {
  maintanceDrawerVisible.value = false;
};

const handleSubmitMaintance = () => {
  loading.value = true;
  MaintainPlanAPI.create(maintanceFormData)
    .then(() => {
      ElMessage.success("报修成功");
      handleCloseMaintanceDrawer();
    })
    .finally(() => (loading.value = false));
};

onMounted(() => {
  handleQuery();
});
</script>
