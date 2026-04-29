<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="保养人员" prop="ecmMaintainPerson">
          <el-input
            v-model="queryParams.ecmMaintainPerson"
            placeholder="保养人员"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="保养级别" prop="ecmMaintainLevel">
          <el-input
            v-model="queryParams.ecmMaintainLevel"
            placeholder="保养级别"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="ecmFactory">
          <el-input
            v-model="queryParams.ecmFactory"
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
        <div class="data-table__toolbar--actions">
          <el-button
            v-hasPerm="['ledger:electric-cabinet-maintenance:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:electric-cabinet-maintenance:delete']"
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
            v-hasPerm="'ledger:electric-cabinet-maintenance:import'"
            icon="upload"
            @click="handleOpenImportDialog"
          >
            导入
          </el-button>

          <el-button
            v-hasPerm="'ledger:electric-cabinet-maintenance:export'"
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
            {{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column key="id" label="ID" prop="id" min-width="150" align="center" />
        <el-table-column
          key="ecmMaintainDate"
          label="保养日期"
          prop="ecmMaintainDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmMaintainPerson"
          label="保养人员"
          prop="ecmMaintainPerson"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmMaintainLevel"
          label="保养级别"
          prop="ecmMaintainLevel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmMaintainItem"
          label="保养项目"
          prop="ecmMaintainItem"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmMaintainContent"
          label="保养内容"
          prop="ecmMaintainContent"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmReplaceComponent"
          label="更换元器件"
          prop="ecmReplaceComponent"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmMaintainResult"
          label="保养结果"
          prop="ecmMaintainResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmChecker"
          label="验收人"
          prop="ecmChecker"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmNextMaintainDate"
          label="下次保养日期"
          prop="ecmNextMaintainDate"
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
        <el-table-column
          key="ecmReserve1"
          label="备用1"
          prop="ecmReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmReserve2"
          label="备用2"
          prop="ecmReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmReserve3"
          label="备用3"
          prop="ecmReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-cabinet-maintenance:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-cabinet-maintenance:delete']"
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

    <!-- 抽屉柜维护保养记录表单弹窗 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="序号" prop="id">
          <el-input v-model="formData.id" placeholder="序号" />
        </el-form-item>

        <el-form-item label="保养日期" prop="ecmMaintainDate">
          <el-date-picker
            class="!w-[240px]"
            v-model="formData.ecmMaintainDate"
            type="date"
            placeholder="保养日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="保养人员" prop="ecmMaintainPerson">
          <el-input v-model="formData.ecmMaintainPerson" placeholder="保养人员" />
        </el-form-item>

        <el-form-item label="保养级别" prop="ecmMaintainLevel">
          <el-input v-model="formData.ecmMaintainLevel" placeholder="保养级别" />
        </el-form-item>

        <el-form-item label="保养项目" prop="ecmMaintainItem">
          <el-input v-model="formData.ecmMaintainItem" placeholder="保养项目" />
        </el-form-item>

        <el-form-item label="保养内容" prop="ecmMaintainContent">
          <el-input v-model="formData.ecmMaintainContent" placeholder="保养内容" />
        </el-form-item>

        <el-form-item label="更换元器件" prop="ecmReplaceComponent">
          <el-input v-model="formData.ecmReplaceComponent" placeholder="更换元器件" />
        </el-form-item>

        <el-form-item label="保养结果" prop="ecmMaintainResult">
          <el-input v-model="formData.ecmMaintainResult" placeholder="保养结果" />
        </el-form-item>

        <el-form-item label="验收人" prop="ecmChecker">
          <el-input v-model="formData.ecmChecker" placeholder="验收人" />
        </el-form-item>

        <el-form-item label="下次保养日期" prop="ecmNextMaintainDate">
          <el-date-picker
            class="!w-[240px]"
            v-model="formData.ecmNextMaintainDate"
            type="date"
            placeholder="下次保养日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="ecmFactory">
          <el-input v-model="formData.ecmFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="ecmReserve1">
          <el-input v-model="formData.ecmReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="ecmReserve2">
          <el-input v-model="formData.ecmReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="ecmReserve3">
          <el-input v-model="formData.ecmReserve3" placeholder="备用3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <import-data v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ElectricCabinetMaintenance",
  inheritAttrs: false,
});

import ElectricCabinetMaintenanceAPI, {
  ElectricCabinetMaintenancePageVO,
  ElectricCabinetMaintenanceForm,
  ElectricCabinetMaintenancePageQuery,
} from "@/api/ledger/electric-cabinet-maintenance-api";
import importData from "./import-data.vue";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);

const queryParams = reactive<ElectricCabinetMaintenancePageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 抽屉柜维护保养记录表格数据
const pageData = ref<ElectricCabinetMaintenancePageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 抽屉柜维护保养记录表单数据
const formData = reactive<ElectricCabinetMaintenanceForm>({});

// 抽屉柜维护保养记录表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  ecmMaintainDate: [{ required: true, message: "请输入保养日期", trigger: "blur" }],
  ecmMaintainPerson: [{ required: true, message: "请输入保养人员", trigger: "blur" }],
  ecmMaintainLevel: [{ required: true, message: "请输入保养级别", trigger: "blur" }],
  ecmMaintainItem: [{ required: true, message: "请输入保养项目", trigger: "blur" }],
  ecmMaintainResult: [{ required: true, message: "请输入保养结果", trigger: "blur" }],
  ecmFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询抽屉柜维护保养记录 */
function handleQuery() {
  loading.value = true;
  ElectricCabinetMaintenanceAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置抽屉柜维护保养记录查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开抽屉柜维护保养记录弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改抽屉柜维护保养记录";
    ElectricCabinetMaintenanceAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增抽屉柜维护保养记录";
  }
}

/** 提交抽屉柜维护保养记录表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricCabinetMaintenanceAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricCabinetMaintenanceAPI.create(formData)
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

/** 关闭抽屉柜维护保养记录弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除抽屉柜维护保养记录 */
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
      ElectricCabinetMaintenanceAPI.deleteByIds(ids)
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
  ElectricCabinetMaintenanceAPI.export({
    ecmMaintainPerson: queryParams.ecmMaintainPerson,
    ecmMaintainLevel: queryParams.ecmMaintainLevel,
    ecmFactory: queryParams.ecmFactory,
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

onMounted(() => {
  handleQuery();
});
</script>
