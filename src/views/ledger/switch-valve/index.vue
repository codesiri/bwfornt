<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="位号" prop="switchValveTag">
          <el-input
            v-model="queryParams.switchValveTag"
            placeholder="位号"
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
            placeholder="s设备类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="所属工厂" prop="factory">
          <el-input
            v-model="queryParams.factory"
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
            v-hasPerm="['ledger:switch-valve:add']"
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
          key="switchValveDevice"
          label="装置名称"
          prop="switchValveDevice"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveTag"
          label="位号"
          prop="switchValveTag"
          min-width="150"
          align="center"
        />
        <el-table-column label="设备状态" width="150" align="center">
          <template #default="scope">
            <DictLabel v-model="scope.row.status" code="status" />
          </template>
        </el-table-column>
        <el-table-column
          key="switchValveName"
          label="名称"
          prop="switchValveName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveModel"
          label="型号规格"
          prop="switchValveModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveManu"
          label="生产厂家"
          prop="switchValveManu"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveLocation"
          label="安装位置及用途"
          prop="switchValveLocation"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveMedName"
          label="介质名称"
          prop="switchValveMedName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveMedTemp"
          label="工艺条件 - 设计温度"
          prop="switchValveMedTemp"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveMedPress"
          label="工艺条件 - 阀前压力（MPa）"
          prop="switchValveMedPress"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValvePressAfter"
          label="工艺条件 - 阀后压力（MPa）"
          prop="switchValvePressAfter"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveMaterial"
          label="工艺条件 - 公称通径及材质"
          prop="switchValveMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveBodyMaterial"
          label="阀体 - 阀体材质"
          prop="switchValveBodyMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveSeatSn"
          label="阀座 - 序号"
          prop="switchValveSeatSn"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveSeatMaterial"
          label="阀座 - 材质"
          prop="switchValveSeatMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveCoreMaterial"
          label="阀芯 - 材质"
          prop="switchValveCoreMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveStemMaterial"
          label="阀杆 - 材质"
          prop="switchValveStemMaterial"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveFlowChar"
          label="阀内件 - 流量特性"
          prop="switchValveFlowChar"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveLeakClass"
          label="阀内件 - 泄漏等级"
          prop="switchValveLeakClass"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveActuatorType"
          label="执行机构 - 类型"
          prop="switchValveActuatorType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveActuatorModel"
          label="执行机构 - 形式规格"
          prop="switchValveActuatorModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveActuatorManu"
          label="执行机构 - 厂家"
          prop="switchValveActuatorManu"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveActuatorAction"
          label="执行机构 - 作用形式"
          prop="switchValveActuatorAction"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveActuatorStroke"
          label="执行机构 - 行程"
          prop="switchValveActuatorStroke"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveSpringRange"
          label="执行机构 - 弹簧范围"
          prop="switchValveSpringRange"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveAirPress"
          label="执行机构 - 气源压力"
          prop="switchValveAirPress"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveFaultPos"
          label="执行机构 - 故障位置"
          prop="switchValveFaultPos"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveCloseTime"
          label="执行机构 - 关闭时间"
          prop="switchValveCloseTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveOpenTime"
          label="执行机构 - 开启时间"
          prop="switchValveOpenTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="switchValveRemark"
          label="备注"
          prop="switchValveRemark"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="dvType"
          label="s设备类型"
          prop="dvType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="factory"
          label="所属工厂"
          prop="factory"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:switch-valve:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:switch-valve:delete']"
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

    <!-- 开关阀表单弹窗 -->
    <el-drawer
      v-model="dialog.visible"
      :close-on-click-modal="false"
      :modal="true"
      :resizable="true"
      :size="'50%'"
      :with-header="false"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="150px">
        <el-form-item label="装置名称" prop="switchValveDevice">
          <el-input v-model="formData.switchValveDevice" placeholder="装置名称" />
        </el-form-item>

        <el-form-item label="位号" prop="switchValveTag">
          <el-input v-model="formData.switchValveTag" placeholder="位号" />
        </el-form-item>

        <el-form-item label="设备状态" prop="status">
          <Dict v-model="formData.status" code="status" />
        </el-form-item>

        <el-form-item label="名称" prop="switchValveName">
          <el-input v-model="formData.switchValveName" placeholder="名称" />
        </el-form-item>

        <el-form-item label="型号规格" prop="switchValveModel">
          <el-input v-model="formData.switchValveModel" placeholder="型号规格" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="switchValveManu">
          <el-input v-model="formData.switchValveManu" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="安装位置及用途" prop="switchValveLocation">
          <el-input v-model="formData.switchValveLocation" placeholder="安装位置及用途" />
        </el-form-item>

        <el-form-item label="介质名称" prop="switchValveMedName">
          <el-input v-model="formData.switchValveMedName" placeholder="介质名称" />
        </el-form-item>

        <el-form-item label="工艺条件 - 设计温度" prop="switchValveMedTemp">
          <el-input v-model="formData.switchValveMedTemp" placeholder="工艺条件 - 设计温度" />
        </el-form-item>

        <el-form-item label="工艺条件 - 阀前压力（MPa）" prop="switchValveMedPress">
          <el-input
            v-model="formData.switchValveMedPress"
            placeholder="工艺条件 - 阀前压力（MPa）"
          />
        </el-form-item>

        <el-form-item label="工艺条件 - 阀后压力（MPa）" prop="switchValvePressAfter">
          <el-input
            v-model="formData.switchValvePressAfter"
            placeholder="工艺条件 - 阀后压力（MPa）"
          />
        </el-form-item>

        <el-form-item label="工艺条件 - 公称通径及材质" prop="switchValveMaterial">
          <el-input
            v-model="formData.switchValveMaterial"
            placeholder="工艺条件 - 公称通径及材质"
          />
        </el-form-item>

        <el-form-item label="阀体 - 阀体材质" prop="switchValveBodyMaterial">
          <el-input v-model="formData.switchValveBodyMaterial" placeholder="阀体 - 阀体材质" />
        </el-form-item>

        <el-form-item label="阀座 - 序号" prop="switchValveSeatSn">
          <el-input v-model="formData.switchValveSeatSn" placeholder="阀座 - 序号" />
        </el-form-item>

        <el-form-item label="阀座 - 材质" prop="switchValveSeatMaterial">
          <el-input v-model="formData.switchValveSeatMaterial" placeholder="阀座 - 材质" />
        </el-form-item>

        <el-form-item label="阀芯 - 材质" prop="switchValveCoreMaterial">
          <el-input v-model="formData.switchValveCoreMaterial" placeholder="阀芯 - 材质" />
        </el-form-item>

        <el-form-item label="阀杆 - 材质" prop="switchValveStemMaterial">
          <el-input v-model="formData.switchValveStemMaterial" placeholder="阀杆 - 材质" />
        </el-form-item>

        <el-form-item label="阀内件 - 流量特性" prop="switchValveFlowChar">
          <el-input v-model="formData.switchValveFlowChar" placeholder="阀内件 - 流量特性" />
        </el-form-item>

        <el-form-item label="阀内件 - 泄漏等级" prop="switchValveLeakClass">
          <el-input v-model="formData.switchValveLeakClass" placeholder="阀内件 - 泄漏等级" />
        </el-form-item>

        <el-form-item label="执行机构 - 类型" prop="switchValveActuatorType">
          <el-input v-model="formData.switchValveActuatorType" placeholder="执行机构 - 类型" />
        </el-form-item>

        <el-form-item label="执行机构 - 形式规格" prop="switchValveActuatorModel">
          <el-input v-model="formData.switchValveActuatorModel" placeholder="执行机构 - 形式规格" />
        </el-form-item>

        <el-form-item label="执行机构 - 厂家" prop="switchValveActuatorManu">
          <el-input v-model="formData.switchValveActuatorManu" placeholder="执行机构 - 厂家" />
        </el-form-item>

        <el-form-item label="执行机构 - 作用形式" prop="switchValveActuatorAction">
          <el-input
            v-model="formData.switchValveActuatorAction"
            placeholder="执行机构 - 作用形式"
          />
        </el-form-item>

        <el-form-item label="执行机构 - 行程" prop="switchValveActuatorStroke">
          <el-input v-model="formData.switchValveActuatorStroke" placeholder="执行机构 - 行程" />
        </el-form-item>

        <el-form-item label="执行机构 - 弹簧范围" prop="switchValveSpringRange">
          <el-input v-model="formData.switchValveSpringRange" placeholder="执行机构 - 弹簧范围" />
        </el-form-item>

        <el-form-item label="执行机构 - 气源压力" prop="switchValveAirPress">
          <el-input v-model="formData.switchValveAirPress" placeholder="执行机构 - 气源压力" />
        </el-form-item>

        <el-form-item label="执行机构 - 故障位置" prop="switchValveFaultPos">
          <el-input v-model="formData.switchValveFaultPos" placeholder="执行机构 - 故障位置" />
        </el-form-item>

        <el-form-item label="执行机构 - 关闭时间" prop="switchValveCloseTime">
          <el-date-picker
            v-model="formData.switchValveCloseTime"
            type="datetime"
            placeholder="执行机构 - 关闭时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="执行机构 - 开启时间" prop="switchValveOpenTime">
          <el-date-picker
            v-model="formData.switchValveOpenTime"
            type="datetime"
            placeholder="执行机构 - 开启时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="备注" prop="switchValveRemark">
          <el-input v-model="formData.switchValveRemark" placeholder="备注" />
        </el-form-item>

        <el-form-item label="s设备类型" prop="dvType">
          <el-input v-model="formData.dvType" placeholder="s设备类型" />
        </el-form-item>

        <el-form-item label="所属工厂" prop="factory">
          <el-input v-model="formData.factory" placeholder="所属工厂" />
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
  name: "SwitchValve",
  inheritAttrs: false,
});

