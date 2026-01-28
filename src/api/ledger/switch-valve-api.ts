import request from "@/utils/request";

const SWITCHVALVE_BASE_URL = "/api/v1/switch-valve";

const SwitchValveAPI = {
  /** 获取开关阀分页数据 */
  getPage(queryParams?: SwitchValvePageQuery) {
    return request<any, PageResult<SwitchValvePageVO[]>>({
      url: `${SWITCHVALVE_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取开关阀表单数据
   *
   * @param id 开关阀ID
   * @returns 开关阀表单数据
   */
  getFormData(id: number) {
    return request<any, SwitchValveForm>({
      url: `${SWITCHVALVE_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加开关阀
   *
   *  @param data 开关阀表单数据
   */
  create(data: SwitchValveForm) {
    return request({
      url: `${SWITCHVALVE_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新开关阀
   *
   * @param id 开关阀ID
   * @param data 开关阀表单数据
   */
  update(id: string, data: SwitchValveForm) {
    return request({
      url: `${SWITCHVALVE_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除开关阀，多个以英文逗号(,)分割
   *
   * @param ids 开关阀ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SWITCHVALVE_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
  export(queryParams: any) {
    return request({
      url: `${SWITCHVALVE_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
};

export default SwitchValveAPI;

/** 开关阀分页查询参数 */
export interface SwitchValvePageQuery extends PageQuery {
  /** 位号 */
  switchValveTag?: string;
  /** 设备状态 */
  status?: string;
  /** s设备类型 */
  dvType?: string;
  /** 所属工厂 */
  factory?: string;
}

/** 开关阀表单对象 */
export interface SwitchValveForm {
  /** 序号 */
  id?: number;
  /** 装置名称 */
  switchValveDevice?: string;
  /** 位号 */
  switchValveTag?: string;
  /** 设备状态 */
  status?: string;
  /** 名称 */
  switchValveName?: string;
  /** 型号规格 */
  switchValveModel?: string;
  /** 生产厂家 */
  switchValveManu?: string;
  /** 安装位置及用途 */
  switchValveLocation?: string;
  /** 介质名称 */
  switchValveMedName?: string;
  /** 工艺条件 - 设计温度 */
  switchValveMedTemp?: string;
  /** 工艺条件 - 阀前压力（MPa） */
  switchValveMedPress?: string;
  /** 工艺条件 - 阀后压力（MPa） */
  switchValvePressAfter?: string;
  /** 工艺条件 - 公称通径及材质 */
  switchValveMaterial?: string;
  /** 阀体 - 阀体材质 */
  switchValveBodyMaterial?: string;
  /** 阀座 - 序号 */
  switchValveSeatSn?: string;
  /** 阀座 - 材质 */
  switchValveSeatMaterial?: string;
  /** 阀芯 - 材质 */
  switchValveCoreMaterial?: string;
  /** 阀杆 - 材质 */
  switchValveStemMaterial?: string;
  /** 阀内件 - 流量特性 */
  switchValveFlowChar?: string;
  /** 阀内件 - 泄漏等级 */
  switchValveLeakClass?: string;
  /** 执行机构 - 类型 */
  switchValveActuatorType?: string;
  /** 执行机构 - 形式规格 */
  switchValveActuatorModel?: string;
  /** 执行机构 - 厂家 */
  switchValveActuatorManu?: string;
  /** 执行机构 - 作用形式 */
  switchValveActuatorAction?: string;
  /** 执行机构 - 行程 */
  switchValveActuatorStroke?: string;
  /** 执行机构 - 弹簧范围 */
  switchValveSpringRange?: string;
  /** 执行机构 - 气源压力 */
  switchValveAirPress?: string;
  /** 执行机构 - 故障位置 */
  switchValveFaultPos?: string;
  /** 执行机构 - 关闭时间 */
  switchValveCloseTime?: Date;
  /** 执行机构 - 开启时间 */
  switchValveOpenTime?: Date;
  /** 备注 */
  switchValveRemark?: string;
  /** s设备类型 */
  dvType?: string;
  /** 所属工厂 */
  factory?: string;
}

/** 开关阀分页对象 */
export interface SwitchValvePageVO {
  /** 序号 */
  id?: number;
  /** 装置名称 */
  switchValveDevice?: string;
  /** 位号 */
  switchValveTag?: string;
  /** 设备状态 */
  status?: string;
  /** 名称 */
  switchValveName?: string;
  /** 型号规格 */
  switchValveModel?: string;
  /** 生产厂家 */
  switchValveManu?: string;
  /** 安装位置及用途 */
  switchValveLocation?: string;
  /** 介质名称 */
  switchValveMedName?: string;
  /** 工艺条件 - 设计温度 */
  switchValveMedTemp?: string;
  /** 工艺条件 - 阀前压力（MPa） */
  switchValveMedPress?: string;
  /** 工艺条件 - 阀后压力（MPa） */
  switchValvePressAfter?: string;
  /** 工艺条件 - 公称通径及材质 */
  switchValveMaterial?: string;
  /** 阀体 - 阀体材质 */
  switchValveBodyMaterial?: string;
  /** 阀座 - 序号 */
  switchValveSeatSn?: string;
  /** 阀座 - 材质 */
  switchValveSeatMaterial?: string;
  /** 阀芯 - 材质 */
  switchValveCoreMaterial?: string;
  /** 阀杆 - 材质 */
  switchValveStemMaterial?: string;
  /** 阀内件 - 流量特性 */
  switchValveFlowChar?: string;
  /** 阀内件 - 泄漏等级 */
  switchValveLeakClass?: string;
  /** 执行机构 - 类型 */
  switchValveActuatorType?: string;
  /** 执行机构 - 形式规格 */
  switchValveActuatorModel?: string;
  /** 执行机构 - 厂家 */
  switchValveActuatorManu?: string;
  /** 执行机构 - 作用形式 */
  switchValveActuatorAction?: string;
  /** 执行机构 - 行程 */
  switchValveActuatorStroke?: string;
  /** 执行机构 - 弹簧范围 */
  switchValveSpringRange?: string;
  /** 执行机构 - 气源压力 */
  switchValveAirPress?: string;
  /** 执行机构 - 故障位置 */
  switchValveFaultPos?: string;
  /** 执行机构 - 关闭时间 */
  switchValveCloseTime?: Date;
  /** 执行机构 - 开启时间 */
  switchValveOpenTime?: Date;
  /** 备注 */
  switchValveRemark?: string;
  /** s设备类型 */
  dvType?: string;
  /** 所属工厂 */
  factory?: string;
}
