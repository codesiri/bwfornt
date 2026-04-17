<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="设备位号" prop="analyInstrumentCode">
          <el-input
            v-model="queryParams.analyInstrumentCode"
            placeholder="设备位号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备类型" prop="analyInstrumentType">
          <el-input
            v-model="queryParams.analyInstrumentType"
            placeholder="设备类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备大类" prop="analyInstrumentBig">
          <el-input
            v-model="queryParams.analyInstrumentBig"
            placeholder="设备大类"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="analyInstrumentStatus">
          <Dict v-model="queryParams.analyInstrumentStatus" code="status" />
        </el-form-item>
        <el-form-item label="是否参与检测" prop="analyInstrumentMonitor">
          <Dict v-model="queryParams.analyInstrumentMonitor" code="monitor" />
        </el-form-item>
        <el-form-item label="是否参与联锁" prop="analyInstrumentLock">
          <Dict v-model="queryParams.analyInstrumentLock" code="interlocked" />
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
            v-hasPerm="['ledger:analy-instrument:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:analy-instrument:delete']"
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
        label-width="auto"
        border
      >
        <el-table-column
          key="analyInstrumentCode"
          label="设备位号"
          prop="analyInstrumentCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentPurpose"
          label="用途(原设备用途)"
          prop="analyInstrumentPurpose"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentDept"
          label="所属部门"
          prop="analyInstrumentDept"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentType"
          label="设备类型"
          prop="analyInstrumentType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentBig"
          label="设备大类"
          prop="analyInstrumentBig"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.analyInstrumentStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="analyInstrumentPlant"
          label="装置"
          prop="analyInstrumentPlant"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentUnit"
          label="单元"
          prop="analyInstrumentUnit"
          min-width="150"
          align="center"
        />
        <el-table-column label="是否参与检测" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.analyInstrumentMonitor" code="monitor" />
          </template>
        </el-table-column>
        <el-table-column label="是否参与联锁" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.analyInstrumentLock" code="interlocked" />
          </template>
        </el-table-column>
        <el-table-column
          key="analyInstrumentLinkVal"
          label="联锁值"
          prop="analyInstrumentLinkVal"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentAlarmVal"
          label="报警值"
          prop="analyInstrumentAlarmVal"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentName"
          label="设备名称"
          prop="analyInstrumentName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentProcess"
          label="工艺介质"
          prop="analyInstrumentProcess"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentOpTemp"
          label="操作温度"
          prop="analyInstrumentOpTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentOpPress"
          label="操作压力"
          prop="analyInstrumentOpPress"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentRange"
          label="测量范围"
          prop="analyInstrumentRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentMeasUnit"
          label="单位"
          prop="analyInstrumentMeasUnit"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentSet"
          label="台件数"
          prop="analyInstrumentSet"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentCircuit"
          label="回路数"
          prop="analyInstrumentCircuit"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentSupplier"
          label="供应商"
          prop="analyInstrumentSupplier"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentProdDate"
          label="生产日期"
          prop="analyInstrumentProdDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentUseDate"
          label="投用日期"
          prop="analyInstrumentUseDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentGuaranteeDate"
          label="质保日期"
          prop="analyInstrumentGuaranteeDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentMaintainFlag"
          label="是否质保期内(0/1)"
          prop="analyInstrumentMaintainFlag"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentLubePeriod"
          label="润滑周期"
          prop="analyInstrumentLubePeriod"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentLubeDate"
          label="润滑日期"
          prop="analyInstrumentLubeDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentVoltage"
          label="供电电压"
          prop="analyInstrumentVoltage"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentExplosion"
          label="防爆等级"
          prop="analyInstrumentExplosion"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentProtection"
          label="防护等级"
          prop="analyInstrumentProtection"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentManufacturer"
          label="生产厂家"
          prop="analyInstrumentManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentSpec"
          label="规格型号"
          prop="analyInstrumentSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="analyInstrumentCalibDate"
          label="定修时间"
          prop="analyInstrumentCalibDate"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:analy-instrument:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:analy-instrument:repair']"
              type="warning"
              size="small"
              link
              icon="tools"
              @click="handleRepair(scope.row)"
            >
              报修
            </el-button>
            <el-button
              v-hasPerm="['ledger:analy-instrument:delete']"
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

    <!-- 分析仪表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="150px">
        <el-form-item label="设备位号" prop="analyInstrumentCode">
          <el-input v-model="formData.analyInstrumentCode" placeholder="设备位号" />
        </el-form-item>

        <el-form-item label="用途(原设备用途)" prop="analyInstrumentPurpose">
          <el-input v-model="formData.analyInstrumentPurpose" placeholder="用途(原设备用途)" />
        </el-form-item>

        <el-form-item label="所属部门" prop="analyInstrumentDept">
          <el-input v-model="formData.analyInstrumentDept" placeholder="所属部门" />
        </el-form-item>

        <el-form-item label="设备类型" prop="analyInstrumentType">
          <el-input v-model="formData.analyInstrumentType" placeholder="设备类型" />
        </el-form-item>

        <el-form-item label="设备大类" prop="analyInstrumentBig">
          <el-input v-model="formData.analyInstrumentBig" placeholder="设备大类" />
        </el-form-item>

        <el-form-item label="设备状态" prop="analyInstrumentStatus">
          <Dict v-model="formData.analyInstrumentStatus" code="status" />
        </el-form-item>

        <el-form-item label="装置" prop="analyInstrumentPlant">
          <el-input v-model="formData.analyInstrumentPlant" placeholder="装置" />
        </el-form-item>

        <el-form-item label="单元" prop="analyInstrumentUnit">
          <el-input v-model="formData.analyInstrumentUnit" placeholder="单元" />
        </el-form-item>

        <el-form-item label="是否参与检测" prop="analyInstrumentMonitor">
          <Dict v-model="formData.analyInstrumentMonitor" code="monitor" />
        </el-form-item>

        <el-form-item label="是否参与联锁" prop="analyInstrumentLock">
          <Dict v-model="formData.analyInstrumentLock" code="interlocked" />
        </el-form-item>

        <el-form-item label="联锁值" prop="analyInstrumentLinkVal">
          <el-input v-model="formData.analyInstrumentLinkVal" placeholder="联锁值" />
        </el-form-item>

        <el-form-item label="报警值" prop="analyInstrumentAlarmVal">
          <el-input v-model="formData.analyInstrumentAlarmVal" placeholder="报警值" />
        </el-form-item>

        <el-form-item label="设备名称" prop="analyInstrumentName">
          <el-input v-model="formData.analyInstrumentName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="工艺介质" prop="analyInstrumentProcess">
          <el-input v-model="formData.analyInstrumentProcess" placeholder="工艺介质" />
        </el-form-item>

        <el-form-item label="操作温度" prop="analyInstrumentOpTemp">
          <el-input v-model="formData.analyInstrumentOpTemp" placeholder="操作温度" />
        </el-form-item>

        <el-form-item label="操作压力" prop="analyInstrumentOpPress">
          <el-input v-model="formData.analyInstrumentOpPress" placeholder="操作压力" />
        </el-form-item>

        <el-form-item label="测量范围" prop="analyInstrumentRange">
          <el-input v-model="formData.analyInstrumentRange" placeholder="测量范围" />
        </el-form-item>

        <el-form-item label="单位" prop="analyInstrumentMeasUnit">
          <el-input v-model="formData.analyInstrumentMeasUnit" placeholder="单位" />
        </el-form-item>

        <el-form-item label="台件数" prop="analyInstrumentSet">
          <el-input v-model="formData.analyInstrumentSet" placeholder="台件数" />
        </el-form-item>

        <el-form-item label="回路数" prop="analyInstrumentCircuit">
          <el-input v-model="formData.analyInstrumentCircuit" placeholder="回路数" />
        </el-form-item>

        <el-form-item label="供应商" prop="analyInstrumentSupplier">
          <el-input v-model="formData.analyInstrumentSupplier" placeholder="供应商" />
        </el-form-item>

        <el-form-item label="生产日期" prop="analyInstrumentProdDate">
          <el-date-picker
            v-model="formData.analyInstrumentProdDate"
            type="datetime"
            placeholder="生产日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="投用日期" prop="analyInstrumentUseDate">
          <el-date-picker
            v-model="formData.analyInstrumentUseDate"
            type="datetime"
            placeholder="投用日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="质保日期" prop="analyInstrumentGuaranteeDate">
          <el-date-picker
            v-model="formData.analyInstrumentGuaranteeDate"
            type="datetime"
            placeholder="质保日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="是否质保期内(0/1)" prop="analyInstrumentMaintainFlag">
          <el-input
            v-model="formData.analyInstrumentMaintainFlag"
            placeholder="是否质保期内(0/1)"
          />
        </el-form-item>

        <el-form-item label="润滑周期" prop="analyInstrumentLubePeriod">
          <el-input v-model="formData.analyInstrumentLubePeriod" placeholder="润滑周期" />
        </el-form-item>

        <el-form-item label="润滑日期" prop="analyInstrumentLubeDate">
          <el-date-picker
            v-model="formData.analyInstrumentLubeDate"
            type="datetime"
            placeholder="润滑日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="供电电压" prop="analyInstrumentVoltage">
          <el-input v-model="formData.analyInstrumentVoltage" placeholder="供电电压" />
        </el-form-item>

        <el-form-item label="防爆等级" prop="analyInstrumentExplosion">
          <el-input v-model="formData.analyInstrumentExplosion" placeholder="防爆等级" />
        </el-form-item>

        <el-form-item label="防护等级" prop="analyInstrumentProtection">
          <el-input v-model="formData.analyInstrumentProtection" placeholder="防护等级" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="analyInstrumentManufacturer">
          <el-input v-model="formData.analyInstrumentManufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="规格型号" prop="analyInstrumentSpec">
          <el-input v-model="formData.analyInstrumentSpec" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="定修时间" prop="analyInstrumentCalibDate">
          <el-date-picker
            v-model="formData.analyInstrumentCalibDate"
            type="datetime"
            placeholder="定修时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
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
    <importData v-model="importDialogVisible"></importData>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "AnalyInstrument",
  inheritAttrs: false,
});

