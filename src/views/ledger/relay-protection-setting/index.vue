<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="继电器编号" prop="rpsRelayCode">
          <el-input
            v-model="queryParams.rpsRelayCode"
            placeholder="继电器编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="继电器类型" prop="rpsRelayType">
          <el-input
            v-model="queryParams.rpsRelayType"
            placeholder="继电器类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="上次校验日期" prop="rpsLastCheckDate">
          <el-date-picker
            v-model="queryParams.rpsLastCheckDate"
            class="!w-[240px]"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="下次校验日期" prop="rpsNextCheckDate">
          <el-date-picker
            v-model="queryParams.rpsNextCheckDate"
            class="!w-[240px]"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="安装位置" prop="rpsInstallPosition">
          <el-input
            v-model="queryParams.rpsInstallPosition"
            placeholder="安装位置"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="rpsFactory">
          <el-input
            v-model="queryParams.rpsFactory"
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
          v-hasPerm="['ledger:relay-protection-setting:add']"
          type="success"
          icon="plus"
          @click="handleOpenDialog()"
        >
          新增
        </el-button>
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
          key="rpsRelayCode"
          label="继电器编号"
          prop="rpsRelayCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsRelayType"
          label="继电器类型"
          prop="rpsRelayType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsRelayModel"
          label="继电器型号"
          prop="rpsRelayModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsOvercurrentSetting"
          label="过流保护定值（A）"
          prop="rpsOvercurrentSetting"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsOvercurrentDelay"
          label="过流保护延时（s）"
          prop="rpsOvercurrentDelay"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsInstantaneousSetting"
          label="速断保护定值（A）"
          prop="rpsInstantaneousSetting"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsEarthFaultSetting"
          label="接地故障定值（A）"
          prop="rpsEarthFaultSetting"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsOverloadSetting"
          label="过载保护定值（%）"
          prop="rpsOverloadSetting"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsSettingDate"
          label="定值整定日期"
          prop="rpsSettingDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsSettingPerson"
          label="整定人员"
          prop="rpsSettingPerson"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsLastCheckDate"
          label="上次校验日期"
          prop="rpsLastCheckDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsNextCheckDate"
          label="下次校验日期"
          prop="rpsNextCheckDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsChangeRecord"
          label="定值变更记录"
          prop="rpsChangeRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsInstallPosition"
          label="安装位置"
          prop="rpsInstallPosition"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="rpsFactory"
          label="所属工厂"
          prop="rpsFactory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:relay-protection-setting:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:relay-protection-setting:repair']"
              type="warning"
              size="small"
              link
              icon="tools"
              @click="handleRepair(scope.row)"
            >
              报修
            </el-button>
            <el-button
              v-hasPerm="['ledger:relay-protection-setting:delete']"
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

    <!-- 继电保护定值台账表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="继电器编号" prop="rpsRelayCode">
          <el-input v-model="formData.rpsRelayCode" placeholder="继电器编号" />
        </el-form-item>

        <el-form-item label="继电器类型" prop="rpsRelayType">
          <el-input v-model="formData.rpsRelayType" placeholder="继电器类型" />
        </el-form-item>

        <el-form-item label="继电器型号" prop="rpsRelayModel">
          <el-input v-model="formData.rpsRelayModel" placeholder="继电器型号" />
        </el-form-item>

        <el-form-item label="过流保护定值（A）" prop="rpsOvercurrentSetting">
          <el-input v-model="formData.rpsOvercurrentSetting" placeholder="过流保护定值（A）" />
        </el-form-item>

        <el-form-item label="过流保护延时（s）" prop="rpsOvercurrentDelay">
          <el-input v-model="formData.rpsOvercurrentDelay" placeholder="过流保护延时（s）" />
        </el-form-item>

        <el-form-item label="速断保护定值（A）" prop="rpsInstantaneousSetting">
          <el-input v-model="formData.rpsInstantaneousSetting" placeholder="速断保护定值（A）" />
        </el-form-item>

        <el-form-item label="接地故障定值（A）" prop="rpsEarthFaultSetting">
          <el-input v-model="formData.rpsEarthFaultSetting" placeholder="接地故障定值（A）" />
        </el-form-item>

        <el-form-item label="过载保护定值（%）" prop="rpsOverloadSetting">
          <el-input v-model="formData.rpsOverloadSetting" placeholder="过载保护定值（%）" />
        </el-form-item>

        <el-form-item label="定值整定日期" prop="rpsSettingDate">
          <el-date-picker
            v-model="formData.rpsSettingDate"
            class="!w-[240px]"
            type="date"
            placeholder="定值整定日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="整定人员" prop="rpsSettingPerson">
          <el-input v-model="formData.rpsSettingPerson" placeholder="整定人员" />
        </el-form-item>

        <el-form-item label="上次校验日期" prop="rpsLastCheckDate">
          <el-date-picker
            v-model="formData.rpsLastCheckDate"
            class="!w-[240px]"
            type="date"
            placeholder="上次校验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次校验日期" prop="rpsNextCheckDate">
          <el-date-picker
            v-model="formData.rpsNextCheckDate"
            class="!w-[240px]"
            type="date"
            placeholder="下次校验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="定值变更记录" prop="rpsChangeRecord">
          <el-input v-model="formData.rpsChangeRecord" placeholder="定值变更记录" />
        </el-form-item>

        <el-form-item label="安装位置" prop="rpsInstallPosition">
          <el-input v-model="formData.rpsInstallPosition" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="rpsFactory">
          <el-input v-model="formData.rpsFactory" placeholder="所属工厂" />
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
  name: "RelayProtectionSetting",
  inheritAttrs: false,
});

