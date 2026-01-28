<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="位号" prop="elecMotorTag">
          <el-input
            v-model="queryParams.elecMotorTag"
            placeholder="位号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="生产日期" prop="elecMotorProdDate">
          <el-date-picker
            v-model="queryParams.elecMotorProdDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="生产厂家" prop="elecMotorManufacturer">
          <el-input
            v-model="queryParams.elecMotorManufacturer"
            placeholder="生产厂家"
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
          v-hasPerm="['ledger:elec-motor:add']"
          type="success"
          icon="plus"
          @click="handleOpenDialog()"
        >
          新增
        </el-button>
        <el-button
          v-hasPerm="['ledger:elec-motor:delete']"
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
          key="elecMotorTag"
          label="位号"
          prop="elecMotorTag"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorProcess"
          label="工艺名称"
          prop="elecMotorProcess"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorModel"
          label="型号"
          prop="elecMotorModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorRatedPower"
          label="额定功率"
          prop="elecMotorRatedPower"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorRatedVoltage"
          label="额定电压"
          prop="elecMotorRatedVoltage"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorRatedCurrent"
          label="额定电流"
          prop="elecMotorRatedCurrent"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorRatedFreq"
          label="额定频率"
          prop="elecMotorRatedFreq"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorSpeed"
          label="转速"
          prop="elecMotorSpeed"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorPowerFactor"
          label="功率因数"
          prop="elecMotorPowerFactor"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorEfficiency"
          label="工作效率"
          prop="elecMotorEfficiency"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorWiringMode"
          label="接线方式"
          prop="elecMotorWiringMode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorBearingModel"
          label="轴承型号"
          prop="elecMotorBearingModel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorExplosionMark"
          label="防爆标志"
          prop="elecMotorExplosionMark"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorInsulation"
          label="绝缘等级"
          prop="elecMotorInsulation"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorProtection"
          label="防护等级"
          prop="elecMotorProtection"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorWorkSystem"
          label="工作制"
          prop="elecMotorWorkSystem"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorFactoryNo"
          label="出厂编号"
          prop="elecMotorFactoryNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorWeight"
          label="重量（KG）"
          prop="elecMotorWeight"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorProdDate"
          label="生产日期"
          prop="elecMotorProdDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="elecMotorManufacturer"
          label="生产厂家"
          prop="elecMotorManufacturer"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['ledger:elec-motor:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['ledger:elec-motor:delete']"
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

    <!-- 电器电动机表单弹窗 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="位号" prop="elecMotorTag">
          <el-input v-model="formData.elecMotorTag" placeholder="位号" />
        </el-form-item>

        <el-form-item label="工艺名称" prop="elecMotorProcess">
          <el-input v-model="formData.elecMotorProcess" placeholder="工艺名称" />
        </el-form-item>

        <el-form-item label="型号" prop="elecMotorModel">
          <el-input v-model="formData.elecMotorModel" placeholder="型号" />
        </el-form-item>

        <el-form-item label="额定功率" prop="elecMotorRatedPower">
          <el-input v-model="formData.elecMotorRatedPower" placeholder="额定功率" />
        </el-form-item>

        <el-form-item label="额定电压" prop="elecMotorRatedVoltage">
          <el-input v-model="formData.elecMotorRatedVoltage" placeholder="额定电压" />
        </el-form-item>

        <el-form-item label="额定电流" prop="elecMotorRatedCurrent">
          <el-input v-model="formData.elecMotorRatedCurrent" placeholder="额定电流" />
        </el-form-item>

        <el-form-item label="额定频率" prop="elecMotorRatedFreq">
          <el-input v-model="formData.elecMotorRatedFreq" placeholder="额定频率" />
        </el-form-item>

        <el-form-item label="转速" prop="elecMotorSpeed">
          <el-input v-model="formData.elecMotorSpeed" placeholder="转速" />
        </el-form-item>

        <el-form-item label="功率因数" prop="elecMotorPowerFactor">
          <el-input v-model="formData.elecMotorPowerFactor" placeholder="功率因数" />
        </el-form-item>

        <el-form-item label="工作效率" prop="elecMotorEfficiency">
          <el-input v-model="formData.elecMotorEfficiency" placeholder="工作效率" />
        </el-form-item>

        <el-form-item label="接线方式" prop="elecMotorWiringMode">
          <el-input v-model="formData.elecMotorWiringMode" placeholder="接线方式" />
        </el-form-item>

        <el-form-item label="轴承型号" prop="elecMotorBearingModel">
          <el-input v-model="formData.elecMotorBearingModel" placeholder="轴承型号" />
        </el-form-item>

        <el-form-item label="防爆标志" prop="elecMotorExplosionMark">
          <el-input v-model="formData.elecMotorExplosionMark" placeholder="防爆标志" />
        </el-form-item>

        <el-form-item label="绝缘等级" prop="elecMotorInsulation">
          <el-input v-model="formData.elecMotorInsulation" placeholder="绝缘等级" />
        </el-form-item>

        <el-form-item label="防护等级" prop="elecMotorProtection">
          <el-input v-model="formData.elecMotorProtection" placeholder="防护等级" />
        </el-form-item>

        <el-form-item label="工作制" prop="elecMotorWorkSystem">
          <el-input v-model="formData.elecMotorWorkSystem" placeholder="工作制" />
        </el-form-item>

        <el-form-item label="出厂编号" prop="elecMotorFactoryNo">
          <el-input v-model="formData.elecMotorFactoryNo" placeholder="出厂编号" />
        </el-form-item>

        <el-form-item label="重量（KG）" prop="elecMotorWeight">
          <el-input v-model="formData.elecMotorWeight" placeholder="重量（KG）" />
        </el-form-item>

        <el-form-item label="生产日期" prop="elecMotorProdDate">
          <el-date-picker
            v-model="formData.elecMotorProdDate"
            type="datetime"
            placeholder="生产日期"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="生产厂家" prop="elecMotorManufacturer">
          <el-input v-model="formData.elecMotorManufacturer" placeholder="生产厂家" />
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
  name: "ElecMotor",
  inheritAttrs: false,
});

import ElecMotorAPI, {
  ElecMotorPageVO,
  ElecMotorForm,
  ElecMotorPageQuery,
} from "@/api/ledger/elec-motor-api";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<ElecMotorPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 电器电动机表格数据
const pageData = ref<ElecMotorPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 电器电动机表单数据
const formData = reactive<ElecMotorForm>({});

// 电器电动机表单校验规则
const rules = reactive({
  elecMotorTag: [{ required: true, message: "请输入位号", trigger: "blur" }],
  elecMotorProcess: [{ required: true, message: "请输入工艺名称", trigger: "blur" }],
  elecMotorModel: [{ required: true, message: "请输入型号", trigger: "blur" }],
  elecMotorFactoryNo: [{ required: true, message: "请输入出厂编号", trigger: "blur" }],
  elecMotorProdDate: [{ required: true, message: "请输入生产日期", trigger: "blur" }],
  elecMotorManufacturer: [{ required: true, message: "请输入生产厂家", trigger: "blur" }],
});

/** 查询电器电动机 */
function handleQuery() {
  loading.value = true;
  ElecMotorAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置电器电动机查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开电器电动机弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改电器电动机";
    ElecMotorAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增电器电动机";
  }
}

/** 提交电器电动机表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        ElecMotorAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        ElecMotorAPI.create(formData)
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

/** 关闭电器电动机弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除电器电动机 */
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
      ElecMotorAPI.deleteByIds(ids)
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
