<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="制冷机设备编号" prop="seRefrigeratorEquipCode">
          <el-input
            v-model="queryParams.seRefrigeratorEquipCode"
            placeholder="制冷机设备编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="制冷机设备名称" prop="seRefrigeratorName">
          <el-input
            v-model="queryParams.seRefrigeratorName"
            placeholder="制冷机设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="seRefrigeratorStatus">
          <Dict v-model="queryParams.seRefrigeratorStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="seRefrigeratorFactory">
          <el-input
            v-model="queryParams.seRefrigeratorFactory"
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
            v-hasPerm="['ledger:se-refrigerator:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:se-refrigerator:delete']"
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
          key="seRefrigeratorEquipCode"
          label="制冷机设备编号"
          prop="seRefrigeratorEquipCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorName"
          label="制冷机设备名称"
          prop="seRefrigeratorName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorType"
          label="制冷机类型"
          prop="seRefrigeratorType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorSpec"
          label="规格型号"
          prop="seRefrigeratorSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorCoolingCapacity"
          label="额定制冷量（kW）"
          prop="seRefrigeratorCoolingCapacity"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorRatedPower"
          label="额定输入功率（kW）"
          prop="seRefrigeratorRatedPower"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorEvapTemp"
          label="蒸发温度（℃）"
          prop="seRefrigeratorEvapTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorCondTemp"
          label="冷凝温度（℃）"
          prop="seRefrigeratorCondTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorRefrigerant"
          label="制冷剂类型"
          prop="seRefrigeratorRefrigerant"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorOilType"
          label="冷冻油型号及类型"
          prop="seRefrigeratorOilType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorMaterial"
          label="主体材质"
          prop="seRefrigeratorMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorExplosionProof"
          label="防爆等级"
          prop="seRefrigeratorExplosionProof"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorMotorModel"
          label="配套电机型号"
          prop="seRefrigeratorMotorModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorCoolingType"
          label="冷却方式"
          prop="seRefrigeratorCoolingType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorInstallPos"
          label="安装位置"
          prop="seRefrigeratorInstallPos"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorInService"
          label="投用日期"
          prop="seRefrigeratorInService"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorInspectCycle"
          label="定期检验周期"
          prop="seRefrigeratorInspectCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorLastInspect"
          label="上次检验日期"
          prop="seRefrigeratorLastInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorNextInspect"
          label="下次检验日期"
          prop="seRefrigeratorNextInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorInspectResult"
          label="检验结果"
          prop="seRefrigeratorInspectResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorLastMaintain"
          label="上次维保日期"
          prop="seRefrigeratorLastMaintain"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorNextMaintain"
          label="下次维保日期"
          prop="seRefrigeratorNextMaintain"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorLeakTest"
          label="上次气密性 / 泄漏检测日期"
          prop="seRefrigeratorLeakTest"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorCoeff"
          label="制冷系数（COP 值）"
          prop="seRefrigeratorCoeff"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorMaintainRecord"
          label="维保维修记录"
          prop="seRefrigeratorMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorFaultRecord"
          label="故障及异常记录"
          prop="seRefrigeratorFaultRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorOperator"
          label="录入 / 维护人员"
          prop="seRefrigeratorOperator"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorCreateTime"
          label="创建时间"
          prop="seRefrigeratorCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorUpdateTime"
          label="最后更新时间"
          prop="seRefrigeratorUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorFactory"
          label="所属工厂"
          prop="seRefrigeratorFactory"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.seRefrigeratorStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="seRefrigeratorReserve1"
          label="备用1"
          prop="seRefrigeratorReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorReserve2"
          label="备用2"
          prop="seRefrigeratorReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seRefrigeratorReserve3"
          label="备用3"
          prop="seRefrigeratorReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:se-refrigerator:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:se-refrigerator:delete']"
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

    <!-- 特种设备制冷机台账表单弹窗 -->
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

        <el-form-item label="制冷机设备编号" prop="seRefrigeratorEquipCode">
          <el-input v-model="formData.seRefrigeratorEquipCode" placeholder="制冷机设备编号" />
        </el-form-item>

        <el-form-item label="制冷机设备名称" prop="seRefrigeratorName">
          <el-input v-model="formData.seRefrigeratorName" placeholder="制冷机设备名称" />
        </el-form-item>

        <el-form-item label="制冷机类型" prop="seRefrigeratorType">
          <el-input v-model="formData.seRefrigeratorType" placeholder="制冷机类型" />
        </el-form-item>

        <el-form-item label="规格型号" prop="seRefrigeratorSpec">
          <el-input v-model="formData.seRefrigeratorSpec" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="额定制冷量（kW）" prop="seRefrigeratorCoolingCapacity">
          <el-input
            v-model="formData.seRefrigeratorCoolingCapacity"
            placeholder="额定制冷量（kW）"
          />
        </el-form-item>

        <el-form-item label="额定输入功率（kW）" prop="seRefrigeratorRatedPower">
          <el-input v-model="formData.seRefrigeratorRatedPower" placeholder="额定输入功率（kW）" />
        </el-form-item>

        <el-form-item label="蒸发温度（℃）" prop="seRefrigeratorEvapTemp">
          <el-input v-model="formData.seRefrigeratorEvapTemp" placeholder="蒸发温度（℃）" />
        </el-form-item>

        <el-form-item label="冷凝温度（℃）" prop="seRefrigeratorCondTemp">
          <el-input v-model="formData.seRefrigeratorCondTemp" placeholder="冷凝温度（℃）" />
        </el-form-item>

        <el-form-item label="制冷剂类型" prop="seRefrigeratorRefrigerant">
          <el-input v-model="formData.seRefrigeratorRefrigerant" placeholder="制冷剂类型" />
        </el-form-item>

        <el-form-item label="冷冻油型号及类型" prop="seRefrigeratorOilType">
          <el-input v-model="formData.seRefrigeratorOilType" placeholder="冷冻油型号及类型" />
        </el-form-item>

        <el-form-item label="主体材质" prop="seRefrigeratorMaterial">
          <el-input v-model="formData.seRefrigeratorMaterial" placeholder="主体材质" />
        </el-form-item>

        <el-form-item label="防爆等级" prop="seRefrigeratorExplosionProof">
          <el-input v-model="formData.seRefrigeratorExplosionProof" placeholder="防爆等级" />
        </el-form-item>

        <el-form-item label="配套电机型号" prop="seRefrigeratorMotorModel">
          <el-input v-model="formData.seRefrigeratorMotorModel" placeholder="配套电机型号" />
        </el-form-item>

        <el-form-item label="冷却方式" prop="seRefrigeratorCoolingType">
          <el-input v-model="formData.seRefrigeratorCoolingType" placeholder="冷却方式" />
        </el-form-item>

        <el-form-item label="安装位置" prop="seRefrigeratorInstallPos">
          <el-input v-model="formData.seRefrigeratorInstallPos" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投用日期" prop="seRefrigeratorInService">
          <el-date-picker
            v-model="formData.seRefrigeratorInService"
            class="!w-[240px]"
            type="date"
            placeholder="投用日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="定期检验周期" prop="seRefrigeratorInspectCycle">
          <el-input v-model="formData.seRefrigeratorInspectCycle" placeholder="定期检验周期" />
        </el-form-item>

        <el-form-item label="上次检验日期" prop="seRefrigeratorLastInspect">
          <el-date-picker
            v-model="formData.seRefrigeratorLastInspect"
            class="!w-[240px]"
            type="date"
            placeholder="上次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="seRefrigeratorNextInspect">
          <el-date-picker
            v-model="formData.seRefrigeratorNextInspect"
            class="!w-[240px]"
            type="date"
            placeholder="下次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检验结果" prop="seRefrigeratorInspectResult">
          <el-input v-model="formData.seRefrigeratorInspectResult" placeholder="检验结果" />
        </el-form-item>

        <el-form-item label="上次维保日期" prop="seRefrigeratorLastMaintain">
          <el-date-picker
            v-model="formData.seRefrigeratorLastMaintain"
            class="!w-[240px]"
            type="date"
            placeholder="上次维保日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次维保日期" prop="seRefrigeratorNextMaintain">
          <el-date-picker
            v-model="formData.seRefrigeratorNextMaintain"
            class="!w-[240px]"
            type="date"
            placeholder="下次维保日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="上次气密性 / 泄漏检测日期" prop="seRefrigeratorLeakTest">
          <el-date-picker
            v-model="formData.seRefrigeratorLeakTest"
            class="!w-[240px]"
            type="date"
            placeholder="上次气密性 / 泄漏检测日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="制冷系数（COP 值）" prop="seRefrigeratorCoeff">
          <el-input v-model="formData.seRefrigeratorCoeff" placeholder="制冷系数（COP 值）" />
        </el-form-item>

        <el-form-item label="维保维修记录" prop="seRefrigeratorMaintainRecord">
          <el-input v-model="formData.seRefrigeratorMaintainRecord" placeholder="维保维修记录" />
        </el-form-item>

        <el-form-item label="故障及异常记录" prop="seRefrigeratorFaultRecord">
          <el-input v-model="formData.seRefrigeratorFaultRecord" placeholder="故障及异常记录" />
        </el-form-item>

        <el-form-item label="录入 / 维护人员" prop="seRefrigeratorOperator">
          <el-input v-model="formData.seRefrigeratorOperator" placeholder="录入 / 维护人员" />
        </el-form-item>

        <el-form-item label="创建时间" prop="seRefrigeratorCreateTime">
          <el-date-picker
            v-model="formData.seRefrigeratorCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="最后更新时间" prop="seRefrigeratorUpdateTime">
          <el-date-picker
            v-model="formData.seRefrigeratorUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="最后更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="seRefrigeratorFactory">
          <el-input v-model="formData.seRefrigeratorFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="设备状态" prop="seRefrigeratorStatus">
          <Dict v-model="formData.seRefrigeratorStatus" code="status" />
        </el-form-item>

        <el-form-item label="备用1" prop="seRefrigeratorReserve1">
          <el-input v-model="formData.seRefrigeratorReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="seRefrigeratorReserve2">
          <el-input v-model="formData.seRefrigeratorReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="seRefrigeratorReserve3">
          <el-input v-model="formData.seRefrigeratorReserve3" placeholder="备用3" />
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
    <SeRefrigeratorImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SeRefrigerator",
  inheritAttrs: false,
});

