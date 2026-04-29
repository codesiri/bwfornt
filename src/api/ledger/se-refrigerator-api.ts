import request from "@/utils/request";

const SEREFRIGERATOR_BASE_URL = "/api/v1/se-refrigerator";

const SeRefrigeratorAPI = {
  /** 获取特种设备制冷机台账分页数据 */
  getPage(queryParams?: SeRefrigeratorPageQuery) {
    return request<any, PageResult<SeRefrigeratorPageVO[]>>({
      url: `${SEREFRIGERATOR_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取特种设备制冷机台账表单数据
   *
   * @param id 特种设备制冷机台账ID
   * @returns 特种设备制冷机台账表单数据
   */
  getFormData(id: number) {
    return request<any, SeRefrigeratorForm>({
      url: `${SEREFRIGERATOR_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加特种设备制冷机台账
   *
   *  @param data 特种设备制冷机台账表单数据
   */
  create(data: SeRefrigeratorForm) {
    return request({
      url: `${SEREFRIGERATOR_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新特种设备制冷机台账
   *
   * @param id 特种设备制冷机台账ID
   * @param data 特种设备制冷机台账表单数据
   */
  update(id: string, data: SeRefrigeratorForm) {
    return request({
      url: `${SEREFRIGERATOR_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除特种设备制冷机台账，多个以英文逗号(,)分割
   *
   * @param ids 特种设备制冷机台账ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SEREFRIGERATOR_BASE_URL}/${ids}`,
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
      url: `${SEREFRIGERATOR_BASE_URL}/export`,
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
      url: `${SEREFRIGERATOR_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /** 下载用户导入模板 */
  downloadTemplate() {
    return request({
      url: `${SEREFRIGERATOR_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SeRefrigeratorAPI;

/** 特种设备制冷机台账分页查询参数 */
export interface SeRefrigeratorPageQuery extends PageQuery {
  /** 制冷机设备编号 */
  seRefrigeratorEquipCode?: string;
  /** 制冷机设备名称 */
  seRefrigeratorName?: string;
  /** 设备状态 */
  seRefrigeratorStatus?: string;
  /** 所属工厂 */
  seRefrigeratorFactory?: string;
}

/** 特种设备制冷机台账表单对象 */
export interface SeRefrigeratorForm {
  /** 序号 */
  id?: number;
  /** 制冷机设备编号 */
  seRefrigeratorEquipCode?: string;
  /** 制冷机设备名称 */
  seRefrigeratorName?: string;
  /** 制冷机类型 */
  seRefrigeratorType?: string;
  /** 规格型号 */
  seRefrigeratorSpec?: string;
  /** 额定制冷量（kW） */
  seRefrigeratorCoolingCapacity?: string;
  /** 额定输入功率（kW） */
  seRefrigeratorRatedPower?: string;
  /** 蒸发温度（℃） */
  seRefrigeratorEvapTemp?: string;
  /** 冷凝温度（℃） */
  seRefrigeratorCondTemp?: string;
  /** 制冷剂类型 */
  seRefrigeratorRefrigerant?: string;
  /** 冷冻油型号及类型 */
  seRefrigeratorOilType?: string;
  /** 主体材质 */
  seRefrigeratorMaterial?: string;
  /** 防爆等级 */
  seRefrigeratorExplosionProof?: string;
  /** 配套电机型号 */
  seRefrigeratorMotorModel?: string;
  /** 冷却方式 */
  seRefrigeratorCoolingType?: string;
  /** 安装位置 */
  seRefrigeratorInstallPos?: string;
  /** 投用日期 */
  seRefrigeratorInService?: Date;
  /** 定期检验周期 */
  seRefrigeratorInspectCycle?: string;
  /** 上次检验日期 */
  seRefrigeratorLastInspect?: Date;
  /** 下次检验日期 */
  seRefrigeratorNextInspect?: Date;
  /** 检验结果 */
  seRefrigeratorInspectResult?: string;
  /** 上次维保日期 */
  seRefrigeratorLastMaintain?: Date;
  /** 下次维保日期 */
  seRefrigeratorNextMaintain?: Date;
  /** 上次气密性 / 泄漏检测日期 */
  seRefrigeratorLeakTest?: Date;
  /** 制冷系数（COP 值） */
  seRefrigeratorCoeff?: string;
  /** 维保维修记录 */
  seRefrigeratorMaintainRecord?: string;
  /** 故障及异常记录 */
  seRefrigeratorFaultRecord?: string;
  /** 录入 / 维护人员 */
  seRefrigeratorOperator?: string;
  /** 创建时间 */
  seRefrigeratorCreateTime?: Date;
  /** 最后更新时间 */
  seRefrigeratorUpdateTime?: Date;
  /** 所属工厂 */
  seRefrigeratorFactory?: string;
  /** 设备状态 */
  seRefrigeratorStatus?: string;
  /** 备用1 */
  seRefrigeratorReserve1?: string;
  /** 备用2 */
  seRefrigeratorReserve2?: string;
  /** 备用3 */
  seRefrigeratorReserve3?: string;
}

/** 特种设备制冷机台账分页对象 */
export interface SeRefrigeratorPageVO {
  /** 序号 */
  id?: number;
  /** 制冷机设备编号 */
  seRefrigeratorEquipCode?: string;
  /** 制冷机设备名称 */
  seRefrigeratorName?: string;
  /** 制冷机类型 */
  seRefrigeratorType?: string;
  /** 规格型号 */
  seRefrigeratorSpec?: string;
  /** 额定制冷量（kW） */
  seRefrigeratorCoolingCapacity?: string;
  /** 额定输入功率（kW） */
  seRefrigeratorRatedPower?: string;
  /** 蒸发温度（℃） */
  seRefrigeratorEvapTemp?: string;
  /** 冷凝温度（℃） */
  seRefrigeratorCondTemp?: string;
  /** 制冷剂类型 */
  seRefrigeratorRefrigerant?: string;
  /** 冷冻油型号及类型 */
  seRefrigeratorOilType?: string;
  /** 主体材质 */
  seRefrigeratorMaterial?: string;
  /** 防爆等级 */
  seRefrigeratorExplosionProof?: string;
  /** 配套电机型号 */
  seRefrigeratorMotorModel?: string;
  /** 冷却方式 */
  seRefrigeratorCoolingType?: string;
  /** 安装位置 */
  seRefrigeratorInstallPos?: string;
  /** 投用日期 */
  seRefrigeratorInService?: Date;
  /** 定期检验周期 */
  seRefrigeratorInspectCycle?: string;
  /** 上次检验日期 */
  seRefrigeratorLastInspect?: Date;
  /** 下次检验日期 */
  seRefrigeratorNextInspect?: Date;
  /** 检验结果 */
  seRefrigeratorInspectResult?: string;
  /** 上次维保日期 */
  seRefrigeratorLastMaintain?: Date;
  /** 下次维保日期 */
  seRefrigeratorNextMaintain?: Date;
  /** 上次气密性 / 泄漏检测日期 */
  seRefrigeratorLeakTest?: Date;
  /** 制冷系数（COP 值） */
  seRefrigeratorCoeff?: string;
  /** 维保维修记录 */
  seRefrigeratorMaintainRecord?: string;
  /** 故障及异常记录 */
  seRefrigeratorFaultRecord?: string;
  /** 录入 / 维护人员 */
  seRefrigeratorOperator?: string;
  /** 创建时间 */
  seRefrigeratorCreateTime?: Date;
  /** 最后更新时间 */
  seRefrigeratorUpdateTime?: Date;
  /** 所属工厂 */
  seRefrigeratorFactory?: string;
  /** 设备状态 */
  seRefrigeratorStatus?: string;
  /** 备用1 */
  seRefrigeratorReserve1?: string;
  /** 备用2 */
  seRefrigeratorReserve2?: string;
  /** 备用3 */
  seRefrigeratorReserve3?: string;
}
