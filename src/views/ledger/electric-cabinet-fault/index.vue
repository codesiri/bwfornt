<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="故障日期" prop="ecfFaultDate">
          <el-date-picker
            class="!w-[240px]"
            v-model="queryParams.ecfFaultDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="故障发生时间" prop="ecfFaultTime">
          <el-date-picker
            class="!w-[240px]"
            v-model="queryParams.ecfFaultTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="故障柜体 / 抽屉编号" prop="ecfFaultCabinet">
          <el-input
            v-model="queryParams.ecfFaultCabinet"
            placeholder="故障柜体 / 抽屉编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="维修人员" prop="ecfRepairPerson">
          <el-input
            v-model="queryParams.ecfRepairPerson"
            placeholder="维修人员"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="维修完成时间" prop="ecfRepairCompleteTime">
          <el-date-picker
            v-model="queryParams.ecfRepairCompleteTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="	恢复运行时间" prop="ecfRecoverTime">
          <el-date-picker
            v-model="queryParams.ecfRecoverTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="验收人" prop="ecfChecker">
          <el-input
            v-model="queryParams.ecfChecker"
            placeholder="验收人"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="故障分类" prop="ecfFaultType">
          <el-input
            v-model="queryParams.ecfFaultType"
            placeholder="故障分类"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="ecfFactory">
          <el-input
            v-model="queryParams.ecfFactory"
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
            v-hasPerm="['ledger:electric-cabinet-fault:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:electric-cabinet-fault:delete']"
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
          key="ecfFaultDate"
          label="故障日期"
          prop="ecfFaultDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfFaultTime"
          label="故障发生时间"
          prop="ecfFaultTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfFaultCabinet"
          label="故障柜体 / 抽屉编号"
          prop="ecfFaultCabinet"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfFaultPhenomenon"
          label="故障现象"
          prop="ecfFaultPhenomenon"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfFaultReason"
          label="故障原因分析"
          prop="ecfFaultReason"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfRepairPerson"
          label="维修人员"
          prop="ecfRepairPerson"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfRepairScheme"
          label="维修方案"
          prop="ecfRepairScheme"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfReplaceComponent"
          label="更换元器件"
          prop="ecfReplaceComponent"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfRepairCompleteTime"
          label="维修完成时间"
          prop="ecfRepairCompleteTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfRecoverTime"
          label="	恢复运行时间"
          prop="ecfRecoverTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfRepairResult"
          label="维修结果"
          prop="ecfRepairResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfChecker"
          label="验收人"
          prop="ecfChecker"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfFaultType"
          label="故障分类"
          prop="ecfFaultType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecfFactory"
          label="所属工厂"
          prop="ecfFactory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-cabinet-fault:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-cabinet-fault:delete']"
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

    <!-- 抽屉柜故障维修记录表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="故障日期" prop="ecfFaultDate">
          <el-date-picker
            class="!w-[240px]"
            v-model="formData.ecfFaultDate"
            type="date"
            placeholder="故障日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="故障发生时间" prop="ecfFaultTime">
          <el-date-picker
            class="!w-[240px]"
            v-model="formData.ecfFaultTime"
            type="date"
            placeholder="故障发生时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="故障柜体 / 抽屉编号" prop="ecfFaultCabinet">
          <el-input v-model="formData.ecfFaultCabinet" placeholder="故障柜体 / 抽屉编号" />
        </el-form-item>

        <el-form-item label="故障现象" prop="ecfFaultPhenomenon">
          <el-input v-model="formData.ecfFaultPhenomenon" placeholder="故障现象" />
        </el-form-item>

        <el-form-item label="故障原因分析" prop="ecfFaultReason">
          <el-input v-model="formData.ecfFaultReason" placeholder="故障原因分析" />
        </el-form-item>

        <el-form-item label="维修人员" prop="ecfRepairPerson">
          <el-input v-model="formData.ecfRepairPerson" placeholder="维修人员" />
        </el-form-item>

        <el-form-item label="维修方案" prop="ecfRepairScheme">
          <el-input v-model="formData.ecfRepairScheme" placeholder="维修方案" />
        </el-form-item>

        <el-form-item label="更换元器件" prop="ecfReplaceComponent">
          <el-input v-model="formData.ecfReplaceComponent" placeholder="更换元器件" />
        </el-form-item>

        <el-form-item label="维修完成时间" prop="ecfRepairCompleteTime">
          <el-date-picker
            v-model="formData.ecfRepairCompleteTime"
            type="datetime"
            placeholder="维修完成时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="	恢复运行时间" prop="ecfRecoverTime">
          <el-date-picker
            v-model="formData.ecfRecoverTime"
            type="datetime"
            placeholder="	恢复运行时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="维修结果" prop="ecfRepairResult">
          <el-input v-model="formData.ecfRepairResult" placeholder="维修结果" />
        </el-form-item>

        <el-form-item label="验收人" prop="ecfChecker">
          <el-input v-model="formData.ecfChecker" placeholder="验收人" />
        </el-form-item>

        <el-form-item label="故障分类" prop="ecfFaultType">
          <el-input v-model="formData.ecfFaultType" placeholder="故障分类" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="ecfFactory">
          <el-input v-model="formData.ecfFactory" placeholder="所属工厂" />
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
  name: "ElectricCabinetFault",
  inheritAttrs: false,
});

