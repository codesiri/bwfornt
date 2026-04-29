<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="设备名称" prop="specEqpCtName">
          <el-input
            v-model="queryParams.specEqpCtName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>

        <el-form-item label="设备类型" prop="specEqpCtType">
          <el-input
            v-model="queryParams.specEqpCtType"
            placeholder="设备类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="specEqpCtStatus">
          <!-- <el-input
            v-model="queryParams.specEqpCtStatus"
            placeholder="设备状态"
            clearable
            @keyup.enter="handleQuery()"
          /> -->
          <Dict v-model="queryParams.specEqpCtStatus" code="status" />
        </el-form-item>

        <el-form-item class="search-buttons">
          <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
          <el-button icon="refresh" @click="handleResetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 起重运输类列表 -->
    <el-card shadow="never">
      <div class="data-table__toolbar">
        <div class="data-table__toolbar--actions">
          <el-button
            v-hasPerm="['ledger:spec-eqp-crane-trans-account:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:spec-eqp-crane-trans-account:delete']"
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
          key="specEqpCtCode"
          label="设备编码"
          prop="specEqpCtCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtName"
          label="设备名称"
          prop="specEqpCtName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtArea"
          label="安装 / 使用区域、工段"
          prop="specEqpCtArea"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtModel"
          label="设备型号"
          prop="specEqpCtModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtType"
          label="设备类型"
          prop="specEqpCtType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtLiftingCapacity"
          label="额定起重量（t）"
          prop="specEqpCtLiftingCapacity"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtLiftingHeight"
          label="额定起升高度（m）"
          prop="specEqpCtLiftingHeight"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtSpan"
          label="起重机跨度（m）"
          prop="specEqpCtSpan"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtDesignPressure"
          label="设计压力"
          prop="specEqpCtDesignPressure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtManufacturer"
          label="制造厂家"
          prop="specEqpCtManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtFactoryNo"
          label="出厂编号"
          prop="specEqpCtFactoryNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtProduceDate"
          label="制造日期"
          prop="specEqpCtProduceDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtInstallCompany"
          label="安装单位"
          prop="specEqpCtInstallCompany"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtInstallDate"
          label="安装日期"
          prop="specEqpCtInstallDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtAcceptanceDate"
          label="验收日期"
          prop="specEqpCtAcceptanceDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtUsageDate"
          label="投用日期"
          prop="specEqpCtUsageDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtLicenseNo"
          label="特种设备使用登记"
          prop="specEqpCtLicenseNo"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.specEqpCtStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="specEqpCtLastInspectDate"
          label="上次检验日期"
          prop="specEqpCtLastInspectDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtNextInspectDate"
          label="下次检验日期"
          prop="specEqpCtNextInspectDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtInspectCompany"
          label="检验机构"
          prop="specEqpCtInspectCompany"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtMaintainResponsible"
          label="运维责任人"
          prop="specEqpCtMaintainResponsible"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtMaintainRecord"
          label="维护检修记录"
          prop="specEqpCtMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtAccidentRecord"
          label="异常及事故记录"
          prop="specEqpCtAccidentRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtCreateTime"
          label="台账创建时间"
          prop="specEqpCtCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtUpdateTime"
          label="台账更新时间"
          prop="specEqpCtUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtFactory"
          label="所属工厂"
          prop="specEqpCtFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtBackup1"
          label="备用1"
          prop="specEqpCtBackup1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtBackup2"
          label="备用2"
          prop="specEqpCtBackup2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpCtBackup3"
          label="备用3"
          prop="specEqpCtBackup3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:spec-eqp-crane-trans-account:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:spec-eqp-crane-trans-account:delete']"
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

    <!-- 起重运输类表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <!-- <el-form-item label="序号" prop="id">
          <el-input v-model="formData.id" placeholder="序号" />
        </el-form-item> -->

        <el-form-item label="设备编码" prop="specEqpCtCode">
          <el-input v-model="formData.specEqpCtCode" placeholder="设备编码" />
        </el-form-item>

        <el-form-item label="设备名称" prop="specEqpCtName">
          <el-input v-model="formData.specEqpCtName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="安装 / 使用区域、工段" prop="specEqpCtArea">
          <el-input v-model="formData.specEqpCtArea" placeholder="安装 / 使用区域、工段" />
        </el-form-item>

        <el-form-item label="设备型号" prop="specEqpCtModel">
          <el-input v-model="formData.specEqpCtModel" placeholder="设备型号" />
        </el-form-item>

        <el-form-item label="设备类型" prop="specEqpCtType">
          <el-input v-model="formData.specEqpCtType" placeholder="设备类型" />
        </el-form-item>

        <el-form-item label="额定起重量（t）" prop="specEqpCtLiftingCapacity">
          <el-input v-model="formData.specEqpCtLiftingCapacity" placeholder="额定起重量（t）" />
        </el-form-item>

        <el-form-item label="额定起升高度（m）" prop="specEqpCtLiftingHeight">
          <el-input v-model="formData.specEqpCtLiftingHeight" placeholder="额定起升高度（m）" />
        </el-form-item>

        <el-form-item label="起重机跨度（m）" prop="specEqpCtSpan">
          <el-input v-model="formData.specEqpCtSpan" placeholder="起重机跨度（m）" />
        </el-form-item>

        <el-form-item label="设计压力" prop="specEqpCtDesignPressure">
          <el-input v-model="formData.specEqpCtDesignPressure" placeholder="设计压力" />
        </el-form-item>

        <el-form-item label="制造厂家" prop="specEqpCtManufacturer">
          <el-input v-model="formData.specEqpCtManufacturer" placeholder="制造厂家" />
        </el-form-item>

        <el-form-item label="出厂编号" prop="specEqpCtFactoryNo">
          <el-input v-model="formData.specEqpCtFactoryNo" placeholder="出厂编号" />
        </el-form-item>

        <el-form-item label="制造日期" prop="specEqpCtProduceDate">
          <el-date-picker
            v-model="formData.specEqpCtProduceDate"
            class="!w-[240px]"
            type="date"
            placeholder="制造日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="安装单位" prop="specEqpCtInstallCompany">
          <el-input v-model="formData.specEqpCtInstallCompany" placeholder="安装单位" />
        </el-form-item>

        <el-form-item label="安装日期" prop="specEqpCtInstallDate">
          <el-date-picker
            v-model="formData.specEqpCtInstallDate"
            class="!w-[240px]"
            type="date"
            placeholder="安装日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="验收日期" prop="specEqpCtAcceptanceDate">
          <el-date-picker
            v-model="formData.specEqpCtAcceptanceDate"
            class="!w-[240px]"
            type="date"
            placeholder="验收日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="投用日期" prop="specEqpCtUsageDate">
          <el-date-picker
            v-model="formData.specEqpCtUsageDate"
            class="!w-[240px]"
            type="date"
            placeholder="投用日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="特种设备使用登记" prop="specEqpCtLicenseNo">
          <el-input v-model="formData.specEqpCtLicenseNo" placeholder="特种设备使用登记" />
        </el-form-item>

        <el-form-item label="设备状态" prop="specEqpCtStatus">
          <Dict v-model="formData.specEqpCtStatus" code="status" />
        </el-form-item>

        <el-form-item label="上次检验日期" prop="specEqpCtLastInspectDate">
          <el-date-picker
            v-model="formData.specEqpCtLastInspectDate"
            class="!w-[240px]"
            type="date"
            placeholder="上次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="specEqpCtNextInspectDate">
          <el-date-picker
            v-model="formData.specEqpCtNextInspectDate"
            class="!w-[240px]"
            type="date"
            placeholder="下次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检验机构" prop="specEqpCtInspectCompany">
          <el-input v-model="formData.specEqpCtInspectCompany" placeholder="检验机构" />
        </el-form-item>

        <el-form-item label="运维责任人" prop="specEqpCtMaintainResponsible">
          <el-input v-model="formData.specEqpCtMaintainResponsible" placeholder="运维责任人" />
        </el-form-item>

        <el-form-item label="维护检修记录" prop="specEqpCtMaintainRecord">
          <el-input v-model="formData.specEqpCtMaintainRecord" placeholder="维护检修记录" />
        </el-form-item>

        <el-form-item label="异常及事故记录" prop="specEqpCtAccidentRecord">
          <el-input v-model="formData.specEqpCtAccidentRecord" placeholder="异常及事故记录" />
        </el-form-item>

        <el-form-item label="台账创建时间" prop="specEqpCtCreateTime">
          <el-date-picker
            v-model="formData.specEqpCtCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="台账创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="台账更新时间" prop="specEqpCtUpdateTime">
          <el-date-picker
            v-model="formData.specEqpCtUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="台账更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="specEqpCtFactory">
          <el-input v-model="formData.specEqpCtFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="specEqpCtBackup1">
          <el-input v-model="formData.specEqpCtBackup1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="specEqpCtBackup2">
          <el-input v-model="formData.specEqpCtBackup2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="specEqpCtBackup3">
          <el-input v-model="formData.specEqpCtBackup3" placeholder="备用3" />
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
    <SpecEqpCraneTransAccountImport
      v-model="importDialogVisible"
      @import-success="handleResetQuery()"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SpecEqpCraneTransAccount",
  inheritAttrs: false,
});

