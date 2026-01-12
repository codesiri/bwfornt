<template>
  <!-- 温度表单弹窗 -->
  <el-drawer
    v-model="visable"
    :close-on-click-modal="false"
    :modal="true"
    :resizable="true"
    :size="'50%'"
    :direction="direction"
    :with-header="false"
  >
    <template #header>
      <h4>编辑</h4>
    </template>
    <template #default>
      <el-form
        ref="dataFormRef"
        :label-position="labelPosition"
        label-width="auto"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="位号" prop="tagNumber">
          <el-input v-model="formData.tagNumber" placeholder="位号" />
        </el-form-item>
        <el-form-item label="装置名称" prop="deviceName">
          <el-input v-model="formData.deviceName" placeholder="装置名称" />
        </el-form-item>

        <el-form-item label="设备名称" prop="deviceNameSuffix">
          <el-input v-model="formData.deviceNameSuffix" placeholder="设备名称" />
        </el-form-item>
        <el-form-item label="设备状态" prop="status">
          <dict v-model="formData.status" code="status" />
        </el-form-item>
        <el-form-item label="设备类型" prop="dvType">
          <el-input v-model="formData.dvType" placeholder="请输入设备类型" />
          <!-- <div ref="tableSelectRef">
            <el-popover
              :width="popoverWidth"
              trigger="click"
              placement="bottom-end"
              @show="handleShow"
            >
              <template #reference>
                <div>
                  <el-input
                    width="100%"
                    class="reference"
                    :model-value="formData.dvType"
                    :readonly="true"
                    :placeholder="'请选择设备类型'"
                    @click="popvisable = !popvisable"
                  >
                    <template #suffix>
                      <el-icon
                        :style="{
                          transform: popvisable ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform .5s',
                        }"
                      >
                        <ArrowDown />
                      </el-icon>
                    </template>
                  </el-input>
                </div>
              </template>
              弹出框内容
              <div ref="popoverContentRef">
                <el-table
                  ref="dataTableRef"
                  v-loading="loading"
                  highlight-current-row
                  default-expand-all
                  :max-height="200"
                  row-key="machineryTypeId"
                  :data="listDvTypeData"
                  :show-overflow-tooltip="true"
                  :tree-props="{
                    children: 'children',
                    hasChildren: 'hasChildren',
                    checkStrictly: true,
                  }"
                  @current-change="selectRow"
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
                  <el-table-column
                    key="enableFlag"
                    label="是否启用"
                    prop="enableFlag"
                    align="center"
                  >
                    <template #default="scope">
                      <el-tag v-if="scope.row.enableFlag === 'Y'" type="primary">是</el-tag>
                      <el-tag v-else type="danger">否</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    key="remark"
                    label="备注"
                    prop="remark"
                    min-width="150"
                    align="center"
                  />
                  <el-table-column key="createBy" label="创建者" prop="createBy" align="center" />
                  <el-table-column
                    key="createTime"
                    label="创建时间"
                    prop="createTime"
                    align="center"
                  />
                  <el-table-column key="updateBy" label="更新者" prop="updateBy" align="center" />
                  <el-table-column
                    key="updateTime"
                    label="更新时间"
                    prop="updateTime"
                    align="center"
                  />
                </el-table>
                <div class="feedback">
                  <el-button type="primary" size="small" @click="handleConfirm">确认</el-button>
                  <el-button size="small" @click="handleClear">清 空</el-button>
                  <el-button size="small" @click="handleClose">关 闭</el-button>
                </div>
              </div>
            </el-popover>
          </div> -->
        </el-form-item>
        <el-form-item label="所属工厂" prop="manufacturer">
          <el-input v-model="formData.factory" placeholder="请输入所在工厂" />
        </el-form-item>

        <el-form-item label="安装位置以及用途" prop="installationLocationAndPurpose">
          <el-input
            v-model="formData.installationLocationAndPurpose"
            type="textarea"
            placeholder="安装位置以及用途"
          />
        </el-form-item>

        <el-form-item label="分度号" prop="indexNumber">
          <el-input v-model="formData.indexNumber" placeholder="分度号" />
        </el-form-item>

        <el-form-item label="规格型号" prop="specificationModel">
          <el-input v-model="formData.specificationModel" placeholder="规格型号" />
        </el-form-item>

        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="formData.manufacturer" placeholder="生产厂家" />
        </el-form-item>

        <el-form-item label="测量范围" prop="measurementRange">
          <el-input v-model="formData.measurementRange" placeholder="测量范围" />
        </el-form-item>

        <el-form-item label="插入深度" prop="insertionDepth">
          <el-input v-model="formData.insertionDepth" placeholder="插入深度" />
        </el-form-item>

        <el-form-item label="连接方式及规格" prop="connectionMethodAndSpecifications">
          <el-input
            v-model="formData.connectionMethodAndSpecifications"
            placeholder="连接方式及规格"
          />
        </el-form-item>

        <el-form-item label="精度" prop="precision">
          <el-input v-model="formData.precision" placeholder="精度" />
        </el-form-item>

        <el-form-item label="套管规格和及材质" prop="casingSpecificationsAndMaterial">
          <el-input
            v-model="formData.casingSpecificationsAndMaterial"
            placeholder="套管规格和及材质"
          />
        </el-form-item>

        <el-form-item label="是否带连锁" prop="interlocked">
          <dict v-model="formData.interlocked" code="interlocked" />
        </el-form-item>

        <el-form-item label="联锁设定值" prop="interlockSetValue">
          <el-input
            v-model="formData.interlockSetValue"
            :disabled="disabledInterLockSetValue"
            placeholder="联锁设定值"
          />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="备注" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { DrawerProps, FormProps } from "element-plus";