import AnalyInstrumentAPI, {
  AnalyInstrumentPageVO,
  AnalyInstrumentForm,
  AnalyInstrumentPageQuery,
} from "@/api/ledger/analy-instrument-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { AnalyInstrumentMaintenanceForm } from "./index";
import importData from "./import-data.vue";
import maintance from "./maintance.vue";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const maintanceDrawerVisible = ref(false);
const queryParams = reactive<AnalyInstrumentPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 分析仪表格数据
const pageData = ref<AnalyInstrumentPageVO[]>([]);
// 报修表单数据
const maintanceFormData = reactive<AnalyInstrumentMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 分析仪表单数据
const formData = reactive<AnalyInstrumentForm>({});

// 分析仪表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  analyInstrumentCode: [{ required: true, message: "请输入设备位号", trigger: "blur" }],
  analyInstrumentPurpose: [{ required: true, message: "请输入用途(原设备用途)", trigger: "blur" }],
  analyInstrumentDept: [{ required: true, message: "请输入所属部门", trigger: "blur" }],
  analyInstrumentType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
  analyInstrumentStatus: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
  analyInstrumentMonitor: [{ required: true, message: "请输入是否参与检测", trigger: "blur" }],
  analyInstrumentLock: [{ required: true, message: "请输入是否参与联锁", trigger: "blur" }],
  analyInstrumentProcess: [{ required: true, message: "请输入工艺介质", trigger: "blur" }],
  analyInstrumentProdDate: [{ required: true, message: "请输入生产日期", trigger: "blur" }],
  analyInstrumentUseDate: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  analyInstrumentGuaranteeDate: [{ required: true, message: "请输入质保日期", trigger: "blur" }],
  analyInstrumentMaintainFlag: [
    { required: true, message: "请输入是否质保期内(0/1)", trigger: "blur" },
  ],
  analyInstrumentManufacturer: [{ required: true, message: "请输入生产厂家", trigger: "blur" }],
});

/** 查询分析仪 */
function handleQuery() {
  loading.value = true;
  AnalyInstrumentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置分析仪查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}
/** 打开分析仪弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改分析仪";
    AnalyInstrumentAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增分析仪";
  }
}

/** 提交分析仪表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        AnalyInstrumentAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        AnalyInstrumentAPI.create(formData)
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

/** 关闭分析仪弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除分析仪 */
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
      AnalyInstrumentAPI.deleteByIds(ids)
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
  AnalyInstrumentAPI.export({
    analyInstrumentCode: queryParams.analyInstrumentCode,
    analyInstrumentType: queryParams.analyInstrumentType,
    analyInstrumentBig: queryParams.analyInstrumentBig,
    analyInstrumentStatus: queryParams.analyInstrumentStatus,
    analyInstrumentMonitor: queryParams.analyInstrumentMonitor,
    analyInstrumentLock: queryParams.analyInstrumentLock,
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
  importDialogVisible.value = true;
};

/** 打开报修弹窗 */
const handleRepair = (row: AnalyInstrumentPageVO) => {
  maintanceDrawerVisible.value = true;
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

onMounted(() => {
  handleQuery();
});
</script>
