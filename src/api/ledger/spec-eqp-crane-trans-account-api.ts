import request from "@/utils/request";

const SPECEQPCRANETRANSACCOUNT_BASE_URL = "/api/v1/spec-eqp-crane-trans-account";

const SpecEqpCraneTransAccountAPI = {
  /** 获取起重运输类分页数据 */
  getPage(queryParams?: SpecEqpCraneTransAccountPageQuery) {
    return request<any, PageResult<SpecEqpCraneTransAccountPageVO[]>>({
      url: `${SPECEQPCRANETRANSACCOUNT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取起重运输类表单数据
   *
   * @param id 起重运输类ID
   * @returns 起重运输类表单数据
   */
  getFormData(id: number) {
    return request<any, SpecEqpCraneTransAccountForm>({
      url: `${SPECEQPCRANETRANSACCOUNT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加起重运输类
   *
   *  @param data 起重运输类表单数据
   */
  create(data: SpecEqpCraneTransAccountForm) {
    return request({
      url: `${SPECEQPCRANETRANSACCOUNT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新起重运输类
   *
   * @param id 起重运输类ID
   * @param data 起重运输类表单数据
   */
  update(id: string, data: SpecEqpCraneTransAccountForm) {
    return request({
      url: `${SPECEQPCRANETRANSACCOUNT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除起重运输类，多个以英文逗号(,)分割
   *
   * @param ids 起重运输类ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SPECEQPCRANETRANSACCOUNT_BASE_URL}/${ids}`,
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
      url: `${SPECEQPCRANETRANSACCOUNT_BASE_URL}/export`,
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
      url: `${SPECEQPCRANETRANSACCOUNT_BASE_URL}/import`,
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
      url: `${SPECEQPCRANETRANSACCOUNT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SpecEqpCraneTransAccountAPI;

/** 起重运输类分页查询参数 */
export interface SpecEqpCraneTransAccountPageQuery extends PageQuery {
  /** 设备名称 */
  specEqpCtName?: string;
  /** 设备类型 */
  specEqpCtType?: string;
  /** 设备状态 */
  specEqpCtStatus?: string;
}

/** 起重运输类表单对象 */
export interface SpecEqpCraneTransAccountForm {
  /** 序号 */
  id?: number;
  /** 设备编码 */
  specEqpCtCode?: string;
  /** 设备名称 */
  specEqpCtName?: string;
  /** 安装 / 使用区域、工段 */
  specEqpCtArea?: string;
  /** 设备型号 */
  specEqpCtModel?: string;
  /** 设备类型 */
  specEqpCtType?: string;
  /** 额定起重量（t） */
  specEqpCtLiftingCapacity?: string;
  /** 额定起升高度（m） */
  specEqpCtLiftingHeight?: string;
  /** 起重机跨度（m） */
  specEqpCtSpan?: string;
  /** 设计压力 */
  specEqpCtDesignPressure?: string;
  /** 制造厂家 */
  specEqpCtManufacturer?: string;
  /** 出厂编号 */
  specEqpCtFactoryNo?: string;
  /** 制造日期 */
  specEqpCtProduceDate?: Date;
  /** 安装单位 */
  specEqpCtInstallCompany?: string;
  /** 安装日期 */
  specEqpCtInstallDate?: Date;
  /** 验收日期 */
  specEqpCtAcceptanceDate?: Date;
  /** 投用日期 */
  specEqpCtUsageDate?: Date;
  /** 特种设备使用登记 */
  specEqpCtLicenseNo?: string;
  /** 设备状态 */
  specEqpCtStatus?: string;
  /** 上次检验日期 */
  specEqpCtLastInspectDate?: Date;
  /** 下次检验日期 */
  specEqpCtNextInspectDate?: Date;
  /** 检验机构 */
  specEqpCtInspectCompany?: string;
  /** 运维责任人 */
  specEqpCtMaintainResponsible?: string;
  /** 维护检修记录 */
  specEqpCtMaintainRecord?: string;
  /** 异常及事故记录 */
  specEqpCtAccidentRecord?: string;
  /** 台账创建时间 */
  specEqpCtCreateTime?: Date;
  /** 台账更新时间 */
  specEqpCtUpdateTime?: Date;
  /** 所属工厂 */
  specEqpCtFactory?: string;
  /** 备用1 */
  specEqpCtBackup1?: string;
  /** 备用2 */
  specEqpCtBackup2?: string;
  /** 备用3 */
  specEqpCtBackup3?: string;
}

/** 起重运输类分页对象 */
export interface SpecEqpCraneTransAccountPageVO {
  /** 序号 */
  id?: number;
  /** 设备编码 */
  specEqpCtCode?: string;
  /** 设备名称 */
  specEqpCtName?: string;
  /** 安装 / 使用区域、工段 */
  specEqpCtArea?: string;
  /** 设备型号 */
  specEqpCtModel?: string;
  /** 设备类型 */
  specEqpCtType?: string;
  /** 额定起重量（t） */
  specEqpCtLiftingCapacity?: string;
  /** 额定起升高度（m） */
  specEqpCtLiftingHeight?: string;
  /** 起重机跨度（m） */
  specEqpCtSpan?: string;
  /** 设计压力 */
  specEqpCtDesignPressure?: string;
  /** 制造厂家 */
  specEqpCtManufacturer?: string;
  /** 出厂编号 */
  specEqpCtFactoryNo?: string;
  /** 制造日期 */
  specEqpCtProduceDate?: Date;
  /** 安装单位 */
  specEqpCtInstallCompany?: string;
  /** 安装日期 */
  specEqpCtInstallDate?: Date;
  /** 验收日期 */
  specEqpCtAcceptanceDate?: Date;
  /** 投用日期 */
  specEqpCtUsageDate?: Date;
  /** 特种设备使用登记 */
  specEqpCtLicenseNo?: string;
  /** 设备状态 */
  specEqpCtStatus?: string;
  /** 上次检验日期 */
  specEqpCtLastInspectDate?: Date;
  /** 下次检验日期 */
  specEqpCtNextInspectDate?: Date;
  /** 检验机构 */
  specEqpCtInspectCompany?: string;
  /** 运维责任人 */
  specEqpCtMaintainResponsible?: string;
  /** 维护检修记录 */
  specEqpCtMaintainRecord?: string;
  /** 异常及事故记录 */
  specEqpCtAccidentRecord?: string;
  /** 台账创建时间 */
  specEqpCtCreateTime?: Date;
  /** 台账更新时间 */
  specEqpCtUpdateTime?: Date;
  /** 所属工厂 */
  specEqpCtFactory?: string;
  /** 备用1 */
  specEqpCtBackup1?: string;
  /** 备用2 */
  specEqpCtBackup2?: string;
  /** 备用3 */
  specEqpCtBackup3?: string;
}
