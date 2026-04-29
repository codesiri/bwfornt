import request from "@/utils/request";

const SEEXPANDER_BASE_URL = "/api/v1/se-expander";

const SeExpanderAPI = {
  /** 获取特种设备膨胀机台账分页数据 */
  getPage(queryParams?: SeExpanderPageQuery) {
    return request<any, PageResult<SeExpanderPageVO[]>>({
      url: `${SEEXPANDER_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取特种设备膨胀机台账表单数据
   *
   * @param id 特种设备膨胀机台账ID
   * @returns 特种设备膨胀机台账表单数据
   */
  getFormData(id: number) {
    return request<any, SeExpanderForm>({
      url: `${SEEXPANDER_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加特种设备膨胀机台账
   *
   *  @param data 特种设备膨胀机台账表单数据
   */
  create(data: SeExpanderForm) {
    return request({
      url: `${SEEXPANDER_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新特种设备膨胀机台账
   *
   * @param id 特种设备膨胀机台账ID
   * @param data 特种设备膨胀机台账表单数据
   */
  update(id: string, data: SeExpanderForm) {
    return request({
      url: `${SEEXPANDER_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除特种设备膨胀机台账，多个以英文逗号(,)分割
   *
   * @param ids 特种设备膨胀机台账ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SEEXPANDER_BASE_URL}/${ids}`,
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
      url: `${SEEXPANDER_BASE_URL}/export`,
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
      url: `${SEEXPANDER_BASE_URL}/import`,
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
      url: `${SEEXPANDER_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SeExpanderAPI;

/** 特种设备膨胀机台账分页查询参数 */
export interface SeExpanderPageQuery extends PageQuery {
  /** 膨胀机设备编号 */
  seExpanderEquipCode?: string;
  /** 设备名称 */
  seExpanderName?: string;
  /** 设备状态 */
  seExpanderStatus?: string;
  /** 所属工厂 */
  seExpanderFactory?: string;
}

/** 特种设备膨胀机台账表单对象 */
export interface SeExpanderForm {
  /** 序号 */
  id?: number;
  /** 膨胀机设备编号 */
  seExpanderEquipCode?: string;
  /** 设备名称 */
  seExpanderName?: string;
  /** 设备类型 */
  seExpanderType?: string;
  /** 规格型号 */
  seExpanderSpec?: string;
  /** 额定功率 */
  seExpanderRatedPower?: string;
  /** 额定转速 */
  seExpanderRatedSpeed?: string;
  /** 进口压力 */
  seExpanderInletP?: string;
  /** 进口温度 */
  seExpanderInletT?: string;
  /** 出口压力 */
  seExpanderOutletP?: string;
  /** 出口温度 */
  seExpanderOutletT?: string;
  /** 工作介质 */
  seExpanderMedia?: string;
  /** 主体材质 */
  seExpanderMaterial?: string;
  /** 防爆等级 */
  seExpanderExplosionProof?: string;
  /** 联轴器类型 */
  seExpanderCouplingType?: string;
  /** 轴承类型 */
  seExpanderBearingType?: string;
  /** 润滑方式及油品 */
  seExpanderLubrication?: string;
  /** 安装位置 */
  seExpanderInstallPos?: string;
  /** 投用日期 */
  seExpanderInService?: string;
  /** 定期检验周期 */
  seExpanderInspectCycle?: string;
  /** 上次检验日期 */
  seExpanderLastInspect?: string;
  /** 下次检验日期 */
  seExpanderNextInspect?: string;
  /** 检验结果 */
  seExpanderInspectResult?: string;
  /** 上次润滑日期 */
  seExpanderLastLubricate?: string;
  /** 下次润滑日期 */
  seExpanderNextLubricate?: string;
  /** 运行振动值 */
  seExpanderVibration?: string;
  /** 膨胀机运行效率 */
  seExpanderEfficiency?: string;
  /** 维保维修记录 */
  seExpanderMaintainRecord?: string;
  /** 故障及异常记录 */
  seExpanderFaultRecord?: string;
  /** 录入 / 维护人员 */
  seExpanderOperator?: string;
  /** 创建时间 */
  seExpanderCreateTime?: Date;
  /** 最后更新时间 */
  seExpanderUpdateTime?: Date;
  /** 设备状态 */
  seExpanderStatus?: string;
  /** 所属工厂 */
  seExpanderFactory?: string;
  /** 备用1 */
  seExpanderReserve1?: string;
  /** 备用2 */
  seExpanderReserve2?: string;
  /** 备用3 */
  seExpanderReserve3?: string;
}

/** 特种设备膨胀机台账分页对象 */
export interface SeExpanderPageVO {
  /** 序号 */
  id?: number;
  /** 膨胀机设备编号 */
  seExpanderEquipCode?: string;
  /** 设备名称 */
  seExpanderName?: string;
  /** 设备类型 */
  seExpanderType?: string;
  /** 规格型号 */
  seExpanderSpec?: string;
  /** 额定功率 */
  seExpanderRatedPower?: string;
  /** 额定转速 */
  seExpanderRatedSpeed?: string;
  /** 进口压力 */
  seExpanderInletP?: string;
  /** 进口温度 */
  seExpanderInletT?: string;
  /** 出口压力 */
  seExpanderOutletP?: string;
  /** 出口温度 */
  seExpanderOutletT?: string;
  /** 工作介质 */
  seExpanderMedia?: string;
  /** 主体材质 */
  seExpanderMaterial?: string;
  /** 防爆等级 */
  seExpanderExplosionProof?: string;
  /** 联轴器类型 */
  seExpanderCouplingType?: string;
  /** 轴承类型 */
  seExpanderBearingType?: string;
  /** 润滑方式及油品 */
  seExpanderLubrication?: string;
  /** 安装位置 */
  seExpanderInstallPos?: string;
  /** 投用日期 */
  seExpanderInService?: string;
  /** 定期检验周期 */
  seExpanderInspectCycle?: string;
  /** 上次检验日期 */
  seExpanderLastInspect?: string;
  /** 下次检验日期 */
  seExpanderNextInspect?: string;
  /** 检验结果 */
  seExpanderInspectResult?: string;
  /** 上次润滑日期 */
  seExpanderLastLubricate?: string;
  /** 下次润滑日期 */
  seExpanderNextLubricate?: string;
  /** 运行振动值 */
  seExpanderVibration?: string;
  /** 膨胀机运行效率 */
  seExpanderEfficiency?: string;
  /** 维保维修记录 */
  seExpanderMaintainRecord?: string;
  /** 故障及异常记录 */
  seExpanderFaultRecord?: string;
  /** 录入 / 维护人员 */
  seExpanderOperator?: string;
  /** 创建时间 */
  seExpanderCreateTime?: Date;
  /** 最后更新时间 */
  seExpanderUpdateTime?: Date;
  /** 设备状态 */
  seExpanderStatus?: string;
  /** 所属工厂 */
  seExpanderFactory?: string;
  /** 备用1 */
  seExpanderReserve1?: string;
  /** 备用2 */
  seExpanderReserve2?: string;
  /** 备用3 */
  seExpanderReserve3?: string;
}
