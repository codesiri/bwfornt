<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="卧罐设备编号" prop="seHtankEquipCode">
          <el-input
            v-model="queryParams.seHtankEquipCode"
            placeholder="卧罐设备编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="卧罐名称" prop="seHtankName">
          <el-input
            v-model="queryParams.seHtankName"
            placeholder="卧罐名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="seHtankStatus">
          <Dict v-model="queryParams.seHtankStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="seHtankFactory">
          <el-input
            v-model="queryParams.seHtankFactory"
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
            v-hasPerm="['ledger:se-horizontal-tank:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:se-horizontal-tank:delete']"
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
          key="seHtankEquipCode"
          label="卧罐设备编号"
          prop="seHtankEquipCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankName"
          label="卧罐名称"
          prop="seHtankName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankSpec"
          label="规格型号"
          prop="seHtankSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankDesignVolume"
          label="设计容积（m³）"
          prop="seHtankDesignVolume"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankOperatingVolume"
          label="工作容积（m³）"
          prop="seHtankOperatingVolume"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankDesignP"
          label="设计压力（MPa）"
          prop="seHtankDesignP"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankOperatingP"
          label="工作压力（MPa）"
          prop="seHtankOperatingP"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankDesignT"
          label="设计温度（℃）"
          prop="seHtankDesignT"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankOperatingT"
          label="工作温度（℃）"
          prop="seHtankOperatingT"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankMedia"
          label="储存介质"
          prop="seHtankMedia"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankMaterial"
          label="主体材质"
          prop="seHtankMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankThickness"
          label="罐体壁厚（mm）"
          prop="seHtankThickness"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankSealType"
          label="密封形式"
          prop="seHtankSealType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankAntiCorrosion"
          label="防腐措施"
          prop="seHtankAntiCorrosion"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankSupportType"
          label="支撑形式"
          prop="seHtankSupportType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankSafetyValveModel"
          label="安全阀型号规格（核心安全附件，需定期校验）"
          prop="seHtankSafetyValveModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankInstallPos"
          label="安装位置"
          prop="seHtankInstallPos"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankInService"
          label="投用日期"
          prop="seHtankInService"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankInspectCycle"
          label="定期检验周期（全面检验每 3 年，年度检查每年，按规范执行）"
          prop="seHtankInspectCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankLastInspect"
          label="上次检验日期（含无损检测、压力试验、密封校验）"
          prop="seHtankLastInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankNextInspect"
          label="下次检验日期（系统预警用，同步安全附件校验周期）"
          prop="seHtankNextInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankInspectResult"
          label="检验结果"
          prop="seHtankInspectResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankLastPressureTest"
          label="上次水压 / 气压试验日期"
          prop="seHtankLastPressureTest"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankLevelGaugeModel"
          label="液位计型号"
          prop="seHtankLevelGaugeModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankCorrosionStatus"
          label="腐蚀状况"
          prop="seHtankCorrosionStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankMaintainRecord"
          label="维保维修记录"
          prop="seHtankMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankFaultRecord"
          label="故障及异常记录"
          prop="seHtankFaultRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankOperator"
          label="录入维护人员"
          prop="seHtankOperator"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankCreateTime"
          label="记录创建时间"
          prop="seHtankCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankUpdateTime"
          label="最后更新时间"
          prop="seHtankUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.seHtankStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="seHtankFactory"
          label="所属工厂"
          prop="seHtankFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankReserve1"
          label="备用1"
          prop="seHtankReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankReserve2"
          label="备用2"
          prop="seHtankReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHtankReserve3"
          label="备用3"
          prop="seHtankReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:se-horizontal-tank:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:se-horizontal-tank:delete']"
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

    <!-- 卧罐表单弹窗 -->
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

        <el-form-item label="卧罐设备编号" prop="seHtankEquipCode">
          <el-input v-model="formData.seHtankEquipCode" placeholder="卧罐设备编号" />
        </el-form-item>

        <el-form-item label="卧罐名称" prop="seHtankName">
          <el-input v-model="formData.seHtankName" placeholder="卧罐名称" />
        </el-form-item>

        <el-form-item label="规格型号" prop="seHtankSpec">
          <el-input v-model="formData.seHtankSpec" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="设计容积（m³）" prop="seHtankDesignVolume">
          <el-input v-model="formData.seHtankDesignVolume" placeholder="设计容积（m³）" />
        </el-form-item>

        <el-form-item label="工作容积（m³）" prop="seHtankOperatingVolume">
          <el-input v-model="formData.seHtankOperatingVolume" placeholder="工作容积（m³）" />
        </el-form-item>

        <el-form-item label="设计压力（MPa）" prop="seHtankDesignP">
          <el-input v-model="formData.seHtankDesignP" placeholder="设计压力（MPa）" />
        </el-form-item>

        <el-form-item label="工作压力（MPa）" prop="seHtankOperatingP">
          <el-input v-model="formData.seHtankOperatingP" placeholder="工作压力（MPa）" />
        </el-form-item>

        <el-form-item label="设计温度（℃）" prop="seHtankDesignT">
          <el-input v-model="formData.seHtankDesignT" placeholder="设计温度（℃）" />
        </el-form-item>

        <el-form-item label="工作温度（℃）" prop="seHtankOperatingT">
          <el-input v-model="formData.seHtankOperatingT" placeholder="工作温度（℃）" />
        </el-form-item>

        <el-form-item label="储存介质" prop="seHtankMedia">
          <el-input v-model="formData.seHtankMedia" placeholder="储存介质" />
        </el-form-item>

        <el-form-item label="主体材质" prop="seHtankMaterial">
          <el-input v-model="formData.seHtankMaterial" placeholder="主体材质" />
        </el-form-item>

        <el-form-item label="罐体壁厚（mm）" prop="seHtankThickness">
          <el-input v-model="formData.seHtankThickness" placeholder="罐体壁厚（mm）" />
        </el-form-item>

        <el-form-item label="密封形式" prop="seHtankSealType">
          <el-input v-model="formData.seHtankSealType" placeholder="密封形式" />
        </el-form-item>

        <el-form-item label="防腐措施" prop="seHtankAntiCorrosion">
          <el-input v-model="formData.seHtankAntiCorrosion" placeholder="防腐措施" />
        </el-form-item>

        <el-form-item label="支撑形式" prop="seHtankSupportType">
          <el-input v-model="formData.seHtankSupportType" placeholder="支撑形式" />
        </el-form-item>

        <el-form-item
          label="安全阀型号规格（核心安全附件，需定期校验）"
          prop="seHtankSafetyValveModel"
        >
          <el-input
            v-model="formData.seHtankSafetyValveModel"
            placeholder="安全阀型号规格（核心安全附件，需定期校验）"
          />
        </el-form-item>

        <el-form-item label="安装位置" prop="seHtankInstallPos">
          <el-input v-model="formData.seHtankInstallPos" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投用日期" prop="seHtankInService">
          <el-date-picker
            v-model="formData.seHtankInService"
            class="!w-[240px]"
            type="date"
            placeholder="投用日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item
          label="定期检验周期（全面检验每 3 年，年度检查每年，按规范执行）"
          prop="seHtankInspectCycle"
        >
          <el-input
            v-model="formData.seHtankInspectCycle"
            placeholder="定期检验周期（全面检验每 3 年，年度检查每年，按规范执行）"
          />
        </el-form-item>

        <el-form-item
          label="上次检验日期（含无损检测、压力试验、密封校验）"
          prop="seHtankLastInspect"
        >
          <el-date-picker
            v-model="formData.seHtankLastInspect"
            class="!w-[240px]"
            type="date"
            placeholder="上次检验日期（含无损检测、压力试验、密封校验）"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item
          label="下次检验日期（系统预警用，同步安全附件校验周期）"
          prop="seHtankNextInspect"
        >
          <el-date-picker
            v-model="formData.seHtankNextInspect"
            class="!w-[240px]"
            type="date"
            placeholder="下次检验日期（系统预警用，同步安全附件校验周期）"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检验结果" prop="seHtankInspectResult">
          <el-input v-model="formData.seHtankInspectResult" placeholder="检验结果" />
        </el-form-item>

        <el-form-item label="上次水压 / 气压试验日期" prop="seHtankLastPressureTest">
          <el-input
            v-model="formData.seHtankLastPressureTest"
            placeholder="上次水压 / 气压试验日期"
          />
        </el-form-item>

        <el-form-item label="液位计型号" prop="seHtankLevelGaugeModel">
          <el-input v-model="formData.seHtankLevelGaugeModel" placeholder="液位计型号" />
        </el-form-item>

        <el-form-item label="腐蚀状况" prop="seHtankCorrosionStatus">
          <el-input v-model="formData.seHtankCorrosionStatus" placeholder="腐蚀状况" />
        </el-form-item>

        <el-form-item label="维保维修记录" prop="seHtankMaintainRecord">
          <el-input v-model="formData.seHtankMaintainRecord" placeholder="维保维修记录" />
        </el-form-item>

        <el-form-item label="故障及异常记录" prop="seHtankFaultRecord">
          <el-input v-model="formData.seHtankFaultRecord" placeholder="故障及异常记录" />
        </el-form-item>

        <el-form-item label="录入维护人员" prop="seHtankOperator">
          <el-input v-model="formData.seHtankOperator" placeholder="录入维护人员" />
        </el-form-item>

        <el-form-item label="记录创建时间" prop="seHtankCreateTime">
          <el-date-picker
            v-model="formData.seHtankCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="记录创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="最后更新时间" prop="seHtankUpdateTime">
          <el-date-picker
            v-model="formData.seHtankUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="最后更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="设备状态" prop="seHtankStatus">
          <Dict v-model="formData.seHtankStatus" code="status" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="seHtankFactory">
          <el-input v-model="formData.seHtankFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="seHtankReserve1">
          <el-input v-model="formData.seHtankReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="seHtankReserve2">
          <el-input v-model="formData.seHtankReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="seHtankReserve3">
          <el-input v-model="formData.seHtankReserve3" placeholder="备用3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>

    <!-- 导入弹窗 -->
    <SeHorizontalTankImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SeHorizontalTank",
  inheritAttrs: false,
});

