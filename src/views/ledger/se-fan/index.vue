<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="风机设备编号" prop="seFanEquipCode">
          <el-input
            v-model="queryParams.seFanEquipCode"
            placeholder="膨胀机设备编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="风机名称" prop="seFanName">
          <el-input
            v-model="queryParams.seFanName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="seFanStatus">
          <Dict v-model="queryParams.seFanStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="seFanFactory">
          <el-input
            v-model="queryParams.seFanFactory"
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
            v-hasPerm="['ledger:se-fan:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:se-fan:delete']"
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
          key="seFanEquipCode"
          label="风机设备编号"
          prop="seFanEquipCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanName"
          label="风机名称"
          prop="seFanName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanType"
          label="风机类型"
          prop="seFanType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanSpec"
          label="设备规格"
          prop="seFanSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanRatedPower"
          label="额定功率（kW）"
          prop="seFanRatedPower"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanRatedSpeed"
          label="额定转速（r/min）"
          prop="seFanRatedSpeed"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanRatedPressure"
          label="额定压力（kPa，正压 / 负压标注在备注）"
          prop="seFanRatedPressure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanRatedFlow"
          label="额定风量（m³/h）"
          prop="seFanRatedFlow"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanMedium"
          label="输送介质"
          prop="seFanMedium"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanMaterial"
          label="主体材质"
          prop="seFanMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanExplosionProof"
          label="防爆等级"
          prop="seFanExplosionProof"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanMotorModel"
          label="配套电机型号"
          prop="seFanMotorModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanInstallPos"
          label="安装位置"
          prop="seFanInstallPos"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanInService"
          label="投用日期"
          prop="seFanInService"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanInspectCycle"
          label="法定检验周期"
          prop="seFanInspectCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanLastInspect"
          label="上次检验日期"
          prop="seFanLastInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanNextInspect"
          label="下次检验日期"
          prop="seFanNextInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanInspectResult"
          label="检验结果"
          prop="seFanInspectResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanLubrication"
          label="润滑方式"
          prop="seFanLubrication"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanLastLubricate"
          label="上次润滑日期"
          prop="seFanLastLubricate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanNextLubricate"
          label="下次润滑日期"
          prop="seFanNextLubricate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanVibration"
          label="运行振动值（mm/s，标准≤4.5mm/s）"
          prop="seFanVibration"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanMaintainRecord"
          label="维保记录"
          prop="seFanMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanFaultRecord"
          label="故障记录"
          prop="seFanFaultRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanOperator"
          label="台账录入 / 维护人员"
          prop="seFanOperator"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanCreateTime"
          label="台账记录创建时间"
          prop="seFanCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanUpdateTime"
          label="台账记录最后修改时间"
          prop="seFanUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.seFanStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="seFanFactory"
          label="所属工厂"
          prop="seFanFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanReserve1"
          label="备用1"
          prop="seFanReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanReserve2"
          label="备用2"
          prop="seFanReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seFanReserve3"
          label="备用3"
          prop="seFanReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:se-fan:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:se-fan:delete']"
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

    <!-- 特种设备风机台账表单弹窗 -->
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

        <el-form-item label="风机设备编号" prop="seFanEquipCode">
          <el-input v-model="formData.seFanEquipCode" placeholder="风机设备编号" />
        </el-form-item>

        <el-form-item label="风机名称" prop="seFanName">
          <el-input v-model="formData.seFanName" placeholder="风机名称" />
        </el-form-item>

        <el-form-item label="风机类型" prop="seFanType">
          <el-input v-model="formData.seFanType" placeholder="风机类型" />
        </el-form-item>

        <el-form-item label="设备规格" prop="seFanSpec">
          <el-input v-model="formData.seFanSpec" placeholder="设备规格" />
        </el-form-item>

        <el-form-item label="额定功率（kW）" prop="seFanRatedPower">
          <el-input v-model="formData.seFanRatedPower" placeholder="额定功率（kW）" />
        </el-form-item>

        <el-form-item label="额定转速（r/min）" prop="seFanRatedSpeed">
          <el-input v-model="formData.seFanRatedSpeed" placeholder="额定转速（r/min）" />
        </el-form-item>

        <el-form-item label="额定压力（kPa，正压 / 负压标注在备注）" prop="seFanRatedPressure">
          <el-input
            v-model="formData.seFanRatedPressure"
            placeholder="额定压力（kPa，正压 / 负压标注在备注）"
          />
        </el-form-item>

        <el-form-item label="额定风量（m³/h）" prop="seFanRatedFlow">
          <el-input v-model="formData.seFanRatedFlow" placeholder="额定风量（m³/h）" />
        </el-form-item>

        <el-form-item label="输送介质" prop="seFanMedium">
          <el-input v-model="formData.seFanMedium" placeholder="输送介质" />
        </el-form-item>

        <el-form-item label="主体材质" prop="seFanMaterial">
          <el-input v-model="formData.seFanMaterial" placeholder="主体材质" />
        </el-form-item>

        <el-form-item label="防爆等级" prop="seFanExplosionProof">
          <el-input v-model="formData.seFanExplosionProof" placeholder="防爆等级" />
        </el-form-item>

        <el-form-item label="配套电机型号" prop="seFanMotorModel">
          <el-input v-model="formData.seFanMotorModel" placeholder="配套电机型号" />
        </el-form-item>

        <el-form-item label="安装位置" prop="seFanInstallPos">
          <el-input v-model="formData.seFanInstallPos" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投用日期" prop="seFanInService">
          <el-input v-model="formData.seFanInService" placeholder="投用日期" />
        </el-form-item>

        <el-form-item label="法定检验周期" prop="seFanInspectCycle">
          <el-input v-model="formData.seFanInspectCycle" placeholder="法定检验周期" />
        </el-form-item>

        <el-form-item label="上次检验日期" prop="seFanLastInspect">
          <el-date-picker
            v-model="formData.seFanLastInspect"
            class="!w-[240px]"
            type="date"
            placeholder="上次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="seFanNextInspect">
          <el-date-picker
            v-model="formData.seFanNextInspect"
            class="!w-[240px]"
            type="date"
            placeholder="下次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检验结果" prop="seFanInspectResult">
          <el-input v-model="formData.seFanInspectResult" placeholder="检验结果" />
        </el-form-item>

        <el-form-item label="润滑方式" prop="seFanLubrication">
          <el-input v-model="formData.seFanLubrication" placeholder="润滑方式" />
        </el-form-item>

        <el-form-item label="上次润滑日期" prop="seFanLastLubricate">
          <el-date-picker
            v-model="formData.seFanLastLubricate"
            class="!w-[240px]"
            type="date"
            placeholder="上次润滑日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次润滑日期" prop="seFanNextLubricate">
          <el-date-picker
            v-model="formData.seFanNextLubricate"
            class="!w-[240px]"
            type="date"
            placeholder="下次润滑日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="运行振动值（mm/s，标准≤4.5mm/s）" prop="seFanVibration">
          <el-input
            v-model="formData.seFanVibration"
            placeholder="运行振动值（mm/s，标准≤4.5mm/s）"
          />
        </el-form-item>

        <el-form-item label="维保记录" prop="seFanMaintainRecord">
          <el-input v-model="formData.seFanMaintainRecord" placeholder="维保记录" />
        </el-form-item>

        <el-form-item label="故障记录" prop="seFanFaultRecord">
          <el-input v-model="formData.seFanFaultRecord" placeholder="故障记录" />
        </el-form-item>

        <el-form-item label="台账录入 / 维护人员" prop="seFanOperator">
          <el-input v-model="formData.seFanOperator" placeholder="台账录入 / 维护人员" />
        </el-form-item>

        <el-form-item label="台账记录创建时间" prop="seFanCreateTime">
          <el-date-picker
            v-model="formData.seFanCreateTime"
            type="datetime"
            placeholder="台账记录创建时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="台账记录最后修改时间" prop="seFanUpdateTime">
          <el-date-picker
            v-model="formData.seFanUpdateTime"
            type="datetime"
            placeholder="台账记录最后修改时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="设备状态" prop="seFanStatus">
          <Dict v-model="formData.seFanStatus" code="status" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="seFanFactory">
          <el-input v-model="formData.seFanFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="seFanReserve1">
          <el-input v-model="formData.seFanReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="seFanReserve2">
          <el-input v-model="formData.seFanReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="seFanReserve3">
          <el-input v-model="formData.seFanReserve3" placeholder="备用3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>

    <SeFanImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SeFan",
  inheritAttrs: false,
});

