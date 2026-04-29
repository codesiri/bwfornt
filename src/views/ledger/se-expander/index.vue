<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="膨胀机设备编号" prop="seExpanderEquipCode">
          <el-input
            v-model="queryParams.seExpanderEquipCode"
            placeholder="膨胀机设备编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备名称" prop="seExpanderName">
          <el-input
            v-model="queryParams.seExpanderName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="seExpanderStatus">
          <Dict v-model="queryParams.seExpanderStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="seExpanderFactory">
          <el-input
            v-model="queryParams.seExpanderFactory"
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
            v-hasPerm="['ledger:se-expander:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:se-expander:delete']"
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
      <!-- 特种设备膨胀机台账列表 -->
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
          key="seExpanderEquipCode"
          label="膨胀机设备编号"
          prop="seExpanderEquipCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderName"
          label="设备名称"
          prop="seExpanderName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderType"
          label="设备类型"
          prop="seExpanderType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderSpec"
          label="规格型号"
          prop="seExpanderSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderRatedPower"
          label="额定功率"
          prop="seExpanderRatedPower"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderRatedSpeed"
          label="额定转速"
          prop="seExpanderRatedSpeed"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderInletP"
          label="进口压力"
          prop="seExpanderInletP"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderInletT"
          label="进口温度"
          prop="seExpanderInletT"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderOutletP"
          label="出口压力"
          prop="seExpanderOutletP"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderOutletT"
          label="出口温度"
          prop="seExpanderOutletT"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderMedia"
          label="工作介质"
          prop="seExpanderMedia"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderMaterial"
          label="主体材质"
          prop="seExpanderMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderExplosionProof"
          label="防爆等级"
          prop="seExpanderExplosionProof"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderCouplingType"
          label="联轴器类型"
          prop="seExpanderCouplingType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderBearingType"
          label="轴承类型"
          prop="seExpanderBearingType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderLubrication"
          label="润滑方式及油品"
          prop="seExpanderLubrication"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderInstallPos"
          label="安装位置"
          prop="seExpanderInstallPos"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderInService"
          label="投用日期"
          prop="seExpanderInService"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderInspectCycle"
          label="定期检验周期"
          prop="seExpanderInspectCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderLastInspect"
          label="上次检验日期"
          prop="seExpanderLastInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderNextInspect"
          label="下次检验日期"
          prop="seExpanderNextInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderInspectResult"
          label="检验结果"
          prop="seExpanderInspectResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderLastLubricate"
          label="上次润滑日期"
          prop="seExpanderLastLubricate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderNextLubricate"
          label="下次润滑日期"
          prop="seExpanderNextLubricate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderVibration"
          label="运行振动值"
          prop="seExpanderVibration"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderEfficiency"
          label="膨胀机运行效率"
          prop="seExpanderEfficiency"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderMaintainRecord"
          label="维保维修记录"
          prop="seExpanderMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderFaultRecord"
          label="故障及异常记录"
          prop="seExpanderFaultRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderOperator"
          label="录入 / 维护人员"
          prop="seExpanderOperator"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderCreateTime"
          label="创建时间"
          prop="seExpanderCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderUpdateTime"
          label="最后更新时间"
          prop="seExpanderUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.seExpanderStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="seExpanderFactory"
          label="所属工厂"
          prop="seExpanderFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderReserve1"
          label="备用1"
          prop="seExpanderReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderReserve2"
          label="备用2"
          prop="seExpanderReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seExpanderReserve3"
          label="备用3"
          prop="seExpanderReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:se-expander:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:se-expander:delete']"
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

    <!-- 特种设备膨胀机台账表单弹窗 -->
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

        <el-form-item label="膨胀机设备编号" prop="seExpanderEquipCode">
          <el-input v-model="formData.seExpanderEquipCode" placeholder="膨胀机设备编号" />
        </el-form-item>

        <el-form-item label="设备名称" prop="seExpanderName">
          <el-input v-model="formData.seExpanderName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="设备类型" prop="seExpanderType">
          <el-input v-model="formData.seExpanderType" placeholder="设备类型" />
        </el-form-item>

        <el-form-item label="规格型号" prop="seExpanderSpec">
          <el-input v-model="formData.seExpanderSpec" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="额定功率" prop="seExpanderRatedPower">
          <el-input v-model="formData.seExpanderRatedPower" placeholder="额定功率" />
        </el-form-item>

        <el-form-item label="额定转速" prop="seExpanderRatedSpeed">
          <el-input v-model="formData.seExpanderRatedSpeed" placeholder="额定转速" />
        </el-form-item>

        <el-form-item label="进口压力" prop="seExpanderInletP">
          <el-input v-model="formData.seExpanderInletP" placeholder="进口压力" />
        </el-form-item>

        <el-form-item label="进口温度" prop="seExpanderInletT">
          <el-input v-model="formData.seExpanderInletT" placeholder="进口温度" />
        </el-form-item>

        <el-form-item label="出口压力" prop="seExpanderOutletP">
          <el-input v-model="formData.seExpanderOutletP" placeholder="出口压力" />
        </el-form-item>

        <el-form-item label="出口温度" prop="seExpanderOutletT">
          <el-input v-model="formData.seExpanderOutletT" placeholder="出口温度" />
        </el-form-item>

        <el-form-item label="工作介质" prop="seExpanderMedia">
          <el-input v-model="formData.seExpanderMedia" placeholder="工作介质" />
        </el-form-item>

        <el-form-item label="主体材质" prop="seExpanderMaterial">
          <el-input v-model="formData.seExpanderMaterial" placeholder="主体材质" />
        </el-form-item>

        <el-form-item label="防爆等级" prop="seExpanderExplosionProof">
          <el-input v-model="formData.seExpanderExplosionProof" placeholder="防爆等级" />
        </el-form-item>

        <el-form-item label="联轴器类型" prop="seExpanderCouplingType">
          <el-input v-model="formData.seExpanderCouplingType" placeholder="联轴器类型" />
        </el-form-item>

        <el-form-item label="轴承类型" prop="seExpanderBearingType">
          <el-input v-model="formData.seExpanderBearingType" placeholder="轴承类型" />
        </el-form-item>

        <el-form-item label="润滑方式及油品" prop="seExpanderLubrication">
          <el-input v-model="formData.seExpanderLubrication" placeholder="润滑方式及油品" />
        </el-form-item>

        <el-form-item label="安装位置" prop="seExpanderInstallPos">
          <el-input v-model="formData.seExpanderInstallPos" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投用日期" prop="seExpanderInService">
          <el-input v-model="formData.seExpanderInService" placeholder="投用日期" />
        </el-form-item>

        <el-form-item label="定期检验周期" prop="seExpanderInspectCycle">
          <el-input v-model="formData.seExpanderInspectCycle" placeholder="定期检验周期" />
        </el-form-item>

        <el-form-item label="上次检验日期" prop="seExpanderLastInspect">
          <el-input v-model="formData.seExpanderLastInspect" placeholder="上次检验日期" />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="seExpanderNextInspect">
          <el-input v-model="formData.seExpanderNextInspect" placeholder="下次检验日期" />
        </el-form-item>

        <el-form-item label="检验结果" prop="seExpanderInspectResult">
          <el-input v-model="formData.seExpanderInspectResult" placeholder="检验结果" />
        </el-form-item>

        <el-form-item label="上次润滑日期" prop="seExpanderLastLubricate">
          <el-input v-model="formData.seExpanderLastLubricate" placeholder="上次润滑日期" />
        </el-form-item>

        <el-form-item label="下次润滑日期" prop="seExpanderNextLubricate">
          <el-input v-model="formData.seExpanderNextLubricate" placeholder="下次润滑日期" />
        </el-form-item>

        <el-form-item label="运行振动值" prop="seExpanderVibration">
          <el-input v-model="formData.seExpanderVibration" placeholder="运行振动值" />
        </el-form-item>

        <el-form-item label="膨胀机运行效率" prop="seExpanderEfficiency">
          <el-input v-model="formData.seExpanderEfficiency" placeholder="膨胀机运行效率" />
        </el-form-item>

        <el-form-item label="维保维修记录" prop="seExpanderMaintainRecord">
          <el-input v-model="formData.seExpanderMaintainRecord" placeholder="维保维修记录" />
        </el-form-item>

        <el-form-item label="故障及异常记录" prop="seExpanderFaultRecord">
          <el-input v-model="formData.seExpanderFaultRecord" placeholder="故障及异常记录" />
        </el-form-item>

        <el-form-item label="录入 / 维护人员" prop="seExpanderOperator">
          <el-input v-model="formData.seExpanderOperator" placeholder="录入 / 维护人员" />
        </el-form-item>

        <el-form-item label="创建时间" prop="seExpanderCreateTime">
          <el-date-picker
            v-model="formData.seExpanderCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="最后更新时间" prop="seExpanderUpdateTime">
          <el-date-picker
            v-model="formData.seExpanderUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="最后更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="设备状态" prop="seExpanderStatus">
          <Dict v-model="formData.seExpanderStatus" code="status" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="seExpanderFactory">
          <el-input v-model="formData.seExpanderFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="seExpanderReserve1">
          <el-input v-model="formData.seExpanderReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="seExpanderReserve2">
          <el-input v-model="formData.seExpanderReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="seExpanderReserve3">
          <el-input v-model="formData.seExpanderReserve3" placeholder="备用3" />
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
    <SeExpanderImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SeExpander",
  inheritAttrs: false,
});