import RelayProtectionSettingAPI, {
  RelayProtectionSettingPageVO,
  RelayProtectionSettingForm,
  RelayProtectionSettingPageQuery,
} from "@/api/ledger/relay-protection-setting-api";
import MaintainPlanAPI from "@/api/maintenance/maintain-plan-api";
import { RelayProtectionSettingMaintenanceForm } from "./index";
import importData from "./import-data.vue";
import maintance from "./maintance.vue";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const maintanceDrawerVisible = ref(false);
const queryParams = reactive<RelayProtectionSettingPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 继电保护定值台账表格数据
const pageData = ref<RelayProtectionSettingPageVO[]>([]);
const maintanceFormData = reactive<RelayProtectionSettingMaintenanceForm>({});

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 继电保护定值台账表单数据
const formData = reactive<RelayProtectionSettingForm>({});

// 继电保护定值台账表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  rpsRelayCode: [{ required: true, message: "请输入继电器编号", trigger: "blur" }],
  rpsRelayType: [{ required: true, message: "请输入继电器类型", trigger: "blur" }],
  rpsRelayModel: [{ required: true, message: "请输入继电器型号", trigger: "blur" }],
  rpsSettingDate: [{ required: true, message: "请输入定值整定日期", trigger: "blur" }],
  rpsSettingPerson: [{ required: true, message: "请输入整定人员", trigger: "blur" }],
  rpsInstallPosition: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  rpsFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询继电保护定值台账 */
function handleQuery() {
  loading.value = true;
  RelayProtectionSettingAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置继电保护定值台账查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开继电保护定值台账弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改继电保护定值台账";
    RelayProtectionSettingAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增继电保护定值台账";
  }
}

/** 提交继电保护定值台账表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        RelayProtectionSettingAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        RelayProtectionSettingAPI.create(formData)
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

/** 关闭继电保护定值台账弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除继电保护定值台账 */
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
      RelayProtectionSettingAPI.deleteByIds(ids)
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
  RelayProtectionSettingAPI.export({
    rpsRelayCode: queryParams.rpsRelayCode as string,
    rpsRelayType: queryParams.rpsRelayType as string,
    rpsLastCheckDate: queryParams.rpsLastCheckDate,
    rpsNextCheckDate: queryParams.rpsNextCheckDate,
    rpsInstallPosition: queryParams.rpsInstallPosition,
    rpsFactory: queryParams.rpsFactory,
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
const importSuccess = () => {
  handleResetQuery();
};

const handleRepair = (row: RelayProtectionSettingPageVO) => {
  maintanceFormData.rpsRelayCode = row.rpsRelayCode;
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
