<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="元器件名称" prop="ecmComponentName">
          <el-input
            v-model="queryParams.ecmComponentName"
            placeholder="元器件名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="生产厂家" prop="ecmManufacturer">
          <el-input
            v-model="queryParams.ecmManufacturer"
            placeholder="生产厂家"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="	出厂编号" prop="ecmFactoryNo">
          <el-input
            v-model="queryParams.ecmFactoryNo"
            placeholder="	出厂编号"
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
            v-hasPerm="['ledger:electric-cabinet-main-component:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:electric-cabinet-main-component:delete']"
            type="danger"
            :disabled="removeIds.length === 0"
            icon="delete"
            @click="handleDelete()"
          >
            批量删除
          </el-button>
        </div>
        <div class="data-table__toolbar--actions">
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
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" width="80" align="center">
          <template #default="scope">
            {{ getRowIndex(scope.$index) }}
          </template>
        </el-table-column>
        <el-table-column
          key="ecmComponentName"
          label="元器件名称"
          prop="ecmComponentName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmSpecModel"
          label="规格型号"
          prop="ecmSpecModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmManufacturer"
          label="生产厂家"
          prop="ecmManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmFactoryNo"
          label="	出厂编号"
          prop="ecmFactoryNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmInstallLocation"
          label="安装位置"
          prop="ecmInstallLocation"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmCommissioningDate"
          label="投运日期"
          prop="ecmCommissioningDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmRatedParameters"
          label="额定参数"
          prop="ecmRatedParameters"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmFactory"
          label="所属工厂"
          prop="ecmFactory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-cabinet-main-component:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-cabinet-main-component:repair']"
              type="warning"
              size="small"
              link
              icon="tools"
              @click="handleRepair(scope.row)"
            >
              报修
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-cabinet-main-component:delete']"
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

    <!-- 抽屉柜主要元器件信息表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="元器件名称" prop="ecmComponentName">
          <el-input v-model="formData.ecmComponentName" placeholder="元器件名称" />
        </el-form-item>

        <el-form-item label="规格型号" prop="ecmSpecModel">
          <el-input v-model="formData.ecmSpecModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="ecmManufacturer">
          <el-input v-model="formData.ecmManufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="	出厂编号" prop="ecmFactoryNo">
          <el-input v-model="formData.ecmFactoryNo" placeholder="	出厂编号" />
        </el-form-item>

        <el-form-item label="安装位置" prop="ecmInstallLocation">
          <el-input v-model="formData.ecmInstallLocation" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投运日期" prop="ecmCommissioningDate">
          <el-date-picker
            v-model="formData.ecmCommissioningDate"
            class="!w-[240px]"
            type="date"
            placeholder="投运日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="额定参数" prop="ecmRatedParameters">
          <el-input v-model="formData.ecmRatedParameters" placeholder="额定参数" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="ecmFactory">
          <el-input v-model="formData.ecmFactory" placeholder="所属工厂" />
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
  name: "ElectricCabinetMainComponent",
  inheritAttrs: false,
});

import ElectricCabinetMainComponentAPI, {
  ElectricCabinetMainComponentPageVO,
  ElectricCabinetMainComponentForm,
  ElectricCabinetMainComponentPageQuery,
} from "@/api/ledger/electric-cabinet-main-component-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { ElectricCabinetMainComponentMaintenanceForm } from "./index";
import ImportData from "./import-data.vue";
import maintance from "./maintance.vue";

const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const maintanceDrawerVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<ElectricCabinetMainComponentPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

const getRowIndex = (index: number) => {
  return (queryParams.pageNum - 1) * queryParams.pageSize + index + 1;
};

// 抽屉柜主要元器件信息表格数据
const pageData = ref<ElectricCabinetMainComponentPageVO[]>([]);
const maintanceFormData = reactive<ElectricCabinetMainComponentMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 抽屉柜主要元器件信息表单数据
const formData = reactive<ElectricCabinetMainComponentForm>({});

// 抽屉柜主要元器件信息表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
});

/** 查询抽屉柜主要元器件信息 */
function handleQuery() {
  loading.value = true;
  ElectricCabinetMainComponentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置抽屉柜主要元器件信息查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开抽屉柜主要元器件信息弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改抽屉柜主要元器件信息";
    ElectricCabinetMainComponentAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增抽屉柜主要元器件信息";
  }
}

/** 提交抽屉柜主要元器件信息表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricCabinetMainComponentAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricCabinetMainComponentAPI.create(formData)
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

/** 关闭抽屉柜主要元器件信息弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除抽屉柜主要元器件信息 */
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
      ElectricCabinetMainComponentAPI.deleteByIds(ids)
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

onMounted(() => {
  handleQuery();
});
const handleOpenImportDialog = () => {
  importDialogVisible.value = true;
};
const handleExport = () => {
  ElectricCabinetMainComponentAPI.export({
    ecmComponentName: queryParams.ecmComponentName,
    ecmManufacturer: queryParams.ecmManufacturer,
    ecmFactoryNo: queryParams.ecmFactoryNo,
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

const handleRepair = (row: ElectricCabinetMainComponentPageVO) => {
  maintanceFormData.ecmComponentName = row.ecmComponentName;
  maintanceFormData.maintainPlanEquipCode = row.ecmFactoryNo || row.id?.toString();
  maintanceFormData.maintainPlanEquipName = row.ecmComponentName;
  maintanceFormData.maintainPlanEquipType = row.ecmSpecModel;
  maintanceFormData.maintainPlanContent = [
    row.ecmComponentName ? `元器件名称：${row.ecmComponentName}` : "",
    row.ecmInstallLocation ? `安装位置：${row.ecmInstallLocation}` : "",
    row.ecmRatedParameters ? `额定参数：${row.ecmRatedParameters}` : "",
  ]
    .filter(Boolean)
    .join("；");
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

</script>