import SpecEqpCraneTransAccountAPI, {
  SpecEqpCraneTransAccountPageVO,
  SpecEqpCraneTransAccountForm,
  SpecEqpCraneTransAccountPageQuery,
} from "@/api/ledger/spec-eqp-crane-trans-account-api";
import SpecEqpCraneTransAccountImport from "./specEqpCraneTransAccountImport.vue";
const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<SpecEqpCraneTransAccountPageQuery>({
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
// 起重运输类表格数据
const pageData = ref<SpecEqpCraneTransAccountPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 起重运输类表单数据
const formData = reactive<SpecEqpCraneTransAccountForm>({});

// 起重运输类表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  specEqpCtCode: [{ required: true, message: "请输入设备编码", trigger: "blur" }],
  specEqpCtName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  specEqpCtArea: [{ required: true, message: "请输入安装 / 使用区域、工段", trigger: "blur" }],
  specEqpCtModel: [{ required: true, message: "请输入设备型号", trigger: "blur" }],
  specEqpCtType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
  specEqpCtLiftingCapacity: [{ required: true, message: "请输入额定起重量（t）", trigger: "blur" }],
  specEqpCtLiftingHeight: [{ required: true, message: "请输入额定起升高度（m）", trigger: "blur" }],
  specEqpCtManufacturer: [{ required: true, message: "请输入制造厂家", trigger: "blur" }],
  specEqpCtFactoryNo: [{ required: true, message: "请输入出厂编号", trigger: "blur" }],
  specEqpCtProduceDate: [{ required: true, message: "请输入制造日期", trigger: "blur" }],
  specEqpCtInstallCompany: [{ required: true, message: "请输入安装单位", trigger: "blur" }],
  specEqpCtInstallDate: [{ required: true, message: "请输入安装日期", trigger: "blur" }],
  specEqpCtAcceptanceDate: [{ required: true, message: "请输入验收日期", trigger: "blur" }],
  specEqpCtUsageDate: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  specEqpCtLicenseNo: [{ required: true, message: "请输入特种设备使用登记", trigger: "blur" }],
  specEqpCtStatus: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
  specEqpCtNextInspectDate: [{ required: true, message: "请输入下次检验日期", trigger: "blur" }],
  specEqpCtMaintainResponsible: [{ required: true, message: "请输入运维责任人", trigger: "blur" }],
  specEqpCtCreateTime: [{ required: true, message: "请输入台账创建时间", trigger: "blur" }],
  specEqpCtUpdateTime: [{ required: true, message: "请输入台账更新时间", trigger: "blur" }],
  specEqpCtFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询起重运输类 */
function handleQuery() {
  loading.value = true;
  SpecEqpCraneTransAccountAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置起重运输类查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开起重运输类弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改起重运输类";
    SpecEqpCraneTransAccountAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增起重运输类";
  }
}

/** 提交起重运输类表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SpecEqpCraneTransAccountAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SpecEqpCraneTransAccountAPI.create(formData)
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

/** 关闭起重运输类弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除起重运输类 */
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
      SpecEqpCraneTransAccountAPI.deleteByIds(ids)
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
  SpecEqpCraneTransAccountAPI.export({
    specEqpCtName: queryParams.specEqpCtName,
    specEqpCtType: queryParams.specEqpCtType,
    specEqpCtStatus: queryParams.specEqpCtStatus,
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