import ElectricCabinetFaultAPI, {
  ElectricCabinetFaultPageVO,
  ElectricCabinetFaultForm,
  ElectricCabinetFaultPageQuery,
} from "@/api/ledger/electric-cabinet-fault-api";
import importData from "./import-data.vue";
const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<ElectricCabinetFaultPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

const getRowIndex = (index: number) => {
  return (queryParams.pageNum - 1) * queryParams.pageSize + index + 1;
};

// 抽屉柜故障维修记录表格数据
const pageData = ref<ElectricCabinetFaultPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 抽屉柜故障维修记录表单数据
const formData = reactive<ElectricCabinetFaultForm>({});

// 抽屉柜故障维修记录表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  ecfFaultDate: [{ required: true, message: "请输入故障日期", trigger: "blur" }],
  ecfFaultTime: [{ required: true, message: "请输入故障发生时间", trigger: "blur" }],
  ecfFaultCabinet: [{ required: true, message: "请输入故障柜体 / 抽屉编号", trigger: "blur" }],
  ecfFaultPhenomenon: [{ required: true, message: "请输入故障现象", trigger: "blur" }],
  ecfRepairPerson: [{ required: true, message: "请输入维修人员", trigger: "blur" }],
  ecfRepairResult: [{ required: true, message: "请输入维修结果", trigger: "blur" }],
});

/** 查询抽屉柜故障维修记录 */
function handleQuery() {
  loading.value = true;
  ElectricCabinetFaultAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置抽屉柜故障维修记录查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开抽屉柜故障维修记录弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改抽屉柜故障维修记录";
    ElectricCabinetFaultAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增抽屉柜故障维修记录";
  }
}

/** 提交抽屉柜故障维修记录表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricCabinetFaultAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricCabinetFaultAPI.create(formData)
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

/** 关闭抽屉柜故障维修记录弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除抽屉柜故障维修记录 */
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
      ElectricCabinetFaultAPI.deleteByIds(ids)
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
  ElectricCabinetFaultAPI.export({
    ecfFaultDate: queryParams.ecfFaultDate,
    ecfFaultTime: queryParams.ecfFaultTime,
    ecfFaultCabinet: queryParams.ecfFaultCabinet,
    ecfRepairPerson: queryParams.ecfRepairPerson,
    ecfRepairCompleteTime: queryParams.ecfRepairCompleteTime,
    ecfRecoverTime: queryParams.ecfRecoverTime,
    ecfChecker: queryParams.ecfChecker,
    ecfFaultType: queryParams.ecfFaultType,
    ecfFactory: queryParams.ecfFactory,
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
onMounted(() => {
  handleQuery();
});
</script>
