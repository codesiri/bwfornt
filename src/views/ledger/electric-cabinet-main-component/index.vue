<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="元器件名称" prop="ecmComponentName">
          <el-input
            v-model="queryParams.ecmComponentName"
            placeholder="元器件名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="生产厂家" prop="ecmManufacturer">
          <el-input
            v-model="queryParams.ecmManufacturer"
            placeholder="生产厂家"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="	出厂编号" prop="ecmFactoryNo">
          <el-input
            v-model="queryParams.ecmFactoryNo"
            placeholder="	出厂编号"
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
      <div class="mb-10px">
        <el-button
          v-hasPerm="['ledger:electric-cabinet-main-component:add']"
          type="success"
          icon="plus"
          @click="handleOpenDialog()"
        >
          新增
        </el-button>
        <el-button
          v-hasPerm="['ledger:electric-cabinet-main-component:delete']"
          type="danger"
          :disabled="removeIds.length === 0"
          icon="delete"
          @click="handleDelete()"
        >
          删除
        </el-button>
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
        <el-table-column key="id" label="序号" prop="id" min-width="150" align="center" />
        <el-table-column
          key="ecmComponentName"
          label="元器件名称"
          prop="ecmComponentName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmSpecModel"
          label="规格型号"
          prop="ecmSpecModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmManufacturer"
          label="生产厂家"
          prop="ecmManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmFactoryNo"
          label="	出厂编号"
          prop="ecmFactoryNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmInstallLocation"
          label="安装位置"
          prop="ecmInstallLocation"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmCommissioningDate"
          label="投运日期"
          prop="ecmCommissioningDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmRatedParameters"
          label="额定参数"
          prop="ecmRatedParameters"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmFactory"
          label="所属工厂"
          prop="ecmFactory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmReserve1"
          label="备用1"
          prop="ecmReserve1"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmReserve2"
          label="备用2"
          prop="ecmReserve2"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="ecmReserve3"
          label="备用3"
          prop="ecmReserve3"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:electric-cabinet-main-component:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:electric-cabinet-main-component:delete']"
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

    <!-- 抽屉柜主要元器件信息表单弹窗 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="序号" prop="id">
          <el-input v-model="formData.id" placeholder="序号" />
        </el-form-item>

        <el-form-item label="元器件名称" prop="ecmComponentName">
          <el-input v-model="formData.ecmComponentName" placeholder="元器件名称" />
        </el-form-item>

        <el-form-item label="规格型号" prop="ecmSpecModel">
          <el-input v-model="formData.ecmSpecModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="ecmManufacturer">
          <el-input v-model="formData.ecmManufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="	出厂编号" prop="ecmFactoryNo">
          <el-input v-model="formData.ecmFactoryNo" placeholder="	出厂编号" />
        </el-form-item>

        <el-form-item label="安装位置" prop="ecmInstallLocation">
          <el-input v-model="formData.ecmInstallLocation" placeholder="安装位置" />
        </el-form-item>

        <el-form-item label="投运日期" prop="ecmCommissioningDate">
          <el-date-picker
            v-model="formData.ecmCommissioningDate"
            class="!w-[240px]"
            type="date"
            placeholder="投运日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="额定参数" prop="ecmRatedParameters">
          <el-input v-model="formData.ecmRatedParameters" placeholder="额定参数" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="ecmFactory">
          <el-input v-model="formData.ecmFactory" placeholder="所属工厂" />
        </el-form-item>

        <el-form-item label="备用1" prop="ecmReserve1">
          <el-input v-model="formData.ecmReserve1" placeholder="备用1" />
        </el-form-item>

        <el-form-item label="备用2" prop="ecmReserve2">
          <el-input v-model="formData.ecmReserve2" placeholder="备用2" />
        </el-form-item>

        <el-form-item label="备用3" prop="ecmReserve3">
          <el-input v-model="formData.ecmReserve3" placeholder="备用3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ElectricCabinetMainComponent",
  inheritAttrs: false,
});

import ElectricCabinetMainComponentAPI, {
  ElectricCabinetMainComponentPageVO,
  ElectricCabinetMainComponentForm,
  ElectricCabinetMainComponentPageQuery,
} from "@/api/ledger/electric-cabinet-main-component-api";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<ElectricCabinetMainComponentPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 抽屉柜主要元器件信息表格数据
const pageData = ref<ElectricCabinetMainComponentPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 抽屉柜主要元器件信息表单数据
const formData = reactive<ElectricCabinetMainComponentForm>({});

// 抽屉柜主要元器件信息表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
});

/** 查询抽屉柜主要元器件信息 */
function handleQuery() {
  loading.value = true;
  ElectricCabinetMainComponentAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置抽屉柜主要元器件信息查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开抽屉柜主要元器件信息弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改抽屉柜主要元器件信息";
    ElectricCabinetMainComponentAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增抽屉柜主要元器件信息";
  }
}

/** 提交抽屉柜主要元器件信息表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElectricCabinetMainComponentAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElectricCabinetMainComponentAPI.create(formData)
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

/** 关闭抽屉柜主要元器件信息弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除抽屉柜主要元器件信息 */
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
      ElectricCabinetMainComponentAPI.deleteByIds(ids)
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

onMounted(() => {
  handleQuery();
});
</script>
