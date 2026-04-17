<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="位号" prop="switchValveTag">
          <el-input
            v-model="queryParams.tagNo"
            placeholder="位号"
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
            placeholder="s设备类型"
            clearable
            @keyup.enter="handleQuery()"
          />
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

    <el-card shadow="never">
      <div class="data-table__toolbar">
        <div class="data-table__toolbar--actions">
          <el-button
            v-hasPerm="['ledger:control-valve:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:control-valve:delete']"
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
          key="dveName"
          label="装置名称"
          prop="dveName"
          min-width="150"
          align="center"
        />
        <el-table-column key="tagNo" label="	位号" prop="tagNo" min-width="150" align="center" />
        <el-table-column key="name" label="名称" prop="name" min-width="150" align="center" />
        <el-table-column
          key="modelSpecification"
          label="型号规格"
          prop="modelSpecification"
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
        <el-table-column
          key="installationLocationAndPurpose"
          label="安装位置及用途"
          prop="installationLocationAndPurpose"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="mediumName"
          label="介质名称"
          prop="mediumName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="designTemperature"
          label="设计温度"
          prop="designTemperature"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="pressureBeforeValve"
          label="阀前压"
          prop="pressureBeforeValve"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="pressureAfterValve"
          label="阀后压"
          prop="pressureAfterValve"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="valveSeatDiameter"
          label="阀座直径"
          prop="valveSeatDiameter"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="valveBodyMaterial"
          label="阀体材质"
          prop="valveBodyMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="valveSeatSerialNumber"
          label="阀座序列号"
          prop="valveSeatSerialNumber"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="valveSeatMaterial"
          label="阀座材质"
          prop="valveSeatMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="valveCoreMaterial"
          label="阀芯材质"
          prop="valveCoreMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="valveStemMaterial"
          label="阀杆材质"
          prop="valveStemMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="flowCharacteristics"
          label="流量特性"
          prop="flowCharacteristics"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="leakageClass"
          label="泄露等级"
          prop="leakageClass"
          min-width="150"
          align="center"
        />
        <el-table-column key="cvValue" label="Cv值" prop="cvValue" min-width="150" align="center" />
        <el-table-column
          key="actuatorModelSpecification"
          label="规格"
          prop="actuatorModelSpecification"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="actuatorActionForm"
          label="作用形式"
          prop="actuatorActionForm"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="actuatorStroke"
          label="行程"
          prop="actuatorStroke"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="springRange"
          label="弹簧范围"
          prop="springRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="airSourcePressure"
          label="气源压力"
          prop="airSourcePressure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="faultPosition"
          label="故障位置"
          prop="faultPosition"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="valveCloseTime"
          label="关阀时间"
          prop="valveCloseTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="valveOpenTime"
          label="开阀时间"
          prop="valveOpenTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="handwheelMechanism"
          label="手轮机构"
          prop="handwheelMechanism"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dvType"
          label="设备类型"
          prop="dvType"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.status" code="status" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:control-valve:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:control-valve:repair']"
              type="warning"
              size="small"
              link
              icon="tools"
              @click="handleRepair(scope.row)"
            >
              报修
            </el-button>
            <el-button
              v-hasPerm="['ledger:control-valve:delete']"
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

    <!-- 调节阀表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="装置名称" prop="dveName">
          <el-input v-model="formData.dveName" placeholder="装置名称" />
        </el-form-item>

        <el-form-item label="	位号" prop="tagNo">
          <el-input v-model="formData.tagNo" placeholder="	位号" />
        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" placeholder="名称" />
        </el-form-item>

        <el-form-item label="型号规格" prop="modelSpecification">
          <el-input v-model="formData.modelSpecification" placeholder="型号规格" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="formData.manufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="安装位置及用途" prop="installationLocationAndPurpose">
          <el-input
            v-model="formData.installationLocationAndPurpose"
            placeholder="安装位置及用途"
          />
        </el-form-item>

        <el-form-item label="介质名称" prop="mediumName">
          <el-input v-model="formData.mediumName" placeholder="介质名称" />
        </el-form-item>

        <el-form-item label="设计温度" prop="designTemperature">
          <el-input v-model="formData.designTemperature" placeholder="设计温度" />
        </el-form-item>

        <el-form-item label="阀前压" prop="pressureBeforeValve">
          <el-input v-model="formData.pressureBeforeValve" placeholder="阀前压" />
        </el-form-item>

        <el-form-item label="阀后压" prop="pressureAfterValve">
          <el-input v-model="formData.pressureAfterValve" placeholder="阀后压" />
        </el-form-item>

        <el-form-item label="阀座直径" prop="valveSeatDiameter">
          <el-input v-model="formData.valveSeatDiameter" placeholder="阀座直径" />
        </el-form-item>

        <el-form-item label="阀体材质" prop="valveBodyMaterial">
          <el-input v-model="formData.valveBodyMaterial" placeholder="阀体材质" />
        </el-form-item>

        <el-form-item label="阀座序列号" prop="valveSeatSerialNumber">
          <el-input v-model="formData.valveSeatSerialNumber" placeholder="阀座序列号" />
        </el-form-item>

        <el-form-item label="阀座材质" prop="valveSeatMaterial">
          <el-input v-model="formData.valveSeatMaterial" placeholder="阀座材质" />
        </el-form-item>

        <el-form-item label="阀芯材质" prop="valveCoreMaterial">
          <el-input v-model="formData.valveCoreMaterial" placeholder="阀芯材质" />
        </el-form-item>

        <el-form-item label="阀杆材质" prop="valveStemMaterial">
          <el-input v-model="formData.valveStemMaterial" placeholder="阀杆材质" />
        </el-form-item>

        <el-form-item label="流量特性" prop="flowCharacteristics">
          <el-input v-model="formData.flowCharacteristics" placeholder="流量特性" />
        </el-form-item>

        <el-form-item label="泄露等级" prop="leakageClass">
          <el-input v-model="formData.leakageClass" placeholder="泄露等级" />
        </el-form-item>

        <el-form-item label="Cv值" prop="cvValue">
          <el-input v-model="formData.cvValue" placeholder="Cv值" />
        </el-form-item>

        <el-form-item label="规格" prop="actuatorModelSpecification">
          <el-input v-model="formData.actuatorModelSpecification" placeholder="规格" />
        </el-form-item>

        <el-form-item label="作用形式" prop="actuatorActionForm">
          <el-input v-model="formData.actuatorActionForm" placeholder="作用形式" />
        </el-form-item>

        <el-form-item label="行程" prop="actuatorStroke">
          <el-input v-model="formData.actuatorStroke" placeholder="行程" />
        </el-form-item>

        <el-form-item label="弹簧范围" prop="springRange">
          <el-input v-model="formData.springRange" placeholder="弹簧范围" />
        </el-form-item>

        <el-form-item label="气源压力" prop="airSourcePressure">
          <el-input v-model="formData.airSourcePressure" placeholder="气源压力" />
        </el-form-item>

        <el-form-item label="故障位置" prop="faultPosition">
          <el-input v-model="formData.faultPosition" placeholder="故障位置" />
        </el-form-item>

        <el-form-item label="关阀时间" prop="valveCloseTime">
          <el-date-picker
            v-model="formData.valveCloseTime"
            type="datetime"
            placeholder="关阀时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="开阀时间" prop="valveOpenTime">
          <el-date-picker
            v-model="formData.valveOpenTime"
            type="datetime"
            placeholder="开阀时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="手轮机构" prop="handwheelMechanism">
          <el-input v-model="formData.handwheelMechanism" placeholder="手轮机构" />
        </el-form-item>

        <el-form-item label="设备类型" prop="dvType">
          <el-input v-model="formData.dvType" placeholder="设备类型" />
        </el-form-item>

        <el-form-item label="设备状态" prop="status">
          <Dict v-model="formData.status" code="status" />
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

    <ControlValveImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ControlValve",
  inheritAttrs: false,
});

