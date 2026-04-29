import request from "@/utils/request";

const SECOMPRESSOR_BASE_URL = "/api/v1/se-compressor";

const SeCompressorAPI = {
  /** 获取特种设备压缩机台账分页数据 */
  getPage(queryParams?: SeCompressorPageQuery) {
    return request<any, PageResult<SeCompressorPageVO[]>>({
      url: `${SECOMPRESSOR_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取特种设备压缩机台账表单数据
   *
   * @param id 特种设备压缩机台账ID
   * @returns 特种设备压缩机台账表单数据
   */
  getFormData(id: number) {
    return request<any, SeCompressorForm>({
      url: `${SECOMPRESSOR_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加特种设备压缩机台账
   *
   *  @param data 特种设备压缩机台账表单数据
   */
  create(data: SeCompressorForm) {
    return request({
      url: `${SECOMPRESSOR_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新特种设备压缩机台账
   *
   * @param id 特种设备压缩机台账ID
   * @param data 特种设备压缩机台账表单数据
   */
  update(id: string, data: SeCompressorForm) {
    return request({
      url: `${SECOMPRESSOR_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除特种设备压缩机台账，多个以英文逗号(,)分割
   *
   * @param ids 特种设备压缩机台账ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SECOMPRESSOR_BASE_URL}/${ids}`,
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
      url: `${SECOMPRESSOR_BASE_URL}/export`,
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
      url: `${SECOMPRESSOR_BASE_URL}/import`,
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
      url: `${SECOMPRESSOR_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SeCompressorAPI;

/** 特种设备压缩机台账分页查询参数 */
export interface SeCompressorPageQuery extends PageQuery {
  /** 压缩机设备编号 */
  seCompressorEquipCode?: string;
  /** 设备名称 */
  seCompressorName?: string;
  /** 设备状态 */
  seCompressorStatus?: string;
  /** 所属工厂 */
  seCompressorFactory?: string;
}

/** 特种设备压缩机台账表单对象 */
export interface SeCompressorForm {
  /** 序号 */
  id?: number;
  /** 压缩机设备编号 */
  seCompressorEquipCode?: string;
  /** 设备名称 */
  seCompressorName?: string;
  /** 压缩机类型 */
  seCompressorType?: string;
  /** 规格型号 */
  seCompressorSpec?: string;
  /** 额定排气量（m³/min） */
  seCompressorRatedFlow?: string;
  /** 额定排气压力（MPa） */
  seCompressorRatedPressure?: string;
  /** 额定输入功率（kW） */
  seCompressorRatedPower?: string;
  /** 额定转速（r/min） */
  seCompressorRatedSpeed?: string;
  /** 输送介质 */
  seCompressorMedia?: string;
  /** 进气温度（℃） */
  seCompressorInletTemp?: string;
  /** 排气温度（℃） */
  seCompressorOutletTemp?: string;
  /** 设计压力（MPa） */
  seCompressorDesignP?: string;
  /** 主体 / 过流部件材质 */
  seCompressorMaterial?: string;
  /** 防爆等级 */
  seCompressorExplosionProof?: string;
  /** 配套电机型号 */
  seCompressorMotorModel?: string;
  /** 润滑方式及油品 */
  seCompressorLubrication?: string;
  /** 冷却方式（水冷 / 风冷） */
  seCompressorCoolingType?: string;
  /** 安装位置 */
  seCompressorInstallPos?: string;
  /** 投用日期 */
  seCompressorInService?: Date;
  /** 定期检验周期 */
  seCompressorInspectCycle?: string;
  /** 上次检验日期 */
  seCompressorLastInspect?: Date;
  /** 下次检验日期 */
  seCompressorNextInspect?: Date;
  /** 检验结果 */
  seCompressorInspectResult?: string;
  /** 上次维保日期 */
  seCompressorLastMaintain?: string;
  /** 下次维保日期 */
  seCompressorNextMaintain?: string;
  /** 运行振动值（mm/s） */
  seCompressorVibration?: string;
  /** 压缩比 */
  seCompressorPressureRatio?: string;
  /** 维保维修记录 */
  seCompressorMaintainRecord?: string;
  /** 故障及异常记录 */
  seCompressorFaultRecord?: string;
  /** 录入维护人员 */
  seCompressorOperator?: string;
  /** 记录创建时间 */
  seCompressorCreateTime?: Date;
  /** 最后更新时间 */
  seCompressorUpdateTime?: Date;
  /** 设备状态 */
  seCompressorStatus?: string;
  /** 所属工厂 */
  seCompressorFactory?: string;
  /** 备用1 */
  seCompressorReserve1?: string;
  /** 备用2 */
  seCompressorReserve2?: string;
  /** 备用3 */
  seCompressorReserve3?: string;
}

/** 特种设备压缩机台账分页对象 */
export interface SeCompressorPageVO {
  /** 序号 */
  id?: number;
  /** 压缩机设备编号 */
  seCompressorEquipCode?: string;
  /** 设备名称 */
  seCompressorName?: string;
  /** 压缩机类型 */
  seCompressorType?: string;
  /** 规格型号 */
  seCompressorSpec?: string;
  /** 额定排气量（m³/min） */
  seCompressorRatedFlow?: string;
  /** 额定排气压力（MPa） */
  seCompressorRatedPressure?: string;
  /** 额定输入功率（kW） */
  seCompressorRatedPower?: string;
  /** 额定转速（r/min） */
  seCompressorRatedSpeed?: string;
  /** 输送介质 */
  seCompressorMedia?: string;
  /** 进气温度（℃） */
  seCompressorInletTemp?: string;
  /** 排气温度（℃） */
  seCompressorOutletTemp?: string;
  /** 设计压力（MPa） */
  seCompressorDesignP?: string;
  /** 主体 / 过流部件材质 */
  seCompressorMaterial?: string;
  /** 防爆等级 */
  seCompressorExplosionProof?: string;
  /** 配套电机型号 */
  seCompressorMotorModel?: string;
  /** 润滑方式及油品 */
  seCompressorLubrication?: string;
  /** 冷却方式（水冷 / 风冷） */
  seCompressorCoolingType?: string;
  /** 安装位置 */
  seCompressorInstallPos?: string;
  /** 投用日期 */
  seCompressorInService?: Date;
  /** 定期检验周期 */
  seCompressorInspectCycle?: string;
  /** 上次检验日期 */
  seCompressorLastInspect?: Date;
  /** 下次检验日期 */
  seCompressorNextInspect?: Date;
  /** 检验结果 */
  seCompressorInspectResult?: string;
  /** 上次维保日期 */
  seCompressorLastMaintain?: string;
  /** 下次维保日期 */
  seCompressorNextMaintain?: string;
  /** 运行振动值（mm/s） */
  seCompressorVibration?: string;
  /** 压缩比 */
  seCompressorPressureRatio?: string;
  /** 维保维修记录 */
  seCompressorMaintainRecord?: string;
  /** 故障及异常记录 */
  seCompressorFaultRecord?: string;
  /** 录入维护人员 */
  seCompressorOperator?: string;
  /** 记录创建时间 */
  seCompressorCreateTime?: Date;
  /** 最后更新时间 */
  seCompressorUpdateTime?: Date;
  /** 设备状态 */
  seCompressorStatus?: string;
  /** 所属工厂 */
  seCompressorFactory?: string;
  /** 备用1 */
  seCompressorReserve1?: string;
  /** 备用2 */
  seCompressorReserve2?: string;
  /** 备用3 */
  seCompressorReserve3?: string;
}
