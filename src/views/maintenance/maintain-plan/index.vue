<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="计划类型" prop="maintainPlanType">
          <el-input
            v-model="queryParams.maintainPlanType"
            placeholder="计划类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="计划年度" prop="maintainPlanYear">
          <el-input
            v-model="queryParams.maintainPlanYear"
            placeholder="计划年度"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="计划月份" prop="maintainPlanMonth">
          <el-input
            v-model="queryParams.maintainPlanMonth"
            placeholder="计划月份"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备编号" prop="maintainPlanEquipCode">
          <el-input
            v-model="queryParams.maintainPlanEquipCode"
            placeholder="设备编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备名称" prop="maintainPlanEquipName">
          <el-input
            v-model="queryParams.maintainPlanEquipName"
            placeholder="设备名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="设备类型" prop="maintainPlanEquipType">
          <el-input
            v-model="queryParams.maintainPlanEquipType"
            placeholder="设备类型"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="维修/检修内容" prop="maintainPlanContent">
          <el-input
            v-model="queryParams.maintainPlanContent"
            placeholder="维修/检修内容"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="计划执行日期" prop="maintainPlanScheduleDate">
          <el-date-picker
            class="!w-[240px]"
            v-model="queryParams.maintainPlanScheduleDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="计划时长" prop="maintainPlanDuration">
          <el-input
            v-model="queryParams.maintainPlanDuration"
            placeholder="计划时长"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="负责部门" prop="maintainPlanDept">
          <el-input
            v-model="queryParams.maintainPlanDept"
            placeholder="负责部门"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="负责人" prop="maintainPlanPerson">
          <el-input
            v-model="queryParams.maintainPlanPerson"
            placeholder="负责人"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="安全风险等级" prop="maintainPlanSafetyLevel">
          <el-input
            v-model="queryParams.maintainPlanSafetyLevel"
            placeholder="安全风险等级"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="安全防护措施" prop="maintainPlanSafetyMeasure">
          <el-input
            v-model="queryParams.maintainPlanSafetyMeasure"
            placeholder="安全防护措施"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="计划状态" prop="maintainPlanStatus">
          <el-input
            v-model="queryParams.maintainPlanStatus"
            placeholder="计划状态"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="实际执行日期" prop="maintainPlanActualDate">
          <el-date-picker
            class="!w-[240px]"
            v-model="queryParams.maintainPlanActualDate"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
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
          v-hasPerm="['maintenance:maintain-plan:add']"
          type="success"
          icon="plus"
          @click="handleOpenDialog()"
        >
          新增
        </el-button>
        <el-button
          v-hasPerm="['maintenance:maintain-plan:delete']"
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
          key="maintainPlanType"
          label="计划类型"
          prop="maintainPlanType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanYear"
          label="计划年度"
          prop="maintainPlanYear"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanMonth"
          label="计划月份"
          prop="maintainPlanMonth"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanEquipCode"
          label="设备编号"
          prop="maintainPlanEquipCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanEquipName"
          label="设备名称"
          prop="maintainPlanEquipName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanEquipType"
          label="设备类型"
          prop="maintainPlanEquipType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanContent"
          label="维修/检修内容"
          prop="maintainPlanContent"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanScheduleDate"
          label="计划执行日期"
          prop="maintainPlanScheduleDate"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanDuration"
          label="计划时长"
          prop="maintainPlanDuration"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanDept"
          label="负责部门"
          prop="maintainPlanDept"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanPerson"
          label="负责人"
          prop="maintainPlanPerson"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanSafetyLevel"
          label="安全风险等级"
          prop="maintainPlanSafetyLevel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanSafetyMeasure"
          label="安全防护措施"
          prop="maintainPlanSafetyMeasure"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanStatus"
          label="计划状态"
          prop="maintainPlanStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="maintainPlanActualDate"
          label="实际执行日期"
          prop="maintainPlanActualDate"
          min-width="150"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['maintenance:maintain-plan:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['maintenance:maintain-plan:delete']"
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

    <!-- 维修计划表单弹窗 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="计划类型" prop="maintainPlanType">
          <el-input v-model="formData.maintainPlanType" placeholder="计划类型" />
        </el-form-item>

        <el-form-item label="计划年度" prop="maintainPlanYear">
          <el-input v-model="formData.maintainPlanYear" placeholder="计划年度" />
        </el-form-item>

        <el-form-item label="计划月份" prop="maintainPlanMonth">
          <el-input v-model="formData.maintainPlanMonth" placeholder="计划月份" />
        </el-form-item>

        <el-form-item label="设备编号" prop="maintainPlanEquipCode">
          <el-input v-model="formData.maintainPlanEquipCode" placeholder="设备编号" />
        </el-form-item>

        <el-form-item label="设备名称" prop="maintainPlanEquipName">
          <el-input v-model="formData.maintainPlanEquipName" placeholder="设备名称" />
        </el-form-item>

        <el-form-item label="设备类型" prop="maintainPlanEquipType">
          <el-input v-model="formData.maintainPlanEquipType" placeholder="设备类型" />
        </el-form-item>

        <el-form-item label="维修/检修内容" prop="maintainPlanContent">
          <el-input v-model="formData.maintainPlanContent" placeholder="维修/检修内容" />
        </el-form-item>

        <el-form-item label="计划执行日期" prop="maintainPlanScheduleDate">
          <el-date-picker
            class="!w-[240px]"
            v-model="formData.maintainPlanScheduleDate"
            type="date"
            placeholder="计划执行日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="计划时长" prop="maintainPlanDuration">
          <el-input v-model="formData.maintainPlanDuration" placeholder="计划时长" />
        </el-form-item>

        <el-form-item label="负责部门" prop="maintainPlanDept">
          <el-input v-model="formData.maintainPlanDept" placeholder="负责部门" />
        </el-form-item>

        <el-form-item label="负责人" prop="maintainPlanPerson">
          <el-input v-model="formData.maintainPlanPerson" placeholder="负责人" />
        </el-form-item>

        <el-form-item label="安全风险等级" prop="maintainPlanSafetyLevel">
          <el-input v-model="formData.maintainPlanSafetyLevel" placeholder="安全风险等级" />
        </el-form-item>

        <el-form-item label="安全防护措施" prop="maintainPlanSafetyMeasure">
          <el-input v-model="formData.maintainPlanSafetyMeasure" placeholder="安全防护措施" />
        </el-form-item>

        <el-form-item label="计划状态" prop="maintainPlanStatus">
          <el-input v-model="formData.maintainPlanStatus" placeholder="计划状态" />
        </el-form-item>

        <el-form-item label="实际执行日期" prop="maintainPlanActualDate">
          <el-date-picker
            class="!w-[240px]"
            v-model="formData.maintainPlanActualDate"
            type="date"
            placeholder="实际执行日期"
            value-format="YYYY-MM-DD"
          />
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
  name: "MaintainPlan",
  inheritAttrs: false,
});

