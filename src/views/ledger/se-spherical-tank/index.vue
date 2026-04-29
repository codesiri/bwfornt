<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="设备名称" prop="seTankName">
          <el-input
            v-model="queryParams.seTankName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="seTankFactory">
          <el-input
            v-model="queryParams.seTankFactory"
            placeholder="所属工厂"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="seTankStatus">
          <Dict v-model="queryParams.seTankStatus" code="status" />
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
            v-hasPerm="['ledger:se-spherical-tank:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:se-spherical-tank:delete']"
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
          key="seTankEquipCode"
          label="球罐设备编号"
          prop="seTankEquipCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankName"
          label="球罐名称"
          prop="seTankName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankSpec"
          label="规格型号"
          prop="seTankSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankDesignVolume"
          label="设计容积（m³）"
          prop="seTankDesignVolume"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankOperatingVolume"
          label="工作容积（m³）"
          prop="seTankOperatingVolume"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankDesignP"
          label="设计压力（MPa）"
          prop="seTankDesignP"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankOperatingP"
          label="工作压力（MPa）"
          prop="seTankOperatingP"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankDesignT"
          label="设计温度（℃）"
          prop="seTankDesignT"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankOperatingT"
          label="工作温度（℃）"
          prop="seTankOperatingT"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankMedia"
          label="储存介质"
          prop="seTankMedia"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankMaterial"
          label="主体材质"
          prop="seTankMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankThickness"
          label="罐体壁厚（mm）"
          prop="seTankThickness"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankSealType"
          label="密封形式"
          prop="seTankSealType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankAntiCorrosion"
          label="防腐措施"
          prop="seTankAntiCorrosion"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankSafetyValveModel"
          label="安全阀型号规格"
          prop="seTankSafetyValveModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankInstallPos"
          label="安装位置"
          prop="seTankInstallPos"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankInService"
          label="投用日期"
          prop="seTankInService"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankInspectCycle"
          label="定期检验周期"
          prop="seTankInspectCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankLastInspect"
          label="上次检验日期"
          prop="seTankLastInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankNextInspect"
          label="下次检验日期"
          prop="seTankNextInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankInspectResult"
          label="检验结果"
          prop="seTankInspectResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankLastPressureTest"
          label="上次水压 / 气压试验日期"
          prop="seTankLastPressureTest"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankLevelGaugeModel"
          label="液位计型号"
          prop="seTankLevelGaugeModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankCorrosionStatus"
          label="腐蚀状况"
          prop="seTankCorrosionStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankMaintainRecord"
          label="维保维修记录"
          prop="seTankMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankFaultRecord"
          label="故障及异常记录"
          prop="seTankFaultRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankOperator"
          label="录入维护人员"
          prop="seTankOperator"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankCreateTime"
          label="记录创建时间"
          prop="seTankCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankUpdateTime"
          label="最后更新时间"
          prop="seTankUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.seTankStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="seTankFactory"
          label="所属工厂"
          prop="seTankFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankReserve1"
          label="备用1"
          prop="seTankReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankReserve2"
          label="备用2"
          prop="seTankReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seTankReserve3"
          label="备用3"
          prop="seTankReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:se-spherical-tank:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:se-spherical-tank:delete']"
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

    <!-- 球罐表单弹窗 -->
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

        <el-form-item label="球罐设备编号" prop="seTankEquipCode">
          <el-input v-model="formData.seTankEquipCode" placeholder="球罐设备编号" />
        </el-form-item>

        <el-form-item label="球罐名称" prop="seTankName">
          <el-input v-model="formData.seTankName" placeholder="球罐名称" />
        </el-form-item>

        <el-form-item label="规格型号" prop="seTankSpec">
          <el-input v-model="formData.seTankSpec" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="设计容积（m³）" prop="seTankDesignVolume">
          <el-input v-model="formData.seTankDesignVolume" placeholder="设计容积（m³）" />
        </el-form-item>

        <el-form-item label="工作容积（m³）" prop="seTankOperatingVolume">
          <el-input v-model="formData.seTankOperatingVolume" placeholder="工作容积（m³）" />
        </el-form-item>

        <el-form-item label="设计压力（MPa）" prop="seTankDesignP">
          <el-input v-model="formData.seTankDesignP" placeholder="设计压力（MPa）" />
        </el-form-item>

        <el-form-item label="工作压力（MPa）" prop="seTankOperatingP">
          <el-input v-model="formData.seTankOperatingP" placeholder="工作压力（MPa）" />
        </el-form-item>

        <el-form-item label="设计温度（℃）" prop="seTankDesignT">
          <el-input v-model="formData.seTankDesignT" placeholder="设计温度（℃）" />
        </el-form-item>

        <el-form-item label="工作温度（℃）" prop="seTankOperatingT">
          <el-input v-model="formData.seTankOperatingT" placeholder="工作温度（℃）" />
        </el-form-item>

        <el-form-item label="储存介质" prop="seTankMedia">
          <el-input v-model="formData.seTankMedia" placeholder="储存介质" />
        </el-form-item>

        <el-form-item label="主体材质" prop="seTankMaterial">
          <el-input v-model="formData.seTankMaterial" placeholder="主体材质" />
        </el-form-item>

        <el-form-item label="罐体壁厚（mm）" prop="seTankThickness">
          <el-input v-model="formData.seTankThickness" placeholder="罐体壁厚（mm）" />
        </el-form-item>

        <el-form-item label="密封形式" prop="seTankSealType">
          <el-input v-model="formData.seTankSealType" placeholder="密封形式" />
        </el-form-item>

        <el-form-item label="防腐措施" prop="seTankAntiCorrosion">
          <el-input v-model="formData.seTankAntiCorrosion" placeholder="防腐措施" />
        </el-form-item>

        <el-form-item label="安全阀型号规格" prop="seTankSafetyValveModel">
          <el-input v-model="formData.seTankSafetyValveModel" placeholder="安全阀型号规格" />
        </el-form-item>

        <el-form-item label="安装位置" prop="seTankInstallPos">
          <el-input v-model="formData.seTankInstallPos" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投用日期" prop="seTankInService">
          <el-input v-model="formData.seTankInService" placeholder="投用日期" />
        </el-form-item>

        <el-form-item label="定期检验周期" prop="seTankInspectCycle">
          <el-input v-model="formData.seTankInspectCycle" placeholder="定期检验周期" />
        </el-form-item>

        <el-form-item label="上次检验日期" prop="seTankLastInspect">
          <el-date-picker
            v-model="formData.seTankLastInspect"
            class="!w-[240px]"
            type="date"
            placeholder="上次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="seTankNextInspect">
          <el-date-picker
            v-model="formData.seTankNextInspect"
            class="!w-[240px]"
            type="date"
            placeholder="下次检验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="检验结果" prop="seTankInspectResult">
          <el-input v-model="formData.seTankInspectResult" placeholder="检验结果" />
        </el-form-item>

        <el-form-item label="上次水压 / 气压试验日期" prop="seTankLastPressureTest">
          <el-date-picker
            v-model="formData.seTankLastPressureTest"
            class="!w-[240px]"
            type="date"
            placeholder="上次水压 / 气压试验日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="液位计型号" prop="seTankLevelGaugeModel">
          <el-input v-model="formData.seTankLevelGaugeModel" placeholder="液位计型号" />
        </el-form-item>

        <el-form-item label="腐蚀状况" prop="seTankCorrosionStatus">
          <el-input v-model="formData.seTankCorrosionStatus" placeholder="腐蚀状况" />
        </el-form-item>

        <el-form-item label="维保维修记录" prop="seTankMaintainRecord">
          <el-input v-model="formData.seTankMaintainRecord" placeholder="维保维修记录" />
        </el-form-item>

        <el-form-item label="故障及异常记录" prop="seTankFaultRecord">
          <el-input v-model="formData.seTankFaultRecord" placeholder="故障及异常记录" />
        </el-form-item>

        <el-form-item label="录入维护人员" prop="seTankOperator">
          <el-input v-model="formData.seTankOperator" placeholder="录入维护人员" />
        </el-form-item>

        <el-form-item label="记录创建时间" prop="seTankCreateTime">
          <el-date-picker
            v-model="formData.seTankCreateTime"
            class="!w-[240px]"
            type="date"
            placeholder="记录创建时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="最后更新时间" prop="seTankUpdateTime">
          <el-date-picker
            v-model="formData.seTankUpdateTime"
            class="!w-[240px]"
            type="date"
            placeholder="最后更新时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="设备状态" prop="seTankStatus">
          <Dict v-model="formData.seTankStatus" code="status" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="seTankFactory">
          <el-input v-model="formData.seTankFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="seTankReserve1">
          <el-input v-model="formData.seTankReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="seTankReserve2">
          <el-input v-model="formData.seTankReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="seTankReserve3">
          <el-input v-model="formData.seTankReserve3" placeholder="备用3" />
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
    <SeSphericalTankImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SeSphericalTank",
  inheritAttrs: false,
});

