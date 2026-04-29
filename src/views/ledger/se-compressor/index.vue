<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="压缩机设备编号" prop="seCompressorEquipCode">
          <el-input
            v-model="queryParams.seCompressorEquipCode"
            placeholder="压缩机设备编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备名称" prop="seCompressorName">
          <el-input
            v-model="queryParams.seCompressorName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="seCompressorStatus">
          <Dict v-model="queryParams.seCompressorStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="seCompressorFactory">
          <el-input
            v-model="queryParams.seCompressorFactory"
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
            v-hasPerm="['ledger:se-compressor:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:se-compressor:delete']"
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
      <!-- 特种设备压缩机台账列表 -->
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
          key="seCompressorEquipCode"
          label="压缩机设备编号"
          prop="seCompressorEquipCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorName"
          label="设备名称"
          prop="seCompressorName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorType"
          label="压缩机类型"
          prop="seCompressorType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorSpec"
          label="规格型号"
          prop="seCompressorSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorRatedFlow"
          label="额定排气量（m³/min）"
          prop="seCompressorRatedFlow"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorRatedPressure"
          label="额定排气压力（MPa）"
          prop="seCompressorRatedPressure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorRatedPower"
          label="额定输入功率（kW）"
          prop="seCompressorRatedPower"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorRatedSpeed"
          label="额定转速（r/min）"
          prop="seCompressorRatedSpeed"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorMedia"
          label="输送介质"
          prop="seCompressorMedia"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorInletTemp"
          label="进气温度（℃）"
          prop="seCompressorInletTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorOutletTemp"
          label="排气温度（℃）"
          prop="seCompressorOutletTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorDesignP"
          label="设计压力（MPa）"
          prop="seCompressorDesignP"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorMaterial"
          label="主体 / 过流部件材质"
          prop="seCompressorMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorExplosionProof"
          label="防爆等级"
          prop="seCompressorExplosionProof"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorMotorModel"
          label="配套电机型号"
          prop="seCompressorMotorModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorLubrication"
          label="润滑方式及油品"
          prop="seCompressorLubrication"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorCoolingType"
          label="冷却方式（水冷 / 风冷）"
          prop="seCompressorCoolingType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorInstallPos"
          label="安装位置"
          prop="seCompressorInstallPos"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorInService"
          label="投用日期"
          prop="seCompressorInService"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorInspectCycle"
          label="定期检验周期"
          prop="seCompressorInspectCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorLastInspect"
          label="上次检验日期"
          prop="seCompressorLastInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorNextInspect"
          label="下次检验日期"
          prop="seCompressorNextInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorInspectResult"
          label="检验结果"
          prop="seCompressorInspectResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorLastMaintain"
          label="上次维保日期"
          prop="seCompressorLastMaintain"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorNextMaintain"
          label="下次维保日期"
          prop="seCompressorNextMaintain"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorVibration"
          label="运行振动值（mm/s）"
          prop="seCompressorVibration"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorPressureRatio"
          label="压缩比"
          prop="seCompressorPressureRatio"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorMaintainRecord"
          label="维保维修记录"
          prop="seCompressorMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorFaultRecord"
          label="故障及异常记录"
          prop="seCompressorFaultRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorOperator"
          label="录入维护人员"
          prop="seCompressorOperator"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorCreateTime"
          label="记录创建时间"
          prop="seCompressorCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorUpdateTime"
          label="最后更新时间"
          prop="seCompressorUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.seCompressorStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="seCompressorFactory"
          label="所属工厂"
          prop="seCompressorFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorReserve1"
          label="备用1"
          prop="seCompressorReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorReserve2"
          label="备用2"
          prop="seCompressorReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seCompressorReserve3"
          label="备用3"
          prop="seCompressorReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:se-compressor:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:se-compressor:delete']"
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

    <!-- 特种设备压缩机台账表单弹窗 -->
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

        <el-form-item label="压缩机设备编号" prop="seCompressorEquipCode">
          <el-input v-model="formData.seCompressorEquipCode" placeholder="压缩机设备编号" />
        </el-form-item>

        <el-form-item label="设备名称" prop="seCompressorName">
          <el-input v-model="formData.seCompressorName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="压缩机类型" prop="seCompressorType">
          <el-input v-model="formData.seCompressorType" placeholder="压缩机类型" />
        </el-form-item>

        <el-form-item label="规格型号" prop="seCompressorSpec">
          <el-input v-model="formData.seCompressorSpec" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="额定排气量（m³/min）" prop="seCompressorRatedFlow">
          <el-input v-model="formData.seCompressorRatedFlow" placeholder="额定排气量（m³/min）" />
        </el-form-item>

        <el-form-item label="额定排气压力（MPa）" prop="seCompressorRatedPressure">
          <el-input
            v-model="formData.seCompressorRatedPressure"
            placeholder="额定排气压力（MPa）"
          />
        </el-form-item>

        <el-form-item label="额定输入功率（kW）" prop="seCompressorRatedPower">
          <el-input v-model="formData.seCompressorRatedPower" placeholder="额定输入功率（kW）" />
        </el-form-item>

        <el-form-item label="额定转速（r/min）" prop="seCompressorRatedSpeed">
          <el-input v-model="formData.seCompressorRatedSpeed" placeholder="额定转速（r/min）" />
        </el-form-item>

        <el-form-item label="输送介质" prop="seCompressorMedia">
          <el-input v-model="formData.seCompressorMedia" placeholder="输送介质" />
        </el-form-item>

        <el-form-item label="进气温度（℃）" prop="seCompressorInletTemp">
          <el-input v-model="formData.seCompressorInletTemp" placeholder="进气温度（℃）" />
        </el-form-item>

        <el-form-item label="排气温度（℃）" prop="seCompressorOutletTemp">
          <el-input v-model="formData.seCompressorOutletTemp" placeholder="排气温度（℃）" />
        </el-form-item>

        <el-form-item label="设计压力（MPa）" prop="seCompressorDesignP">
          <el-input v-model="formData.seCompressorDesignP" placeholder="设计压力（MPa）" />
        </el-form-item>

        <el-form-item label="主体 / 过流部件材质" prop="seCompressorMaterial">
          <el-input v-model="formData.seCompressorMaterial" placeholder="主体 / 过流部件材质" />
        </el-form-item>

        <el-form-item label="防爆等级" prop="seCompressorExplosionProof">
          <el-input v-model="formData.seCompressorExplosionProof" placeholder="防爆等级" />
        </el-form-item>

        <el-form-item label="配套电机型号" prop="seCompressorMotorModel">
          <el-input v-model="formData.seCompressorMotorModel" placeholder="配套电机型号" />
        </el-form-item>

        <el-form-item label="润滑方式及油品" prop="seCompressorLubrication">
          <el-input v-model="formData.seCompressorLubrication" placeholder="润滑方式及油品" />
        </el-form-item>

        <el-form-item label="冷却方式（水冷 / 风冷）" prop="seCompressorCoolingType">
          <el-input
            v-model="formData.seCompressorCoolingType"
            placeholder="冷却方式（水冷 / 风冷）"
          />
        </el-form-item>

        <el-form-item label="安装位置" prop="seCompressorInstallPos">
          <el-input v-model="formData.seCompressorInstallPos" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投用日期" prop="seCompressorInService">
          <el-date-picker
            v-model="formData.seCompressorInService"
            class="!w-[240px]"
            type="date"
            placeholder="投用日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="定期检验周期" prop="seCompressorInspectCycle">
          <el-input v-model="formData.seCompressorInspectCycle" placeholder="定期检验周期" />
        </el-form-item>

        <el-form-item label="上次检验日期" prop="seCompressorLastInspect">
          <el-date-picker
            v-model="formData.seCompressorLastInspect"
            class="!w-[240px]"
            type="date"
            placeholder="上次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="seCompressorNextInspect">
          <el-date-picker
            v-model="formData.seCompressorNextInspect"
            class="!w-[240px]"
            type="date"
            placeholder="下次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检验结果" prop="seCompressorInspectResult">
          <el-input v-model="formData.seCompressorInspectResult" placeholder="检验结果" />
        </el-form-item>

        <el-form-item label="上次维保日期" prop="seCompressorLastMaintain">
          <el-input v-model="formData.seCompressorLastMaintain" placeholder="上次维保日期" />
        </el-form-item>

        <el-form-item label="下次维保日期" prop="seCompressorNextMaintain">
          <el-input v-model="formData.seCompressorNextMaintain" placeholder="下次维保日期" />
        </el-form-item>

        <el-form-item label="运行振动值（mm/s）" prop="seCompressorVibration">
          <el-input v-model="formData.seCompressorVibration" placeholder="运行振动值（mm/s）" />
        </el-form-item>

        <el-form-item label="压缩比" prop="seCompressorPressureRatio">
          <el-input v-model="formData.seCompressorPressureRatio" placeholder="压缩比" />
        </el-form-item>

        <el-form-item label="维保维修记录" prop="seCompressorMaintainRecord">
          <el-input v-model="formData.seCompressorMaintainRecord" placeholder="维保维修记录" />
        </el-form-item>

        <el-form-item label="故障及异常记录" prop="seCompressorFaultRecord">
          <el-input v-model="formData.seCompressorFaultRecord" placeholder="故障及异常记录" />
        </el-form-item>

        <el-form-item label="录入维护人员" prop="seCompressorOperator">
          <el-input v-model="formData.seCompressorOperator" placeholder="录入维护人员" />
        </el-form-item>

        <el-form-item label="记录创建时间" prop="seCompressorCreateTime">
          <el-date-picker
            v-model="formData.seCompressorCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="记录创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="最后更新时间" prop="seCompressorUpdateTime">
          <el-date-picker
            v-model="formData.seCompressorUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="最后更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="设备状态" prop="seCompressorStatus">
          <Dict v-model="formData.seCompressorStatus" code="status" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="seCompressorFactory">
          <el-input v-model="formData.seCompressorFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="seCompressorReserve1">
          <el-input v-model="formData.seCompressorReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="seCompressorReserve2">
          <el-input v-model="formData.seCompressorReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="seCompressorReserve3">
          <el-input v-model="formData.seCompressorReserve3" placeholder="备用3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <SeCompressorImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SeCompressor",
  inheritAttrs: false,
});

