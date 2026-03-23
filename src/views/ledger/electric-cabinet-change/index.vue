<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="变更内容" prop="eccChangeContent">
          <el-input
            v-model="queryParams.eccChangeContent"
            placeholder="变更内容"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="变更实施人" prop="eccImplementer">
          <el-input
            v-model="queryParams.eccImplementer"
            placeholder="变更实施人"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="验收人" prop="eccChecker">
          <el-input
            v-model="queryParams.eccChecker"
            placeholder="验收人"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="变更后状态" prop="eccAfterStatus">
          <el-input
            v-model="queryParams.eccAfterStatus"
            placeholder="变更后状态"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="eccFactory">
          <el-input
            v-model="queryParams.eccFactory"
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
          v-hasPerm="['ledger:electric-cabinet-change:add']"
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
          key="eccChangeDate"
          label="变更日期"
          prop="eccChangeDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eccApplicant"
          label="变更申请人"
          prop="eccApplicant"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eccChangeReason"
          label="变更原因"
          prop="eccChangeReason"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eccChangeContent"
          label="变更内容"
          prop="eccChangeContent"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eccImplementer"
          label="变更实施人"
          prop="eccImplementer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eccChecker"
          label="验收人"
          prop="eccChecker"
          min-width="150"
          align="center"
        />
        <el-table-column label="变更后状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.eccAfterStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="eccDataUpdate"
          label="相关资料更新情况"
          prop="eccDataUpdate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eccFactory"
          label="所属工厂"
          prop="eccFactory"
          min-width="150"
          align="center"
        />

        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-cabinet-change:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-cabinet-document:delete']"
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

    <!-- 抽屉柜变更记录表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="150px">
        <el-form-item label="变更日期" prop="eccChangeDate">
          <el-date-picker
            v-model="formData.eccChangeDate"
            class="!w-[240px]"
            type="date"
            placeholder="变更日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="变更申请人" prop="eccApplicant">
          <el-input v-model="formData.eccApplicant" placeholder="变更申请人" />
        </el-form-item>

        <el-form-item label="变更原因" prop="eccChangeReason">
          <el-input v-model="formData.eccChangeReason" placeholder="变更原因" />
        </el-form-item>

        <el-form-item label="变更内容" prop="eccChangeContent">
          <el-input v-model="formData.eccChangeContent" placeholder="变更内容" />
        </el-form-item>

        <el-form-item label="变更实施人" prop="eccImplementer">
          <el-input v-model="formData.eccImplementer" placeholder="变更实施人" />
        </el-form-item>

        <el-form-item label="验收人" prop="eccChecker">
          <el-input v-model="formData.eccChecker" placeholder="验收人" />
        </el-form-item>

        <el-form-item label="变更后状态" prop="eccAfterStatus">
          <el-input v-model="formData.eccAfterStatus" placeholder="变更后状态" />
        </el-form-item>

        <el-form-item label="相关资料更新情况" prop="eccDataUpdate">
          <el-date-picker
            v-model="formData.eccDataUpdate"
            type="datetime"
            placeholder="相关资料更新情况"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="eccFactory">
          <el-input v-model="formData.eccFactory" placeholder="所属工厂" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <import-data v-model="importDialogVisible" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ElectricCabinetChange",
  inheritAttrs: false,
});

import ElectricCabinetChangeAPI, {
  ElectricCabinetChangePageVO,
  ElectricCabinetChangeForm,
  ElectricCabinetChangePageQuery,
} from "@/api/ledger/electric-cabinet-change-api";
import importData from "./import-data.vue";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible: Ref<boolean> = ref(false);
const queryParams = reactive<ElectricCabinetChangePageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 抽屉柜变更记录表格数据
const pageData = ref<ElectricCabinetChangePageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 抽屉柜变更记录表单数据
const formData = reactive<ElectricCabinetChangeForm>({});

// 抽屉柜变更记录表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  eccChangeDate: [{ required: true, message: "请输入变更日期", trigger: "blur" }],
  eccApplicant: [{ required: true, message: "请输入变更申请人", trigger: "blur" }],
  eccChangeReason: [{ required: true, message: "请输入变更原因", trigger: "blur" }],
  eccChangeContent: [{ required: true, message: "请输入变更内容", trigger: "blur" }],
  eccImplementer: [{ required: true, message: "请输入变更实施人", trigger: "blur" }],
  eccAfterStatus: [{ required: true, message: "请输入变更后状态", trigger: "blur" }],
  eccFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询抽屉柜变更记录 */
function handleQuery() {
  loading.value = true;
  ElectricCabinetChangeAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置抽屉柜变更记录查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开抽屉柜变更记录弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改抽屉柜变更记录";
    ElectricCabinetChangeAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增抽屉柜变更记录";
  }
}

/** 提交抽屉柜变更记录表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricCabinetChangeAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricCabinetChangeAPI.create(formData)
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

/** 关闭抽屉柜变更记录弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除抽屉柜变更记录 */
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
      ElectricCabinetChangeAPI.deleteByIds(ids)
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
const handleExport = () => {
  ElectricCabinetChangeAPI.export({
    eccChangeContent: queryParams.eccChangeContent,
    eccImplementer: queryParams.eccImplementer,
    eccChecker: queryParams.eccChecker,
    eccAfterStatus: queryParams.eccAfterStatus,
    eccFactroy: queryParams.eccFactory,
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
const handleOpenImportDialog = () => {
  importDialogVisible.value = true;
};
</script>