import SeExpanderAPI, {
  SeExpanderPageVO,
  SeExpanderForm,
  SeExpanderPageQuery,
} from "@/api/ledger/se-expander-api";
import SeExpanderImport from "./SeExpanderImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const queryParams = reactive<SeExpanderPageQuery>({
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

// 特种设备膨胀机台账表格数据
const pageData = ref<SeExpanderPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 特种设备膨胀机台账表单数据
const formData = reactive<SeExpanderForm>({});

// 特种设备膨胀机台账表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  seExpanderEquipCode: [{ required: true, message: "请输入膨胀机设备编号", trigger: "blur" }],
  seExpanderName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  seExpanderType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
  seExpanderSpec: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  seExpanderRatedPower: [{ required: true, message: "请输入额定功率", trigger: "blur" }],
  seExpanderRatedSpeed: [{ required: true, message: "请输入额定转速", trigger: "blur" }],
  seExpanderInletP: [{ required: true, message: "请输入进口压力", trigger: "blur" }],
  seExpanderInletT: [{ required: true, message: "请输入进口温度", trigger: "blur" }],
  seExpanderOutletP: [{ required: true, message: "请输入出口压力", trigger: "blur" }],
  seExpanderOutletT: [{ required: true, message: "请输入出口温度", trigger: "blur" }],
  seExpanderMedia: [{ required: true, message: "请输入工作介质", trigger: "blur" }],
  seExpanderMaterial: [{ required: true, message: "请输入主体材质", trigger: "blur" }],
  seExpanderExplosionProof: [{ required: true, message: "请输入防爆等级", trigger: "blur" }],
  seExpanderCouplingType: [{ required: true, message: "请输入联轴器类型", trigger: "blur" }],
  seExpanderBearingType: [{ required: true, message: "请输入轴承类型", trigger: "blur" }],
  seExpanderLubrication: [{ required: true, message: "请输入润滑方式及油品", trigger: "blur" }],
  seExpanderInstallPos: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  seExpanderInService: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  seExpanderInspectCycle: [{ required: true, message: "请输入定期检验周期", trigger: "blur" }],
  seExpanderLastInspect: [{ required: true, message: "请输入上次检验日期", trigger: "blur" }],
  seExpanderNextInspect: [{ required: true, message: "请输入下次检验日期", trigger: "blur" }],
  seExpanderInspectResult: [{ required: true, message: "请输入检验结果", trigger: "blur" }],
  seExpanderCreateTime: [{ required: true, message: "请输入创建时间", trigger: "blur" }],
  seExpanderUpdateTime: [{ required: true, message: "请输入最后更新时间", trigger: "blur" }],
  seExpanderFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询特种设备膨胀机台账 */
function handleQuery() {
  loading.value = true;
  SeExpanderAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置特种设备膨胀机台账查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开特种设备膨胀机台账弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改特种设备膨胀机台账";
    SeExpanderAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增特种设备膨胀机台账";
  }
}

/** 提交特种设备膨胀机台账表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SeExpanderAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SeExpanderAPI.create(formData)
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

/** 关闭特种设备膨胀机台账弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除特种设备膨胀机台账 */
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
      SeExpanderAPI.deleteByIds(ids)
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
  SeExpanderAPI.export({
    seExpanderEquipCode: queryParams.seExpanderEquipCode,
    seExpanderName: queryParams.seExpanderName,
    seExpanderStatus: queryParams.seExpanderStatus,
    seExpanderFactory: queryParams.seExpanderFactory,
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
