<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="电缆编号" prop="cleCableCode">
          <el-input
            v-model="queryParams.cleCableCode"
            placeholder="电缆编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="电缆名称" prop="cleCableName">
          <el-input
            v-model="queryParams.cleCableName"
            placeholder="电缆名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="规格型号" prop="cleSpecModel">
          <el-input
            v-model="queryParams.cleSpecModel"
            placeholder="规格型号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="生产厂家" prop="cleManufacturer">
          <el-input
            v-model="queryParams.cleManufacturer"
            placeholder="生产厂家"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="cleFactory">
          <el-input
            v-model="queryParams.cleFactory"
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
          v-hasPerm="['ledger:cable-line-equipment:add']"
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
          key="cleCableCode"
          label="电缆编号"
          prop="cleCableCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleCableName"
          label="电缆名称"
          prop="cleCableName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleSpecModel"
          label="规格型号"
          prop="cleSpecModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleInsulationLevel"
          label="绝缘等级"
          prop="cleInsulationLevel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleCableLength"
          label="电缆长度（m）"
          prop="cleCableLength"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleLayingMethod"
          label="敷设方式"
          prop="cleLayingMethod"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleLayingPath"
          label="敷设路径"
          prop="cleLayingPath"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleInstallArea"
          label="安装区域及危险等级"
          prop="cleInstallArea"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleCoreNumber"
          label="电缆芯数"
          prop="cleCoreNumber"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleCoreSection"
          label="芯线截面（mm²）"
          prop="cleCoreSection"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleManufacturer"
          label="生产厂家"
          prop="cleManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleProductionDate"
          label="生产日期"
          prop="cleProductionDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleInstallDate"
          label="敷设安装日期"
          prop="cleInstallDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleLastTestDate"
          label="上次耐压 / 绝缘测试日期"
          prop="cleLastTestDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleLastTestData"
          label="上次测试数据（MΩ/kV）"
          prop="cleLastTestData"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleJointCount"
          label="中间接头数量"
          prop="cleJointCount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleStatus"
          label="电缆状态（在用 / 备用 / 停用）"
          prop="cleStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="cleFactory"
          label="所属工厂"
          prop="cleFactory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:cable-line-equipment:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:cable-line-equipment:repair']"
              type="warning"
              size="small"
              link
              icon="tools"
              @click="handleRepair(scope.row)"
            >
              报修
            </el-button>
            <el-button
              v-hasPerm="['ledger:cable-line-equipment:delete']"
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

    <!-- 电器电缆线路表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="170px">
        <el-form-item label="电缆编号" prop="cleCableCode">
          <el-input v-model="formData.cleCableCode" placeholder="电缆编号" />
        </el-form-item>

        <el-form-item label="电缆名称" prop="cleCableName">
          <el-input v-model="formData.cleCableName" placeholder="电缆名称" />
        </el-form-item>

        <el-form-item label="规格型号" prop="cleSpecModel">
          <el-input v-model="formData.cleSpecModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="绝缘等级" prop="cleInsulationLevel">
          <el-input v-model="formData.cleInsulationLevel" placeholder="绝缘等级" />
        </el-form-item>

        <el-form-item label="电缆长度（m）" prop="cleCableLength">
          <el-input v-model="formData.cleCableLength" placeholder="电缆长度（m）" />
        </el-form-item>

        <el-form-item label="敷设方式" prop="cleLayingMethod">
          <el-input v-model="formData.cleLayingMethod" placeholder="敷设方式" />
        </el-form-item>

        <el-form-item label="敷设路径" prop="cleLayingPath">
          <el-input v-model="formData.cleLayingPath" placeholder="敷设路径" />
        </el-form-item>

        <el-form-item label="安装区域及危险等级" prop="cleInstallArea">
          <el-input v-model="formData.cleInstallArea" placeholder="安装区域及危险等级" />
        </el-form-item>

        <el-form-item label="电缆芯数" prop="cleCoreNumber">
          <el-input v-model="formData.cleCoreNumber" placeholder="电缆芯数" />
        </el-form-item>

        <el-form-item label="芯线截面（mm²）" prop="cleCoreSection">
          <el-input v-model="formData.cleCoreSection" placeholder="芯线截面（mm²）" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="cleManufacturer">
          <el-input v-model="formData.cleManufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="生产日期" prop="cleProductionDate">
          <el-date-picker
            v-model="formData.cleProductionDate"
            class="!w-[240px]"
            type="date"
            placeholder="生产日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="敷设安装日期" prop="cleInstallDate">
          <el-date-picker
            v-model="formData.cleInstallDate"
            class="!w-[240px]"
            type="date"
            placeholder="敷设安装日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="上次耐压 / 绝缘测试日期" prop="cleLastTestDate">
          <el-date-picker
            v-model="formData.cleLastTestDate"
            class="!w-[240px]"
            type="date"
            placeholder="上次耐压 / 绝缘测试日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="上次测试数据（MΩ/kV）" prop="cleLastTestData">
          <el-input v-model="formData.cleLastTestData" placeholder="上次测试数据（MΩ/kV）" />
        </el-form-item>

        <el-form-item label="中间接头数量" prop="cleJointCount">
          <el-input v-model="formData.cleJointCount" placeholder="中间接头数量" />
        </el-form-item>

        <el-form-item label="电缆状态（在用 / 备用 / 停用）" prop="cleStatus">
          <el-input v-model="formData.cleStatus" placeholder="电缆状态（在用 / 备用 / 停用）" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="cleFactory">
          <el-input v-model="formData.cleFactory" placeholder="所属工厂" />
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
    <export-data
      v-model="importDialogVisible"
      @import-success="handleImportSuccess"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "CableLineEquipment",
  inheritAttrs: false,
});

