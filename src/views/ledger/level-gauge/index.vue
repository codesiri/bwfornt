<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="位号" prop="levelTag">
          <el-input
            v-model="queryParams.levelTag"
            placeholder="位号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备名称（液位计）" prop="levelEquip">
          <el-input
            v-model="queryParams.levelEquip"
            placeholder="设备名称（液位计）"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="是否联锁（是 / 否）" prop="levelInterlock">
          <Dict v-model="queryParams.levelInterlock" code="interlocked" />
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
      <div class="data-table__toolbar">
        <div class="data-table__toolbar--actions">
          <el-button
            v-hasPerm="['ledger:unit-special-instruments:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
          <el-button
            v-hasPerm="['ledger:unit-special-instruments:delete']"
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
      >
        <el-table-column
          key="levelTag"
          label="位号"
          prop="levelTag"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelDevice"
          label="装置名称"
          prop="levelDevice"
          min-width="150"
          align="center"
        />

        <el-table-column
          key="levelLocation"
          label="安装位置及用途"
          prop="levelLocation"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelEquip"
          label="设备名称（液位计）"
          prop="levelEquip"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelModel"
          label="规格型号"
          prop="levelModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelManu"
          label="生产厂家"
          prop="levelManu"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelMedium"
          label="介质"
          prop="levelMedium"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelRange"
          label="测量范围"
          prop="levelRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelAccuracy"
          label="精度"
          prop="levelAccuracy"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelPower"
          label="电源"
          prop="levelPower"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelOutput"
          label="输出信号"
          prop="levelOutput"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelConnection"
          label="连接方式及规格"
          prop="levelConnection"
          min-width="150"
          align="center"
        />
        <el-table-column label="是否联锁（是 / 否）" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.levelInterlock" code="interlocked" />
          </template>
        </el-table-column>
        <el-table-column
          key="levelInterlockVal"
          label="联锁设定值"
          prop="levelInterlockVal"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="levelRemark"
          label="备注"
          prop="levelRemark"
          min-width="150"
          align="center"
        />
        <el-table-column key="status" label="设备状态" prop="status" min-width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.status" code="status"></DictLabel>
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
              v-hasPerm="['ledger:level-gauge:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:level-gauge:delete']"
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

    <!-- 液位计表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="位号" prop="levelTag">
          <el-input v-model="formData.levelTag" placeholder="位号" />
        </el-form-item>

        <el-form-item label="装置名称" prop="levelDevice">
          <el-input v-model="formData.levelDevice" placeholder="装置名称" />
        </el-form-item>

        <el-form-item label="安装位置及用途" prop="levelLocation">
          <el-input v-model="formData.levelLocation" placeholder="安装位置及用途" />
        </el-form-item>

        <el-form-item label="设备名称（液位计）" prop="levelEquip">
          <el-input v-model="formData.levelEquip" placeholder="设备名称（液位计）" />
        </el-form-item>

        <el-form-item label="规格型号" prop="levelModel">
          <el-input v-model="formData.levelModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="levelManu">
          <el-input v-model="formData.levelManu" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="介质" prop="levelMedium">
          <el-input v-model="formData.levelMedium" placeholder="介质" />
        </el-form-item>

        <el-form-item label="测量范围" prop="levelRange">
          <el-input v-model="formData.levelRange" placeholder="测量范围" />
        </el-form-item>

        <el-form-item label="精度" prop="levelAccuracy">
          <el-input v-model="formData.levelAccuracy" placeholder="精度" />
        </el-form-item>

        <el-form-item label="电源" prop="levelPower">
          <el-input v-model="formData.levelPower" placeholder="电源" />
        </el-form-item>

        <el-form-item label="输出信号" prop="levelOutput">
          <el-input v-model="formData.levelOutput" placeholder="输出信号" />
        </el-form-item>

        <el-form-item label="连接方式及规格" prop="levelConnection">
          <el-input v-model="formData.levelConnection" placeholder="连接方式及规格" />
        </el-form-item>

        <el-form-item label="是否联锁（是 / 否）" prop="levelInterlock">
          <Dict v-model="formData.levelInterlock" code="interlocked" />
        </el-form-item>

        <el-form-item label="联锁设定值" prop="levelInterlockVal">
          <el-input v-model="formData.levelInterlockVal" placeholder="联锁设定值" />
        </el-form-item>

        <el-form-item label="备注" prop="levelRemark">
          <el-input v-model="formData.levelRemark" placeholder="备注" />
        </el-form-item>

        <el-form-item label="设备状态" prop="status">
          <el-input v-model="formData.status" placeholder="设备状态" />
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
    <import-data v-model="importDialogVisible"></import-data>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "LevelGauge",
  inheritAttrs: false,
});

import LevelGaugeAPI, {
  LevelGaugePageVO,
  LevelGaugeForm,
  LevelGaugePageQuery,
} from "@/api/ledger/level-gauge-api";
import importData from "./import-data.vue";
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const queryParams = reactive<LevelGaugePageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 液位计表格数据
const pageData = ref<LevelGaugePageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 液位计表单数据
const formData = reactive<LevelGaugeForm>({});

// 液位计表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  levelDevice: [{ required: true, message: "请输入装置名称", trigger: "blur" }],
  levelTag: [{ required: true, message: "请输入位号", trigger: "blur" }],
  levelLocation: [{ required: true, message: "请输入安装位置及用途", trigger: "blur" }],
  levelEquip: [{ required: true, message: "请输入设备名称（液位计）", trigger: "blur" }],
  levelModel: [{ required: true, message: "请输入规格型号", trigger: "blur" }],
  levelManu: [{ required: true, message: "请输入生产厂家", trigger: "blur" }],
  levelMedium: [{ required: true, message: "请输入介质", trigger: "blur" }],
  levelRange: [{ required: true, message: "请输入测量范围", trigger: "blur" }],
  levelConnection: [{ required: true, message: "请输入连接方式及规格", trigger: "blur" }],
  levelInterlock: [{ required: true, message: "请输入是否联锁（是 / 否）", trigger: "blur" }],
  levelInterlockVal: [{ required: true, message: "请输入联锁设定值", trigger: "blur" }],
  status: [{ required: true, message: "请输入设备状态", trigger: "blur" }],
  dvType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
});

/** 查询液位计 */
function handleQuery() {
  loading.value = true;
  LevelGaugeAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置液位计查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}
function handleOpenDialog(id?: number) {
  console.log(id);
  dialog.visible = true;
  if (id) {
    dialog.title = "修改液位计";
    LevelGaugeAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增液位计";
  }
}

/** 提交液位计表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        LevelGaugeAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        LevelGaugeAPI.create(formData)
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

/** 关闭液位计弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除液位计 */
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
      LevelGaugeAPI.deleteByIds(ids)
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
  LevelGaugeAPI.export({
    levelTag: queryParams.levelTag,
    levelEquip: queryParams.levelEquip,
    levelInterlock: queryParams.levelInterlock,
    dvType: queryParams.dvType,
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
