<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="设备名称" prop="staticEquipName">
          <el-input
            v-model="queryParams.staticEquipName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="位号" prop="staticEquipTag">
          <el-input
            v-model="queryParams.staticEquipTag"
            placeholder="位号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <Dict v-model="queryParams.status" code="status" />
        </el-form-item>
        <el-form-item label="设备编码" prop="dvCode">
          <el-input
            v-model="queryParams.dvCode"
            placeholder="设备编码"
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
            v-hasPerm="['ledger:static-equip:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
        </div>
        <div class="data-table__toolbar--tools">
          <el-button
            v-hasPerm="'ledger:pressure-instrument:import'"
            icon="upload"
            @click="handleOpenImportDialog"
          >
            导入
          </el-button>

          <el-button
            v-hasPerm="'ledger:pressure-instrument:export'"
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
        <el-table-column
          key="staticEquipName"
          label="设备名称"
          prop="staticEquipName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipTag"
          label="位号"
          prop="staticEquipTag"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipLoc"
          label="所处位置"
          prop="staticEquipLoc"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipOpTemp"
          label="操作温度"
          prop="staticEquipOpTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipOpPress"
          label="操作压力"
          prop="staticEquipOpPress"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipMed"
          label="介质"
          prop="staticEquipMed"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipFactoryNo"
          label="出厂编号"
          prop="staticEquipFactoryNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipCategory"
          label="类别"
          prop="staticEquipCategory"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipWeght"
          label="重量（kg）"
          prop="staticEquipWeght"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipInspestDate"
          label="检验日期"
          prop="staticEquipInspestDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="staticEquipNextInspestDate"
          label="下次检验日期"
          prop="staticEquipNextInspestDate"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.status" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="dvCode"
          label="设备编码"
          prop="dvCode"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:static-equip:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:static-equip:delete']"
              type="danger"
              size="small"
              link
              icon="delete"
              @click="handleDelete(scope.row)"
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

    <!-- 静设备表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="位号" prop="staticEquipTag">
          <el-input v-model="formData.staticEquipTag" placeholder="位号" />
        </el-form-item>
        <el-form-item label="设备名称" prop="staticEquipName">
          <el-input v-model="formData.staticEquipName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="所处位置" prop="staticEquipLoc">
          <el-input v-model="formData.staticEquipLoc" placeholder="所处位置" />
        </el-form-item>

        <el-form-item label="操作温度" prop="staticEquipOpTemp">
          <el-input v-model="formData.staticEquipOpTemp" placeholder="操作温度" />
        </el-form-item>

        <el-form-item label="操作压力" prop="staticEquipOpPress">
          <el-input v-model="formData.staticEquipOpPress" placeholder="操作压力" />
        </el-form-item>

        <el-form-item label="介质" prop="staticEquipMed">
          <el-input v-model="formData.staticEquipMed" placeholder="介质" />
        </el-form-item>

        <el-form-item label="出厂编号" prop="staticEquipFactoryNo">
          <el-input v-model="formData.staticEquipFactoryNo" placeholder="出厂编号" />
        </el-form-item>

        <el-form-item label="类别" prop="staticEquipCategory">
          <el-input v-model="formData.staticEquipCategory" placeholder="类别" />
        </el-form-item>

        <el-form-item label="重量（kg）" prop="staticEquipWeght">
          <el-input v-model="formData.staticEquipWeght" placeholder="重量（kg）" />
        </el-form-item>

        <el-form-item label="检验日期" prop="staticEquipInspestDate">
          <el-date-picker
            v-model="formData.staticEquipInspestDate"
            type="datetime"
            placeholder="检验日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="下次检验日期" prop="staticEquipNextInspestDate">
          <el-date-picker
            v-model="formData.staticEquipNextInspestDate"
            type="datetime"
            placeholder="下次检验日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="设备状态" prop="status">
          <Dict v-model="formData.status" code="status" />
        </el-form-item>

        <el-form-item label="设备编码" prop="dvCode">
          <el-input v-model="formData.dvCode" placeholder="设备编码" />
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
  name: "StaticEquip",
  inheritAttrs: false,
});

import StaticEquipAPI, {
  StaticEquipPageVO,
  StaticEquipForm,
  StaticEquipPageQuery,
} from "@/api/ledger/static-equip-api";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<StaticEquipPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 静设备表格数据
const pageData = ref<StaticEquipPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 静设备表单数据
const formData = reactive<StaticEquipForm>({});

// 静设备表单校验规则
const rules = reactive({
  staticEquipName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  staticEquipTag: [{ required: true, message: "请输入位号", trigger: "blur" }],
  status: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
  dvCode: [{ required: true, message: "请输入设备编码", trigger: "blur" }],
});

/** 查询静设备 */
function handleQuery() {
  loading.value = true;
  StaticEquipAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置静设备查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

function resetFormDataFileds() {
  formData.id = undefined;
  formData.dvCode = undefined;
  formData.staticEquipCategory = undefined;
  formData.staticEquipFactoryNo = undefined;
  formData.staticEquipInspestDate = undefined;
  formData.staticEquipLoc = undefined;
  formData.staticEquipMed = undefined;
  formData.staticEquipName = undefined;
  formData.staticEquipNextInspestDate = undefined;
  formData.staticEquipOpPress = undefined;
  formData.staticEquipOpTemp = undefined;
  formData.staticEquipTag = undefined;
  formData.staticEquipWeght = undefined;
  formData.status = 0;
  formData.dvCode = undefined;
}
/** 打开静设备弹窗 */
function handleOpenDialog(item?: any) {
  dialog.visible = true;
  if (item) {
    dialog.title = "修改静设备";
    Object.assign(formData, item);
  } else {
    resetFormDataFileds();
    dataFormRef.value.resetFields();
    dialog.title = "新增静设备";
  }
}

/** 提交静设备表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      console.log(id);
      if (id) {
        StaticEquipAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        StaticEquipAPI.create(formData)
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

/** 关闭静设备弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除静设备 */
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
      StaticEquipAPI.deleteByIds(ids)
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
const handleExport = () => {};
const handleOpenImportDialog = () => {};
</script>