import SeCompressorAPI, {
  SeCompressorPageVO,
  SeCompressorForm,
  SeCompressorPageQuery,
} from "@/api/ledger/se-compressor-api";

import SeCompressorImport from "./SeCompressorImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);

const queryParams = reactive<SeCompressorPageQuery>({
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

const pageData = ref<SeCompressorPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 特种设备压缩机台账表单数据
const formData = reactive<SeCompressorForm>({});

// 特种设备压缩机台账表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  seCompressorEquipCode: [{ required: true, message: "请输入压缩机设备编号", trigger: "blur" }],
  seCompressorName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  seCompressorType: [{ required: true, message: "请输入压缩机类型", trigger: "blur" }],
  seCompressorSpec: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  seCompressorRatedFlow: [
    { required: true, message: "请输入额定排气量（m³/min）", trigger: "blur" },
  ],
  seCompressorRatedPressure: [
    { required: true, message: "请输入额定排气压力（MPa）", trigger: "blur" },
  ],
  seCompressorRatedPower: [
    { required: true, message: "请输入额定输入功率（kW）", trigger: "blur" },
  ],
  seCompressorRatedSpeed: [{ required: true, message: "请输入额定转速（r/min）", trigger: "blur" }],
  seCompressorMedia: [{ required: true, message: "请输入输送介质", trigger: "blur" }],
  seCompressorInletTemp: [{ required: true, message: "请输入进气温度（℃）", trigger: "blur" }],
  seCompressorOutletTemp: [{ required: true, message: "请输入排气温度（℃）", trigger: "blur" }],
  seCompressorDesignP: [{ required: true, message: "请输入设计压力（MPa）", trigger: "blur" }],
  seCompressorMaterial: [{ required: true, message: "请输入主体 / 过流部件材质", trigger: "blur" }],
  seCompressorExplosionProof: [{ required: true, message: "请输入防爆等级", trigger: "blur" }],
  seCompressorMotorModel: [{ required: true, message: "请输入配套电机型号", trigger: "blur" }],
  seCompressorLubrication: [{ required: true, message: "请输入润滑方式及油品", trigger: "blur" }],
  seCompressorCoolingType: [
    { required: true, message: "请输入冷却方式（水冷 / 风冷）", trigger: "blur" },
  ],
  seCompressorInstallPos: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  seCompressorInService: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  seCompressorInspectCycle: [{ required: true, message: "请输入定期检验周期", trigger: "blur" }],
  seCompressorLastInspect: [{ required: true, message: "请输入上次检验日期", trigger: "blur" }],
  seCompressorNextInspect: [{ required: true, message: "请输入下次检验日期", trigger: "blur" }],
  seCompressorInspectResult: [{ required: true, message: "请输入检验结果", trigger: "blur" }],
  seCompressorOperator: [{ required: true, message: "请输入录入维护人员", trigger: "blur" }],
  seCompressorCreateTime: [{ required: true, message: "请输入记录创建时间", trigger: "blur" }],
  seCompressorUpdateTime: [{ required: true, message: "请输入最后更新时间", trigger: "blur" }],
  seCompressorFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询特种设备压缩机台账 */
function handleQuery() {
  loading.value = true;
  SeCompressorAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置特种设备压缩机台账查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开特种设备压缩机台账弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改特种设备压缩机台账";
    SeCompressorAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增特种设备压缩机台账";
  }
}

/** 提交特种设备压缩机台账表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SeCompressorAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SeCompressorAPI.create(formData)
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

/** 关闭特种设备压缩机台账弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除特种设备压缩机台账 */
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
      SeCompressorAPI.deleteByIds(ids)
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
  SeCompressorAPI.export({
    seCompressorEquipCode: queryParams.seCompressorEquipCode,
    seCompressorName: queryParams.seCompressorName,
    seCompressorStatus: queryParams.seCompressorStatus,
    seCompressorFactory: queryParams.seCompressorFactory,
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
