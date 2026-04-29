<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="仪表位号" prop="tnkMeterTag">
          <el-input
            v-model="queryParams.tnkMeterTag"
            placeholder="仪表位号"
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
            v-hasPerm="['ledger:tnk-meter:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:tnk-meter:delete']"
            type="danger"
            icon="delete"
            :disabled="removeIds.length === 0"
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
            {{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          key="tnkMeterTag"
          label="仪表位号"
          prop="tnkMeterTag"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterDev"
          label="装置"
          prop="tnkMeterDev"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterPurp"
          label="用途"
          prop="tnkMeterPurp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterLoop"
          label="回路分类"
          prop="tnkMeterLoop"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterName"
          label="仪表名称"
          prop="tnkMeterName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterModel"
          label="型号"
          prop="tnkMeterModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterSpec"
          label="规格"
          prop="tnkMeterSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterRange"
          label="量程"
          prop="tnkMeterRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterManu"
          label="厂家"
          prop="tnkMeterManu"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterMeas"
          label="测量值"
          prop="tnkMeterMeas"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterMedProc"
          label="工艺介质"
          prop="tnkMeterMedProc"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterMedStat"
          label="介质状态"
          prop="tnkMeterMedStat"
          min-width="150"
          align="center"
        >
          <template #default="scope">
            <DictLabel v-model="scope.row.tnkMeterMedStat" code="craft-status" />
          </template>
        </el-table-column>
        <el-table-column
          key="tnkMeterPress"
          label="压力（Kpa）"
          prop="tnkMeterPress"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterTemp"
          label="温度（℃）"
          prop="tnkMeterTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterNomDia"
          label="公称通径"
          prop="tnkMeterNomDia"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterFaultPress"
          label="故障压力"
          prop="tnkMeterFaultPress"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterLeakStat"
          label="泄露状态"
          prop="tnkMeterLeakStat"
          min-width="150"
          align="center"
        >
          <template #default="scope">
            <DictLabel v-model="scope.row.tnkMeterLeakStat" code="leakstat" />
          </template>
        </el-table-column>
        <el-table-column
          key="tnkMeterLeakLv"
          label="等级"
          prop="tnkMeterLeakLv"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterChkTime"
          label="检查时间"
          prop="tnkMeterChkTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterChkCycle"
          label="检查周期"
          prop="tnkMeterChkCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterFactoryNo"
          label="出厂编号"
          prop="tnkMeterFactoryNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tnkMeterRemark"
          label="备注"
          prop="tnkMeterRemark"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.status" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="dvType"
          label="设备类型"
          prop="dvType"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:tnk-meter:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:tnk-meter:delete']"
              type="danger"
              size="small"
              link
              icon="delete"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
            <el-button
              v-hasPerm="['ledger:tnk-meter:repair']"
              type="warning"
              size="small"
              link
              icon="promotion"
              @click="handleOpenRepairDialog(scope.row)"
            >
              报修
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
    <import-data v-model="importDialogVisible"></import-data>
    <!-- 罐区仪表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="仪表位号" prop="tnkMeterTag">
          <el-input v-model="formData.tnkMeterTag" placeholder="仪表位号" />
        </el-form-item>

        <el-form-item label="装置" prop="tnkMeterDev">
          <el-input v-model="formData.tnkMeterDev" placeholder="装置" />
        </el-form-item>

        <el-form-item label="用途" prop="tnkMeterPurp">
          <el-input v-model="formData.tnkMeterPurp" placeholder="用途" />
        </el-form-item>

        <el-form-item label="回路分类" prop="tnkMeterLoop">
          <el-input v-model="formData.tnkMeterLoop" placeholder="回路分类" />
        </el-form-item>

        <el-form-item label="仪表名称" prop="tnkMeterName">
          <el-input v-model="formData.tnkMeterName" placeholder="仪表名称" />
        </el-form-item>

        <el-form-item label="型号" prop="tnkMeterModel">
          <el-input v-model="formData.tnkMeterModel" placeholder="型号" />
        </el-form-item>

        <el-form-item label="规格" prop="tnkMeterSpec">
          <el-input v-model="formData.tnkMeterSpec" placeholder="规格" />
        </el-form-item>

        <el-form-item label="量程" prop="tnkMeterRange">
          <el-input v-model="formData.tnkMeterRange" placeholder="量程" />
        </el-form-item>

        <el-form-item label="厂家" prop="tnkMeterManu">
          <el-input v-model="formData.tnkMeterManu" placeholder="厂家" />
        </el-form-item>

        <el-form-item label="测量值" prop="tnkMeterMeas">
          <el-input v-model="formData.tnkMeterMeas" placeholder="测量值" />
        </el-form-item>

        <el-form-item label="工艺介质" prop="tnkMeterMedProc">
          <el-input v-model="formData.tnkMeterMedProc" placeholder="工艺介质" />
        </el-form-item>

        <el-form-item label="介质状态" prop="tnkMeterMedStat">
          <Dict v-model="formData.tnkMeterMedStat" code="craft-status" />
        </el-form-item>

        <el-form-item label="压力（Kpa）" prop="tnkMeterPress">
          <el-input v-model="formData.tnkMeterPress" placeholder="压力（Kpa）" />
        </el-form-item>

        <el-form-item label="温度（℃）" prop="tnkMeterTemp">
          <el-input v-model="formData.tnkMeterTemp" placeholder="温度（℃）" />
        </el-form-item>

        <el-form-item label="公称通径" prop="tnkMeterNomDia">
          <el-input v-model="formData.tnkMeterNomDia" placeholder="公称通径" />
        </el-form-item>

        <el-form-item label="故障压力" prop="tnkMeterFaultPress">
          <el-input v-model="formData.tnkMeterFaultPress" placeholder="故障压力" />
        </el-form-item>

        <el-form-item label="泄露状态" prop="tnkMeterLeakStat">
          <Dict v-model="formData.tnkMeterLeakStat" code="leakstat" />
        </el-form-item>

        <el-form-item label="等级" prop="tnkMeterLeakLv">
          <el-input v-model="formData.tnkMeterLeakLv" placeholder="等级" />
        </el-form-item>

        <el-form-item label="检查时间" prop="tnkMeterChkTime">
          <el-date-picker
            v-model="formData.tnkMeterChkTime"
            type="datetime"
            placeholder="检查时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="检查周期" prop="tnkMeterChkCycle">
          <el-input v-model="formData.tnkMeterChkCycle" placeholder="检查周期" />
        </el-form-item>

        <el-form-item label="出厂编号" prop="tnkMeterFactoryNo">
          <el-input v-model="formData.tnkMeterFactoryNo" placeholder="出厂编号" />
        </el-form-item>

        <el-form-item label="备注" prop="tnkMeterRemark">
          <el-input v-model="formData.tnkMeterRemark" placeholder="备注" />
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
      :visable="repairDialogVisible"
      @cancel="handleCloseRepairDialog"
      @confirm="handleSubmitRepair"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "TnkMeter",
  inheritAttrs: false,
});

