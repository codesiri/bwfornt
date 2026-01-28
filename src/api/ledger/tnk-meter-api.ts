import request from "@/utils/request";

const TNKMETER_BASE_URL = "/api/v1/tnk-meter";

const TnkMeterAPI = {
  /** 获取罐区仪分页数据 */
  getPage(queryParams?: TnkMeterPageQuery) {
    return request<any, PageResult<TnkMeterPageVO[]>>({
      url: `${TNKMETER_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取罐区仪表单数据
   *
   * @param id 罐区仪ID
   * @returns 罐区仪表单数据
   */
  getFormData(id: number) {
    return request<any, TnkMeterForm>({
      url: `${TNKMETER_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加罐区仪
   *
   *  @param data 罐区仪表单数据
   */
  create(data: TnkMeterForm) {
    return request({
      url: `${TNKMETER_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新罐区仪
   *
   * @param id 罐区仪ID
   * @param data 罐区仪表单数据
   */
  update(id: string, data: TnkMeterForm) {
    return request({
      url: `${TNKMETER_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除罐区仪，多个以英文逗号(,)分割
   *
   * @param ids 罐区仪ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${TNKMETER_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /**
   * 罐区仪导出
   *
   * @param queryParams 查询参数
   */
  export(queryParams: any) {
    return request({
      url: `${TNKMETER_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  /** 下载用户导入模板 */
  downloadTemplate() {
    return request({
      url: `${TNKMETER_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
  importFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, ExcelResult>({
      url: `${TNKMETER_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default TnkMeterAPI;

/** 罐区仪分页查询参数 */
export interface TnkMeterPageQuery extends PageQuery {
  /** 仪表位号 */
  tnkMeterTag?: string;
  /** 设备状态 */
  status?: number;
  /** 设备类型 */
  dvType?: string;
}

/** 罐区仪表单对象 */
export interface TnkMeterForm {
  /** 序号 */
  id?: number;
  /** 仪表位号 */
  tnkMeterTag?: string;
  /** 装置 */
  tnkMeterDev?: string;
  /** 用途 */
  tnkMeterPurp?: string;
  /** 回路分类 */
  tnkMeterLoop?: string;
  /** 仪表名称 */
  tnkMeterName?: string;
  /** 型号 */
  tnkMeterModel?: string;
  /** 规格 */
  tnkMeterSpec?: string;
  /** 量程 */
  tnkMeterRange?: string;
  /** 厂家 */
  tnkMeterManu?: string;
  /** 测量值 */
  tnkMeterMeas?: string;
  /** 工艺介质 */
  tnkMeterMedProc?: string;
  /** 介质状态 */
  tnkMeterMedStat?: number;
  /** 压力（Kpa） */
  tnkMeterPress?: string;
  /** 温度（℃） */
  tnkMeterTemp?: string;
  /** 公称通径 */
  tnkMeterNomDia?: string;
  /** 故障压力 */
  tnkMeterFaultPress?: string;
  /** 泄露状态 */
  tnkMeterLeakStat?: number;
  /** 等级 */
  tnkMeterLeakLv?: string;
  /** 检查时间 */
  tnkMeterChkTime?: Date;
  /** 检查周期 */
  tnkMeterChkCycle?: string;
  /** 出厂编号 */
  tnkMeterFactoryNo?: string;
  /** 备注 */
  tnkMeterRemark?: string;
  /** 设备状态 */
  status?: number;
  /** 设备类型 */
  dvType?: string;
}

/** 罐区仪分页对象 */
export interface TnkMeterPageVO {
  /** 仪表位号 */
  tnkMeterTag?: string;
  /** 装置 */
  tnkMeterDev?: string;
  /** 用途 */
  tnkMeterPurp?: string;
  /** 回路分类 */
  tnkMeterLoop?: string;
  /** 仪表名称 */
  tnkMeterName?: string;
  /** 型号 */
  tnkMeterModel?: string;
  /** 规格 */
  tnkMeterSpec?: string;
  /** 量程 */
  tnkMeterRange?: string;
  /** 厂家 */
  tnkMeterManu?: string;
  /** 测量值 */
  tnkMeterMeas?: string;
  /** 工艺介质 */
  tnkMeterMedProc?: string;
  /** 介质状态 */
  tnkMeterMedStat?: number;
  /** 压力（Kpa） */
  tnkMeterPress?: string;
  /** 温度（℃） */
  tnkMeterTemp?: string;
  /** 公称通径 */
  tnkMeterNomDia?: string;
  /** 故障压力 */
  tnkMeterFaultPress?: string;
  /** 泄露状态 */
  tnkMeterLeakStat?: number;
  /** 等级 */
  tnkMeterLeakLv?: string;
  /** 检查时间 */
  tnkMeterChkTime?: Date;
  /** 检查周期 */
  tnkMeterChkCycle?: string;
  /** 出厂编号 */
  tnkMeterFactoryNo?: string;
  /** 备注 */
  tnkMeterRemark?: string;
  /** 设备状态 */
  status?: number;
  /** 设备类型 */
  dvType?: string;
}
