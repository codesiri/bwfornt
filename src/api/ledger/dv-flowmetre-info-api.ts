import request from "@/utils/request";

const DVFLOWMETREINFO_BASE_URL = "/api/v1/dv-flowmetre-info";

const DvFlowmetreInfoAPI = {
  /** 获取流量计分页数据 */
  getPage(queryParams?: DvFlowmetreInfoPageQuery) {
    return request<any, PageResult<DvFlowmetreInfoPageVO[]>>({
      url: `${DVFLOWMETREINFO_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取流量计表单数据
   *
   * @param id 流量计ID
   * @returns 流量计表单数据
   */
  getFormData(id: number) {
    return request<any, DvFlowmetreInfoForm>({
      url: `${DVFLOWMETREINFO_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加流量计
   *
   *  @param data 流量计表单数据
   */
  create(data: DvFlowmetreInfoForm) {
    return request({
      url: `${DVFLOWMETREINFO_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新流量计
   *
   * @param id 流量计ID
   * @param data 流量计表单数据
   */
  update(id: number, data: DvFlowmetreInfoForm) {
    return request({
      url: `${DVFLOWMETREINFO_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除流量计，多个以英文逗号(,)分割
   *
   * @param ids 流量计ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${DVFLOWMETREINFO_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
  /**
   * 压力表导出
   *
   * @param queryParams 查询参数
   */
  export(queryParams: any) {
    return request({
      url: `${DVFLOWMETREINFO_BASE_URL}/export`,
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
      url: `${DVFLOWMETREINFO_BASE_URL}/downtemplate`,
      method: "get",
      responseType: "blob",
    });
  },
  importFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, ExcelResult>({
      url: `${DVFLOWMETREINFO_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default DvFlowmetreInfoAPI;

/** 流量计分页查询参数 */
export interface DvFlowmetreInfoPageQuery extends PageQuery {
  /** 仪表位号 */
  tagNumber?: string;
  /** 仪表名称 */
  instrumentName?: string;
  /** 设备状态 */
  status?: number;
  /** 设备类型 */
  dvType?: string;
}

/** 流量计表单对象 */
export interface DvFlowmetreInfoForm {
  id?: number;
  /** 仪表位号 */
  tagNumber?: string;
  /** 装置 */
  device?: string;
  /** 用途 */
  purpose?: string;
  /** 仪表名称 */
  instrumentName?: string;
  /** 量程 */
  measurementRange?: string;
  /** 厂家 */
  manufacturer?: string;
  /** 工艺介质-介质 */
  medium?: string;
  /** 工艺介质-状态 */
  mediumStatus?: number;
  /** 工艺介质-压力 */
  mediumPressure?: string;
  /** 工艺介质-温度 */
  mediumTemperature?: string;
  /** 出厂编号 */
  factoryNumber?: string;
  /** 备注 */
  remark?: string;
  /** 设备状态 */
  status?: number;
  /** 设备类型 */
  dvType?: string;
}

/** 流量计分页对象 */
export interface DvFlowmetreInfoPageVO {
  id?: number;
  /** 仪表位号 */
  tagNumber?: string;
  /** 装置 */
  device?: string;
  /** 用途 */
  purpose?: string;
  /** 仪表名称 */
  instrumentName?: string;
  /** 量程 */
  measurementRange?: string;
  /** 厂家 */
  manufacturer?: string;
  /** 工艺介质-介质 */
  medium?: string;
  /** 工艺介质-状态 */
  mediumStatus?: number;
  /** 工艺介质-压力 */
  mediumPressure?: string;
  /** 工艺介质-温度 */
  mediumTemperature?: string;
  /** 出厂编号 */
  factoryNumber?: string;
  /** 备注 */
  remark?: string;
  /** 设备状态 */
  status?: number;
  /** 设备类型 */
  dvType?: string;
}
