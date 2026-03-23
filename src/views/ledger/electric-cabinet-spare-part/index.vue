<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="备件名称" prop="ecspPartName">
          <el-input
            v-model="queryParams.ecspPartName"
            placeholder="备件名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="规格型号" prop="ecspSpecModel">
          <el-input
            v-model="queryParams.ecspSpecModel"
            placeholder="规格型号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="生产厂家" prop="ecspManufacturer">
          <el-input
            v-model="queryParams.ecspManufacturer"
            placeholder="生产厂家"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="入库日期" prop="ecspStockDate">
          <el-date-picker
            v-model="queryParams.ecspStockDate"
            class="!w-[240px]"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="领用日期" prop="ecspUsedDate">
          <el-date-picker
            v-model="queryParams.ecspUsedDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="领用人" prop="ecspUser">
          <el-input
            v-model="queryParams.ecspUser"
            placeholder="领用人"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="ecspFactory">
          <el-input
            v-model="queryParams.ecspFactory"
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
          v-hasPerm="['ledger:electric-cabinet-spare-part:add']"
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
          key="ecspPartName"
          label="备件名称"
          prop="ecspPartName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspSpecModel"
          label="规格型号"
          prop="ecspSpecModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspCorrespondingCabinet"
          label="对应柜体 / 抽屉"
          prop="ecspCorrespondingCabinet"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspRatedParameters"
          label="额定参数"
          prop="ecspRatedParameters"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspManufacturer"
          label="生产厂家"
          prop="ecspManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspStockQuantity"
          label="库存数量"
          prop="ecspStockQuantity"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspStockDate"
          label="入库日期"
          prop="ecspStockDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspUsedQuantity"
          label="领用数量"
          prop="ecspUsedQuantity"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspUsedDate"
          label="领用日期"
          prop="ecspUsedDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspUsedReason"
          label="领用原因"
          prop="ecspUsedReason"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspUser"
          label="领用人"
          prop="ecspUser"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspSupplementDate"
          label="补充日期"
          prop="ecspSupplementDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecspFactory"
          label="所属工厂"
          prop="ecspFactory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-cabinet-spare-part:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-cabinet-spare-part:delete']"
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

    <!-- 电器备品备件管理记录表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="序号" prop="id">
          <el-input v-model="formData.id" placeholder="序号" />
        </el-form-item>

        <el-form-item label="备件名称" prop="ecspPartName">
          <el-input v-model="formData.ecspPartName" placeholder="备件名称" />
        </el-form-item>

        <el-form-item label="规格型号" prop="ecspSpecModel">
          <el-input v-model="formData.ecspSpecModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="对应柜体 / 抽屉" prop="ecspCorrespondingCabinet">
          <el-input v-model="formData.ecspCorrespondingCabinet" placeholder="对应柜体 / 抽屉" />
        </el-form-item>

        <el-form-item label="额定参数" prop="ecspRatedParameters">
          <el-input v-model="formData.ecspRatedParameters" placeholder="额定参数" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="ecspManufacturer">
          <el-input v-model="formData.ecspManufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="库存数量" prop="ecspStockQuantity">
          <el-input v-model="formData.ecspStockQuantity" placeholder="库存数量" />
        </el-form-item>

        <el-form-item label="入库日期" prop="ecspStockDate">
          <el-date-picker
            v-model="formData.ecspStockDate"
            class="!w-[240px]"
            type="date"
            placeholder="入库日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="领用数量" prop="ecspUsedQuantity">
          <el-input v-model="formData.ecspUsedQuantity" placeholder="领用数量" />
        </el-form-item>

        <el-form-item label="领用日期" prop="ecspUsedDate">
          <el-date-picker
            v-model="formData.ecspUsedDate"
            type="datetime"
            placeholder="领用日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="领用原因" prop="ecspUsedReason">
          <el-input v-model="formData.ecspUsedReason" placeholder="领用原因" />
        </el-form-item>

        <el-form-item label="领用人" prop="ecspUser">
          <el-input v-model="formData.ecspUser" placeholder="领用人" />
        </el-form-item>

        <el-form-item label="补充日期" prop="ecspSupplementDate">
          <el-date-picker
            v-model="formData.ecspSupplementDate"
            class="!w-[240px]"
            type="date"
            placeholder="补充日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="所属工厂" prop="ecspFactory">
          <el-input v-model="formData.ecspFactory" placeholder="所属工厂" />
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
  name: "ElectricCabinetSparePart",
  inheritAttrs: false,
});

import ElectricCabinetSparePartAPI, {
  ElectricCabinetSparePartPageVO,
  ElectricCabinetSparePartForm,
  ElectricCabinetSparePartPageQuery,
} from "@/api/ledger/electric-cabinet-spare-part-api";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<ElectricCabinetSparePartPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 电器备品备件管理记录表格数据
const pageData = ref<ElectricCabinetSparePartPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 电器备品备件管理记录表单数据
const formData = reactive<ElectricCabinetSparePartForm>({});

// 电器备品备件管理记录表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  ecspPartName: [{ required: true, message: "请输入备件名称", trigger: "blur" }],
  ecspSpecModel: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  ecspStockQuantity: [{ required: true, message: "请输入库存数量", trigger: "blur" }],
  ecspStockDate: [{ required: true, message: "请输入入库日期", trigger: "blur" }],
  ecspFactory: [{ required: true, message: "请输入所属工厂", trigger: "blur" }],
});

/** 查询电器备品备件管理记录 */
function handleQuery() {
  loading.value = true;
  ElectricCabinetSparePartAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置电器备品备件管理记录查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开电器备品备件管理记录弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改电器备品备件管理记录";
    ElectricCabinetSparePartAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增电器备品备件管理记录";
  }
}

/** 提交电器备品备件管理记录表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricCabinetSparePartAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricCabinetSparePartAPI.create(formData)
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

/** 关闭电器备品备件管理记录弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除电器备品备件管理记录 */
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
      ElectricCabinetSparePartAPI.deleteByIds(ids)
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
  ElectricCabinetSparePartAPI.export({
    ecspPartName: queryParams.ecspPartName,
    ecspSpecModel: queryParams.ecspSpecModel,
    ecspManufacturer: queryParams.ecspManufacturer,
    ecspStockDate: queryParams.ecspStockDate,
    ecspUsedDate: queryParams.ecspUsedDate,
    ecspUser: queryParams.ecspUser,
    ecspFactory: queryParams.ecspFactory,
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
const handleOpenImportDialog = () => {};
onMounted(() => {
  handleQuery();
});
</script>
