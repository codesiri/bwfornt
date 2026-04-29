<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="设备名称" prop="specEqpStName">
          <el-input
            v-model="queryParams.specEqpStName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="specEqpStStatus">
          <!-- <el-input
            v-model="queryParams.specEqpStStatus"
            placeholder="设备状态"
            clearable
            @keyup.enter="handleQuery()"
          /> -->
          <Dict v-model="queryParams.specEqpStStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="specEqpStFactory">
          <el-input
            v-model="queryParams.specEqpStFactory"
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
            v-hasPerm="['ledger:spec-eqp-steam-turbine-account:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:spec-eqp-steam-turbine-account:delete']"
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
      <!-- 汽轮机列表 -->
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
          key="specEqpStCode"
          label="汽轮机设备编码"
          prop="specEqpStCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStName"
          label="汽轮机名称"
          prop="specEqpStName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStArea"
          label="所在区域"
          prop="specEqpStArea"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStModel"
          label="汽轮机型号"
          prop="specEqpStModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStManufacturer"
          label="生产厂家"
          prop="specEqpStManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStFactoryNo"
          label="出厂编号"
          prop="specEqpStFactoryNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStProduceDate"
          label="制造日期"
          prop="specEqpStProduceDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStInstallCompany"
          label="安装单位"
          prop="specEqpStInstallCompany"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStInstallDate"
          label="安装日期"
          prop="specEqpStInstallDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStAcceptanceDate"
          label="验收日期"
          prop="specEqpStAcceptanceDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStUsageDate"
          label="投用日期"
          prop="specEqpStUsageDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStLicenseNo"
          label="	特种设备使用登记"
          prop="specEqpStLicenseNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStPowerRating"
          label="	额定功率（MW）"
          prop="specEqpStPowerRating"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStSpeedRating"
          label="	额定转速（r/min）"
          prop="specEqpStSpeedRating"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStSteamPressure"
          label="进汽设计压力（MPa）"
          prop="specEqpStSteamPressure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStSteamTemp"
          label="进汽设计温度（℃）"
          prop="specEqpStSteamTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStExhaustPressure"
          label="排汽压力（MPa）"
          prop="specEqpStExhaustPressure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStRotorMaterial"
          label="	转子材质"
          prop="specEqpStRotorMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStCasingMaterial"
          label="	汽缸材质"
          prop="specEqpStCasingMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStMedia"
          label="工作介质（蒸汽 / 过热蒸汽等）"
          prop="specEqpStMedia"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStMediaProperty"
          label="介质特性（高温、高压等）"
          prop="specEqpStMediaProperty"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.specEqpStStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="specEqpStLastInspectDate"
          label="	上次检验日期"
          prop="specEqpStLastInspectDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStNextInspectDate"
          label="	下次检验日期"
          prop="specEqpStNextInspectDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStInspectCompany"
          label="	检验机构"
          prop="specEqpStInspectCompany"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStMaintainResponsible"
          label="	运维责任人"
          prop="specEqpStMaintainResponsible"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStMaintainRecord"
          label="维护检修记录"
          prop="specEqpStMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStAccidentRecord"
          label="	异常及事故记录"
          prop="specEqpStAccidentRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStCreateTime"
          label="	台账创建时间"
          prop="specEqpStCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStUpdateTime"
          label="	台账更新时间"
          prop="specEqpStUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStFactory"
          label="所属工厂"
          prop="specEqpStFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStBackup1"
          label="备用1"
          prop="specEqpStBackup1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStBackup2"
          label="备用2"
          prop="specEqpStBackup2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="specEqpStBackup3"
          label="备用3"
          prop="specEqpStBackup3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:spec-eqp-steam-turbine-account:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:spec-eqp-steam-turbine-account:delete']"
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

    <!-- 汽轮机表单弹窗 -->
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

        <el-form-item label="汽轮机设备编码" prop="specEqpStCode">
          <el-input v-model="formData.specEqpStCode" placeholder="汽轮机设备编码" />
        </el-form-item>

        <el-form-item label="汽轮机名称" prop="specEqpStName">
          <el-input v-model="formData.specEqpStName" placeholder="汽轮机名称" />
        </el-form-item>

        <el-form-item label="所在区域" prop="specEqpStArea">
          <el-input v-model="formData.specEqpStArea" placeholder="所在区域" />
        </el-form-item>

        <el-form-item label="汽轮机型号" prop="specEqpStModel">
          <el-input v-model="formData.specEqpStModel" placeholder="汽轮机型号" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="specEqpStManufacturer">
          <el-input v-model="formData.specEqpStManufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="出厂编号" prop="specEqpStFactoryNo">
          <el-input v-model="formData.specEqpStFactoryNo" placeholder="出厂编号" />
        </el-form-item>

        <el-form-item label="制造日期" prop="specEqpStProduceDate">
          <el-date-picker
            v-model="formData.specEqpStProduceDate"
            class="!w-[240px]"
            type="date"
            placeholder="制造日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="安装单位" prop="specEqpStInstallCompany">
          <el-input v-model="formData.specEqpStInstallCompany" placeholder="安装单位" />
        </el-form-item>

        <el-form-item label="安装日期" prop="specEqpStInstallDate">
          <el-date-picker
            v-model="formData.specEqpStInstallDate"
            class="!w-[240px]"
            type="date"
            placeholder="安装日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="验收日期" prop="specEqpStAcceptanceDate">
          <el-date-picker
            v-model="formData.specEqpStAcceptanceDate"
            class="!w-[240px]"
            type="date"
            placeholder="验收日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="投用日期" prop="specEqpStUsageDate">
          <el-date-picker
            v-model="formData.specEqpStUsageDate"
            class="!w-[240px]"
            type="date"
            placeholder="投用日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="	特种设备使用登记" prop="specEqpStLicenseNo">
          <el-input v-model="formData.specEqpStLicenseNo" placeholder="	特种设备使用登记" />
        </el-form-item>

        <el-form-item label="	额定功率（MW）" prop="specEqpStPowerRating">
          <el-input v-model="formData.specEqpStPowerRating" placeholder="	额定功率（MW）" />
        </el-form-item>

        <el-form-item label="	额定转速（r/min）" prop="specEqpStSpeedRating">
          <el-input v-model="formData.specEqpStSpeedRating" placeholder="	额定转速（r/min）" />
        </el-form-item>

        <el-form-item label="进汽设计压力（MPa）" prop="specEqpStSteamPressure">
          <el-input v-model="formData.specEqpStSteamPressure" placeholder="进汽设计压力（MPa）" />
        </el-form-item>

        <el-form-item label="进汽设计温度（℃）" prop="specEqpStSteamTemp">
          <el-input v-model="formData.specEqpStSteamTemp" placeholder="进汽设计温度（℃）" />
        </el-form-item>

        <el-form-item label="排汽压力（MPa）" prop="specEqpStExhaustPressure">
          <el-input v-model="formData.specEqpStExhaustPressure" placeholder="排汽压力（MPa）" />
        </el-form-item>

        <el-form-item label="	转子材质" prop="specEqpStRotorMaterial">
          <el-input v-model="formData.specEqpStRotorMaterial" placeholder="	转子材质" />
        </el-form-item>

        <el-form-item label="	汽缸材质" prop="specEqpStCasingMaterial">
          <el-input v-model="formData.specEqpStCasingMaterial" placeholder="	汽缸材质" />
        </el-form-item>

        <el-form-item label="工作介质（蒸汽 / 过热蒸汽等）" prop="specEqpStMedia">
          <el-input v-model="formData.specEqpStMedia" placeholder="工作介质（蒸汽 / 过热蒸汽等）" />
        </el-form-item>

        <el-form-item label="介质特性（高温、高压等）" prop="specEqpStMediaProperty">
          <el-input
            v-model="formData.specEqpStMediaProperty"
            placeholder="介质特性（高温、高压等）"
          />
        </el-form-item>

        <el-form-item label="设备状态" prop="specEqpStStatus">
          <Dict v-model="formData.specEqpStStatus" code="status" />
        </el-form-item>

        <el-form-item label="	上次检验日期" prop="specEqpStLastInspectDate">
          <el-date-picker
            v-model="formData.specEqpStLastInspectDate"
            class="!w-[240px]"
            type="date"
            placeholder="	上次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="	下次检验日期" prop="specEqpStNextInspectDate">
          <el-date-picker
            v-model="formData.specEqpStNextInspectDate"
            class="!w-[240px]"
            type="date"
            placeholder="	下次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="	检验机构" prop="specEqpStInspectCompany">
          <el-input v-model="formData.specEqpStInspectCompany" placeholder="	检验机构" />
        </el-form-item>

        <el-form-item label="	运维责任人" prop="specEqpStMaintainResponsible">
          <el-input v-model="formData.specEqpStMaintainResponsible" placeholder="	运维责任人" />
        </el-form-item>

        <el-form-item label="维护检修记录" prop="specEqpStMaintainRecord">
          <el-input v-model="formData.specEqpStMaintainRecord" placeholder="维护检修记录" />
        </el-form-item>

        <el-form-item label="	异常及事故记录" prop="specEqpStAccidentRecord">
          <el-input v-model="formData.specEqpStAccidentRecord" placeholder="	异常及事故记录" />
        </el-form-item>

        <el-form-item label="	台账创建时间" prop="specEqpStCreateTime">
          <el-date-picker
            v-model="formData.specEqpStCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="	台账创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="	台账更新时间" prop="specEqpStUpdateTime">
          <el-date-picker
            v-model="formData.specEqpStUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="	台账更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="specEqpStFactory">
          <el-input v-model="formData.specEqpStFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="specEqpStBackup1">
          <el-input v-model="formData.specEqpStBackup1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="specEqpStBackup2">
          <el-input v-model="formData.specEqpStBackup2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="specEqpStBackup3">
          <el-input v-model="formData.specEqpStBackup3" placeholder="备用3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 汽轮机导入弹窗 -->
    <SpecEqpSteamTurbineAccountImport
      v-model="importDialogVisible"
      @import-success="handleResetQuery()"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SpecEqpSteamTurbineAccount",
  inheritAttrs: false,
});

