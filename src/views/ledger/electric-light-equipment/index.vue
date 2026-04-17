<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="设备名称" prop="eleLightName">
          <el-input
            v-model="queryParams.eleLightName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="生产厂家" prop="eleManufacturer">
          <el-input
            v-model="queryParams.eleManufacturer"
            placeholder="生产厂家"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="投运日期" prop="eleCommissioningDate">
          <el-date-picker
            v-model="queryParams.eleCommissioningDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="上次维护日期" prop="eleLastMaintainDate">
          <el-date-picker
            v-model="queryParams.eleLastMaintainDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="下次维护日期" prop="eleNextMaintainDate">
          <el-date-picker
            v-model="queryParams.eleNextMaintainDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="	设备状态" prop="eleStatus">
          <Dict v-model="queryParams.eleStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="eleFactory">
          <el-input
            v-model="queryParams.eleFactory"
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
            v-hasPerm="['ledger:electric-light-equipment:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
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
        <el-table-column
          key="eleLightCode"
          label="照明设备编号"
          prop="eleLightCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleLightName"
          label="设备名称"
          prop="eleLightName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleSpecModel"
          label="规格型号"
          prop="eleSpecModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleExMark"
          label="防爆标志"
          prop="eleExMark"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleExCertNo"
          label="防爆合格证号（仅防爆区域照明设备填写）"
          prop="eleExCertNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleExCertExpire"
          label="防爆合格证有效期（仅防爆区域照明设备填写）"
          prop="eleExCertExpire"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleRatedPower"
          label="额定功率（W）"
          prop="eleRatedPower"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleRatedVoltage"
          label="额定电压（如 AC220V、DC36V、AC380V）"
          prop="eleRatedVoltage"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleInstallArea"
          label="安装位置及危险区域等级"
          prop="eleInstallArea"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleInstallHeight"
          label="安装高度（m）"
          prop="eleInstallHeight"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleManufacturer"
          label="生产厂家"
          prop="eleManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleCommissioningDate"
          label="投运日期"
          prop="eleCommissioningDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleLastMaintainDate"
          label="上次维护日期"
          prop="eleLastMaintainDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleNextMaintainDate"
          label="下次维护日期"
          prop="eleNextMaintainDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="eleIsEmergency"
          label="是否为应急照明（0 = 否，1 = 是）"
          prop="eleIsEmergency"
          min-width="150"
          align="center"
        />
        <el-table-column label="	设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.eleStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="eleFactory"
          label="所属工厂"
          prop="eleFactory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-light-equipment:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-light-equipment:repair']"
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

    <!-- 电气照明设备表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="250px">
        <el-form-item label="照明设备编号" prop="eleLightCode">
          <el-input v-model="formData.eleLightCode" placeholder="照明设备编号" />
        </el-form-item>

        <el-form-item label="设备名称" prop="eleLightName">
          <el-input v-model="formData.eleLightName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="规格型号" prop="eleSpecModel">
          <el-input v-model="formData.eleSpecModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="防爆标志" prop="eleExMark">
          <el-input v-model="formData.eleExMark" placeholder="防爆标志" />
        </el-form-item>

        <el-form-item label="防爆合格证号（仅防爆区域照明设备填写）" prop="eleExCertNo">
          <el-input
            v-model="formData.eleExCertNo"
            placeholder="防爆合格证号（仅防爆区域照明设备填写）"
          />
        </el-form-item>

        <el-form-item label="防爆合格证有效期（仅防爆区域照明设备填写）" prop="eleExCertExpire">
          <el-input
            v-model="formData.eleExCertExpire"
            placeholder="防爆合格证有效期（仅防爆区域照明设备填写）"
          />
        </el-form-item>

        <el-form-item label="额定功率（W）" prop="eleRatedPower">
          <el-input v-model="formData.eleRatedPower" placeholder="额定功率（W）" />
        </el-form-item>

        <el-form-item label="额定电压（如 AC220V、DC36V、AC380V）" prop="eleRatedVoltage">
          <el-input
            v-model="formData.eleRatedVoltage"
            placeholder="额定电压（如 AC220V、DC36V、AC380V）"
          />
        </el-form-item>

        <el-form-item label="安装位置及危险区域等级" prop="eleInstallArea">
          <el-input v-model="formData.eleInstallArea" placeholder="安装位置及危险区域等级" />
        </el-form-item>

        <el-form-item label="安装高度（m）" prop="eleInstallHeight">
          <el-input v-model="formData.eleInstallHeight" placeholder="安装高度（m）" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="eleManufacturer">
          <el-input v-model="formData.eleManufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="投运日期" prop="eleCommissioningDate">
          <el-date-picker
            v-model="formData.eleCommissioningDate"
            type="datetime"
            placeholder="投运日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="上次维护日期" prop="eleLastMaintainDate">
          <el-date-picker
            v-model="formData.eleLastMaintainDate"
            type="datetime"
            placeholder="上次维护日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="下次维护日期" prop="eleNextMaintainDate">
          <el-date-picker
            v-model="formData.eleNextMaintainDate"
            type="datetime"
            placeholder="下次维护日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="是否为应急照明（0 = 否，1 = 是）" prop="eleIsEmergency">
          <el-input
            v-model="formData.eleIsEmergency"
            placeholder="是否为应急照明（0 = 否，1 = 是）"
          />
        </el-form-item>

        <el-form-item label="	设备状态" prop="eleStatus">
          <Dict v-model="formData.eleStatus" code="status" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="eleFactory">
          <el-input v-model="formData.eleFactory" placeholder="所属工厂" />
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
  name: "ElectricLightEquipment",
  inheritAttrs: false,
});

