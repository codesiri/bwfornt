import request from "@/utils/request";

const ELECTRICCABINETCHANGE_BASE_URL = "/api/v1/electric-cabinet-change";

const ElectricCabinetChangeAPI = {
  /** 获取抽屉柜变更记录分页数据 */
  getPage(queryParams?: ElectricCabinetChangePageQuery) {
    return request<any, PageResult<ElectricCabinetChangePageVO[]>>({
      url: `${ELECTRICCABINETCHANGE_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取抽屉柜变更记录表单数据
   *
   * @param id 抽屉柜变更记录ID
   * @returns 抽屉柜变更记录表单数据
   */
  getFormData(id: number) {
    return request<any, ElectricCabinetChangeForm>({
      url: `${ELECTRICCABINETCHANGE_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加抽屉柜变更记录
   *
   *  @param data 抽屉柜变更记录表单数据
   */
  create(data: ElectricCabinetChangeForm) {
    return request({
      url: `${ELECTRICCABINETCHANGE_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新抽屉柜变更记录
   *
   * @param id 抽屉柜变更记录ID
   * @param data 抽屉柜变更记录表单数据
   */
  update(id: string, data: ElectricCabinetChangeForm) {
    return request({
      url: `${ELECTRICCABINETCHANGE_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除抽屉柜变更记录，多个以英文逗号(,)分割
   *
   * @param ids 抽屉柜变更记录ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ELECTRICCABINETCHANGE_BASE_URL}/${ids}`,
      method: "delete",
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
      url: `${ELECTRICCABINETCHANGE_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * 表导出
   *
   * @param queryParams 查询参数
   */
  export(queryParams: any) {
    return request({
      url: `${ELECTRICCABINETCHANGE_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  /** 下载用户导入模板 */
  downloadtemplate() {
    return request({
      url: `${ELECTRICCABINETCHANGE_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default ElectricCabinetChangeAPI;

/** 抽屉柜变更记录分页查询参数 */
export interface ElectricCabinetChangePageQuery extends PageQuery {
  /** 变更内容 */
  eccChangeContent?: string;
  /** 变更实施人 */
  eccImplementer?: string;
  /** 验收人 */
  eccChecker?: string;
  /** 变更后状态 */
  eccAfterStatus?: string;
  /** 所属工厂 */
  eccFactory?: string;
}

/** 抽屉柜变更记录表单对象 */
export interface ElectricCabinetChangeForm {
  /** 序号 */
  id?: number;
  /** 变更日期 */
  eccChangeDate?: Date;
  /** 变更申请人 */
  eccApplicant?: string;
  /** 变更原因 */
  eccChangeReason?: string;
  /** 变更内容 */
  eccChangeContent?: string;
  /** 变更实施人 */
  eccImplementer?: string;
  /** 验收人 */
  eccChecker?: string;
  /** 变更后状态 */
  eccAfterStatus?: string;
  /** 相关资料更新情况 */
  eccDataUpdate?: Date;
  /** 所属工厂 */
  eccFactory?: string;
  /** 备用1 */
  eccReserve1?: string;
  /** 备用2 */
  eccReserve2?: string;
  /** 备用3 */
  eccReserve3?: string;
}

/** 抽屉柜变更记录分页对象 */
export interface ElectricCabinetChangePageVO {
  /** 序号 */
  id?: number;
  /** 变更日期 */
  eccChangeDate?: Date;
  /** 变更申请人 */
  eccApplicant?: string;
  /** 变更原因 */
  eccChangeReason?: string;
  /** 变更内容 */
  eccChangeContent?: string;
  /** 变更实施人 */
  eccImplementer?: string;
  /** 验收人 */
  eccChecker?: string;
  /** 变更后状态 */
  eccAfterStatus?: string;
  /** 相关资料更新情况 */
  eccDataUpdate?: Date;
  /** 所属工厂 */
  eccFactory?: string;
  /** 备用1 */
  eccReserve1?: string;
  /** 备用2 */
  eccReserve2?: string;
  /** 备用3 */
  eccReserve3?: string;
}