import MaintainPlanAPI, {
  MaintainPlanPageVO,
  MaintainPlanForm,
  MaintainPlanPageQuery,
} from "@/api/maintenance/maintain-plan-api";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<MaintainPlanPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 维修计划表格数据
const pageData = ref<MaintainPlanPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 维修计划表单数据
const formData = reactive<MaintainPlanForm>({});

// 维修计划表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入序号", trigger: "blur" }],
  maintainPlanType: [{ required: true, message: "请输入计划类型", trigger: "blur" }],
  maintainPlanYear: [{ required: true, message: "请输入计划年度", trigger: "blur" }],
  maintainPlanEquipCode: [{ required: true, message: "请输入设备编号", trigger: "blur" }],
  maintainPlanEquipName: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  maintainPlanEquipType: [{ required: true, message: "请输入设备类型", trigger: "blur" }],
  maintainPlanContent: [{ required: true, message: "请输入维修/检修内容", trigger: "blur" }],
  maintainPlanScheduleDate: [{ required: true, message: "请输入计划执行日期", trigger: "blur" }],
  maintainPlanDuration: [{ required: true, message: "请输入计划时长", trigger: "blur" }],
  maintainPlanDept: [{ required: true, message: "请输入负责部门", trigger: "blur" }],
  maintainPlanPerson: [{ required: true, message: "请输入负责人", trigger: "blur" }],
  maintainPlanSafetyLevel: [{ required: true, message: "请输入安全风险等级", trigger: "blur" }],
  maintainPlanStatus: [{ required: true, message: "请输入计划状态", trigger: "blur" }],
});

/** 查询维修计划 */
function handleQuery() {
  loading.value = true;
  MaintainPlanAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置维修计划查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开维修计划弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改维修计划";
    MaintainPlanAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增维修计划";
  }
}

/** 提交维修计划表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        MaintainPlanAPI.update(id.toString(), formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        MaintainPlanAPI.create(formData)
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

/** 关闭维修计划弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除维修计划 */
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
      MaintainPlanAPI.deleteByIds(ids)
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
