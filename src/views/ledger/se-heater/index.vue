<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="换热器设备编号" prop="seHeaterEquipCode">
          <el-input
            v-model="queryParams.seHeaterEquipCode"
            placeholder="换热器设备编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="换热器名称" prop="seHeaterName">
          <el-input
            v-model="queryParams.seHeaterName"
            placeholder="换热器名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="seHeaterStatus">
          <Dict v-model="queryParams.seHeaterStatus" code="status" />
        </el-form-item>
        <el-form-item label="所属工厂" prop="seHeaterFactory">
          <el-input
            v-model="queryParams.seHeaterFactory"
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
            v-hasPerm="['ledger:se-heater:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:se-heater:delete']"
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
          key="seHeaterEquipCode"
          label="换热器设备编号"
          prop="seHeaterEquipCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterName"
          label="换热器名称"
          prop="seHeaterName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterType"
          label="换热器类型"
          prop="seHeaterType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterSpec"
          label="设备规格"
          prop="seHeaterSpec"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterArea"
          label="换热面积（㎡）"
          prop="seHeaterArea"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterDesignP"
          label="设计压力（MPa）"
          prop="seHeaterDesignP"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterDesignT"
          label="设计温度（℃）"
          prop="seHeaterDesignT"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterMedium"
          label="介质类型"
          prop="seHeaterMedium"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterMaterial"
          label="主体材质"
          prop="seHeaterMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterInstallPos"
          label="安装位置"
          prop="seHeaterInstallPos"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterInService"
          label="投用日期"
          prop="seHeaterInService"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterInspectCycle"
          label="法定校验周期"
          prop="seHeaterInspectCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterLastInspect"
          label="上次校验日期"
          prop="seHeaterLastInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterNextInspect"
          label="下次校验日期"
          prop="seHeaterNextInspect"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterInspectResult"
          label="检验结果"
          prop="seHeaterInspectResult"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterCleanCycle"
          label="清洗周期"
          prop="seHeaterCleanCycle"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterLastClean"
          label="上次清洗日期"
          prop="seHeaterLastClean"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterNextClean"
          label="下次清洗日期"
          prop="seHeaterNextClean"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterFoulingRate"
          label="污垢热阻（m²・K/W）"
          prop="seHeaterFoulingRate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterEnergyEff"
          label="换热效率（%）"
          prop="seHeaterEnergyEff"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterMaintainRecord"
          label="维保记录"
          prop="seHeaterMaintainRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterFaultRecord"
          label="故障记录"
          prop="seHeaterFaultRecord"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterOperator"
          label="台账录入 / 维护人员"
          prop="seHeaterOperator"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterCreateTime"
          label="台账记录创建时间"
          prop="seHeaterCreateTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterUpdateTime"
          label="台账记录最后修改时间"
          prop="seHeaterUpdateTime"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.seHeaterStatus" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="seHeaterFactory"
          label="所属工厂"
          prop="seHeaterFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterReserve1"
          label="备用1"
          prop="seHeaterReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterReserve2"
          label="备用2"
          prop="seHeaterReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="seHeaterReserve3"
          label="备用3"
          prop="seHeaterReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:se-heater:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:se-heater:delete']"
              type="danger"
              size="small"
              link
              icon="delete"
              @click="handleDelete"
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

    <!-- 换热器表单弹窗 -->
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

        <el-form-item label="换热器设备编号" prop="seHeaterEquipCode">
          <el-input v-model="formData.seHeaterEquipCode" placeholder="换热器设备编号" />
        </el-form-item>

        <el-form-item label="换热器名称" prop="seHeaterName">
          <el-input v-model="formData.seHeaterName" placeholder="换热器名称" />
        </el-form-item>

        <el-form-item label="换热器类型" prop="seHeaterType">
          <el-input v-model="formData.seHeaterType" placeholder="换热器类型" />
        </el-form-item>

        <el-form-item label="设备规格" prop="seHeaterSpec">
          <el-input v-model="formData.seHeaterSpec" placeholder="设备规格" />
        </el-form-item>

        <el-form-item label="换热面积（㎡）" prop="seHeaterArea">
          <el-input v-model="formData.seHeaterArea" placeholder="换热面积（㎡）" />
        </el-form-item>

        <el-form-item label="设计压力（MPa）" prop="seHeaterDesignP">
          <el-input v-model="formData.seHeaterDesignP" placeholder="设计压力（MPa）" />
        </el-form-item>

        <el-form-item label="设计温度（℃）" prop="seHeaterDesignT">
          <el-input v-model="formData.seHeaterDesignT" placeholder="设计温度（℃）" />
        </el-form-item>

        <el-form-item label="介质类型" prop="seHeaterMedium">
          <el-input v-model="formData.seHeaterMedium" placeholder="介质类型" />
        </el-form-item>

        <el-form-item label="主体材质" prop="seHeaterMaterial">
          <el-input v-model="formData.seHeaterMaterial" placeholder="主体材质" />
        </el-form-item>

        <el-form-item label="安装位置" prop="seHeaterInstallPos">
          <el-input v-model="formData.seHeaterInstallPos" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投用日期" prop="seHeaterInService">
          <el-date-picker
            v-model="formData.seHeaterInService"
            class="!w-[240px]"
            type="date"
            placeholder="投用日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="法定校验周期" prop="seHeaterInspectCycle">
          <el-input v-model="formData.seHeaterInspectCycle" placeholder="法定校验周期" />
        </el-form-item>

        <el-form-item label="上次校验日期" prop="seHeaterLastInspect">
          <el-input v-model="formData.seHeaterLastInspect" placeholder="上次校验日期" />
        </el-form-item>

        <el-form-item label="下次校验日期" prop="seHeaterNextInspect">
          <el-input v-model="formData.seHeaterNextInspect" placeholder="下次校验日期" />
        </el-form-item>

        <el-form-item label="检验结果" prop="seHeaterInspectResult">
          <el-input v-model="formData.seHeaterInspectResult" placeholder="检验结果" />
        </el-form-item>

        <el-form-item label="清洗周期" prop="seHeaterCleanCycle">
          <el-input v-model="formData.seHeaterCleanCycle" placeholder="清洗周期" />
        </el-form-item>

        <el-form-item label="上次清洗日期" prop="seHeaterLastClean">
          <el-date-picker
            v-model="formData.seHeaterLastClean"
            class="!w-[240px]"
            type="date"
            placeholder="上次清洗日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="下次清洗日期" prop="seHeaterNextClean">
          <el-date-picker
            v-model="formData.seHeaterNextClean"
            class="!w-[240px]"
            type="date"
            placeholder="下次清洗日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="污垢热阻（m²・K/W）" prop="seHeaterFoulingRate">
          <el-input v-model="formData.seHeaterFoulingRate" placeholder="污垢热阻（m²・K/W）" />
        </el-form-item>

        <el-form-item label="换热效率（%）" prop="seHeaterEnergyEff">
          <el-input v-model="formData.seHeaterEnergyEff" placeholder="换热效率（%）" />
        </el-form-item>

        <el-form-item label="维保记录" prop="seHeaterMaintainRecord">
          <el-input v-model="formData.seHeaterMaintainRecord" placeholder="维保记录" />
        </el-form-item>

        <el-form-item label="故障记录" prop="seHeaterFaultRecord">
          <el-input v-model="formData.seHeaterFaultRecord" placeholder="故障记录" />
        </el-form-item>

        <el-form-item label="台账录入 / 维护人员" prop="seHeaterOperator">
          <el-input v-model="formData.seHeaterOperator" placeholder="台账录入 / 维护人员" />
        </el-form-item>

        <el-form-item label="台账记录创建时间" prop="seHeaterCreateTime">
          <el-date-picker
            v-model="formData.seHeaterCreateTime"
            type="datetime"
            placeholder="台账记录创建时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="台账记录最后修改时间" prop="seHeaterUpdateTime">
          <el-date-picker
            v-model="formData.seHeaterUpdateTime"
            type="datetime"
            placeholder="台账记录最后修改时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="设备状态" prop="seHeaterStatus">
          <Dict v-model="formData.seHeaterStatus" code="status" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="seHeaterFactory">
          <el-input v-model="formData.seHeaterFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="seHeaterReserve1">
          <el-input v-model="formData.seHeaterReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="seHeaterReserve2">
          <el-input v-model="formData.seHeaterReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="seHeaterReserve3">
          <el-input v-model="formData.seHeaterReserve3" placeholder="备用3" />
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
    <SeHeaterImport v-model="importDialogVisible" @import-success="handleResetQuery()" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SeHeater",
  inheritAttrs: false,
});

