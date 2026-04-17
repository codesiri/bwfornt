<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="资料名称" prop="ecdDocName">
          <el-input
            v-model="queryParams.ecdDocName"
            placeholder="资料名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="资料类型" prop="ecdDocType">
          <el-input
            v-model="queryParams.ecdDocType"
            placeholder="资料类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="	编号" prop="ecdDocNo">
          <el-input
            v-model="queryParams.ecdDocNo"
            placeholder="	编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="ecdFactory">
          <el-input
            v-model="queryParams.ecdFactory"
            placeholder="所属工厂"
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
        <el-button
          v-hasPerm="['ledger:electric-cabinet-document:add']"
          type="success"
          icon="plus"
          @click="handleOpenDialog()"
        >
          新增
        </el-button>
        <div class="data-table__toolbar--tools">
          <el-button
            v-hasPerm="'ledger:elec-motor:add'"
            icon="upload"
            @click="handleOpenImportDialog"
          >
            导入
          </el-button>

          <el-button v-hasPerm="'ledger:elec-motor:delete'" icon="download" @click="handleExport">
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
        <el-table-column
          key="ecdDocName"
          label="资料名称"
          prop="ecdDocName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecdDocType"
          label="资料类型"
          prop="ecdDocType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecdDocNo"
          label="	编号"
          prop="ecdDocNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecdArchiveDate"
          label="归档日期"
          prop="ecdArchiveDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecdCustodian"
          label="保管人"
          prop="ecdCustodian"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecdLocation"
          label="存放位置"
          prop="ecdLocation"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecdFactory"
          label="所属工厂"
          prop="ecdFactory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-cabinet-document:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-cabinet-document:add']"
              type="warning"
              size="small"
              link
              icon="tools"
              @click="handleRepair(scope.row)"
            >
              报修
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-light-equipment:delete']"
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

    <!-- 抽屉柜相关资料归档表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="资料名称" prop="ecdDocName">
          <el-input v-model="formData.ecdDocName" placeholder="资料名称" />
        </el-form-item>

        <el-form-item label="资料类型" prop="ecdDocType">
          <el-input v-model="formData.ecdDocType" placeholder="资料类型" />
        </el-form-item>

        <el-form-item label="	编号" prop="ecdDocNo">
          <el-input v-model="formData.ecdDocNo" placeholder="	编号" />
        </el-form-item>

        <el-form-item label="归档日期" prop="ecdArchiveDate">
          <el-date-picker
            v-model="formData.ecdArchiveDate"
            class="!w-[240px]"
            type="date"
            placeholder="归档日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="保管人" prop="ecdCustodian">
          <el-input v-model="formData.ecdCustodian" placeholder="保管人" />
        </el-form-item>

        <el-form-item label="存放位置" prop="ecdLocation">
          <el-input v-model="formData.ecdLocation" placeholder="存放位置" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="ecdFactory">
          <el-input v-model="formData.ecdFactory" placeholder="所属工厂" />
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
    <import-data v-model="importDialogVisible" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ElectricCabinetDocument",
  inheritAttrs: false,
});

import ElectricCabinetDocumentAPI, {
  ElectricCabinetDocumentPageVO,
  ElectricCabinetDocumentForm,
  ElectricCabinetDocumentPageQuery,
} from "@/api/ledger/electric-cabinet-document-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { ElectricCabinetDocumentMaintenanceForm } from "./index";
import importData from "./import-data..vue";
import maintance from "./maintance.vue";
const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const maintanceDrawerVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<ElectricCabinetDocumentPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 抽屉柜相关资料归档表格数据
const pageData = ref<ElectricCabinetDocumentPageVO[]>([]);
const maintanceFormData = reactive<ElectricCabinetDocumentMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 抽屉柜相关资料归档表单数据
const formData = reactive<ElectricCabinetDocumentForm>({});

// 抽屉柜相关资料归档表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  ecdLocation: [{ required: true, message: "请输入存放位置", trigger: "blur" }],
  ecdFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询抽屉柜相关资料归档 */
function handleQuery() {
  loading.value = true;
  ElectricCabinetDocumentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置抽屉柜相关资料归档查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开抽屉柜相关资料归档弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改抽屉柜相关资料归档";
    ElectricCabinetDocumentAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增抽屉柜相关资料归档";
  }
}

/** 提交抽屉柜相关资料归档表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricCabinetDocumentAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricCabinetDocumentAPI.create(formData)
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

/** 关闭抽屉柜相关资料归档弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除抽屉柜相关资料归档 */
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
      ElectricCabinetDocumentAPI.deleteByIds(ids)
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
const handleOpenImportDialog = () => {
  importDialogVisible.value = true;
};
const handleExport = () => {
  ElectricCabinetDocumentAPI.export({
    ecdDocName: queryParams.ecdDocName,
    ecdDocType: queryParams.ecdDocType,
    ecdDocNo: queryParams.ecdDocNo,
    ecdFactory: queryParams.ecdFactory,
  }).then((response) => {
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

const handleRepair = (row: ElectricCabinetDocumentPageVO) => {
  maintanceFormData.ecdDocName = row.ecdDocName;
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