import { DvTemperatureGaugeForm } from "@/api/ledger/dv-temperature-gauge-api";
// import DvMachineryTypeAPI, {
//   DvMachineryTypeFormTreeList,
// } from "@/api/system/dv-machinery-type-api";
// import { handleTree } from "@/utils/handletree";
const visable = defineModel<boolean>("visable", { required: true });
const direction = ref<DrawerProps["direction"]>("rtl");
const formData = defineModel<DvTemperatureGaugeForm>("formdata", { required: true });
const labelPosition = ref<FormProps["labelPosition"]>("right");
// const popvisable = ref<boolean>(false);
// const loading = ref<boolean>(false);
const tableSelectRef = ref();
const popoverWidth = ref<string>("100%");
const dataFormRef = ref();
// 温度表单校验规则
const rules = reactive({
  deviceName: [{ required: true, message: "请输入装置名称", trigger: "blur" }],
  tagNumber: [{ required: true, message: "请输入位号", trigger: "blur" }],
  deviceNameSuffix: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
  dvType: [{ requried: true, message: "请选择设备类型", trigger: "blur" }],
});

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "confirm"): void;
  (e: "selectedRow", data: DvTemperatureGaugeForm): void;
}>();
// const listDvTypeData = ref<DvMachineryTypeFormTreeList>([]);

useResizeObserver(tableSelectRef, (entries) => {
  popoverWidth.value = `${entries[0].contentRect.width + entries[1].contentRect.width + entries[2].contentRect.width}px`;
});
// const handleQuery = () => {
//   loading.value = true;
//   DvMachineryTypeAPI.getList()
//     .then((data) => {
//       listDvTypeData.value = handleTree(data, "machineryTypeId", "parentTypeId");
//     })
//     .finally(() => {
//       loading.value = false;
//     });
// };
// const selectRow = (val: DvTemperatureGaugeForm | undefined) => {
//   console.log(val);
//   emit("selectedRow", val!);
// };
const cancelClick = () => {
  emit("cancel");
};

const confirmClick = () => {
  dataFormRef.value.validate((valid: boolean) => {
    if (valid) {
      emit("confirm");
      dataFormRef.value.resetFields();
    }
  });
};
// const handleShow = () => {
//   console.log("处理展示前的函数");
//   handleQuery();
// };
// const handleConfirm = () => {
//   console.log("处理确认");
// };
// const handleClear = () => {
//   console.log("处理清空");
// };

// const handleClose = () => {
//   console.log("处理关闭");
// };
const disabledInterLockSetValue = computed(() => {
  const value = formData.value.interlocked as number;
  return value == 0;
});
</script>

<style scoped lang="scss">
.reference :deep(.el-input__wrapper),
.reference :deep(.el-input__inner) {
  cursor: pointer;
}
.feedback {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
}
</style>