import TnkMeterAPI, {
  TnkMeterPageVO,
  TnkMeterForm,
  TnkMeterPageQuery,
} from "@/api/ledger/tnk-meter-api";
import importData from "./componets/import-data.vue";
import maintance from "./componets/maintance.vue";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { TnkMeterMaintenanceForm } from "./index";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const queryParams = reactive<TnkMeterPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 罐区仪表格数据
const pageData = ref<TnkMeterPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 报修弹窗
const repairDialogVisible = ref(false);

// 罐区仪表单数据
const formData = reactive<TnkMeterForm>({});

// 报修表单数据
const maintanceFormData = reactive<TnkMeterMaintenanceForm>({});

/** 重置表单数据 */
function resetFormData() {
  Object.keys(formData).forEach((key) => {
    delete (formData as any)[key];
  });
  // 设置默认值
  formData.status = 1;
  formData.tnkMeterMedStat = "0";
  formData.tnkMeterLeakStat = 0;
}

// 罐区仪表单校验规则
const rules = reactive({
  tnkMeterTag: [{ required: true, message: "请输入仪表位号", trigger: "blur" }],
  tnkMeterDev: [{ required: true, message: "请输入装置", trigger: "blur" }],
  tnkMeterPurp: [{ required: true, message: "请输入用途", trigger: "blur" }],
  tnkMeterName: [{ required: true, message: "请输入仪表名称", trigger: "blur" }],
  tnkMeterModel: [{ required: true, message: "请输入型号", trigger: "blur" }],
  tnkMeterSpec: [{ required: true, message: "请输入规格", trigger: "blur" }],
  tnkMeterRange: [{ required: true, message: "请输入量程", trigger: "blur" }],
  tnkMeterManu: [{ required: true, message: "请输入厂家", trigger: "blur" }],
  tnkMeterChkTime: [{ required: true, message: "请输入检查时间", trigger: "blur" }],
  tnkMeterChkCycle: [{ required: true, message: "请输入检查周期", trigger: "blur" }],
  tnkMeterFactoryNo: [{ required: true, message: "请输入出厂编号", trigger: "blur" }],
  status: [{ required: true, message: "请选择设备状态", trigger: "change" }],
  dvType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
});