import SeHeaterAPI, {
  SeHeaterPageVO,
  SeHeaterForm,
  SeHeaterPageQuery,
} from "@/api/ledger/se-heater-api";

import SeHeaterImport from "./seHeaterImport.vue";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const queryParams = reactive<SeHeaterPageQuery>({
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

// 换热器表格数据
const pageData = ref<SeHeaterPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 换热器表单数据
const formData = reactive<SeHeaterForm>({});

// 换热器表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  seHeaterEquipCode: [{ required: true, message: "请输入换热器设备编号", trigger: "blur" }],
  seHeaterName: [{ required: true, message: "请输入换热器名称", trigger: "blur" }],
  seHeaterType: [{ required: true, message: "请输入换热器类型", trigger: "blur" }],
  seHeaterSpec: [{ required: true, message: "请输入设备规格", trigger: "blur" }],
  seHeaterArea: [{ required: true, message: "请输入换热面积（㎡）", trigger: "blur" }],
  seHeaterDesignP: [{ required: true, message: "请输入设计压力（MPa）", trigger: "blur" }],
  seHeaterDesignT: [{ required: true, message: "请输入设计温度（℃）", trigger: "blur" }],
  seHeaterMedium: [{ required: true, message: "请输入介质类型", trigger: "blur" }],
  seHeaterMaterial: [{ required: true, message: "请输入主体材质", trigger: "blur" }],
  seHeaterInstallPos: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  seHeaterInspectCycle: [{ required: true, message: "请输入法定校验周期", trigger: "blur" }],
  seHeaterLastInspect: [{ required: true, message: "请输入上次校验日期", trigger: "blur" }],
  seHeaterNextInspect: [{ required: true, message: "请输入下次校验日期", trigger: "blur" }],
  seHeaterInspectResult: [{ required: true, message: "请输入检验结果", trigger: "blur" }],
  seHeaterCleanCycle: [{ required: true, message: "请输入清洗周期", trigger: "blur" }],
  seHeaterOperator: [{ required: true, message: "请输入台账录入 / 维护人员", trigger: "blur" }],
  seHeaterCreateTime: [{ required: true, message: "请输入台账记录创建时间", trigger: "blur" }],
  seHeaterUpdateTime: [{ required: true, message: "请输入台账记录最后修改时间", trigger: "blur" }],
});

/** 查询换热器 */
function handleQuery() {
  loading.value = true;
  SeHeaterAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置换热器查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开换热器弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改换热器";
    SeHeaterAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增换热器";
  }
}

/** 提交换热器表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SeHeaterAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SeHeaterAPI.create(formData)
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

/** 关闭换热器弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除换热器 */
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
      SeHeaterAPI.deleteByIds(ids)
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
  SeHeaterAPI.export({
    seHeaterEquipCode: queryParams.seHeaterEquipCode,
    seHeaterName: queryParams.seHeaterName,
    seHeaterStatus: queryParams.seHeaterStatus,
    seHeaterFactory: queryParams.seHeaterFactory,
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
