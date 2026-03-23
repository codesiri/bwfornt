import request from "@/utils/request";

const ELECTRICCABINETDOCUMENT_BASE_URL = "/api/v1/electric-cabinet-document";

const ElectricCabinetDocumentAPI = {
  /** 获取抽屉柜相关资料归档分页数据 */
  getPage(queryParams?: ElectricCabinetDocumentPageQuery) {
    return request<any, PageResult<ElectricCabinetDocumentPageVO[]>>({
      url: `${ELECTRICCABINETDOCUMENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取抽屉柜相关资料归档表单数据
   *
   * @param id 抽屉柜相关资料归档ID
   * @returns 抽屉柜相关资料归档表单数据
   */
  getFormData(id: number) {
    return request<any, ElectricCabinetDocumentForm>({
      url: `${ELECTRICCABINETDOCUMENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加抽屉柜相关资料归档
   *
   *  @param data 抽屉柜相关资料归档表单数据
   */
  create(data: ElectricCabinetDocumentForm) {
    return request({
      url: `${ELECTRICCABINETDOCUMENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新抽屉柜相关资料归档
   *
   * @param id 抽屉柜相关资料归档ID
   * @param data 抽屉柜相关资料归档表单数据
   */
  update(id: string, data: ElectricCabinetDocumentForm) {
    return request({
      url: `${ELECTRICCABINETDOCUMENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除抽屉柜相关资料归档，多个以英文逗号(,)分割
   *
   * @param ids 抽屉柜相关资料归档ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ELECTRICCABINETDOCUMENT_BASE_URL}/${ids}`,
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
      url: `${ELECTRICCABINETDOCUMENT_BASE_URL}/export`,
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
      url: `${ELECTRICCABINETDOCUMENT_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /** 下载用户导入模板 */
  downloadtemplate() {
    return request({
      url: `${ELECTRICCABINETDOCUMENT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default ElectricCabinetDocumentAPI;

/** 抽屉柜相关资料归档分页查询参数 */
export interface ElectricCabinetDocumentPageQuery extends PageQuery {
  /** 资料名称 */
  ecdDocName?: string;
  /** 资料类型 */
  ecdDocType?: string;
  /** 	编号 */
  ecdDocNo?: string;
  /** 所属工厂 */
  ecdFactory?: string;
}

/** 抽屉柜相关资料归档表单对象 */
export interface ElectricCabinetDocumentForm {
  /** 序号 */
  id?: number;
  /** 资料名称 */
  ecdDocName?: string;
  /** 资料类型 */
  ecdDocType?: string;
  /** 	编号 */
  ecdDocNo?: string;
  /** 归档日期 */
  ecdArchiveDate?: Date;
  /** 保管人 */
  ecdCustodian?: string;
  /** 存放位置 */
  ecdLocation?: string;
  /** 所属工厂 */
  ecdFactory?: string;
  /** 备用1 */
  ecdReserve1?: string;
  /** 备用2 */
  ecdReserve2?: string;
  /** 备用3 */
  ecdReserve3?: string;
}

/** 抽屉柜相关资料归档分页对象 */
export interface ElectricCabinetDocumentPageVO {
  /** 序号 */
  id?: number;
  /** 资料名称 */
  ecdDocName?: string;
  /** 资料类型 */
  ecdDocType?: string;
  /** 	编号 */
  ecdDocNo?: string;
  /** 归档日期 */
  ecdArchiveDate?: Date;
  /** 保管人 */
  ecdCustodian?: string;
  /** 存放位置 */
  ecdLocation?: string;
  /** 所属工厂 */
  ecdFactory?: string;
  /** 备用1 */
  ecdReserve1?: string;
  /** 备用2 */
  ecdReserve2?: string;
  /** 备用3 */
  ecdReserve3?: string;
}