/** 查询罐区仪 */
function handleQuery() {
  loading.value = true;
  TnkMeterAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置罐区仪查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开罐区仪弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改罐区仪";
    TnkMeterAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增罐区仪";
    resetFormData();
  }
}

/** 提交罐区仪表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        TnkMeterAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        TnkMeterAPI.create(formData)
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

/** 关闭罐区仪弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  // 延迟清空表单数据，确保 resetFields 完成
  setTimeout(() => {
    Object.keys(formData).forEach((key) => {
      delete (formData as any)[key];
    });
  }, 0);
}

/** 打开报修弹窗 */
function handleOpenRepairDialog(row: TnkMeterPageVO) {
  repairDialogVisible.value = true;
  maintanceFormData.tnkMeterTag = row.tnkMeterTag;
}

/** 关闭报修弹窗 */
function handleCloseRepairDialog() {
  repairDialogVisible.value = false;
  maintanceFormData.id = undefined;
  maintanceFormData.maintainPlanType = undefined;
  maintanceFormData.maintainPlanYear = undefined;
  maintanceFormData.maintainPlanMonth = undefined;
  maintanceFormData.maintainPlanEquipCode = undefined;
  maintanceFormData.maintainPlanEquipName = undefined;
  maintanceFormData.maintainPlanEquipType = undefined;
  maintanceFormData.maintainPlanContent = undefined;
  maintanceFormData.maintainPlanScheduleDate = undefined;
  maintanceFormData.maintainPlanDuration = undefined;
  maintanceFormData.maintainPlanDept = undefined;
  maintanceFormData.maintainPlanPerson = undefined;
  maintanceFormData.maintainPlanSafetyLevel = undefined;
  maintanceFormData.maintainPlanSafetyMeasure = undefined;
  maintanceFormData.maintainPlanStatus = undefined;
  maintanceFormData.maintainPlanActualDate = undefined;
}

/** 提交报修 */
function handleSubmitRepair() {
  MaintainPlanAPI.create(maintanceFormData).then(() => {
    ElMessage.success("报修成功");
    handleCloseRepairDialog();
    handleResetQuery();
  });
}

/** 删除罐区仪 */
function handleDelete(id?: number) {
  const ids = id ? [id] : removeIds.value;
  if (ids.length === 0) {
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
      TnkMeterAPI.deleteByIds(ids.join(","))
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
const handleExport = () => {
  TnkMeterAPI.export({
    /** 仪表位号 */
    tnkMeterTag: queryParams.tnkMeterTag,
    /** 设备状态 */
    status: queryParams.status,
    /** 设备类型 */
    dvType: queryParams.dvType,
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
onMounted(() => {
  handleQuery();
});
</script>
