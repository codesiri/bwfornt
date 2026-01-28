import request from "@/utils/request";

const UNITSPECIALINSTRUMENTS_BASE_URL = "/api/v1/unit-special-instruments";

const UnitSpecialInstrumentsAPI = {
  /** 获取机组特殊仪分页数据 */
  getPage(queryParams?: UnitSpecialInstrumentsPageQuery) {
    return request<any, PageResult<UnitSpecialInstrumentsPageVO[]>>({
      url: `${UNITSPECIALINSTRUMENTS_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取机组特殊仪表单数据
   *
   * @param id 机组特殊仪ID
   * @returns 机组特殊仪表单数据
   */
  getFormData(id: number) {
    return request<any, UnitSpecialInstrumentsForm>({
      url: `${UNITSPECIALINSTRUMENTS_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加机组特殊仪
   *
   *  @param data 机组特殊仪表单数据
   */
  create(data: UnitSpecialInstrumentsForm) {
    return request({
      url: `${UNITSPECIALINSTRUMENTS_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新机组特殊仪
   *
   * @param id 机组特殊仪ID
   * @param data 机组特殊仪表单数据
   */
  update(id: string, data: UnitSpecialInstrumentsForm) {
    return request({
      url: `${UNITSPECIALINSTRUMENTS_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除机组特殊仪，多个以英文逗号(,)分割
   *
   * @param ids 机组特殊仪ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${UNITSPECIALINSTRUMENTS_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
  /**
   * 表导出
   *
   * @param queryParams 查询参数
   */
  export(queryParams: { pressureTag: string; pressureDevice: string }) {
    return request({
      url: `${UNITSPECIALINSTRUMENTS_BASE_URL}/export`,
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
      url: `${UNITSPECIALINSTRUMENTS_BASE_URL}/import`,
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
      url: `${UNITSPECIALINSTRUMENTS_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default UnitSpecialInstrumentsAPI;

/** 机组特殊仪分页查询参数 */
export interface UnitSpecialInstrumentsPageQuery extends PageQuery {
  tagNumber: string;
  instrumentName: string;
  status?: string;
}

/** 机组特殊仪表单对象 */
export interface UnitSpecialInstrumentsForm {
  /** 序号 */
  id?: number;
  /** 位号 */
  tagNumber?: string;
  /** 仪表名称 */
  instrumentName?: string;
  /** 设备名称 */
  deviceName?: string;
  /** 装置 */
  device?: string;
  /** 安装位置及用途 */
  installationLocation?: string;
  /** 规格型号 */
  specificationModel?: string;
  /** 量程 */
  measurementRange?: string;
  /** 数量 */
  quantity?: string;
  /** 厂家 */
  manufacturer?: string;
  status?: number;
  dvType?: string;
  /** 编号 */
  unitSpecialCode?: string;
}

/** 机组特殊仪分页对象 */
export interface UnitSpecialInstrumentsPageVO {
  /** 序号 */
  id?: number;
  /** 位号 */
  tagNumber?: string;
  /** 仪表名称 */
  instrumentName?: string;
  /** 设备名称 */
  deviceName?: string;
  /** 装置 */
  device?: string;
  /** 安装位置及用途 */
  installationLocation?: string;
  /** 规格型号 */
  specificationModel?: string;
  /** 量程 */
  measurementRange?: string;
  /** 数量 */
  quantity?: string;
  /** 厂家 */
  manufacturer?: string;
  status?: number;
  dvType?: string;
  /** 编号 */
  unitSpecialCode?: string;
}