import SeSphericalTankAPI, {
  SeSphericalTankPageVO,
  SeSphericalTankForm,
  SeSphericalTankPageQuery,
} from "@/api/ledger/se-spherical-tank-api";

import SeSphericalTankImport from "./seSphericalTankImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<SeSphericalTankPageQuery>({
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

// 球罐表格数据
const pageData = ref<SeSphericalTankPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 球罐表单数据
const formData = reactive<SeSphericalTankForm>({});

// 球罐表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  seTankEquipCode: [{ required: true, message: "请输入球罐设备编号", trigger: "blur" }],
  seTankName: [{ required: true, message: "请输入球罐名称", trigger: "blur" }],
  seTankSpec: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  seTankDesignVolume: [{ required: true, message: "请输入设计容积（m³）", trigger: "blur" }],
  seTankOperatingVolume: [{ required: true, message: "请输入工作容积（m³）", trigger: "blur" }],
  seTankDesignP: [{ required: true, message: "请输入设计压力（MPa）", trigger: "blur" }],
  seTankOperatingP: [{ required: true, message: "请输入工作压力（MPa）", trigger: "blur" }],
  seTankDesignT: [{ required: true, message: "请输入设计温度（℃）", trigger: "blur" }],
  seTankOperatingT: [{ required: true, message: "请输入工作温度（℃）", trigger: "blur" }],
  seTankMedia: [{ required: true, message: "请输入储存介质", trigger: "blur" }],
  seTankMaterial: [{ required: true, message: "请输入主体材质", trigger: "blur" }],
  seTankThickness: [{ required: true, message: "请输入罐体壁厚（mm）", trigger: "blur" }],
  seTankSealType: [{ required: true, message: "请输入密封形式", trigger: "blur" }],
  seTankAntiCorrosion: [{ required: true, message: "请输入防腐措施", trigger: "blur" }],
  seTankSafetyValveModel: [{ required: true, message: "请输入安全阀型号规格", trigger: "blur" }],
  seTankInstallPos: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  seTankInService: [{ required: true, message: "请输入投用日期", trigger: "blur" }],
  seTankInspectCycle: [{ required: true, message: "请输入定期检验周期", trigger: "blur" }],
  seTankLastInspect: [{ required: true, message: "请输入上次检验日期", trigger: "blur" }],
  seTankNextInspect: [{ required: true, message: "请输入下次检验日期", trigger: "blur" }],
  seTankInspectResult: [{ required: true, message: "请输入检验结果", trigger: "blur" }],
  seTankOperator: [{ required: true, message: "请输入录入维护人员", trigger: "blur" }],
  seTankCreateTime: [{ required: true, message: "请输入记录创建时间", trigger: "blur" }],
  seTankUpdateTime: [{ required: true, message: "请输入最后更新时间", trigger: "blur" }],
  seTankFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询球罐 */
function handleQuery() {
  loading.value = true;
  SeSphericalTankAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置球罐查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开球罐弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改球罐";
    SeSphericalTankAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增球罐";
  }
}

/** 提交球罐表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SeSphericalTankAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SeSphericalTankAPI.create(formData)
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

/** 关闭球罐弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除球罐 */
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
      SeSphericalTankAPI.deleteByIds(ids)
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
  SeSphericalTankAPI.export({
    seTankName: queryParams.seTankName,
    seTankFactory: queryParams.seTankFactory,
    seTankStatus: queryParams.seTankStatus,
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