import CableLineEquipmentAPI, {
  CableLineEquipmentPageVO,
  CableLineEquipmentForm,
  CableLineEquipmentPageQuery,
} from "@/api/ledger/cable-line-equipment-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { CableLineEquipmentMaintenanceForm } from "./index";
import maintance from "./maintance.vue";
import exportData from "./export-data.vue";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const maintanceDrawerVisible = ref(false);
const importDialogVisible = ref(false);

const queryParams = reactive<CableLineEquipmentPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 电器电缆线路表格数据
const pageData = ref<CableLineEquipmentPageVO[]>([]);
const maintanceFormData = reactive<CableLineEquipmentMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 电器电缆线路表单数据
const formData = reactive<CableLineEquipmentForm>({});

// 电器电缆线路表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  cleCableCode: [{ required: true, message: "请输入电缆编号", trigger: "blur" }],
  cleCableName: [{ required: true, message: "请输入电缆名称", trigger: "blur" }],
  cleSpecModel: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  cleInsulationLevel: [{ required: true, message: "请输入绝缘等级", trigger: "blur" }],
  cleCableLength: [{ required: true, message: "请输入电缆长度（m）", trigger: "blur" }],
  cleLayingMethod: [{ required: true, message: "请输入敷设方式", trigger: "blur" }],
  cleLayingPath: [{ required: true, message: "请输入敷设路径", trigger: "blur" }],
  cleInstallArea: [{ required: true, message: "请输入安装区域及危险等级", trigger: "blur" }],
  cleFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询电器电缆线路 */
function handleQuery() {
  loading.value = true;
  CableLineEquipmentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置电器电缆线路查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开电器电缆线路弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改电器电缆线路";
    CableLineEquipmentAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增电器电缆线路";
  }
}

/** 提交电器电缆线路表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        CableLineEquipmentAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        CableLineEquipmentAPI.create(formData)
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

/** 关闭电器电缆线路弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除电器电缆线路 */
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
      CableLineEquipmentAPI.deleteByIds(ids)
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
  CableLineEquipmentAPI.export({
    cleCableCode: queryParams.cleCableCode,
    cleCableName: queryParams.cleCableName,
    cleSpecModel: queryParams.cleSpecModel,
    cleManufacturer: queryParams.cleManufacturer,
    cleFactory: queryParams.cleFactory,
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

const handleImportSuccess = () => {
  handleResetQuery();
};

const handleRepair = (row: CableLineEquipmentPageVO) => {
  maintanceFormData.cleCableCode = row.cleCableCode;
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
