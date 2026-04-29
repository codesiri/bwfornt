<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="立罐设备编码" prop="specEqpVtCode">
          <el-input
            v-model="queryParams.specEqpVtCode"
            placeholder="立罐设备编码"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>

        <el-form-item label="立罐名称" prop="specEqpVtName">
          <el-input
            v-model="queryParams.specEqpVtName"
            placeholder="立罐名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="specEqpVtStatus">
          <Dict v-model="queryParams.specEqpVtStatus" code="status" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="specEqpVtFactory">
          <el-input
            v-model="queryParams.specEqpVtFactory"
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
            v-hasPerm="['ledger:spec-eqp-vertical-tank-account:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:spec-eqp-vertical-tank-account:delete']"
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
            v-hasPerm="'ledger:spec-eqp-crane-trans-account:import'"
            icon="upload"
            @click="handleOpenImportDialog"
          >
            导入
          </el-button>

          <el-button
            v-hasPerm="'ledger:spec-eqp-crane-trans-account:export'"
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
        <el-table-column type="index" label="序号" width="60" align="center" :index="indexMethod" />
        <!-- <el-table-column key="id" label="序号" prop="id" min-width="150" align="center" /> -->
        <el-table-column
          key="specEqpVtCode"
          label="立罐设备编码"
          prop="specEqpVtCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtName"
          label="立罐名称"
          prop="specEqpVtName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtArea"
          label="所在区域"
          prop="specEqpVtArea"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtModel"
          label="立罐型号"
          prop="specEqpVtModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtMaterial"
          label="罐体材质"
          prop="specEqpVtMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtVolume"
          label="设计容积（m³）"
          prop="specEqpVtVolume"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtDesignPressure"
          label="设计压力（MPa）"
          prop="specEqpVtDesignPressure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtDesignTemp"
          label="设计温度（℃）"
          prop="specEqpVtDesignTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtMedia"
          label="储存介质"
          prop="specEqpVtMedia"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtMediaProperty"
          label="介质特性"
          prop="specEqpVtMediaProperty"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtManufacturer"
          label="制造厂家"
          prop="specEqpVtManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtFactoryNo"
          label="出厂编号"
          prop="specEqpVtFactoryNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtProduceDate"
          label="制造日期"
          prop="specEqpVtProduceDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtInstallCompany"
          label="安装单位"
          prop="specEqpVtInstallCompany"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtInstallDate"
          label="安装日期"
          prop="specEqpVtInstallDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtAcceptanceDate"
          label="验收日期"
          prop="specEqpVtAcceptanceDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtUsageDate"
          label="投用日期"
          prop="specEqpVtUsageDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtLicenseNo"
          label="特种设备使用登记"
          prop="specEqpVtLicenseNo"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.specEqpVtStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="specEqpVtLastInspectDate"
          label="上次检验日期"
          prop="specEqpVtLastInspectDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtNextInspectDate"
          label="下次检验日期"
          prop="specEqpVtNextInspectDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtInspectCompany"
          label="检验机构"
          prop="specEqpVtInspectCompany"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtMaintainResponsible"
          label="运维责任人"
          prop="specEqpVtMaintainResponsible"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtMaintainRecord"
          label="最后一次维护记录"
          prop="specEqpVtMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtAccidentRecord"
          label="事故记录"
          prop="specEqpVtAccidentRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtCreateTime"
          label="创建时间"
          prop="specEqpVtCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtUpdateTime"
          label="更新时间"
          prop="specEqpVtUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtFactory"
          label="所属工厂"
          prop="specEqpVtFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtBackup1"
          label="备用1"
          prop="specEqpVtBackup1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtBackup2"
          label="备用2"
          prop="specEqpVtBackup2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpVtBackup3"
          label="备用3"
          prop="specEqpVtBackup3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:spec-eqp-vertical-tank-account:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:spec-eqp-vertical-tank-account:delete']"
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

    <!-- 立罐表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="序号" prop="id">
          <el-input v-model="formData.id" placeholder="序号" />
        </el-form-item>

        <el-form-item label="立罐设备编码" prop="specEqpVtCode">
          <el-input v-model="formData.specEqpVtCode" placeholder="立罐设备编码" />
        </el-form-item>

        <el-form-item label="立罐名称" prop="specEqpVtName">
          <el-input v-model="formData.specEqpVtName" placeholder="立罐名称" />
        </el-form-item>

        <el-form-item label="所在区域" prop="specEqpVtArea">
          <el-input v-model="formData.specEqpVtArea" placeholder="所在区域" />
        </el-form-item>

        <el-form-item label="立罐型号" prop="specEqpVtModel">
          <el-input v-model="formData.specEqpVtModel" placeholder="立罐型号" />
        </el-form-item>

        <el-form-item label="罐体材质" prop="specEqpVtMaterial">
          <el-input v-model="formData.specEqpVtMaterial" placeholder="罐体材质" />
        </el-form-item>

        <el-form-item label="设计容积（m³）" prop="specEqpVtVolume">
          <el-input v-model="formData.specEqpVtVolume" placeholder="设计容积（m³）" />
        </el-form-item>

        <el-form-item label="设计压力（MPa）" prop="specEqpVtDesignPressure">
          <el-input v-model="formData.specEqpVtDesignPressure" placeholder="设计压力（MPa）" />
        </el-form-item>

        <el-form-item label="设计温度（℃）" prop="specEqpVtDesignTemp">
          <el-input v-model="formData.specEqpVtDesignTemp" placeholder="设计温度（℃）" />
        </el-form-item>

        <el-form-item label="储存介质" prop="specEqpVtMedia">
          <el-input v-model="formData.specEqpVtMedia" placeholder="储存介质" />
        </el-form-item>

        <el-form-item label="介质特性" prop="specEqpVtMediaProperty">
          <el-input v-model="formData.specEqpVtMediaProperty" placeholder="介质特性" />
        </el-form-item>

        <el-form-item label="制造厂家" prop="specEqpVtManufacturer">
          <el-input v-model="formData.specEqpVtManufacturer" placeholder="制造厂家" />
        </el-form-item>

        <el-form-item label="出厂编号" prop="specEqpVtFactoryNo">
          <el-input v-model="formData.specEqpVtFactoryNo" placeholder="出厂编号" />
        </el-form-item>

        <el-form-item label="制造日期" prop="specEqpVtProduceDate">
          <el-date-picker
            v-model="formData.specEqpVtProduceDate"
            class="!w-[240px]"
            type="date"
            placeholder="制造日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="安装单位" prop="specEqpVtInstallCompany">
          <el-input v-model="formData.specEqpVtInstallCompany" placeholder="安装单位" />
        </el-form-item>

        <el-form-item label="安装日期" prop="specEqpVtInstallDate">
          <el-date-picker
            v-model="formData.specEqpVtInstallDate"
            class="!w-[240px]"
            type="date"
            placeholder="安装日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="验收日期" prop="specEqpVtAcceptanceDate">
          <el-date-picker
            v-model="formData.specEqpVtAcceptanceDate"
            class="!w-[240px]"
            type="date"
            placeholder="验收日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="投用日期" prop="specEqpVtUsageDate">
          <el-date-picker
            v-model="formData.specEqpVtUsageDate"
            type="datetime"
            placeholder="投用日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="特种设备使用登记" prop="specEqpVtLicenseNo">
          <el-input v-model="formData.specEqpVtLicenseNo" placeholder="特种设备使用登记" />
        </el-form-item>

        <el-form-item label="设备状态" prop="specEqpVtStatus">
          <Dict v-model="formData.specEqpVtStatus" code="status" />
        </el-form-item>

        <el-form-item label="上次检验日期" prop="specEqpVtLastInspectDate">
          <el-date-picker
            v-model="formData.specEqpVtLastInspectDate"
            class="!w-[240px]"
            type="date"
            placeholder="上次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="specEqpVtNextInspectDate">
          <el-date-picker
            v-model="formData.specEqpVtNextInspectDate"
            class="!w-[240px]"
            type="date"
            placeholder="下次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检验机构" prop="specEqpVtInspectCompany">
          <el-input v-model="formData.specEqpVtInspectCompany" placeholder="检验机构" />
        </el-form-item>

        <el-form-item label="运维责任人" prop="specEqpVtMaintainResponsible">
          <el-input v-model="formData.specEqpVtMaintainResponsible" placeholder="运维责任人" />
        </el-form-item>

        <el-form-item label="最后一次维护记录" prop="specEqpVtMaintainRecord">
          <el-input v-model="formData.specEqpVtMaintainRecord" placeholder="最后一次维护记录" />
        </el-form-item>

        <el-form-item label="事故记录" prop="specEqpVtAccidentRecord">
          <el-input v-model="formData.specEqpVtAccidentRecord" placeholder="事故记录" />
        </el-form-item>

        <el-form-item label="创建时间" prop="specEqpVtCreateTime">
          <el-date-picker
            v-model="formData.specEqpVtCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="更新时间" prop="specEqpVtUpdateTime">
          <el-date-picker
            v-model="formData.specEqpVtUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="specEqpVtFactory">
          <el-input v-model="formData.specEqpVtFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="specEqpVtBackup1">
          <el-input v-model="formData.specEqpVtBackup1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="specEqpVtBackup2">
          <el-input v-model="formData.specEqpVtBackup2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="specEqpVtBackup3">
          <el-input v-model="formData.specEqpVtBackup3" placeholder="备用3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>

    <!--导入弹框-->
    <SpecEqpVerticalTankAccountImport
      v-model="importDialogVisible"
      @import-success="handleResetQuery()"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SpecEqpVerticalTankAccount",
  inheritAttrs: false,
});

