<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="仪表位号" prop="tagNumber">
          <el-input
            v-model="queryParams.tagNumber"
            placeholder="仪表位号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="仪表名称" prop="instrumentName">
          <el-input
            v-model="queryParams.instrumentName"
            placeholder="仪表名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <Dict v-model="queryParams.status" code="status" />
        </el-form-item>
        <el-form-item label="设备类型" prop="dvType">
          <el-input
            v-model="queryParams.dvType"
            placeholder="设备类型"
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
          v-hasPerm="['ledger:dv-flowmetre-info:add']"
          type="success"
          icon="plus"
          @click="handleOpenDialog()"
        >
          新增
        </el-button>
        <el-button
          v-hasPerm="['ledger:dv-flowmetre-info:delete']"
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
        <el-table-column
          key="tagNumber"
          label="仪表位号"
          prop="tagNumber"
          min-width="150"
          align="center"
        />
        <el-table-column key="device" label="装置" prop="device" min-width="150" align="center" />
        <el-table-column key="purpose" label="用途" prop="purpose" min-width="150" align="center" />
        <el-table-column
          key="instrumentName"
          label="仪表名称"
          prop="instrumentName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="measurementRange"
          label="量程"
          prop="measurementRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="manufacturer"
          label="厂家"
          prop="manufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="medium"
          label="工艺介质-介质"
          prop="medium"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="mediumStatus"
          label="工艺介质-状态"
          prop="mediumStatus"
          min-width="150"
          align="center"
        >
          <template #default="scope">
            <DictLabel v-model="scope.row.mediumStatus" code="craft-status" />
          </template>
        </el-table-column>

        <el-table-column
          key="mediumPressure"
          label="工艺介质-压力"
          prop="mediumPressure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="mediumTemperature"
          label="工艺介质-温度"
          prop="mediumTemperature"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="factoryNumber"
          label="出厂编号"
          prop="factoryNumber"
          min-width="150"
          align="center"
        />
        <el-table-column key="remark" label="备注" prop="remark" min-width="150" align="center" />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.status" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="dvType"
          label="设备类型"
          prop="dvType"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:dv-flowmetre-info:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:dv-flowmetre-info:delete']"
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

    <!-- 流量计表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="仪表位号" prop="tagNumber">
          <el-input v-model="formData.tagNumber" placeholder="仪表位号" />
        </el-form-item>

        <el-form-item label="装置" prop="device">
          <el-input v-model="formData.device" placeholder="装置" />
        </el-form-item>

        <el-form-item label="用途" prop="purpose">
          <el-input v-model="formData.purpose" placeholder="用途" />
        </el-form-item>

        <el-form-item label="仪表名称" prop="instrumentName">
          <el-input v-model="formData.instrumentName" placeholder="仪表名称" />
        </el-form-item>

        <el-form-item label="量程" prop="measurementRange">
          <el-input v-model="formData.measurementRange" placeholder="量程" />
        </el-form-item>

        <el-form-item label="厂家" prop="manufacturer">
          <el-input v-model="formData.manufacturer" placeholder="厂家" />
        </el-form-item>

        <el-form-item label="工艺介质-介质" prop="medium">
          <el-input v-model="formData.medium" placeholder="工艺介质-介质" />
        </el-form-item>

        <el-form-item label="工艺介质-状态" prop="mediumStatus">
          <Dict v-model="formData.mediumStatus" code="craft-status" />
        </el-form-item>

        <el-form-item label="工艺介质-压力" prop="mediumPressure">
          <el-input v-model="formData.mediumPressure" placeholder="工艺介质-压力" />
        </el-form-item>

        <el-form-item label="工艺介质-温度" prop="mediumTemperature">
          <el-input v-model="formData.mediumTemperature" placeholder="工艺介质-温度" />
        </el-form-item>

        <el-form-item label="出厂编号" prop="factoryNumber">
          <el-input v-model="formData.factoryNumber" placeholder="出厂编号" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="备注" />
        </el-form-item>

        <el-form-item label="设备状态" prop="status">
          <Dict v-model="formData.status" code="status" />
        </el-form-item>

        <el-form-item label="设备类型" prop="dvType">
          <el-input v-model="formData.dvType" placeholder="设备类型" />
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
  name: "DvFlowmetreInfo",
  inheritAttrs: false,
});

import DvFlowmetreInfoAPI, {
  DvFlowmetreInfoPageVO,
  DvFlowmetreInfoForm,
  DvFlowmetreInfoPageQuery,
} from "@/api/ledger/dv-flowmetre-info-api";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<DvFlowmetreInfoPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 流量计表格数据
const pageData = ref<DvFlowmetreInfoPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 流量计表单数据
const formData = reactive<DvFlowmetreInfoForm>({});

// 流量计表单校验规则
const rules = reactive({
  tagNumber: [{ required: true, message: "请输入仪表位号", trigger: "blur" }],
  device: [{ required: true, message: "请输入装置", trigger: "blur" }],
  instrumentName: [{ required: true, message: "请输入仪表名称", trigger: "blur" }],
  medium: [{ required: true, message: "请输入工艺介质-介质", trigger: "blur" }],
  status: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
  dvType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
});

/** 查询流量计 */
function handleQuery() {
  loading.value = true;
  DvFlowmetreInfoAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置流量计查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开流量计弹窗 */
function handleOpenDialog(item?: any) {
  dialog.visible = true;
  if (item) {
    //证明是修改
    Object.assign(formData, item);
    dialog.title = "修改差压流量计";
  }
}

/** 提交流量计表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        DvFlowmetreInfoAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        DvFlowmetreInfoAPI.create(formData)
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

/** 关闭流量计弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除流量计 */
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
      DvFlowmetreInfoAPI.deleteByIds(ids)
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