import SpecEqpSteamTurbineAccountAPI, {
  SpecEqpSteamTurbineAccountPageVO,
  SpecEqpSteamTurbineAccountForm,
  SpecEqpSteamTurbineAccountPageQuery,
} from "@/api/ledger/spec-eqp-steam-turbine-account-api";
import SpecEqpSteamTurbineAccountImport from "./specEqpSteamTurbineAccountImport.vue";
const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<SpecEqpSteamTurbineAccountPageQuery>({
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
// 汽轮机表格数据
const pageData = ref<SpecEqpSteamTurbineAccountPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 汽轮机表单数据
const formData = reactive<SpecEqpSteamTurbineAccountForm>({});

// 汽轮机表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  specEqpStCode: [{ required: true, message: "请输入汽轮机设备编码", trigger: "blur" }],
  specEqpStName: [{ required: true, message: "请输入汽轮机名称", trigger: "blur" }],
  specEqpStArea: [{ required: true, message: "请输入所在区域", trigger: "blur" }],
  specEqpStModel: [{ required: true, message: "请输入汽轮机型号", trigger: "blur" }],
  specEqpStManufacturer: [{ required: true, message: "请输入生产厂家", trigger: "blur" }],
  specEqpStFactoryNo: [{ required: true, message: "请输入出厂编号", trigger: "blur" }],
  specEqpStProduceDate: [{ required: true, message: "请输入制造日期", trigger: "blur" }],
  specEqpStInstallCompany: [{ required: true, message: "请输入安装单位", trigger: "blur" }],
  specEqpStInstallDate: [{ required: true, message: "请输入安装日期", trigger: "blur" }],
  specEqpStAcceptanceDate: [{ required: true, message: "请输入验收日期", trigger: "blur" }],
  specEqpStUsageDate: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  specEqpStLicenseNo: [{ required: true, message: "请输入	特种设备使用登记", trigger: "blur" }],
  specEqpStPowerRating: [{ required: true, message: "请输入	额定功率（MW）", trigger: "blur" }],
  specEqpStSpeedRating: [{ required: true, message: "请输入	额定转速（r/min）", trigger: "blur" }],
  specEqpStSteamPressure: [
    { required: true, message: "请输入进汽设计压力（MPa）", trigger: "blur" },
  ],
  specEqpStSteamTemp: [{ required: true, message: "请输入进汽设计温度（℃）", trigger: "blur" }],
  specEqpStRotorMaterial: [{ required: true, message: "请输入	转子材质", trigger: "blur" }],
  specEqpStCasingMaterial: [{ required: true, message: "请输入	汽缸材质", trigger: "blur" }],
  specEqpStMedia: [
    { required: true, message: "请输入工作介质（蒸汽 / 过热蒸汽等）", trigger: "blur" },
  ],
  specEqpStMediaProperty: [
    { required: true, message: "请输入介质特性（高温、高压等）", trigger: "blur" },
  ],
  specEqpStStatus: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
  specEqpStNextInspectDate: [{ required: true, message: "请输入	下次检验日期", trigger: "blur" }],
  specEqpStMaintainResponsible: [{ required: true, message: "请输入	运维责任人", trigger: "blur" }],
  specEqpStCreateTime: [{ required: true, message: "请输入	台账创建时间", trigger: "blur" }],
  specEqpStUpdateTime: [{ required: true, message: "请输入	台账更新时间", trigger: "blur" }],
  specEqpStFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询汽轮机 */
function handleQuery() {
  loading.value = true;
  SpecEqpSteamTurbineAccountAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置汽轮机查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开汽轮机弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改汽轮机";
    SpecEqpSteamTurbineAccountAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增汽轮机";
  }
}

/** 提交汽轮机表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SpecEqpSteamTurbineAccountAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SpecEqpSteamTurbineAccountAPI.create(formData)
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

/** 关闭汽轮机弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除汽轮机 */
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
      SpecEqpSteamTurbineAccountAPI.deleteByIds(ids)
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
  SpecEqpSteamTurbineAccountAPI.export({
    specEqpStName: queryParams.specEqpStName,
    specEqpStStatus: queryParams.specEqpStStatus,
    specEqpStFactory: queryParams.specEqpStFactory,
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