import ControlValveAPI, {
  ControlValvePageVO,
  ControlValveForm,
  ControlValvePageQuery,
} from "@/api/ledger/control-valve-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { ControlValveMaintenanceForm } from "./index";
import maintance from "./maintance.vue";
import ControlValveImport from "./ControlValveImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const maintanceDrawerVisible = ref(false);
const queryParams = reactive<ControlValvePageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 调节阀表格数据
const pageData = ref<ControlValvePageVO[]>([]);
const maintanceFormData = reactive<ControlValveMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 调节阀表单数据
const formData = reactive<ControlValveForm>({});

// 调节阀表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  dveName: [{ required: true, message: "请输入装置名称", trigger: "blur" }],
  tagNo: [{ required: true, message: "请输入	位号", trigger: "blur" }],
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
  manufacturer: [{ required: true, message: "请输入生产厂家", trigger: "blur" }],
  installationLocationAndPurpose: [
    { required: true, message: "请输入安装位置及用途", trigger: "blur" },
  ],
  mediumName: [{ required: true, message: "请输入介质名称", trigger: "blur" }],
  leakageClass: [{ required: true, message: "请输入泄露等级", trigger: "blur" }],
  actuatorActionForm: [{ required: true, message: "请输入作用形式", trigger: "blur" }],
  actuatorStroke: [{ required: true, message: "请输入行程", trigger: "blur" }],
  dvType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
  status: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
});

/** 查询调节阀 */
function handleQuery() {
  loading.value = true;
  ControlValveAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置调节阀查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开调节阀弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改调节阀";
    ControlValveAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增调节阀";
  }
}

/** 提交调节阀表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ControlValveAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ControlValveAPI.create(formData)
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

/** 关闭调节阀弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除调节阀 */
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
      ControlValveAPI.deleteByIds(ids)
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
/**打开导入弹窗**/
const handleOpenImportDialog = () => {
  importDialogVisible.value = true;
};
/**导出**/
const handleExport = () => {
  ControlValveAPI.export({
    tagNo: queryParams.tagNo,
    status: queryParams.status,
    factory: queryParams.factory,
    dvType: queryParams.dvType,
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

const handleRepair = (row: ControlValvePageVO) => {
  maintanceFormData.tagNo = row.tagNo;
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
