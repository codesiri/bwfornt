<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="设备编号" prop="equipmentCode">
          <el-input
            v-model="queryParams.equipmentCode"
            placeholder="设备编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input
            v-model="queryParams.equipmentName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="投运日期" prop="commissioningDate">
          <el-date-picker
            v-model="queryParams.commissioningDate"
            class="!w-[240px]"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="设备状态（在用 / 备用 / 停用 / 报废）" prop="status">
          <Dict v-model="queryParams.status" code="status" />
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
            v-hasPerm="['ledger:explosion-proof-electric-equipment:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:explosion-proof-electric-equipment:delete']"
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
          key="equipmentCode"
          label="设备编号"
          prop="equipmentCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="equipmentName"
          label="设备名称"
          prop="equipmentName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specModel"
          label="规格型号"
          prop="specModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="exMark"
          label="防爆标志（如 Ex d IIB T4 Gb）"
          prop="exMark"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="exCertNo"
          label="防爆合格证号"
          prop="exCertNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="exCertExpire"
          label="防爆合格证有效期"
          prop="exCertExpire"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="tempClass"
          label="温度组别"
          prop="tempClass"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="applicableMedium"
          label="适用爆炸性介质"
          prop="applicableMedium"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="installArea"
          label="安装位置及危险区域等级"
          prop="installArea"
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
          key="commissioningDate"
          label="投运日期"
          prop="commissioningDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="groundResistance"
          label="接地电阻测试值（Ω）"
          prop="groundResistance"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="lastExCheckDate"
          label="上次防爆检查日期"
          prop="lastExCheckDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="nextExCheckDate"
          label="下次防爆检查日期"
          prop="nextExCheckDate"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态（在用 / 备用 / 停用 / 报废）" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.status" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="factory"
          label="所属工厂"
          prop="factory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:explosion-proof-electric-equipment:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:explosion-proof-electric-equipment:repair']"
              type="warning"
              size="small"
              link
              icon="tools"
              @click="handleRepair(scope.row)"
            >
              报修
            </el-button>
            <el-button
              v-hasPerm="['ledger:explosion-proof-electric-equipment:delete']"
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

    <!-- 防爆电气设备表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="150px">
        <el-form-item label="设备编号" prop="equipmentCode">
          <el-input v-model="formData.equipmentCode" placeholder="设备编号" />
        </el-form-item>

        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="formData.equipmentName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="规格型号" prop="specModel">
          <el-input v-model="formData.specModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="防爆标志（如 Ex d IIB T4 Gb）" prop="exMark">
          <el-input v-model="formData.exMark" placeholder="防爆标志（如 Ex d IIB T4 Gb）" />
        </el-form-item>

        <el-form-item label="防爆合格证号" prop="exCertNo">
          <el-input v-model="formData.exCertNo" placeholder="防爆合格证号" />
        </el-form-item>

        <el-form-item label="防爆合格证有效期" prop="exCertExpire">
          <el-input v-model="formData.exCertExpire" placeholder="防爆合格证有效期" />
        </el-form-item>

        <el-form-item label="温度组别" prop="tempClass">
          <el-input v-model="formData.tempClass" placeholder="温度组别" />
        </el-form-item>

        <el-form-item label="适用爆炸性介质" prop="applicableMedium">
          <el-input v-model="formData.applicableMedium" placeholder="适用爆炸性介质" />
        </el-form-item>

        <el-form-item label="安装位置及危险区域等级" prop="installArea">
          <el-input v-model="formData.installArea" placeholder="安装位置及危险区域等级" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="formData.manufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="投运日期" prop="commissioningDate">
          <el-date-picker
            v-model="formData.commissioningDate"
            class="!w-[240px]"
            type="date"
            placeholder="投运日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="接地电阻测试值（Ω）" prop="groundResistance">
          <el-input v-model="formData.groundResistance" placeholder="接地电阻测试值（Ω）" />
        </el-form-item>

        <el-form-item label="上次防爆检查日期" prop="lastExCheckDate">
          <el-date-picker
            v-model="formData.lastExCheckDate"
            class="!w-[240px]"
            type="date"
            placeholder="上次防爆检查日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次防爆检查日期" prop="nextExCheckDate">
          <el-date-picker
            v-model="formData.nextExCheckDate"
            class="!w-[240px]"
            type="date"
            placeholder="下次防爆检查日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="设备状态（在用 / 备用 / 停用 / 报废）" prop="status">
          <Dict v-model="formData.status" code="status" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="factory">
          <el-input v-model="formData.factory" placeholder="所属工厂" />
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
    <import-data v-model="importDialogVisible" @import-success="importSuccess" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ExplosionProofElectricEquipment",
  inheritAttrs: false,
});

import ExplosionProofElectricEquipmentAPI, {
  ExplosionProofElectricEquipmentPageVO,
  ExplosionProofElectricEquipmentForm,
  ExplosionProofElectricEquipmentPageQuery,
} from "@/api/ledger/explosion-proof-electric-equipment-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { ExplosionProofElectricEquipmentMaintenanceForm } from "./index";
import importData from "./import-data.vue";
import maintance from "./maintance.vue";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const maintanceDrawerVisible = ref(false);

const queryParams = reactive<ExplosionProofElectricEquipmentPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

const getRowIndex = (index: number) => {
  return (queryParams.pageNum - 1) * queryParams.pageSize + index + 1;
};

// 防爆电气设备表格数据
const pageData = ref<ExplosionProofElectricEquipmentPageVO[]>([]);
const maintanceFormData = reactive<ExplosionProofElectricEquipmentMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 防爆电气设备表单数据
const formData = reactive<ExplosionProofElectricEquipmentForm>({});

// 防爆电气设备表单校验规则
const rules = reactive({
  equipmentCode: [{ required: true, message: "请输入设备编号", trigger: "blur" }],
  equipmentName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  specModel: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  exMark: [{ required: true, message: "请输入防爆标志（如 Ex d IIB T4 Gb）", trigger: "blur" }],
  exCertNo: [{ required: true, message: "请输入防爆合格证号", trigger: "blur" }],
  exCertExpire: [{ required: true, message: "请输入防爆合格证有效期", trigger: "blur" }],
  installArea: [{ required: true, message: "请输入安装位置及危险区域等级", trigger: "blur" }],
  commissioningDate: [{ required: true, message: "请输入投运日期", trigger: "blur" }],
  status: [
    { required: true, message: "请输入设备状态（在用 / 备用 / 停用 / 报废）", trigger: "blur" },
  ],
  factory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询防爆电气设备 */
function handleQuery() {
  loading.value = true;
  ExplosionProofElectricEquipmentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置防爆电气设备查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开防爆电气设备弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改防爆电气设备";
    ExplosionProofElectricEquipmentAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增防爆电气设备";
  }
}

/** 提交防爆电气设备表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ExplosionProofElectricEquipmentAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ExplosionProofElectricEquipmentAPI.create(formData)
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

/** 关闭防爆电气设备弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除防爆电气设备 */
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
      ExplosionProofElectricEquipmentAPI.deleteByIds(ids)
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
  ExplosionProofElectricEquipmentAPI.export({
    equipmentCode: queryParams.equipmentCode,
    equipmentName: queryParams.equipmentName,
    commissioningDate: queryParams.commissioningDate,
    status: queryParams.status,
    factory: queryParams.factory,
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
const importSuccess = () => {};

const handleRepair = (row: ExplosionProofElectricEquipmentPageVO) => {
  maintanceFormData.equipmentCode = row.equipmentCode;
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