import SwitchValveAPI, {
  SwitchValvePageVO,
  SwitchValveForm,
  SwitchValvePageQuery,
} from "@/api/ledger/switch-valve-api";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);
const importDialogVisible = ref(false);
const queryParams = reactive<SwitchValvePageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 开关阀表格数据
const pageData = ref<SwitchValvePageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 开关阀表单数据
const formData = reactive<SwitchValveForm>({});

// 开关阀表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  switchValveDevice: [{ required: true, message: "请输入装置名称", trigger: "blur" }],
  switchValveTag: [{ required: true, message: "请输入位号", trigger: "blur" }],
  switchValveName: [{ required: true, message: "请输入名称", trigger: "blur" }],
  switchValveModel: [{ required: true, message: "请输入型号规格", trigger: "blur" }],
  switchValveManu: [{ required: true, message: "请输入生产厂家", trigger: "blur" }],
  switchValveLocation: [{ required: true, message: "请输入安装位置及用途", trigger: "blur" }],
  switchValveMedName: [{ required: true, message: "请输入介质名称", trigger: "blur" }],
  switchValveActuatorManu: [{ required: true, message: "请输入执行机构 - 厂家", trigger: "blur" }],
});

/** 查询开关阀 */
function handleQuery() {
  loading.value = true;
  SwitchValveAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置开关阀查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开开关阀弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改开关阀";
    SwitchValveAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增开关阀";
  }
}

/** 提交开关阀表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      console.log(id);
      if (id) {
        SwitchValveAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SwitchValveAPI.create(formData)
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

/** 关闭开关阀弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除开关阀 */
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
      SwitchValveAPI.deleteByIds(ids)
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
  SwitchValveAPI.export({
    switchValveTag: queryParams.switchValveTag,
    status: queryParams.status,
    dvType: queryParams.dvType,
    factory: queryParams.factory,
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
