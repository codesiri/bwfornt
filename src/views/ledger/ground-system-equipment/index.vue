<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="接地编号" prop="gseGroundCode">
          <el-input
            v-model="queryParams.gseGroundCode"
            placeholder="接地编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="接地类型" prop="gseGroundType">
          <el-input
            v-model="queryParams.gseGroundType"
            placeholder="接地类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="安装位置" prop="gseInstallArea">
          <el-input
            v-model="queryParams.gseInstallArea"
            placeholder="安装位置"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="安装区域及危险等级" prop="gseInstallPosition">
          <el-input
            v-model="queryParams.gseInstallPosition"
            placeholder="安装区域及危险等级"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="上次接地电阻测试日期" prop="gseLastTestDate">
          <el-date-picker
            v-model="queryParams.gseLastTestDate"
            class="!w-[240px]"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="上次测试电阻值（Ω）" prop="gseLastTestData">
          <el-input
            v-model="queryParams.gseLastTestData"
            placeholder="上次测试电阻值（Ω）"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="下次测试日期" prop="gseNextTestDate">
          <el-date-picker
            v-model="queryParams.gseNextTestDate"
            class="!w-[240px]"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="测试人员" prop="gseTestPerson">
          <el-input
            v-model="queryParams.gseTestPerson"
            placeholder="测试人员"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="安装日期" prop="gseInstallDate">
          <el-date-picker
            v-model="queryParams.gseInstallDate"
            class="!w-[240px]"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="接地状态" prop="gseStatus">
          <el-input
            v-model="queryParams.gseStatus"
            placeholder="接地状态"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="gseFactory">
          <el-input
            v-model="queryParams.gseFactory"
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
            v-hasPerm="['ledger:ground-system-equipment:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
        </div>
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
          key="gseGroundCode"
          label="接地编号"
          prop="gseGroundCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseGroundType"
          label="接地类型"
          prop="gseGroundType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseGroundStruct"
          label="接地结构"
          prop="gseGroundStruct"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseMaterial"
          label="材质"
          prop="gseMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseInstallArea"
          label="安装位置"
          prop="gseInstallArea"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseInstallPosition"
          label="安装区域及危险等级"
          prop="gseInstallPosition"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseDesignResistance"
          label="设计接地电阻值（Ω）"
          prop="gseDesignResistance"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseLastTestDate"
          label="上次接地电阻测试日期"
          prop="gseLastTestDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseLastTestData"
          label="上次测试电阻值（Ω）"
          prop="gseLastTestData"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseNextTestDate"
          label="下次测试日期"
          prop="gseNextTestDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseTestPerson"
          label="测试人员"
          prop="gseTestPerson"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseInstallDate"
          label="安装日期"
          prop="gseInstallDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseStatus"
          label="接地状态"
          prop="gseStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="gseFactory"
          label="所属工厂"
          prop="gseFactory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:ground-system-equipment:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:ground-system-equipment:delete']"
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

    <!-- 电器接地系统表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="接地编号" prop="gseGroundCode">
          <el-input v-model="formData.gseGroundCode" placeholder="接地编号" />
        </el-form-item>

        <el-form-item label="接地类型" prop="gseGroundType">
          <el-input v-model="formData.gseGroundType" placeholder="接地类型" />
        </el-form-item>

        <el-form-item label="接地结构" prop="gseGroundStruct">
          <el-input v-model="formData.gseGroundStruct" placeholder="接地结构" />
        </el-form-item>

        <el-form-item label="材质" prop="gseMaterial">
          <el-input v-model="formData.gseMaterial" placeholder="材质" />
        </el-form-item>

        <el-form-item label="安装位置" prop="gseInstallArea">
          <el-input v-model="formData.gseInstallArea" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="安装区域及危险等级" prop="gseInstallPosition">
          <el-input v-model="formData.gseInstallPosition" placeholder="安装区域及危险等级" />
        </el-form-item>

        <el-form-item label="设计接地电阻值（Ω）" prop="gseDesignResistance">
          <el-input v-model="formData.gseDesignResistance" placeholder="设计接地电阻值（Ω）" />
        </el-form-item>

        <el-form-item label="上次接地电阻测试日期" prop="gseLastTestDate">
          <el-date-picker
            v-model="formData.gseLastTestDate"
            class="!w-[240px]"
            type="date"
            placeholder="上次接地电阻测试日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="上次测试电阻值（Ω）" prop="gseLastTestData">
          <el-input v-model="formData.gseLastTestData" placeholder="上次测试电阻值（Ω）" />
        </el-form-item>

        <el-form-item label="下次测试日期" prop="gseNextTestDate">
          <el-date-picker
            v-model="formData.gseNextTestDate"
            class="!w-[240px]"
            type="date"
            placeholder="下次测试日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="测试人员" prop="gseTestPerson">
          <el-input v-model="formData.gseTestPerson" placeholder="测试人员" />
        </el-form-item>

        <el-form-item label="安装日期" prop="gseInstallDate">
          <el-date-picker
            v-model="formData.gseInstallDate"
            class="!w-[240px]"
            type="date"
            placeholder="安装日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="接地状态" prop="gseStatus">
          <el-input v-model="formData.gseStatus" placeholder="接地状态" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="gseFactory">
          <el-input v-model="formData.gseFactory" placeholder="所属工厂" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <import-data v-model="importDialogVisible"></import-data>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "GroundSystemEquipment",
  inheritAttrs: false,
});

