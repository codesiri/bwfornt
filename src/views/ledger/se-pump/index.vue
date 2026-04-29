<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="泵设备编号(位号)" prop="sePumpEquipCode">
          <el-input
            v-model="queryParams.sePumpEquipCode"
            placeholder="泵设备编号(位号)"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>

        <el-form-item label="设备名称" prop="sePumpName">
          <el-input
            v-model="queryParams.sePumpName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="泵类型" prop="sePumpType">
          <el-input
            v-model="queryParams.sePumpType"
            placeholder="泵类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>

        <el-form-item label="设备状态" prop="sePumpStatus">
          <el-input
            v-model="queryParams.sePumpStatus"
            placeholder="设备状态"
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
            v-hasPerm="['ledger:se-pump:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:se-pump:delete']"
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
      <!-- 泵列表 -->
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
          key="sePumpEquipCode"
          label="泵设备编号(位号)"
          prop="sePumpEquipCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpName"
          label="设备名称"
          prop="sePumpName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpType"
          label="泵类型"
          prop="sePumpType"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.sePumpStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="sePumpSpec"
          label="规格型号"
          prop="sePumpSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpFlow"
          label="额定流量"
          prop="sePumpFlow"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpHead"
          label="额定量程"
          prop="sePumpHead"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpRatedPower"
          label="额定功率"
          prop="sePumpRatedPower"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpRatedSpeed"
          label="额定转速"
          prop="sePumpRatedSpeed"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpMedium"
          label="输送介质"
          prop="sePumpMedium"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpMediumTemp"
          label="介质温度"
          prop="sePumpMediumTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpDesignP"
          label="设计压力"
          prop="sePumpDesignP"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpMaterial"
          label="过流部件材质"
          prop="sePumpMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpSealType"
          label="密封形式"
          prop="sePumpSealType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpExplosionProof"
          label="防爆等级"
          prop="sePumpExplosionProof"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpMotorModel"
          label="配套电机型号"
          prop="sePumpMotorModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpInstallPos"
          label="安装位置"
          prop="sePumpInstallPos"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpInService"
          label="投用日期"
          prop="sePumpInService"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpInspectCycle"
          label="定期检验周期"
          prop="sePumpInspectCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpLastInspect"
          label="上次检验日期"
          prop="sePumpLastInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpNextInspect"
          label="下次检验日期"
          prop="sePumpNextInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpInspectResult"
          label="检验结果"
          prop="sePumpInspectResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpLastMaintain"
          label="上次维保日期"
          prop="sePumpLastMaintain"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpNextMaintain"
          label="下次维保日期"
          prop="sePumpNextMaintain"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpVibration"
          label="运行振动值"
          prop="sePumpVibration"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpLeakStatus"
          label="密封泄漏状态"
          prop="sePumpLeakStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpMaintainRecord"
          label="维保维修记录"
          prop="sePumpMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpFaultRecord"
          label="故障及异常记录"
          prop="sePumpFaultRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpOperator"
          label="录入维护人员"
          prop="sePumpOperator"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpCreateTime"
          label="记录创建时间"
          prop="sePumpCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpUpdateTime"
          label="最后更新时间"
          prop="sePumpUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpFactory"
          label="所属工厂"
          prop="sePumpFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpReserve1"
          label="备用1"
          prop="sePumpReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpReserve2"
          label="备用2"
          prop="sePumpReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="sePumpReserve3"
          label="备用3"
          prop="sePumpReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:se-pump:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:se-pump:delete']"
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

    <!-- 泵表单弹窗 -->
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

        <el-form-item label="泵设备编号(位号)" prop="sePumpEquipCode">
          <el-input v-model="formData.sePumpEquipCode" placeholder="泵设备编号(位号)" />
        </el-form-item>

        <el-form-item label="设备名称" prop="sePumpName">
          <el-input v-model="formData.sePumpName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="泵类型" prop="sePumpType">
          <el-input v-model="formData.sePumpType" placeholder="泵类型" />
        </el-form-item>

        <el-form-item label="设备状态" prop="sePumpStatus">
          <Dict v-model="formData.sePumpStatus" code="status" />
        </el-form-item>

        <el-form-item label="规格型号" prop="sePumpSpec">
          <el-input v-model="formData.sePumpSpec" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="额定流量" prop="sePumpFlow">
          <el-input v-model="formData.sePumpFlow" placeholder="额定流量" />
        </el-form-item>

        <el-form-item label="额定量程" prop="sePumpHead">
          <el-input v-model="formData.sePumpHead" placeholder="额定量程" />
        </el-form-item>

        <el-form-item label="额定功率" prop="sePumpRatedPower">
          <el-input v-model="formData.sePumpRatedPower" placeholder="额定功率" />
        </el-form-item>

        <el-form-item label="额定转速" prop="sePumpRatedSpeed">
          <el-input v-model="formData.sePumpRatedSpeed" placeholder="额定转速" />
        </el-form-item>

        <el-form-item label="输送介质" prop="sePumpMedium">
          <el-input v-model="formData.sePumpMedium" placeholder="输送介质" />
        </el-form-item>

        <el-form-item label="介质温度" prop="sePumpMediumTemp">
          <el-input v-model="formData.sePumpMediumTemp" placeholder="介质温度" />
        </el-form-item>

        <el-form-item label="设计压力" prop="sePumpDesignP">
          <el-input v-model="formData.sePumpDesignP" placeholder="设计压力" />
        </el-form-item>

        <el-form-item label="过流部件材质" prop="sePumpMaterial">
          <el-input v-model="formData.sePumpMaterial" placeholder="过流部件材质" />
        </el-form-item>

        <el-form-item label="密封形式" prop="sePumpSealType">
          <el-input v-model="formData.sePumpSealType" placeholder="密封形式" />
        </el-form-item>

        <el-form-item label="防爆等级" prop="sePumpExplosionProof">
          <el-input v-model="formData.sePumpExplosionProof" placeholder="防爆等级" />
        </el-form-item>

        <el-form-item label="配套电机型号" prop="sePumpMotorModel">
          <el-input v-model="formData.sePumpMotorModel" placeholder="配套电机型号" />
        </el-form-item>

        <el-form-item label="安装位置" prop="sePumpInstallPos">
          <el-input v-model="formData.sePumpInstallPos" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投用日期" prop="sePumpInService">
          <el-input v-model="formData.sePumpInService" placeholder="投用日期" />
        </el-form-item>

        <el-form-item label="定期检验周期" prop="sePumpInspectCycle">
          <el-input v-model="formData.sePumpInspectCycle" placeholder="定期检验周期" />
        </el-form-item>

        <el-form-item label="上次检验日期" prop="sePumpLastInspect">
          <el-date-picker
            v-model="formData.sePumpLastInspect"
            class="!w-[240px]"
            type="date"
            placeholder="上次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="sePumpNextInspect">
          <el-date-picker
            v-model="formData.sePumpNextInspect"
            class="!w-[240px]"
            type="date"
            placeholder="下次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检验结果" prop="sePumpInspectResult">
          <el-input v-model="formData.sePumpInspectResult" placeholder="检验结果" />
        </el-form-item>

        <el-form-item label="上次维保日期" prop="sePumpLastMaintain">
          <el-date-picker
            v-model="formData.sePumpLastMaintain"
            class="!w-[240px]"
            type="date"
            placeholder="上次维保日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次维保日期" prop="sePumpNextMaintain">
          <el-date-picker
            v-model="formData.sePumpNextMaintain"
            class="!w-[240px]"
            type="date"
            placeholder="下次维保日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="运行振动值" prop="sePumpVibration">
          <el-input v-model="formData.sePumpVibration" placeholder="运行振动值" />
        </el-form-item>

        <el-form-item label="密封泄漏状态" prop="sePumpLeakStatus">
          <el-input v-model="formData.sePumpLeakStatus" placeholder="密封泄漏状态" />
        </el-form-item>

        <el-form-item label="维保维修记录" prop="sePumpMaintainRecord">
          <el-input v-model="formData.sePumpMaintainRecord" placeholder="维保维修记录" />
        </el-form-item>

        <el-form-item label="故障及异常记录" prop="sePumpFaultRecord">
          <el-input v-model="formData.sePumpFaultRecord" placeholder="故障及异常记录" />
        </el-form-item>

        <el-form-item label="录入维护人员" prop="sePumpOperator">
          <el-input v-model="formData.sePumpOperator" placeholder="录入维护人员" />
        </el-form-item>

        <el-form-item label="记录创建时间" prop="sePumpCreateTime">
          <el-date-picker
            v-model="formData.sePumpCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="记录创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="最后更新时间" prop="sePumpUpdateTime">
          <el-date-picker
            v-model="formData.sePumpUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="最后更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="sePumpFactory">
          <el-input v-model="formData.sePumpFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="sePumpReserve1">
          <el-input v-model="formData.sePumpReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="sePumpReserve2">
          <el-input v-model="formData.sePumpReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="sePumpReserve3">
          <el-input v-model="formData.sePumpReserve3" placeholder="备用3" />
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
    <SePumpImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SePump",
  inheritAttrs: false,
});