import ElectricLightEquipmentAPI, {
  ElectricLightEquipmentPageVO,
  ElectricLightEquipmentForm,
  ElectricLightEquipmentPageQuery,
} from "@/api/ledger/electric-light-equipment-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { ElectricLightEquipmentMaintenanceForm } from "./index";
import importData from "./import-data.vue";
import maintance from "./maintance.vue";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const maintanceDrawerVisible = ref(false);

const queryParams = reactive<ElectricLightEquipmentPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 电气照明设备表格数据
const pageData = ref<ElectricLightEquipmentPageVO[]>([]);
const maintanceFormData = reactive<ElectricLightEquipmentMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});
const importDialogVisible = ref(false);
// 电气照明设备表单数据
const formData = reactive<ElectricLightEquipmentForm>({});

// 电气照明设备表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  eleLightCode: [{ required: true, message: "请输入照明设备编号", trigger: "blur" }],
  eleLightName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  eleSpecModel: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  eleRatedPower: [{ required: true, message: "请输入额定功率（W）", trigger: "blur" }],
  eleRatedVoltage: [
    { required: true, message: "请输入额定电压（如 AC220V、DC36V、AC380V）", trigger: "blur" },
  ],
  eleInstallArea: [{ required: true, message: "请输入安装位置及危险区域等级", trigger: "blur" }],
  eleCommissioningDate: [{ required: true, message: "请输入投运日期", trigger: "blur" }],
  eleIsEmergency: [
    { required: true, message: "请输入是否为应急照明（0 = 否，1 = 是）", trigger: "blur" },
  ],
  eleStatus: [{ required: true, message: "请输入	设备状态", trigger: "blur" }],
  eleFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询电气照明设备 */
function handleQuery() {
  loading.value = true;
  ElectricLightEquipmentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置电气照明设备查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开电气照明设备弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改电气照明设备";
    ElectricLightEquipmentAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增电气照明设备";
  }
}

/** 提交电气照明设备表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricLightEquipmentAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricLightEquipmentAPI.create(formData)
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

/** 关闭电气照明设备弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除电气照明设备 */
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
      ElectricLightEquipmentAPI.deleteByIds(ids)
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
  ElectricLightEquipmentAPI.export({
    eleLightName: queryParams.eleLightName,
    eleManufacturer: queryParams.eleManufacturer,
    eleCommissioningDate: queryParams.eleCommissioningDate,
    eleLastMaintainDate: queryParams.eleLastMaintainDate,
    eleStatus: queryParams.eleStatus,
    eleFactory: queryParams.eleFactory,
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

const handleRepair = (row: ElectricLightEquipmentPageVO) => {
  maintanceFormData.eleLightCode = row.eleLightCode;

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