import SeFanAPI, { SeFanPageVO, SeFanForm, SeFanPageQuery } from "@/api/ledger/se-fan-api";
import SeFanImport from "./seFanImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);

const queryParams = reactive<SeFanPageQuery>({
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

// 特种设备风机台账表格数据
const pageData = ref<SeFanPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 特种设备风机台账表单数据
const formData = reactive<SeFanForm>({});

// 特种设备风机台账表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  seFanEquipCode: [{ required: true, message: "请输入风机设备编号", trigger: "blur" }],
  seFanName: [{ required: true, message: "请输入风机名称", trigger: "blur" }],
  seFanType: [{ required: true, message: "请输入风机类型", trigger: "blur" }],
  seFanSpec: [{ required: true, message: "请输入设备规格", trigger: "blur" }],
  seFanRatedPower: [{ required: true, message: "请输入额定功率（kW）", trigger: "blur" }],
  seFanRatedSpeed: [{ required: true, message: "请输入额定转速（r/min）", trigger: "blur" }],
  seFanRatedPressure: [
    { required: true, message: "请输入额定压力（kPa，正压 / 负压标注在备注）", trigger: "blur" },
  ],
  seFanRatedFlow: [{ required: true, message: "请输入额定风量（m³/h）", trigger: "blur" }],
  seFanMedium: [{ required: true, message: "请输入输送介质", trigger: "blur" }],
  seFanMaterial: [{ required: true, message: "请输入主体材质", trigger: "blur" }],
  seFanExplosionProof: [{ required: true, message: "请输入防爆等级", trigger: "blur" }],
  seFanMotorModel: [{ required: true, message: "请输入配套电机型号", trigger: "blur" }],
  seFanInstallPos: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  seFanInspectCycle: [{ required: true, message: "请输入法定检验周期", trigger: "blur" }],
  seFanInspectResult: [{ required: true, message: "请输入检验结果", trigger: "blur" }],
  seFanLubrication: [{ required: true, message: "请输入润滑方式", trigger: "blur" }],
  seFanOperator: [{ required: true, message: "请输入台账录入 / 维护人员", trigger: "blur" }],
  seFanCreateTime: [{ required: true, message: "请输入台账记录创建时间", trigger: "blur" }],
  seFanUpdateTime: [{ required: true, message: "请输入台账记录最后修改时间", trigger: "blur" }],
  seFanFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询特种设备风机台账 */
function handleQuery() {
  loading.value = true;
  SeFanAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置特种设备风机台账查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开特种设备风机台账弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改特种设备风机台账";
    SeFanAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增特种设备风机台账";
  }
}

/** 提交特种设备风机台账表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SeFanAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SeFanAPI.create(formData)
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

/** 关闭特种设备风机台账弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除特种设备风机台账 */
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
      SeFanAPI.deleteByIds(ids)
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
  SeFanAPI.export({
    seFanEquipCode: queryParams.seFanEquipCode,
    seFanName: queryParams.seFanName,
    seFanStatus: queryParams.seFanStatus,
    seFanFactory: queryParams.seFanFactory,
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