import SeRefrigeratorAPI, {
  SeRefrigeratorPageVO,
  SeRefrigeratorForm,
  SeRefrigeratorPageQuery,
} from "@/api/ledger/se-refrigerator-api";

import SeRefrigeratorImport from "./seRefrigeratorImport.vue";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const queryParams = reactive<SeRefrigeratorPageQuery>({
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

// 特种设备制冷机台账表格数据
const pageData = ref<SeRefrigeratorPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 特种设备制冷机台账表单数据
const formData = reactive<SeRefrigeratorForm>({});

// 特种设备制冷机台账表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  seRefrigeratorEquipCode: [{ required: true, message: "请输入制冷机设备编号", trigger: "blur" }],
  seRefrigeratorName: [{ required: true, message: "请输入制冷机设备名称", trigger: "blur" }],
  seRefrigeratorType: [{ required: true, message: "请输入制冷机类型", trigger: "blur" }],
  seRefrigeratorSpec: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  seRefrigeratorCoolingCapacity: [
    { required: true, message: "请输入额定制冷量（kW）", trigger: "blur" },
  ],
  seRefrigeratorRatedPower: [
    { required: true, message: "请输入额定输入功率（kW）", trigger: "blur" },
  ],
  seRefrigeratorEvapTemp: [{ required: true, message: "请输入蒸发温度（℃）", trigger: "blur" }],
  seRefrigeratorCondTemp: [{ required: true, message: "请输入冷凝温度（℃）", trigger: "blur" }],
  seRefrigeratorRefrigerant: [{ required: true, message: "请输入制冷剂类型", trigger: "blur" }],
  seRefrigeratorOilType: [{ required: true, message: "请输入冷冻油型号及类型", trigger: "blur" }],
  seRefrigeratorMaterial: [{ required: true, message: "请输入主体材质", trigger: "blur" }],
  seRefrigeratorExplosionProof: [{ required: true, message: "请输入防爆等级", trigger: "blur" }],
  seRefrigeratorMotorModel: [{ required: true, message: "请输入配套电机型号", trigger: "blur" }],
  seRefrigeratorCoolingType: [{ required: true, message: "请输入冷却方式", trigger: "blur" }],
  seRefrigeratorInstallPos: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  seRefrigeratorInService: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  seRefrigeratorInspectCycle: [{ required: true, message: "请输入定期检验周期", trigger: "blur" }],
  seRefrigeratorLastInspect: [{ required: true, message: "请输入上次检验日期", trigger: "blur" }],
  seRefrigeratorNextInspect: [{ required: true, message: "请输入下次检验日期", trigger: "blur" }],
  seRefrigeratorInspectResult: [{ required: true, message: "请输入检验结果", trigger: "blur" }],
  seRefrigeratorOperator: [{ required: true, message: "请输入录入 / 维护人员", trigger: "blur" }],
  seRefrigeratorCreateTime: [{ required: true, message: "请输入创建时间", trigger: "blur" }],
  seRefrigeratorUpdateTime: [{ required: true, message: "请输入最后更新时间", trigger: "blur" }],
  seRefrigeratorFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询特种设备制冷机台账 */
function handleQuery() {
  loading.value = true;
  SeRefrigeratorAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置特种设备制冷机台账查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开特种设备制冷机台账弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改特种设备制冷机台账";
    SeRefrigeratorAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增特种设备制冷机台账";
  }
}

/** 提交特种设备制冷机台账表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SeRefrigeratorAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SeRefrigeratorAPI.create(formData)
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

/** 关闭特种设备制冷机台账弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除特种设备制冷机台账 */
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
      SeRefrigeratorAPI.deleteByIds(ids)
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
  SeRefrigeratorAPI.export({
    seRefrigeratorEquipCode: queryParams.seRefrigeratorEquipCode,
    seRefrigeratorName: queryParams.seRefrigeratorName,
    seRefrigeratorStatus: queryParams.seRefrigeratorStatus,
    seRefrigeratorFactory: queryParams.seRefrigeratorFactory,
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