import SePumpAPI, { SePumpPageVO, SePumpForm, SePumpPageQuery } from "@/api/ledger/se-pump-api";
import SePumpImport from "./SePumpImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);

const queryParams = reactive<SePumpPageQuery>({
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

const pageData = ref<SePumpPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 泵表单数据
const formData = reactive<SePumpForm>({});

// 泵表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  sePumpEquipCode: [{ required: true, message: "请输入泵设备编号(位号)", trigger: "blur" }],
  sePumpName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  sePumpType: [{ required: true, message: "请输入泵类型", trigger: "blur" }],
  sePumpSpec: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  sePumpFlow: [{ required: true, message: "请输入额定流量", trigger: "blur" }],
  sePumpHead: [{ required: true, message: "请输入额定量程", trigger: "blur" }],
  sePumpRatedPower: [{ required: true, message: "请输入额定功率", trigger: "blur" }],
  sePumpRatedSpeed: [{ required: true, message: "请输入额定转速", trigger: "blur" }],
  sePumpMedium: [{ required: true, message: "请输入输送介质", trigger: "blur" }],
  sePumpMediumTemp: [{ required: true, message: "请输入介质温度", trigger: "blur" }],
  sePumpDesignP: [{ required: true, message: "请输入设计压力", trigger: "blur" }],
  sePumpMaterial: [{ required: true, message: "请输入过流部件材质", trigger: "blur" }],
  sePumpSealType: [{ required: true, message: "请输入密封形式", trigger: "blur" }],
  sePumpExplosionProof: [{ required: true, message: "请输入防爆等级", trigger: "blur" }],
  sePumpMotorModel: [{ required: true, message: "请输入配套电机型号", trigger: "blur" }],
  sePumpInstallPos: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  sePumpInService: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  sePumpInspectCycle: [{ required: true, message: "请输入定期检验周期", trigger: "blur" }],
  sePumpLastInspect: [{ required: true, message: "请输入上次检验日期", trigger: "blur" }],
  sePumpNextInspect: [{ required: true, message: "请输入下次检验日期", trigger: "blur" }],
  sePumpInspectResult: [{ required: true, message: "请输入检验结果", trigger: "blur" }],
  sePumpOperator: [{ required: true, message: "请输入录入维护人员", trigger: "blur" }],
  sePumpFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询泵 */
function handleQuery() {
  loading.value = true;
  SePumpAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置泵查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开泵弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改泵";
    SePumpAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增泵";
  }
}

/** 提交泵表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SePumpAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SePumpAPI.create(formData)
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

/** 关闭泵弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除泵 */
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
      SePumpAPI.deleteByIds(ids)
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

const handleExport = () => {
  SePumpAPI.export({
    sePumpEquipCode: queryParams.sePumpEquipCode,
    sePumpName: queryParams.sePumpName,
    sePumpType: queryParams.sePumpType,
    sePumpStatus: queryParams.sePumpStatus,
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
