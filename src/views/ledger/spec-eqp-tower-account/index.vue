<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="设备名称" prop="specEqpTowerName">
          <el-input
            v-model="queryParams.specEqpTowerName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>

        <el-form-item label="设备类型" prop="specEqpTowerType">
          <el-input
            v-model="queryParams.specEqpTowerType"
            placeholder="设备类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="specEqpTowerStatus">
          <Dict v-model="queryParams.specEqpTowerStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="specEqpTowerFactory">
          <el-input
            v-model="queryParams.specEqpTowerFactory"
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
            v-hasPerm="['ledger:spec-eqp-tower-account:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:spec-eqp-tower-account:delete']"
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
          key="specEqpTowerCode"
          label="塔类设备编码"
          prop="specEqpTowerCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerName"
          label="塔类设备名称"
          prop="specEqpTowerName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerArea"
          label="所在区域"
          prop="specEqpTowerArea"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerModel"
          label="塔类设备型号"
          prop="specEqpTowerModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerType"
          label="塔器类型"
          prop="specEqpTowerType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerMaterial"
          label="塔体材质"
          prop="specEqpTowerMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerHeight"
          label="塔体总高度（m）"
          prop="specEqpTowerHeight"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerDiameter"
          label="塔体公称直径（m）"
          prop="specEqpTowerDiameter"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerLayer"
          label="塔板层数 / 填料高度（层 /m）"
          prop="specEqpTowerLayer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerDesignPressure"
          label="设计压力（MPa）"
          prop="specEqpTowerDesignPressure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerDesignTemp"
          label="设计温度（℃）"
          prop="specEqpTowerDesignTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerMedia"
          label="处理介质"
          prop="specEqpTowerMedia"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerMediaProperty"
          label="介质特性"
          prop="specEqpTowerMediaProperty"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerManufacturer"
          label="制造厂家"
          prop="specEqpTowerManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerFactoryNo"
          label="出厂编号"
          prop="specEqpTowerFactoryNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerProduceDate"
          label="制造日期"
          prop="specEqpTowerProduceDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerInstallCompany"
          label="安装单位"
          prop="specEqpTowerInstallCompany"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerInstallDate"
          label="安装日期"
          prop="specEqpTowerInstallDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerAcceptanceDate"
          label="验收日期"
          prop="specEqpTowerAcceptanceDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerUsageDate"
          label="投用日期"
          prop="specEqpTowerUsageDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerLicenseNo"
          label="特种设备使用登记"
          prop="specEqpTowerLicenseNo"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.specEqpTowerStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="specEqpTowerLastInspectDate"
          label="上次检验日期"
          prop="specEqpTowerLastInspectDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerNextInspectDate"
          label="下次检验日期"
          prop="specEqpTowerNextInspectDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerInspectCompany"
          label="检验机构"
          prop="specEqpTowerInspectCompany"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerMaintainResponsible"
          label="运维负责人"
          prop="specEqpTowerMaintainResponsible"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerMaintainRecord"
          label="最后一次维护记录"
          prop="specEqpTowerMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerAccidentRecord"
          label="事故记录"
          prop="specEqpTowerAccidentRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerCreateTime"
          label="创建时间"
          prop="specEqpTowerCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerUpdateTime"
          label="更新时间"
          prop="specEqpTowerUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerFactory"
          label="所属工厂"
          prop="specEqpTowerFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerBackup1"
          label="备用1"
          prop="specEqpTowerBackup1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerBackup2"
          label="备用2"
          prop="specEqpTowerBackup2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpTowerBackup3"
          label="备用3"
          prop="specEqpTowerBackup3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:spec-eqp-tower-account:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:spec-eqp-tower-account:delete']"
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

    <!-- 塔类表单弹窗 -->
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

        <el-form-item label="塔类设备编码" prop="specEqpTowerCode">
          <el-input v-model="formData.specEqpTowerCode" placeholder="塔类设备编码" />
        </el-form-item>

        <el-form-item label="塔类设备名称" prop="specEqpTowerName">
          <el-input v-model="formData.specEqpTowerName" placeholder="塔类设备名称" />
        </el-form-item>

        <el-form-item label="所在区域" prop="specEqpTowerArea">
          <el-input v-model="formData.specEqpTowerArea" placeholder="所在区域" />
        </el-form-item>

        <el-form-item label="塔类设备型号" prop="specEqpTowerModel">
          <el-input v-model="formData.specEqpTowerModel" placeholder="塔类设备型号" />
        </el-form-item>

        <el-form-item label="塔器类型" prop="specEqpTowerType">
          <el-input v-model="formData.specEqpTowerType" placeholder="塔器类型" />
        </el-form-item>

        <el-form-item label="塔体材质" prop="specEqpTowerMaterial">
          <el-input v-model="formData.specEqpTowerMaterial" placeholder="塔体材质" />
        </el-form-item>

        <el-form-item label="塔体总高度（m）" prop="specEqpTowerHeight">
          <el-input v-model="formData.specEqpTowerHeight" placeholder="塔体总高度（m）" />
        </el-form-item>

        <el-form-item label="塔体公称直径（m）" prop="specEqpTowerDiameter">
          <el-input v-model="formData.specEqpTowerDiameter" placeholder="塔体公称直径（m）" />
        </el-form-item>

        <el-form-item label="塔板层数 / 填料高度（层 /m）" prop="specEqpTowerLayer">
          <el-input
            v-model="formData.specEqpTowerLayer"
            placeholder="塔板层数 / 填料高度（层 /m）"
          />
        </el-form-item>

        <el-form-item label="设计压力（MPa）" prop="specEqpTowerDesignPressure">
          <el-input v-model="formData.specEqpTowerDesignPressure" placeholder="设计压力（MPa）" />
        </el-form-item>

        <el-form-item label="设计温度（℃）" prop="specEqpTowerDesignTemp">
          <el-input v-model="formData.specEqpTowerDesignTemp" placeholder="设计温度（℃）" />
        </el-form-item>

        <el-form-item label="处理介质" prop="specEqpTowerMedia">
          <el-input v-model="formData.specEqpTowerMedia" placeholder="处理介质" />
        </el-form-item>

        <el-form-item label="介质特性" prop="specEqpTowerMediaProperty">
          <el-input v-model="formData.specEqpTowerMediaProperty" placeholder="介质特性" />
        </el-form-item>

        <el-form-item label="制造厂家" prop="specEqpTowerManufacturer">
          <el-input v-model="formData.specEqpTowerManufacturer" placeholder="制造厂家" />
        </el-form-item>

        <el-form-item label="出厂编号" prop="specEqpTowerFactoryNo">
          <el-input v-model="formData.specEqpTowerFactoryNo" placeholder="出厂编号" />
        </el-form-item>

        <el-form-item label="制造日期" prop="specEqpTowerProduceDate">
          <el-date-picker
            v-model="formData.specEqpTowerProduceDate"
            class="!w-[240px]"
            type="date"
            placeholder="制造日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="安装单位" prop="specEqpTowerInstallCompany">
          <el-input v-model="formData.specEqpTowerInstallCompany" placeholder="安装单位" />
        </el-form-item>

        <el-form-item label="安装日期" prop="specEqpTowerInstallDate">
          <el-date-picker
            v-model="formData.specEqpTowerInstallDate"
            class="!w-[240px]"
            type="date"
            placeholder="安装日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="验收日期" prop="specEqpTowerAcceptanceDate">
          <el-date-picker
            v-model="formData.specEqpTowerAcceptanceDate"
            class="!w-[240px]"
            type="date"
            placeholder="验收日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="投用日期" prop="specEqpTowerUsageDate">
          <el-date-picker
            v-model="formData.specEqpTowerUsageDate"
            class="!w-[240px]"
            type="date"
            placeholder="投用日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="特种设备使用登记" prop="specEqpTowerLicenseNo">
          <el-input v-model="formData.specEqpTowerLicenseNo" placeholder="特种设备使用登记" />
        </el-form-item>

        <el-form-item label="设备状态" prop="specEqpTowerStatus">
          <Dict v-model="formData.specEqpTowerStatus" code="status" />
        </el-form-item>

        <el-form-item label="上次检验日期" prop="specEqpTowerLastInspectDate">
          <el-date-picker
            v-model="formData.specEqpTowerLastInspectDate"
            class="!w-[240px]"
            type="date"
            placeholder="上次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="specEqpTowerNextInspectDate">
          <el-date-picker
            v-model="formData.specEqpTowerNextInspectDate"
            class="!w-[240px]"
            type="date"
            placeholder="下次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检验机构" prop="specEqpTowerInspectCompany">
          <el-input v-model="formData.specEqpTowerInspectCompany" placeholder="检验机构" />
        </el-form-item>

        <el-form-item label="运维负责人" prop="specEqpTowerMaintainResponsible">
          <el-input v-model="formData.specEqpTowerMaintainResponsible" placeholder="运维负责人" />
        </el-form-item>

        <el-form-item label="最后一次维护记录" prop="specEqpTowerMaintainRecord">
          <el-input v-model="formData.specEqpTowerMaintainRecord" placeholder="最后一次维护记录" />
        </el-form-item>

        <el-form-item label="事故记录" prop="specEqpTowerAccidentRecord">
          <el-input v-model="formData.specEqpTowerAccidentRecord" placeholder="事故记录" />
        </el-form-item>

        <el-form-item label="创建时间" prop="specEqpTowerCreateTime">
          <el-date-picker
            v-model="formData.specEqpTowerCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="更新时间" prop="specEqpTowerUpdateTime">
          <el-date-picker
            v-model="formData.specEqpTowerUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="specEqpTowerFactory">
          <el-input v-model="formData.specEqpTowerFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="specEqpTowerBackup1">
          <el-input v-model="formData.specEqpTowerBackup1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="specEqpTowerBackup2">
          <el-input v-model="formData.specEqpTowerBackup2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="specEqpTowerBackup3">
          <el-input v-model="formData.specEqpTowerBackup3" placeholder="备用3" />
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
    <SpecEqpTowerAccountImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SpecEqpTowerAccount",
  inheritAttrs: false,
});

