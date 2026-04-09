<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="单元名称" prop="ecduUnitName">
          <el-input
            v-model="queryParams.ecduUnitName"
            placeholder="单元名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="开关型号" prop="ecduSwitchModel">
          <el-input
            v-model="queryParams.ecduSwitchModel"
            placeholder="开关型号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="单元状态" prop="ecduUnitStatus">
          <el-input
            v-model="queryParams.ecduUnitStatus"
            placeholder="单元状态"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="ecduFactory">
          <el-input
            v-model="queryParams.ecduFactory"
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
        <el-button
          v-hasPerm="['ledger:electric-cabinet-drawer-unit:add']"
          type="success"
          icon="plus"
          @click="handleOpenDialog()"
        >
          新增
        </el-button>
        <div class="data-table__toolbar--tools">
          <el-button
            v-hasPerm="'ledger:elec-motor:add'"
            icon="upload"
            @click="handleOpenImportDialog"
          >
            导入
          </el-button>

          <el-button v-hasPerm="'ledger:elec-motor:delete'" icon="download" @click="handleExport">
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
        <el-table-column
          key="ecduDrawerNo"
          label="抽屉编号"
          prop="ecduDrawerNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduUnitName"
          label="单元名称"
          prop="ecduUnitName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduRatedCurrent"
          label="额定电流（A）"
          prop="ecduRatedCurrent"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduRatedVoltage"
          label="额定电压（V）"
          prop="ecduRatedVoltage"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduSwitchModel"
          label="开关型号"
          prop="ecduSwitchModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduSwitchManufacturer"
          label="开关厂家"
          prop="ecduSwitchManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduSettingCurrent"
          label="整定电流（A）"
          prop="ecduSettingCurrent"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduCorrespondingLoad"
          label="对应负载"
          prop="ecduCorrespondingLoad"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduInstallLocation"
          label="安装位置"
          prop="ecduInstallLocation"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduUnitStatus"
          label="单元状态"
          prop="ecduUnitStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecduFactory"
          label="所属工厂"
          prop="ecduFactory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-cabinet-drawer-unit:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-cabinet-drawer-unit:delete']"
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

    <!-- 抽屉柜抽屉单元明细表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="抽屉编号" prop="ecduDrawerNo">
          <el-input v-model="formData.ecduDrawerNo" placeholder="抽屉编号" />
        </el-form-item>

        <el-form-item label="单元名称" prop="ecduUnitName">
          <el-input v-model="formData.ecduUnitName" placeholder="单元名称" />
        </el-form-item>

        <el-form-item label="额定电流（A）" prop="ecduRatedCurrent">
          <el-input v-model="formData.ecduRatedCurrent" placeholder="额定电流（A）" />
        </el-form-item>

        <el-form-item label="额定电压（V）" prop="ecduRatedVoltage">
          <el-input v-model="formData.ecduRatedVoltage" placeholder="额定电压（V）" />
        </el-form-item>

        <el-form-item label="开关型号" prop="ecduSwitchModel">
          <el-input v-model="formData.ecduSwitchModel" placeholder="开关型号" />
        </el-form-item>

        <el-form-item label="开关厂家" prop="ecduSwitchManufacturer">
          <el-input v-model="formData.ecduSwitchManufacturer" placeholder="开关厂家" />
        </el-form-item>

        <el-form-item label="整定电流（A）" prop="ecduSettingCurrent">
          <el-input v-model="formData.ecduSettingCurrent" placeholder="整定电流（A）" />
        </el-form-item>

        <el-form-item label="对应负载" prop="ecduCorrespondingLoad">
          <el-input v-model="formData.ecduCorrespondingLoad" placeholder="对应负载" />
        </el-form-item>

        <el-form-item label="安装位置" prop="ecduInstallLocation">
          <el-input v-model="formData.ecduInstallLocation" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="单元状态" prop="ecduUnitStatus">
          <el-input v-model="formData.ecduUnitStatus" placeholder="单元状态" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="ecduFactory">
          <el-input v-model="formData.ecduFactory" placeholder="所属工厂" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ElectricCabinetDrawerUnit",
  inheritAttrs: false,
});

import ElectricCabinetDrawerUnitAPI, {
  ElectricCabinetDrawerUnitPageVO,
  ElectricCabinetDrawerUnitForm,
  ElectricCabinetDrawerUnitPageQuery,
} from "@/api/ledger/electric-cabinet-drawer-unit-api";

const queryFormRef = ref();
const dataFormRef = ref();
const importDialogVisible = ref(false);
const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<ElectricCabinetDrawerUnitPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 抽屉柜抽屉单元明细表格数据
const pageData = ref<ElectricCabinetDrawerUnitPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 抽屉柜抽屉单元明细表单数据
const formData = reactive<ElectricCabinetDrawerUnitForm>({});

// 抽屉柜抽屉单元明细表单校验规
// 则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  ecduDrawerNo: [{ required: true, message: "请输入抽屉编号", trigger: "blur" }],
  ecduRatedCurrent: [{ required: true, message: "请输入额定电流（A）", trigger: "blur" }],
  ecduRatedVoltage: [{ required: true, message: "请输入额定电压（V）", trigger: "blur" }],
});

/** 查询抽屉柜抽屉单元明细 */
function handleQuery() {
  loading.value = true;
  ElectricCabinetDrawerUnitAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置抽屉柜抽屉单元明细查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开抽屉柜抽屉单元明细弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改抽屉柜抽屉单元明细";
    ElectricCabinetDrawerUnitAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增抽屉柜抽屉单元明细";
  }
}

/** 提交抽屉柜抽屉单元明细表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricCabinetDrawerUnitAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricCabinetDrawerUnitAPI.create(formData)
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

/** 关闭抽屉柜抽屉单元明细弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除抽屉柜抽屉单元明细 */
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
      ElectricCabinetDrawerUnitAPI.deleteByIds(ids)
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
  importDialogVisible.value = false;
  ElMessage.success("导入成功");
};
const handleExport = () => {
  ElectricCabinetDrawerUnitAPI.export({
    ecduUnitName: queryParams.ecduUnitName,
    ecduSwitchModel: queryParams.ecduSwitchModel,
    ecduUnitStatus: queryParams.ecduUnitStatus,
    ecduFactory: queryParams.ecduFactory,
  }).then((response) => {
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
