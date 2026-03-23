import request from "@/utils/request";

const RADIATIONINSTRUMENT_BASE_URL = "/api/v1/radiation-instrument";

const RadiationInstrumentAPI = {
  /** 获取放射仪分页数据 */
  getPage(queryParams?: RadiationInstrumentPageQuery) {
    return request<any, PageResult<RadiationInstrumentPageVO[]>>({
      url: `${RADIATIONINSTRUMENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取放射仪表单数据
   *
   * @param id 放射仪ID
   * @returns 放射仪表单数据
   */
  getFormData(id: number) {
    return request<any, RadiationInstrumentForm>({
      url: `${RADIATIONINSTRUMENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加放射仪
   *
   *  @param data 放射仪表单数据
   */
  create(data: RadiationInstrumentForm) {
    return request({
      url: `${RADIATIONINSTRUMENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新放射仪
   *
   * @param id 放射仪ID
   * @param data 放射仪表单数据
   */
  update(id: string, data: RadiationInstrumentForm) {
    return request({
      url: `${RADIATIONINSTRUMENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除放射仪，多个以英文逗号(,)分割
   *
   * @param ids 放射仪ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${RADIATIONINSTRUMENT_BASE_URL}/${ids}`,
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
      url: `${RADIATIONINSTRUMENT_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  /**
   * 导入压力表
   *
   * @param file 导入文件
   */
  import(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, ExcelResult>({
      url: `${RADIATIONINSTRUMENT_BASE_URL}/import`,
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
      url: `${RADIATIONINSTRUMENT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default RadiationInstrumentAPI;

/** 放射仪分页查询参数 */
export interface RadiationInstrumentPageQuery extends PageQuery {
  instrumentName?: string;
  tagNumber?: string;
  radioactiveStatus?: number;
  /** 所属工厂 */
  factory?: string;
}

/** 放射仪表单对象 */
export interface RadiationInstrumentForm {
  /** 序号 */
  id?: number;
  /** 装置名称 */
  unitName?: string;
  /** 位号 */
  tagNumber?: string;
  /** 仪表名称 */
  instrumentName?: string;
  /** 射源位号 */
  sourceTagNumber?: string;
  /** 射源形式 */
  sourceForm?: string;
  /** 材质 */
  material?: string;
  /** 强度 */
  strength?: string;
  /** 供电 */
  powerSupply?: string;
  /** 输出信号 */
  outputSignal?: string;
  /** 测量范围 */
  measuringRange?: string;
  /** 精度 */
  accuracy?: string;
  /** 是否联锁（是 / 否） */
  whetherInterlocked?: number;
  /** 联锁设定值 */
  interlockSetpoint?: string;
  /** 安装位置及用途 */
  installationLocationAndPurpose?: string;
  /** 规格型号 */
  specificationModel?: string;
  /** 生产厂家 */
  manufacturer?: string;
  /** 状态 */
  radioactiveStatus?: number;
}

/** 放射仪分页对象 */
export interface RadiationInstrumentPageVO {
  /** 序号 */
  id?: number;
  /** 装置名称 */
  unitName?: string;
  /** 位号 */
  tagNumber?: string;
  /** 仪表名称 */
  instrumentName?: string;
  /** 射源位号 */
  sourceTagNumber?: string;
  /** 射源形式 */
  sourceForm?: string;
  /** 材质 */
  material?: string;
  /** 强度 */
  strength?: string;
  /** 供电 */
  powerSupply?: string;
  /** 输出信号 */
  outputSignal?: string;
  /** 测量范围 */
  measuringRange?: string;
  /** 精度 */
  accuracy?: string;
  /** 是否联锁（是 / 否） */
  whetherInterlocked?: number;
  /** 联锁设定值 */
  interlockSetpoint?: string;
  /** 安装位置及用途 */
  installationLocationAndPurpose?: string;
  /** 规格型号 */
  specificationModel?: string;
  /** 生产厂家 */
  manufacturer?: string;
  /** 状态 */
  radioactiveStatus?: number;
}
