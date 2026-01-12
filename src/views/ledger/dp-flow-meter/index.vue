<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="位号" prop="dpFlowTag">
          <el-input
            v-model="queryParams.dpFlowTag"
            placeholder="位号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="是否伴热（是 / 否）" prop="dpFlowHeat">
          <Dict v-model="queryParams.dpFlowHeat" code="heat" />
        </el-form-item>
        <el-form-item label="是否联锁（是 / 否）" prop="dpFlowInterlock">
          <Dict v-model="queryParams.dpFlowInterlock" code="interlocked" />
        </el-form-item>
        <el-form-item label="设备编码" prop="dvCode">
          <el-input
            v-model="queryParams.dvCode"
            placeholder="设备编码"
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
          v-hasPerm="['ledger:dp-flow-meter:add']"
          type="success"
          icon="plus"
          @click="handleOpenDialog()"
        >
          新增
        </el-button>
        <el-button
          v-hasPerm="['ledger:dp-flow-meter:delete']"
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
          key="dpFlowDevice"
          label="装置名称"
          prop="dpFlowDevice"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowTag"
          label="位号"
          prop="dpFlowTag"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowLocation"
          label="安装位置及用途"
          prop="dpFlowLocation"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowEquip"
          label="设备名称（差压流量计）"
          prop="dpFlowEquip"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowModel"
          label="规格型号"
          prop="dpFlowModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowManu"
          label="生产厂家"
          prop="dpFlowManu"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowRange"
          label="量程"
          prop="dpFlowRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowMeasRange"
          label="测量范围"
          prop="dpFlowMeasRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowMedName"
          label="介质名称"
          prop="dpFlowMedName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowMedTemp"
          label="介质设计温度"
          prop="dpFlowMedTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowMedPress"
          label="介质设计力（MPa）"
          prop="dpFlowMedPress"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowConnection"
          label="连接方式及规格"
          prop="dpFlowConnection"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowAccuracy"
          label="精度"
          prop="dpFlowAccuracy"
          min-width="150"
          align="center"
        />
        <el-table-column label="是否伴热（是 / 否）" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.dpFlowHeat" code="heat" />
          </template>
        </el-table-column>
        <el-table-column label="是否联锁（是 / 否）" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.dpFlowInterlock" code="interlocked" />
          </template>
        </el-table-column>
        <el-table-column
          key="dpFlowInterlockVal"
          label="联锁设定值"
          prop="dpFlowInterlockVal"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dpFlowRemark"
          label="备注"
          prop="dpFlowRemark"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dvCode"
          label="设备编码"
          prop="dvCode"
          min-width="150"
          align="center"
        />
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
              v-hasPerm="['ledger:dp-flow-meter:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:dp-flow-meter:delete']"
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

    <!-- 差压流量计表单弹窗 -->
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

        <el-form-item label="装置名称" prop="dpFlowDevice">
          <el-input v-model="formData.dpFlowDevice" placeholder="装置名称" />
        </el-form-item>

        <el-form-item label="位号" prop="dpFlowTag">
          <el-input v-model="formData.dpFlowTag" placeholder="位号" />
        </el-form-item>

        <el-form-item label="安装位置及用途" prop="dpFlowLocation">
          <el-input v-model="formData.dpFlowLocation" placeholder="安装位置及用途" />
        </el-form-item>

        <el-form-item label="设备名称（差压流量计）" prop="dpFlowEquip">
          <el-input v-model="formData.dpFlowEquip" placeholder="设备名称（差压流量计）" />
        </el-form-item>

        <el-form-item label="规格型号" prop="dpFlowModel">
          <el-input v-model="formData.dpFlowModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="dpFlowManu">
          <el-input v-model="formData.dpFlowManu" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="量程" prop="dpFlowRange">
          <el-input v-model="formData.dpFlowRange" placeholder="量程" />
        </el-form-item>

        <el-form-item label="测量范围" prop="dpFlowMeasRange">
          <el-input v-model="formData.dpFlowMeasRange" placeholder="测量范围" />
        </el-form-item>

        <el-form-item label="介质名称" prop="dpFlowMedName">
          <el-input v-model="formData.dpFlowMedName" placeholder="介质名称" />
        </el-form-item>

        <el-form-item label="介质设计温度" prop="dpFlowMedTemp">
          <el-input v-model="formData.dpFlowMedTemp" placeholder="介质设计温度" />
        </el-form-item>

        <el-form-item label="介质设计力（MPa）" prop="dpFlowMedPress">
          <el-input v-model="formData.dpFlowMedPress" placeholder="介质设计力（MPa）" />
        </el-form-item>

        <el-form-item label="连接方式及规格" prop="dpFlowConnection">
          <el-input v-model="formData.dpFlowConnection" placeholder="连接方式及规格" />
        </el-form-item>

        <el-form-item label="精度" prop="dpFlowAccuracy">
          <el-input v-model="formData.dpFlowAccuracy" placeholder="精度" />
        </el-form-item>

        <el-form-item label="是否伴热（是 / 否）" prop="dpFlowHeat">
          <Dict v-model="formData.dpFlowHeat" code="heat" />
        </el-form-item>

        <el-form-item label="是否联锁（是 / 否）" prop="dpFlowInterlock">
          <Dict v-model="formData.dpFlowInterlock" code="interlocked" />
        </el-form-item>

        <el-form-item label="联锁设定值" prop="dpFlowInterlockVal">
          <el-input v-model="formData.dpFlowInterlockVal" placeholder="联锁设定值" />
        </el-form-item>

        <el-form-item label="备注" prop="dpFlowRemark">
          <el-input v-model="formData.dpFlowRemark" placeholder="备注" />
        </el-form-item>

        <el-form-item label="设备编码" prop="dvCode">
          <el-input v-model="formData.dvCode" placeholder="设备编码" />
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
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "DpFlowMeter",
  inheritAttrs: false,
});

import DpFlowMeterAPI, {
  DpFlowMeterPageVO,
  DpFlowMeterForm,
  DpFlowMeterPageQuery,
} from "@/api/ledger/dp-flow-meter-api";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<DpFlowMeterPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 差压流量计表格数据
const pageData = ref<DpFlowMeterPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 差压流量计表单数据
const formData = reactive<DpFlowMeterForm>({});

// 差压流量计表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  dpFlowDevice: [{ required: true, message: "请输入装置名称", trigger: "blur" }],
  dpFlowTag: [{ required: true, message: "请输入位号", trigger: "blur" }],
  dvType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
});

/** 查询差压流量计 */
function handleQuery() {
  loading.value = true;
  DpFlowMeterAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置差压流量计查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开差压流量计弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改差压流量计";
    DpFlowMeterAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增差压流量计";
  }
}

/** 提交差压流量计表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        DpFlowMeterAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        DpFlowMeterAPI.create(formData)
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

/** 关闭差压流量计弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除差压流量计 */
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
      DpFlowMeterAPI.deleteByIds(ids)
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