import SpecEqpVerticalTankAccountAPI, {
  SpecEqpVerticalTankAccountPageVO,
  SpecEqpVerticalTankAccountForm,
  SpecEqpVerticalTankAccountPageQuery,
} from "@/api/ledger/spec-eqp-vertical-tank-account-api";
import SpecEqpVerticalTankAccountImport from "./specEqpVerticalTankAccountImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<SpecEqpVerticalTankAccountPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

/**
 * 计算序号的方法
 * @param {number} index - Element UI 传入的当前行索引 (从 0 开始)
 */
const indexMethod = (index: any) => {
  // 计算公式：(当前页码 - 1) * 每页条数 + 当前行索引 + 1
  return (queryParams.pageNum - 1) * queryParams.pageSize + index + 1;
};

// 立罐表格数据
const pageData = ref<SpecEqpVerticalTankAccountPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 立罐表单数据
const formData = reactive<SpecEqpVerticalTankAccountForm>({});

// 立罐表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  specEqpVtCode: [{ required: true, message: "请输入立罐设备编码", trigger: "blur" }],
  specEqpVtName: [{ required: true, message: "请输入立罐名称", trigger: "blur" }],
  specEqpVtArea: [{ required: true, message: "请输入所在区域", trigger: "blur" }],
  specEqpVtModel: [{ required: true, message: "请输入立罐型号", trigger: "blur" }],
  specEqpVtMaterial: [{ required: true, message: "请输入罐体材质", trigger: "blur" }],
  specEqpVtVolume: [{ required: true, message: "请输入设计容积（m³）", trigger: "blur" }],
  specEqpVtDesignPressure: [{ required: true, message: "请输入设计压力（MPa）", trigger: "blur" }],
  specEqpVtDesignTemp: [{ required: true, message: "请输入设计温度（℃）", trigger: "blur" }],
  specEqpVtMedia: [{ required: true, message: "请输入储存介质", trigger: "blur" }],
  specEqpVtMediaProperty: [{ required: true, message: "请输入介质特性", trigger: "blur" }],
  specEqpVtManufacturer: [{ required: true, message: "请输入制造厂家", trigger: "blur" }],
  specEqpVtFactoryNo: [{ required: true, message: "请输入出厂编号", trigger: "blur" }],
  specEqpVtProduceDate: [{ required: true, message: "请输入制造日期", trigger: "blur" }],
  specEqpVtInstallCompany: [{ required: true, message: "请输入安装单位", trigger: "blur" }],
  specEqpVtInstallDate: [{ required: true, message: "请输入安装日期", trigger: "blur" }],
  specEqpVtAcceptanceDate: [{ required: true, message: "请输入验收日期", trigger: "blur" }],
  specEqpVtUsageDate: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  specEqpVtLicenseNo: [{ required: true, message: "请输入特种设备使用登记", trigger: "blur" }],
  specEqpVtStatus: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
  specEqpVtMaintainResponsible: [{ required: true, message: "请输入运维责任人", trigger: "blur" }],
  specEqpVtCreateTime: [{ required: true, message: "请输入创建时间", trigger: "blur" }],
  specEqpVtUpdateTime: [{ required: true, message: "请输入更新时间", trigger: "blur" }],
  specEqpVtFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询立罐 */
function handleQuery() {
  loading.value = true;
  SpecEqpVerticalTankAccountAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置立罐查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开立罐弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改立罐";
    SpecEqpVerticalTankAccountAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增立罐";
  }
}

/** 提交立罐表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SpecEqpVerticalTankAccountAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SpecEqpVerticalTankAccountAPI.create(formData)
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

/** 关闭立罐弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除立罐 */
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
      SpecEqpVerticalTankAccountAPI.deleteByIds(ids)
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

/**导入弹框*/
const handleOpenImportDialog = () => {
  importDialogVisible.value = true;
};
/**导出*/
const handleExport = () => {
  SpecEqpVerticalTankAccountAPI.export({
    specEqpVtCode: queryParams.specEqpVtCode,
    specEqpVtName: queryParams.specEqpVtName,
    specEqpVtStatus: queryParams.specEqpVtStatus,
    specEqpVtFactory: queryParams.specEqpVtFactory,
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

onMounted(() => {
  handleQuery();
});
</script>
