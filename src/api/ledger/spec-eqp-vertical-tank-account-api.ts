import request from "@/utils/request";

const SPECEQPVERTICALTANKACCOUNT_BASE_URL = "/api/v1/spec-eqp-vertical-tank-account";

const SpecEqpVerticalTankAccountAPI = {
  /** 获取立罐分页数据 */
  getPage(queryParams?: SpecEqpVerticalTankAccountPageQuery) {
    return request<any, PageResult<SpecEqpVerticalTankAccountPageVO[]>>({
      url: `${SPECEQPVERTICALTANKACCOUNT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取立罐表单数据
   *
   * @param id 立罐ID
   * @returns 立罐表单数据
   */
  getFormData(id: number) {
    return request<any, SpecEqpVerticalTankAccountForm>({
      url: `${SPECEQPVERTICALTANKACCOUNT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加立罐
   *
   *  @param data 立罐表单数据
   */
  create(data: SpecEqpVerticalTankAccountForm) {
    return request({
      url: `${SPECEQPVERTICALTANKACCOUNT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新立罐
   *
   * @param id 立罐ID
   * @param data 立罐表单数据
   */
  update(id: string, data: SpecEqpVerticalTankAccountForm) {
    return request({
      url: `${SPECEQPVERTICALTANKACCOUNT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除立罐，多个以英文逗号(,)分割
   *
   * @param ids 立罐ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SPECEQPVERTICALTANKACCOUNT_BASE_URL}/${ids}`,
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
      url: `${SPECEQPVERTICALTANKACCOUNT_BASE_URL}/export`,
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
      url: `${SPECEQPVERTICALTANKACCOUNT_BASE_URL}/import`,
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
      url: `${SPECEQPVERTICALTANKACCOUNT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SpecEqpVerticalTankAccountAPI;

/** 立罐分页查询参数 */
export interface SpecEqpVerticalTankAccountPageQuery extends PageQuery {
  /** 立罐设备编码 */
  specEqpVtCode?: string;
  /** 立罐名称 */
  specEqpVtName?: string;
  /** 设备状态 */
  specEqpVtStatus?: string;
  /** 所属工厂 */
  specEqpVtFactory?: string;
}

/** 立罐表单对象 */
export interface SpecEqpVerticalTankAccountForm {
  /** 序号 */
  id?: number;
  /** 立罐设备编码 */
  specEqpVtCode?: string;
  /** 立罐名称 */
  specEqpVtName?: string;
  /** 所在区域 */
  specEqpVtArea?: string;
  /** 立罐型号 */
  specEqpVtModel?: string;
  /** 罐体材质 */
  specEqpVtMaterial?: string;
  /** 设计容积（m³） */
  specEqpVtVolume?: string;
  /** 设计压力（MPa） */
  specEqpVtDesignPressure?: string;
  /** 设计温度（℃） */
  specEqpVtDesignTemp?: string;
  /** 储存介质 */
  specEqpVtMedia?: string;
  /** 介质特性 */
  specEqpVtMediaProperty?: string;
  /** 制造厂家 */
  specEqpVtManufacturer?: string;
  /** 出厂编号 */
  specEqpVtFactoryNo?: string;
  /** 制造日期 */
  specEqpVtProduceDate?: Date;
  /** 安装单位 */
  specEqpVtInstallCompany?: string;
  /** 安装日期 */
  specEqpVtInstallDate?: Date;
  /** 验收日期 */
  specEqpVtAcceptanceDate?: Date;
  /** 投用日期 */
  specEqpVtUsageDate?: Date;
  /** 特种设备使用登记 */
  specEqpVtLicenseNo?: number;
  /** 设备状态 */
  specEqpVtStatus?: string;
  /** 上次检验日期 */
  specEqpVtLastInspectDate?: Date;
  /** 下次检验日期 */
  specEqpVtNextInspectDate?: Date;
  /** 检验机构 */
  specEqpVtInspectCompany?: string;
  /** 运维责任人 */
  specEqpVtMaintainResponsible?: string;
  /** 最后一次维护记录 */
  specEqpVtMaintainRecord?: string;
  /** 事故记录 */
  specEqpVtAccidentRecord?: string;
  /** 创建时间 */
  specEqpVtCreateTime?: Date;
  /** 更新时间 */
  specEqpVtUpdateTime?: Date;
  /** 所属工厂 */
  specEqpVtFactory?: string;
  /** 备用1 */
  specEqpVtBackup1?: string;
  /** 备用2 */
  specEqpVtBackup2?: string;
  /** 备用3 */
  specEqpVtBackup3?: string;
}

/** 立罐分页对象 */
export interface SpecEqpVerticalTankAccountPageVO {
  /** 序号 */
  id?: number;
  /** 立罐设备编码 */
  specEqpVtCode?: string;
  /** 立罐名称 */
  specEqpVtName?: string;
  /** 所在区域 */
  specEqpVtArea?: string;
  /** 立罐型号 */
  specEqpVtModel?: string;
  /** 罐体材质 */
  specEqpVtMaterial?: string;
  /** 设计容积（m³） */
  specEqpVtVolume?: string;
  /** 设计压力（MPa） */
  specEqpVtDesignPressure?: string;
  /** 设计温度（℃） */
  specEqpVtDesignTemp?: string;
  /** 储存介质 */
  specEqpVtMedia?: string;
  /** 介质特性 */
  specEqpVtMediaProperty?: string;
  /** 制造厂家 */
  specEqpVtManufacturer?: string;
  /** 出厂编号 */
  specEqpVtFactoryNo?: string;
  /** 制造日期 */
  specEqpVtProduceDate?: Date;
  /** 安装单位 */
  specEqpVtInstallCompany?: string;
  /** 安装日期 */
  specEqpVtInstallDate?: Date;
  /** 验收日期 */
  specEqpVtAcceptanceDate?: Date;
  /** 投用日期 */
  specEqpVtUsageDate?: Date;
  /** 特种设备使用登记 */
  specEqpVtLicenseNo?: number;
  /** 设备状态 */
  specEqpVtStatus?: string;
  /** 上次检验日期 */
  specEqpVtLastInspectDate?: Date;
  /** 下次检验日期 */
  specEqpVtNextInspectDate?: Date;
  /** 检验机构 */
  specEqpVtInspectCompany?: string;
  /** 运维责任人 */
  specEqpVtMaintainResponsible?: string;
  /** 最后一次维护记录 */
  specEqpVtMaintainRecord?: string;
  /** 事故记录 */
  specEqpVtAccidentRecord?: string;
  /** 创建时间 */
  specEqpVtCreateTime?: Date;
  /** 更新时间 */
  specEqpVtUpdateTime?: Date;
  /** 所属工厂 */
  specEqpVtFactory?: string;
  /** 备用1 */
  specEqpVtBackup1?: string;
  /** 备用2 */
  specEqpVtBackup2?: string;
  /** 备用3 */
  specEqpVtBackup3?: string;
}