import SpecEqpTowerAccountAPI, {
  SpecEqpTowerAccountPageVO,
  SpecEqpTowerAccountForm,
  SpecEqpTowerAccountPageQuery,
} from "@/api/ledger/spec-eqp-tower-account-api";

import SpecEqpTowerAccountImport from "./specEqpTowerAccountImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<SpecEqpTowerAccountPageQuery>({
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

// 塔类表格数据
const pageData = ref<SpecEqpTowerAccountPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 塔类表单数据
const formData = reactive<SpecEqpTowerAccountForm>({});

// 塔类表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  specEqpTowerCode: [{ required: true, message: "请输入塔类设备编码", trigger: "blur" }],
  specEqpTowerName: [{ required: true, message: "请输入塔类设备名称", trigger: "blur" }],
  specEqpTowerArea: [{ required: true, message: "请输入所在区域", trigger: "blur" }],
  specEqpTowerModel: [{ required: true, message: "请输入塔类设备型号", trigger: "blur" }],
  specEqpTowerType: [{ required: true, message: "请输入塔器类型", trigger: "blur" }],
  specEqpTowerMaterial: [{ required: true, message: "请输入塔体材质", trigger: "blur" }],
  specEqpTowerHeight: [{ required: true, message: "请输入塔体总高度（m）", trigger: "blur" }],
  specEqpTowerDiameter: [{ required: true, message: "请输入塔体公称直径（m）", trigger: "blur" }],
  specEqpTowerLayer: [
    { required: true, message: "请输入塔板层数 / 填料高度（层 /m）", trigger: "blur" },
  ],
  specEqpTowerDesignPressure: [
    { required: true, message: "请输入设计压力（MPa）", trigger: "blur" },
  ],
  specEqpTowerDesignTemp: [{ required: true, message: "请输入设计温度（℃）", trigger: "blur" }],
  specEqpTowerMedia: [{ required: true, message: "请输入处理介质", trigger: "blur" }],
  specEqpTowerMediaProperty: [{ required: true, message: "请输入介质特性", trigger: "blur" }],
  specEqpTowerManufacturer: [{ required: true, message: "请输入制造厂家", trigger: "blur" }],
  specEqpTowerFactoryNo: [{ required: true, message: "请输入出厂编号", trigger: "blur" }],
  specEqpTowerProduceDate: [{ required: true, message: "请输入制造日期", trigger: "blur" }],
  specEqpTowerInstallCompany: [{ required: true, message: "请输入安装单位", trigger: "blur" }],
  specEqpTowerInstallDate: [{ required: true, message: "请输入安装日期", trigger: "blur" }],
  specEqpTowerAcceptanceDate: [{ required: true, message: "请输入验收日期", trigger: "blur" }],
  specEqpTowerUsageDate: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  specEqpTowerLicenseNo: [{ required: true, message: "请输入特种设备使用登记", trigger: "blur" }],
  specEqpTowerStatus: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
  specEqpTowerNextInspectDate: [{ required: true, message: "请输入下次检验日期", trigger: "blur" }],
  specEqpTowerMaintainResponsible: [
    { required: true, message: "请输入运维负责人", trigger: "blur" },
  ],
  specEqpTowerCreateTime: [{ required: true, message: "请输入创建时间", trigger: "blur" }],
  specEqpTowerUpdateTime: [{ required: true, message: "请输入更新时间", trigger: "blur" }],
  specEqpTowerFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询塔类 */
function handleQuery() {
  loading.value = true;
  SpecEqpTowerAccountAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置塔类查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开塔类弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改塔类";
    SpecEqpTowerAccountAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增塔类";
  }
}

/** 提交塔类表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SpecEqpTowerAccountAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SpecEqpTowerAccountAPI.create(formData)
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

/** 关闭塔类弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除塔类 */
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
      SpecEqpTowerAccountAPI.deleteByIds(ids)
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

const handleOpenImportDialog = () => {
  importDialogVisible.value = true;
};
/**导出*/
const handleExport = () => {
  SpecEqpTowerAccountAPI.export({
    specEqpTowerName: queryParams.specEqpTowerName,
    specEqpTowerType: queryParams.specEqpTowerType,
    specEqpTowerStatus: queryParams.specEqpTowerStatus,
    specEqpTowerFactory: queryParams.specEqpTowerFactory,
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
