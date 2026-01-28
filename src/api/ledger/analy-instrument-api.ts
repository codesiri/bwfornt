import request from "@/utils/request";

const ANALYINSTRUMENT_BASE_URL = "/api/v1/analy-instrument";

const AnalyInstrumentAPI = {
  /** 获取分析仪分页数据 */
  getPage(queryParams?: AnalyInstrumentPageQuery) {
    return request<any, PageResult<AnalyInstrumentPageVO[]>>({
      url: `${ANALYINSTRUMENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取分析仪表单数据
   *
   * @param id 分析仪ID
   * @returns 分析仪表单数据
   */
  getFormData(id: number) {
    return request<any, AnalyInstrumentForm>({
      url: `${ANALYINSTRUMENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加分析仪
   *
   *  @param data 分析仪表单数据
   */
  create(data: AnalyInstrumentForm) {
    return request({
      url: `${ANALYINSTRUMENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新分析仪
   *
   * @param id 分析仪ID
   * @param data 分析仪表单数据
   */
  update(id: string, data: AnalyInstrumentForm) {
    return request({
      url: `${ANALYINSTRUMENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除分析仪，多个以英文逗号(,)分割
   *
   * @param ids 分析仪ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ANALYINSTRUMENT_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
  export(queryParams: any) {
    return request({
      url: `${ANALYINSTRUMENT_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  /**
   * 下载流量计导入模板
   */
  downloadTemplate() {
    return request({
      url: `${ANALYINSTRUMENT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
  importFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, ExcelResult>({
      url: `${ANALYINSTRUMENT_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default AnalyInstrumentAPI;

/** 分析仪分页查询参数 */
export interface AnalyInstrumentPageQuery extends PageQuery {
  /** 设备位号 */
  analyInstrumentCode?: string;
  /** 设备类型 */
  analyInstrumentType?: string;
  /** 设备大类 */
  analyInstrumentBig?: string;
  /** 设备状态 */
  analyInstrumentStatus?: number;
  /** 是否参与检测 */
  analyInstrumentMonitor?: number;
  /** 是否参与联锁 */
  analyInstrumentLock?: string;
}

/** 分析仪表单对象 */
export interface AnalyInstrumentForm {
  /** 序号 */
  id?: number;
  /** 设备位号 */
  analyInstrumentCode?: string;
  /** 用途(原设备用途) */
  analyInstrumentPurpose?: string;
  /** 所属部门 */
  analyInstrumentDept?: string;
  /** 设备类型 */
  analyInstrumentType?: string;
  /** 设备大类 */
  analyInstrumentBig?: string;
  /** 设备状态 */
  analyInstrumentStatus?: number;
  /** 装置 */
  analyInstrumentPlant?: string;
  /** 单元 */
  analyInstrumentUnit?: string;
  /** 是否参与检测 */
  analyInstrumentMonitor?: number;
  /** 是否参与联锁 */
  analyInstrumentLock?: string;
  /** 联锁值 */
  analyInstrumentLinkVal?: string;
  /** 报警值 */
  analyInstrumentAlarmVal?: string;
  /** 设备名称 */
  analyInstrumentName?: string;
  /** 工艺介质 */
  analyInstrumentProcess?: string;
  /** 操作温度 */
  analyInstrumentOpTemp?: string;
  /** 操作压力 */
  analyInstrumentOpPress?: string;
  /** 测量范围 */
  analyInstrumentRange?: string;
  /** 单位 */
  analyInstrumentMeasUnit?: string;
  /** 台件数 */
  analyInstrumentSet?: string;
  /** 回路数 */
  analyInstrumentCircuit?: string;
  /** 供应商 */
  analyInstrumentSupplier?: string;
  /** 生产日期 */
  analyInstrumentProdDate?: Date;
  /** 投用日期 */
  analyInstrumentUseDate?: Date;
  /** 质保日期 */
  analyInstrumentGuaranteeDate?: Date;
  /** 是否质保期内(0/1) */
  analyInstrumentMaintainFlag?: number;
  /** 润滑周期 */
  analyInstrumentLubePeriod?: string;
  /** 润滑日期 */
  analyInstrumentLubeDate?: Date;
  /** 供电电压 */
  analyInstrumentVoltage?: string;
  /** 防爆等级 */
  analyInstrumentExplosion?: string;
  /** 防护等级 */
  analyInstrumentProtection?: string;
  /** 生产厂家 */
  analyInstrumentManufacturer?: string;
  /** 规格型号 */
  analyInstrumentSpec?: string;
  /** 定修时间 */
  analyInstrumentCalibDate?: Date;
}

/** 分析仪分页对象 */
export interface AnalyInstrumentPageVO {
  /** 序号 */
  id?: number;
  /** 设备位号 */
  analyInstrumentCode?: string;
  /** 用途(原设备用途) */
  analyInstrumentPurpose?: string;
  /** 所属部门 */
  analyInstrumentDept?: string;
  /** 设备类型 */
  analyInstrumentType?: string;
  /** 设备大类 */
  analyInstrumentBig?: string;
  /** 设备状态 */
  analyInstrumentStatus?: number;
  /** 装置 */
  analyInstrumentPlant?: string;
  /** 单元 */
  analyInstrumentUnit?: string;
  /** 是否参与检测 */
  analyInstrumentMonitor?: number;
  /** 是否参与联锁 */
  analyInstrumentLock?: string;
  /** 联锁值 */
  analyInstrumentLinkVal?: string;
  /** 报警值 */
  analyInstrumentAlarmVal?: string;
  /** 设备名称 */
  analyInstrumentName?: string;
  /** 工艺介质 */
  analyInstrumentProcess?: string;
  /** 操作温度 */
  analyInstrumentOpTemp?: string;
  /** 操作压力 */
  analyInstrumentOpPress?: string;
  /** 测量范围 */
  analyInstrumentRange?: string;
  /** 单位 */
  analyInstrumentMeasUnit?: string;
  /** 台件数 */
  analyInstrumentSet?: string;
  /** 回路数 */
  analyInstrumentCircuit?: string;
  /** 供应商 */
  analyInstrumentSupplier?: string;
  /** 生产日期 */
  analyInstrumentProdDate?: Date;
  /** 投用日期 */
  analyInstrumentUseDate?: Date;
  /** 质保日期 */
  analyInstrumentGuaranteeDate?: Date;
  /** 是否质保期内(0/1) */
  analyInstrumentMaintainFlag?: number;
  /** 润滑周期 */
  analyInstrumentLubePeriod?: string;
  /** 润滑日期 */
  analyInstrumentLubeDate?: Date;
  /** 供电电压 */
  analyInstrumentVoltage?: string;
  /** 防爆等级 */
  analyInstrumentExplosion?: string;
  /** 防护等级 */
  analyInstrumentProtection?: string;
  /** 生产厂家 */
  analyInstrumentManufacturer?: string;
  /** 规格型号 */
  analyInstrumentSpec?: string;
  /** 定修时间 */
  analyInstrumentCalibDate?: Date;
}
