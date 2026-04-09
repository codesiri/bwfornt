<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="报告编号" prop="eciReportNo">
          <el-input
            v-model="queryParams.eciReportNo"
            placeholder="报告编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="检修 / 试验日期" prop="eciInspectDate">
          <el-date-picker
            v-model="queryParams.eciInspectDate"
            class="!w-[240px]"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="检修 / 试验单位" prop="eciInspectUnit">
          <el-input
            v-model="queryParams.eciInspectUnit"
            placeholder="检修 / 试验单位"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="检修 / 试验人员" prop="eciInspectPerson">
          <el-input
            v-model="queryParams.eciInspectPerson"
            placeholder="检修 / 试验人员"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="检修 / 试验类型" prop="eciInspectType">
          <el-input
            v-model="queryParams.eciInspectType"
            placeholder="检修 / 试验类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="检修 / 试验项目" prop="eciInspectItem">
          <el-input
            v-model="queryParams.eciInspectItem"
            placeholder="检修 / 试验项目"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="试验数据" prop="eciTestData">
          <el-input
            v-model="queryParams.eciTestData"
            placeholder="试验数据"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="合格标准" prop="eciStandard">
          <el-input
            v-model="queryParams.eciStandard"
            placeholder="合格标准"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="eciFactory">
          <el-input
            v-model="queryParams.eciFactory"
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
          v-hasPerm="['ledger:electric-cabinet-inspection:add']"
          type="success"
          icon="plus"
          @click="handleOpenDialog()"
        >
          新增
        </el-button>
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
        <el-table-column
          key="eciReportNo"
          label="报告编号"
          prop="eciReportNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciInspectDate"
          label="检修 / 试验日期"
          prop="eciInspectDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciInspectUnit"
          label="检修 / 试验单位"
          prop="eciInspectUnit"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciInspectPerson"
          label="检修 / 试验人员"
          prop="eciInspectPerson"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciInspectType"
          label="检修 / 试验类型"
          prop="eciInspectType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciInspectItem"
          label="检修 / 试验项目"
          prop="eciInspectItem"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciTestData"
          label="试验数据"
          prop="eciTestData"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciStandard"
          label="合格标准"
          prop="eciStandard"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciResult"
          label="结果判定"
          prop="eciResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciRectifyContent"
          label="整改内容"
          prop="eciRectifyContent"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciRecheckResult"
          label="复检结果"
          prop="eciRecheckResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciFactory"
          label="所属工厂"
          prop="eciFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciReserve1"
          label="备用1"
          prop="eciReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciReserve2"
          label="备用2"
          prop="eciReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eciReserve3"
          label="备用3"
          prop="eciReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-cabinet-inspection:edit']"
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

    <!-- 抽屉柜检修试验记录表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">

        <el-form-item label="报告编号" prop="eciReportNo">
          <el-input v-model="formData.eciReportNo" placeholder="报告编号" />
        </el-form-item>

        <el-form-item label="检修 / 试验日期" prop="eciInspectDate">
          <el-date-picker
            v-model="formData.eciInspectDate"
            class="!w-[240px]"
            type="date"
            placeholder="检修 / 试验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检修 / 试验单位" prop="eciInspectUnit">
          <el-input v-model="formData.eciInspectUnit" placeholder="检修 / 试验单位" />
        </el-form-item>

        <el-form-item label="检修 / 试验人员" prop="eciInspectPerson">
          <el-input v-model="formData.eciInspectPerson" placeholder="检修 / 试验人员" />
        </el-form-item>

        <el-form-item label="检修 / 试验类型" prop="eciInspectType">
          <el-input v-model="formData.eciInspectType" placeholder="检修 / 试验类型" />
        </el-form-item>

        <el-form-item label="检修 / 试验项目" prop="eciInspectItem">
          <el-input v-model="formData.eciInspectItem" placeholder="检修 / 试验项目" />
        </el-form-item>

        <el-form-item label="试验数据" prop="eciTestData">
          <el-input v-model="formData.eciTestData" placeholder="试验数据" />
        </el-form-item>

        <el-form-item label="合格标准" prop="eciStandard">
          <el-input v-model="formData.eciStandard" placeholder="合格标准" />
        </el-form-item>

        <el-form-item label="结果判定" prop="eciResult">
          <el-input v-model="formData.eciResult" placeholder="结果判定" />
        </el-form-item>

        <el-form-item label="整改内容" prop="eciRectifyContent">
          <el-input v-model="formData.eciRectifyContent" placeholder="整改内容" />
        </el-form-item>

        <el-form-item label="复检结果" prop="eciRecheckResult">
          <el-input v-model="formData.eciRecheckResult" placeholder="复检结果" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="eciFactory">
          <el-input v-model="formData.eciFactory" placeholder="所属工厂" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <import-data v-model="importDialogVisible"/>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ElectricCabinetInspection",
  inheritAttrs: false,
});

import ElectricCabinetInspectionAPI, {
  ElectricCabinetInspectionPageVO,
  ElectricCabinetInspectionForm,
  ElectricCabinetInspectionPageQuery,
} from "@/api/ledger/electric-cabinet-inspection-api";
import importData from "./import-data.vue";
const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible =ref(false)
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<ElectricCabinetInspectionPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 抽屉柜检修试验记录表格数据
const pageData = ref<ElectricCabinetInspectionPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 抽屉柜检修试验记录表单数据
const formData = reactive<ElectricCabinetInspectionForm>({});

// 抽屉柜检修试验记录表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  eciReportNo: [{ required: true, message: "请输入报告编号", trigger: "blur" }],
  eciInspectDate: [{ required: true, message: "请输入检修 / 试验日期", trigger: "blur" }],
  eciInspectUnit: [{ required: true, message: "请输入检修 / 试验单位", trigger: "blur" }],
  eciInspectPerson: [{ required: true, message: "请输入检修 / 试验人员", trigger: "blur" }],
  eciInspectType: [{ required: true, message: "请输入检修 / 试验类型", trigger: "blur" }],
  eciInspectItem: [{ required: true, message: "请输入检修 / 试验项目", trigger: "blur" }],
  eciResult: [{ required: true, message: "请输入结果判定", trigger: "blur" }],
});

/** 查询抽屉柜检修试验记录 */
function handleQuery() {
  loading.value = true;
  ElectricCabinetInspectionAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置抽屉柜检修试验记录查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开抽屉柜检修试验记录弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改抽屉柜检修试验记录";
    ElectricCabinetInspectionAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增抽屉柜检修试验记录";
  }
}

/** 提交抽屉柜检修试验记录表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricCabinetInspectionAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricCabinetInspectionAPI.create(formData)
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

/** 关闭抽屉柜检修试验记录弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除抽屉柜检修试验记录 */
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
      ElectricCabinetInspectionAPI.deleteByIds(ids)
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
const handleOpenImportDialog = ()=>{
  importDialogVisible.value = true;
};
const handleExport = ()=>{
   ElectricCabinetInspectionAPI.export({
    eciReportNo: queryParams.eciReportNo,
    eciInspectDate: queryParams.eciInspectDate,
    eciInspectUnit: queryParams.eciInspectUnit,
    eciInspectPerson: queryParams.eciInspectPerson,
    eciInspectType: queryParams.eciInspectType,
    eciInspectItem: queryParams.eciInspectItem,
    eciTestData: queryParams.eciTestData,
    eciStandard: queryParams.eciStandard,
    eciFactory: queryParams.eciFactory
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
