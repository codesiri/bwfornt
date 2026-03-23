import request from "@/utils/request";

const CONTROLVALVE_BASE_URL = "/api/v1/control-valve";

const ControlValveAPI = {
  /** 获取调节阀分页数据 */
  getPage(queryParams?: ControlValvePageQuery) {
    return request<any, PageResult<ControlValvePageVO[]>>({
      url: `${CONTROLVALVE_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取调节阀表单数据
   *
   * @param id 调节阀ID
   * @returns 调节阀表单数据
   */
  getFormData(id: number) {
    return request<any, ControlValveForm>({
      url: `${CONTROLVALVE_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加调节阀
   *
   *  @param data 调节阀表单数据
   */
  create(data: ControlValveForm) {
    return request({
      url: `${CONTROLVALVE_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新调节阀
   *
   * @param id 调节阀ID
   * @param data 调节阀表单数据
   */
  update(id: string, data: ControlValveForm) {
    return request({
      url: `${CONTROLVALVE_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除调节阀，多个以英文逗号(,)分割
   *
   * @param ids 调节阀ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${CONTROLVALVE_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
  /**
   * 表导出
   *
   * @param queryParams 查询参数
   */
  export(queryParams: any) {
    return request({
      url: `${CONTROLVALVE_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  /**
   * 导入表
   *
   * @param file 导入文件
   */
  import(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, ExcelResult>({
      url: `${CONTROLVALVE_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /** 下载导入模板 */
  downloadTemplate() {
    return request({
      url: `${CONTROLVALVE_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default ControlValveAPI;

/** 调节阀分页查询参数 */
export interface ControlValvePageQuery extends PageQuery {
  /** 位号 */
  tagNo?: string;
  /** 设备状态 */
  status?: string;
  /** s设备类型 */
  dvType?: string;
  /** 所属工厂 */
  factory?: string;
}

/** 调节阀表单对象 */
export interface ControlValveForm {
  /** 序号 */
  id?: number;
  /** 装置名称 */
  dveName?: string;
  /** 	位号 */
  tagNo?: string;
  /** 名称 */
  name?: string;
  /** 型号规格 */
  modelSpecification?: string;
  /** 生产厂家 */
  manufacturer?: string;
  /** 安装位置及用途 */
  installationLocationAndPurpose?: string;
  /** 介质名称 */
  mediumName?: string;
  /** 设计温度 */
  designTemperature?: string;
  /** 阀前压 */
  pressureBeforeValve?: string;
  /** 阀后压 */
  pressureAfterValve?: string;
  /** 阀座直径 */
  valveSeatDiameter?: string;
  /** 阀体材质 */
  valveBodyMaterial?: string;
  /** 阀座序列号 */
  valveSeatSerialNumber?: number;
  /** 阀座材质 */
  valveSeatMaterial?: string;
  /** 阀芯材质 */
  valveCoreMaterial?: string;
  /** 阀杆材质 */
  valveStemMaterial?: string;
  /** 流量特性 */
  flowCharacteristics?: string;
  /** 泄露等级 */
  leakageClass?: string;
  /** Cv值 */
  cvValue?: string;
  /** 规格 */
  actuatorModelSpecification?: string;
  /** 作用形式 */
  actuatorActionForm?: string;
  /** 行程 */
  actuatorStroke?: string;
  /** 弹簧范围 */
  springRange?: string;
  /** 气源压力 */
  airSourcePressure?: string;
  /** 故障位置 */
  faultPosition?: string;
  /** 关阀时间 */
  valveCloseTime?: Date;
  /** 开阀时间 */
  valveOpenTime?: Date;
  /** 手轮机构 */
  handwheelMechanism?: string;
  /** 设备类型 */
  dvType?: string;
  /** 设备状态 */
  status?: number;
  /** 所属工厂 */
  factory?: string;
}

/** 调节阀分页对象 */
export interface ControlValvePageVO {
  /** 序号 */
  id?: number;
  /** 装置名称 */
  dveName?: string;
  /** 	位号 */
  tagNo?: string;
  /** 名称 */
  name?: string;
  /** 型号规格 */
  modelSpecification?: string;
  /** 生产厂家 */
  manufacturer?: string;
  /** 安装位置及用途 */
  installationLocationAndPurpose?: string;
  /** 介质名称 */
  mediumName?: string;
  /** 设计温度 */
  designTemperature?: string;
  /** 阀前压 */
  pressureBeforeValve?: string;
  /** 阀后压 */
  pressureAfterValve?: string;
  /** 阀座直径 */
  valveSeatDiameter?: string;
  /** 阀体材质 */
  valveBodyMaterial?: string;
  /** 阀座序列号 */
  valveSeatSerialNumber?: number;
  /** 阀座材质 */
  valveSeatMaterial?: string;
  /** 阀芯材质 */
  valveCoreMaterial?: string;
  /** 阀杆材质 */
  valveStemMaterial?: string;
  /** 流量特性 */
  flowCharacteristics?: string;
  /** 泄露等级 */
  leakageClass?: string;
  /** Cv值 */
  cvValue?: string;
  /** 规格 */
  actuatorModelSpecification?: string;
  /** 作用形式 */
  actuatorActionForm?: string;
  /** 行程 */
  actuatorStroke?: string;
  /** 弹簧范围 */
  springRange?: string;
  /** 气源压力 */
  airSourcePressure?: string;
  /** 故障位置 */
  faultPosition?: string;
  /** 关阀时间 */
  valveCloseTime?: Date;
  /** 开阀时间 */
  valveOpenTime?: Date;
  /** 手轮机构 */
  handwheelMechanism?: string;
  /** 设备类型 */
  dvType?: string;
  /** 设备状态 */
  status?: number;
  /** 所属工厂 */
  factory?: string;
}
