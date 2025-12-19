<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :inline="true" :model="queryParams">
        <el-form-item label="类型名称" prop="machineryTypeName">
          <el-input
            v-model="queryParams.machineryTypeName"
            placeholder="请输入设备类型名称"
            style="width: 240px"
            clearable
            @keyup.enter="handleQuery"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="enableFlag">
          <el-select
            v-model="queryParams.enableFlag"
            placeholder="选择是或否"
            style="width: 240px"
            clearable
          >
            <el-option
              v-for="dict in searchOption"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="search-buttons">
          <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
          <el-button icon="refresh" @click="handleResetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="mb-10px">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="如果想直接增加没有父类型的类型,请点击此按钮"
          placement="top-start"
        >
          <el-button type="primary" @click="handleAddRoot()">新增</el-button>
        </el-tooltip>
      </div>

      <el-table
        ref="dataTableRef"
        v-loading="loading"
        :data="listDvTypeData"
        default-expand-all
        row-key="machineryTypeId"
        :show-overflow-tooltip="true"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          key="machineryTypeCode"
          min-width="150"
          label="设备类型编码"
          prop="machineryTypeCode"
        />
        <el-table-column
          key="machineryTypeName"
          label="设备类型名称"
          prop="machineryTypeName"
          align="center"
        />
        <el-table-column key="enableFlag" label="是否启用" prop="enableFlag" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.enableFlag === 'Y'" type="primary">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column key="remark" label="备注" prop="remark" min-width="150" align="center" />
        <el-table-column key="createBy" label="创建者" prop="createBy" align="center" />
        <el-table-column key="createTime" label="创建时间" prop="createTime" align="center" />
        <el-table-column key="updateBy" label="更新者" prop="updateBy" align="center" />
        <el-table-column key="updateTime" label="更新时间" prop="updateTime" align="center" />
        <el-table-column
          fixed="right"
          min-width="190"
          class-name="small-padding fixed-width"
          label="操作"
        >
          <template #default="scope">
            <el-button
              v-hasPerm="['system:dv-machinery-type:edit']"
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleOpenDialog(scope.row, 'edit')"
            >
              编辑
            </el-button>
            <el-button
              v-hasPerm="['system:dv-machinery-type:delete']"
              type="primary"
              size="small"
              link
              icon="plus"
              @click="handleOpenDialog(scope.row, 'add')"
            >
              新增
            </el-button>
            <el-button
              v-hasPerm="['system:dv-machinery-type:delete']"
              type="danger"
              size="small"
              link
              icon="delete"
              @click="handleDelete(scope.row, 'delete')"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 设备类型表单弹窗 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form
        ref="dataFormRef"
        :model="formData"
        :rules="rules"
        :label-position="`right`"
        label-width="auto"
      >
        <el-form-item label="设备类型名称" prop="machineryTypeName">
          <el-input v-model="formData.machineryTypeName" placeholder="设备类型名称" />
        </el-form-item>

        <el-form-item label="是否启用" prop="enableFlag">
          <el-radio-group v-model="formData.enableFlag">
            <el-radio value="Y" size="large">是</el-radio>
            <el-radio value="N" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleOperation()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "DvMachineryType",
  inheritAttrs: false,
});

import DvMachineryTypeAPI, {
  DvMachineryTypeForm,
  DvMachineryTypeFormTreeList,
} from "@/api/system/dv-machinery-type-api";
import { handleTree } from "@/utils/handletree";
const searchOption = [
  {
    label: "是",
    value: "Y",
  },
  {
    label: "否",
    value: "N",
  },
];
const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const rowContext = ref<DvMachineryTypeForm>();
const queryParams: Ref<{
  machineryTypeCode?: string;
  machineryTypeName?: string;
  parentTypeId?: number;
  ancestors?: string;
  enableFlag?: string;
}> = ref({
  machineryTypeCode: null,
  machineryTypeName: null,
  parentTypeId: null,
  ancestors: null,
  enableFlag: null,
});
// 设备类型表格数据
const listDvTypeData = ref<DvMachineryTypeFormTreeList>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 设备类型表单数据
const formData = reactive<DvMachineryTypeForm>({});
//操作的类型
const operationType: Ref<string> = ref("");
// 设备类型表单校验规则
const rules = reactive({
  machineryTypeId: [{ required: true, message: "请输入设备类型ID", trigger: "blur" }],
  machineryTypeCode: [{ required: true, message: "请输入设备类型编码", trigger: "blur" }],
  machineryTypeName: [{ required: true, message: "请输入设备类型名称", trigger: "blur" }],
  ancestors: [{ required: true, message: "请输入所有父节点ID", trigger: "blur" }],
  enableFlag: [{ required: true, message: "请输入是否启用", trigger: "blur" }],
});

const handleCloseDialog = () => {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
  if (operationType.value) operationType.value = null;
  if (rowContext.value) rowContext.value = null;
};

/** 查询设备类型 */
function handleQuery() {
  loading.value = true;
  DvMachineryTypeAPI.getList(queryParams.value)
    .then((data) => {
      listDvTypeData.value = handleTree(data, "machineryTypeId", "parentTypeId");
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置设备类型查询 */
function handleResetQuery() {
  queryParams.value.machineryTypeCode = null;
  queryParams.value.machineryTypeName = null;
  queryParams.value.parentTypeId = null;
  queryParams.value.ancestors = null;
  queryParams.value.enableFlag = null;
  handleQuery();
}

/** 打开设备类型弹窗 */
function handleOpenDialog(row: DvMachineryTypeForm, operation: string) {
  dialog.visible = true;
  operationType.value = operation;
  rowContext.value = row;
}

const sendCreate = () => {
  DvMachineryTypeAPI.create(formData)
    .then(() => {
      ElMessage.success("新增成功");
      handleCloseDialog();
      handleResetQuery();
    })
    .finally(() => (loading.value = false));
};
const handleAddRoot = () => {
  handleOpenDialog();
  formData.parentTypeId = 0;
};
const handleAdd = () => {
  formData.parentTypeId = rowContext.value.machineryTypeId;
  sendCreate();
};

const handleOperation = () => {
  if (formData.parentTypeId === 0) {
    //说明添加的是根节点
    sendCreate();
  }
  switch (operationType.value) {
    case "edit":
      break;
    case "add":
      handleAdd();
      break;
    case "delete":
      break;
  }
};
onMounted(() => {
  handleQuery();
});
</script>
