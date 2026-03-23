<template>
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item class="search-buttons" label="位号">
          <el-input v-model="queryParams.tagNumber" placeholder="请输入位号"></el-input>
        </el-form-item>
        <el-form-item label="仪表名称">
          <el-input v-model="queryParams.instrumentName" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备状态">
          <dict v-model="queryParams.radioactiveStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="factory">
          <el-input
            v-model="queryParams.factory"
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
    <!-- 放射仪表列表 -->
    <el-card shadow="never">
      <div class="data-table__toolbar">
        <div class="data-table__toolbar--actions">
          <el-button
            v-hasPerm="['ledger:radiation-instrument:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:radiation-instrument:delete']"
            type="danger"
            :disabled="removeIds.length === 0"
            icon="delete"
            @click="handleDelete()"
          >
            删除
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
        <el-table-column
          key="unitName"
          label="装置名称"
          prop="unitName"
          min-width="150"
          align="center"
        />
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
        <el-table-column label="状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.radioactiveStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="sourceTagNumber"
          label="射源位号"
          prop="sourceTagNumber"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sourceForm"
          label="射源形式"
          prop="sourceForm"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="material"
          label="材质"
          prop="material"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="strength"
          label="强度"
          prop="strength"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="powerSupply"
          label="供电"
          prop="powerSupply"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="outputSignal"
          label="输出信号"
          prop="outputSignal"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="measuringRange"
          label="测量范围"
          prop="measuringRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="accuracy"
          label="精度"
          prop="accuracy"
          min-width="150"
          align="center"
        />
        <el-table-column label="是否联锁（是 / 否）" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.whetherInterlocked" code="interlocked" />
          </template>
        </el-table-column>
        <el-table-column
          key="interlockSetpoint"
          label="联锁设定值"
          prop="interlockSetpoint"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="installationLocationAndPurpose"
          label="安装位置及用途"
          prop="installationLocationAndPurpose"
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
          key="manufacturer"
          label="生产厂家"
          prop="manufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:radiation-instrument:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:radiation-instrument:delete']"
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

    <!-- 放射仪表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" label-width="150px" :rules="rules">
        <el-form-item label="位号" prop="tagNumber">
          <el-input v-model="formData.tagNumber" placeholder="位号" />
        </el-form-item>

        <el-form-item label="装置名称" prop="unitName">
          <el-input v-model="formData.unitName" placeholder="装置名称" />
        </el-form-item>

        <el-form-item label="仪表名称" prop="instrumentName">
          <el-input v-model="formData.instrumentName" placeholder="仪表名称" />
        </el-form-item>

        <el-form-item label="状态" prop="radioactiveStatus">
          <Dict v-model="formData.radioactiveStatus" code="status" />
        </el-form-item>

        <el-form-item label="射源位号" prop="sourceTagNumber">
          <el-input v-model="formData.sourceTagNumber" placeholder="射源位号" />
        </el-form-item>

        <el-form-item label="射源形式" prop="sourceForm">
          <el-input v-model="formData.sourceForm" placeholder="射源形式" />
        </el-form-item>

        <el-form-item label="材质" prop="material">
          <el-input v-model="formData.material" placeholder="材质" />
        </el-form-item>

        <el-form-item label="强度" prop="strength">
          <el-input v-model="formData.strength" placeholder="强度" />
        </el-form-item>

        <el-form-item label="供电" prop="powerSupply">
          <el-input v-model="formData.powerSupply" placeholder="供电" />
        </el-form-item>

        <el-form-item label="输出信号" prop="outputSignal">
          <el-input v-model="formData.outputSignal" placeholder="输出信号" />
        </el-form-item>

        <el-form-item label="测量范围" prop="measuringRange">
          <el-input v-model="formData.measuringRange" placeholder="测量范围" />
        </el-form-item>

        <el-form-item label="精度" prop="accuracy">
          <el-input v-model="formData.accuracy" placeholder="精度" />
        </el-form-item>

        <el-form-item label="是否联锁（是 / 否）" prop="whetherInterlocked">
          <Dict v-model="formData.whetherInterlocked" code="interlocked" />
        </el-form-item>

        <el-form-item label="联锁设定值" prop="interlockSetpoint">
          <el-input v-model="formData.interlockSetpoint" placeholder="联锁设定值" />
        </el-form-item>

        <el-form-item label="安装位置及用途" prop="installationLocationAndPurpose">
          <el-input
            v-model="formData.installationLocationAndPurpose"
            placeholder="安装位置及用途"
          />
        </el-form-item>

        <el-form-item label="规格型号" prop="specificationModel">
          <el-input v-model="formData.specificationModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="formData.manufacturer" placeholder="生产厂家" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 导入 -->
    <RadiationInstrumentImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "RadiationInstrument",
  inheritAttrs: false,
});

import RadiationInstrumentAPI, {
  RadiationInstrumentPageVO,
  RadiationInstrumentForm,
  RadiationInstrumentPageQuery,
} from "@/api/ledger/radiation-instrument-api";
import RadiationInstrumentImport from "./RadiationInstrumentImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const queryParams = reactive<RadiationInstrumentPageQuery>({
  pageNum: 1,
  pageSize: 10,
  instrumentName: "",
  tagNumber: "",
  radioactiveStatus: undefined,
});

// 放射仪表格数据
const pageData = ref<RadiationInstrumentPageVO[]>([]);

// 弹窗
const dialog = reactive({
  visible: false,
  title: "新增放射仪",
});

// 放射仪表单数据
const formData = reactive<RadiationInstrumentForm>({});

// 放射仪表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  unitName: [{ required: true, message: "请输入装置名称", trigger: "blur" }],
  tagNumber: [{ required: true, message: "请输入位号", trigger: "blur" }],
  instrumentName: [{ required: true, message: "请输入仪表名称", trigger: "blur" }],
  sourceTagNumber: [{ required: true, message: "请输入射源位号", trigger: "blur" }],
  material: [{ required: true, message: "请输入材质", trigger: "blur" }],
  measuringRange: [{ required: true, message: "请输入测量范围", trigger: "blur" }],
  accuracy: [{ required: true, message: "请输入精度", trigger: "blur" }],
  whetherInterlocked: [{ required: true, message: "请输入是否联锁（是 / 否）", trigger: "blur" }],
  installationLocationAndPurpose: [
    { required: true, message: "请输入安装位置及用途", trigger: "blur" },
  ],
  specificationModel: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  manufacturer: [{ required: true, message: "请输入生产厂家", trigger: "blur" }],
  radioactiveStatus: [{ required: true, message: "请输入状态", trigger: "blur" }],
});

/** 查询放射仪 */
function handleQuery() {
  loading.value = true;
  RadiationInstrumentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置放射仪查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开放射仪弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改放射仪表";
    RadiationInstrumentAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增放射仪表";
  }
}

/** 提交放射仪表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        RadiationInstrumentAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        RadiationInstrumentAPI.create(formData)
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

/** 关闭放射仪弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除放射仪 */
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
      RadiationInstrumentAPI.deleteByIds(ids)
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
  console.log(queryParams);

  RadiationInstrumentAPI.export({
    tagNumber: queryParams.tagNumber as string,
    instrumentName: queryParams.instrumentName as string,
    factory: queryParams.factory as string,
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

onMounted(() => {
  handleQuery();
});
</script>