import GroundSystemEquipmentAPI, {
  GroundSystemEquipmentPageVO,
  GroundSystemEquipmentForm,
  GroundSystemEquipmentPageQuery,
} from "@/api/ledger/ground-system-equipment-api";
import importData from "./import-data.vue";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const queryParams = reactive<GroundSystemEquipmentPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 电器接地系统表格数据
const pageData = ref<GroundSystemEquipmentPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 电器接地系统表单数据
const formData = reactive<GroundSystemEquipmentForm>({});

// 电器接地系统表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  gseGroundCode: [{ required: true, message: "请输入接地编号", trigger: "blur" }],
  gseGroundType: [{ required: true, message: "请输入接地类型", trigger: "blur" }],
  gseGroundStruct: [{ required: true, message: "请输入接地结构", trigger: "blur" }],
  gseMaterial: [{ required: true, message: "请输入材质", trigger: "blur" }],
  gseInstallArea: [{ required: true, message: "请输入安装位置", trigger: "blur" }],
  gseInstallPosition: [{ required: true, message: "请输入安装区域及危险等级", trigger: "blur" }],
  gseDesignResistance: [{ required: true, message: "请输入设计接地电阻值（Ω）", trigger: "blur" }],
  gseLastTestDate: [{ required: true, message: "请输入上次接地电阻测试日期", trigger: "blur" }],
  gseLastTestData: [{ required: true, message: "请输入上次测试电阻值（Ω）", trigger: "blur" }],
  gseInstallDate: [{ required: true, message: "请输入安装日期", trigger: "blur" }],
  gseStatus: [{ required: true, message: "请输入接地状态", trigger: "blur" }],
  gseFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询电器接地系统 */
function handleQuery() {
  loading.value = true;
  GroundSystemEquipmentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置电器接地系统查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开电器接地系统弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  console.log(id);
  if (id) {
    dialog.title = "修改电器接地系统";
    GroundSystemEquipmentAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增电器接地系统";
  }
}

/** 提交电器接地系统表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        GroundSystemEquipmentAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        GroundSystemEquipmentAPI.create(formData)
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

/** 关闭电器接地系统弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除电器接地系统 */
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
      GroundSystemEquipmentAPI.deleteByIds(ids)
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
const handleExport = () => {
  GroundSystemEquipmentAPI.export({
    gseGroundCode: queryParams.gseGroundCode,
    gseGroundType: queryParams.gseGroundType,
    gseInstallArea: queryParams.gseInstallArea,
    gseInstallPosition: queryParams.gseInstallPosition,
    gseLastTestDate: queryParams.gseLastTestDate,
    gseLastTestData: queryParams.gseLastTestData,
    gseNextTestDate: queryParams.gseNextTestDate,
    gseTestPerson: queryParams.gseTestPerson,
    gseInstallDate: queryParams.gseInstallDate,
    gseStatus: queryParams.gseStatus,
    gseFactory: queryParams.gseFactory,
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
const handleOpenImportDialog = () => {
  importDialogVisible.value = true;
};
onMounted(() => {
  handleQuery();
});
</script>