import SeHorizontalTankAPI, {
  SeHorizontalTankPageVO,
  SeHorizontalTankForm,
  SeHorizontalTankPageQuery,
} from "@/api/ledger/se-horizontal-tank-api";
import SeHorizontalTankImport from "./seHorizontalTankImport.vue";
const importDialogVisible = ref(false);
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<SeHorizontalTankPageQuery>({
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

// 卧罐表格数据
const pageData = ref<SeHorizontalTankPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 卧罐表单数据
const formData = reactive<SeHorizontalTankForm>({});

// 卧罐表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  seHtankEquipCode: [{ required: true, message: "请输入卧罐设备编号", trigger: "blur" }],
  seHtankName: [{ required: true, message: "请输入卧罐名称", trigger: "blur" }],
  seHtankSpec: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  seHtankDesignVolume: [{ required: true, message: "请输入设计容积（m³）", trigger: "blur" }],
  seHtankOperatingVolume: [{ required: true, message: "请输入工作容积（m³）", trigger: "blur" }],
  seHtankDesignP: [{ required: true, message: "请输入设计压力（MPa）", trigger: "blur" }],
  seHtankOperatingP: [{ required: true, message: "请输入工作压力（MPa）", trigger: "blur" }],
  seHtankDesignT: [{ required: true, message: "请输入设计温度（℃）", trigger: "blur" }],
  seHtankOperatingT: [{ required: true, message: "请输入工作温度（℃）", trigger: "blur" }],
  seHtankMedia: [{ required: true, message: "请输入储存介质", trigger: "blur" }],
  seHtankMaterial: [{ required: true, message: "请输入主体材质", trigger: "blur" }],
  seHtankThickness: [{ required: true, message: "请输入罐体壁厚（mm）", trigger: "blur" }],
  seHtankSealType: [{ required: true, message: "请输入密封形式", trigger: "blur" }],
  seHtankAntiCorrosion: [{ required: true, message: "请输入防腐措施", trigger: "blur" }],
  seHtankSupportType: [{ required: true, message: "请输入支撑形式", trigger: "blur" }],
  seHtankSafetyValveModel: [
    {
      required: true,
      message: "请输入安全阀型号规格（核心安全附件，需定期校验）",
      trigger: "blur",
    },
  ],
  seHtankInstallPos: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  seHtankInService: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  seHtankInspectCycle: [
    {
      required: true,
      message: "请输入定期检验周期（全面检验每 3 年，年度检查每年，按规范执行）",
      trigger: "blur",
    },
  ],
  seHtankLastInspect: [
    {
      required: true,
      message: "请输入上次检验日期（含无损检测、压力试验、密封校验）",
      trigger: "blur",
    },
  ],
  seHtankNextInspect: [
    {
      required: true,
      message: "请输入下次检验日期（系统预警用，同步安全附件校验周期）",
      trigger: "blur",
    },
  ],
  seHtankInspectResult: [{ required: true, message: "请输入检验结果", trigger: "blur" }],
  seHtankOperator: [{ required: true, message: "请输入录入维护人员", trigger: "blur" }],
  seHtankCreateTime: [{ required: true, message: "请输入记录创建时间", trigger: "blur" }],
  seHtankUpdateTime: [{ required: true, message: "请输入最后更新时间", trigger: "blur" }],
});

/** 查询卧罐 */
function handleQuery() {
  loading.value = true;
  SeHorizontalTankAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置卧罐查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开卧罐弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改卧罐";
    SeHorizontalTankAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增卧罐";
  }
}

/** 提交卧罐表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SeHorizontalTankAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SeHorizontalTankAPI.create(formData)
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

/** 关闭卧罐弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除卧罐 */
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
      SeHorizontalTankAPI.deleteByIds(ids)
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
  SeHorizontalTankAPI.export({
    seHtankEquipCode: queryParams.seHtankEquipCode,
    seHtankName: queryParams.seHtankName,
    seHtankStatus: queryParams.seHtankStatus,
    seHtankFactory: queryParams.seHtankFactory,
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
