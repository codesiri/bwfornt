import request from "@/utils/request";

const SPECEQPSTEAMTURBINEACCOUNT_BASE_URL = "/api/v1/spec-eqp-steam-turbine-account";

const SpecEqpSteamTurbineAccountAPI = {
  /** 获取汽轮机分页数据 */
  getPage(queryParams?: SpecEqpSteamTurbineAccountPageQuery) {
    return request<any, PageResult<SpecEqpSteamTurbineAccountPageVO[]>>({
      url: `${SPECEQPSTEAMTURBINEACCOUNT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取汽轮机表单数据
   *
   * @param id 汽轮机ID
   * @returns 汽轮机表单数据
   */
  getFormData(id: number) {
    return request<any, SpecEqpSteamTurbineAccountForm>({
      url: `${SPECEQPSTEAMTURBINEACCOUNT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加汽轮机
   *
   *  @param data 汽轮机表单数据
   */
  create(data: SpecEqpSteamTurbineAccountForm) {
    return request({
      url: `${SPECEQPSTEAMTURBINEACCOUNT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新汽轮机
   *
   * @param id 汽轮机ID
   * @param data 汽轮机表单数据
   */
  update(id: string, data: SpecEqpSteamTurbineAccountForm) {
    return request({
      url: `${SPECEQPSTEAMTURBINEACCOUNT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除汽轮机，多个以英文逗号(,)分割
   *
   * @param ids 汽轮机ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SPECEQPSTEAMTURBINEACCOUNT_BASE_URL}/${ids}`,
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
      url: `${SPECEQPSTEAMTURBINEACCOUNT_BASE_URL}/export`,
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
      url: `${SPECEQPSTEAMTURBINEACCOUNT_BASE_URL}/import`,
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
      url: `${SPECEQPSTEAMTURBINEACCOUNT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SpecEqpSteamTurbineAccountAPI;

/** 汽轮机分页查询参数 */
export interface SpecEqpSteamTurbineAccountPageQuery extends PageQuery {
  /** 设备名称 */
  specEqpStName?: string;
  /** 设备状态 */
  specEqpStStatus?: string;
  /** 所属工厂 */
  specEqpStFactory?: string;
}

/** 汽轮机表单对象 */
export interface SpecEqpSteamTurbineAccountForm {
  /** 序号 */
  id?: number;
  /** 汽轮机设备编码 */
  specEqpStCode?: string;
  /** 汽轮机名称 */
  specEqpStName?: string;
  /** 所在区域 */
  specEqpStArea?: string;
  /** 汽轮机型号 */
  specEqpStModel?: string;
  /** 生产厂家 */
  specEqpStManufacturer?: string;
  /** 出厂编号 */
  specEqpStFactoryNo?: string;
  /** 制造日期 */
  specEqpStProduceDate?: Date;
  /** 安装单位 */
  specEqpStInstallCompany?: string;
  /** 安装日期 */
  specEqpStInstallDate?: Date;
  /** 验收日期 */
  specEqpStAcceptanceDate?: Date;
  /** 投用日期 */
  specEqpStUsageDate?: Date;
  /** 	特种设备使用登记 */
  specEqpStLicenseNo?: string;
  /** 	额定功率（MW） */
  specEqpStPowerRating?: string;
  /** 	额定转速（r/min） */
  specEqpStSpeedRating?: string;
  /** 进汽设计压力（MPa） */
  specEqpStSteamPressure?: string;
  /** 进汽设计温度（℃） */
  specEqpStSteamTemp?: string;
  /** 排汽压力（MPa） */
  specEqpStExhaustPressure?: string;
  /** 	转子材质 */
  specEqpStRotorMaterial?: string;
  /** 	汽缸材质 */
  specEqpStCasingMaterial?: string;
  /** 工作介质（蒸汽 / 过热蒸汽等） */
  specEqpStMedia?: string;
  /** 介质特性（高温、高压等） */
  specEqpStMediaProperty?: string;
  /** 设备状态 */
  specEqpStStatus?: string;
  /** 	上次检验日期 */
  specEqpStLastInspectDate?: Date;
  /** 	下次检验日期 */
  specEqpStNextInspectDate?: Date;
  /** 	检验机构 */
  specEqpStInspectCompany?: string;
  /** 	运维责任人 */
  specEqpStMaintainResponsible?: string;
  /** 维护检修记录 */
  specEqpStMaintainRecord?: string;
  /** 	异常及事故记录 */
  specEqpStAccidentRecord?: string;
  /** 	台账创建时间 */
  specEqpStCreateTime?: Date;
  /** 	台账更新时间 */
  specEqpStUpdateTime?: Date;
  /** 所属工厂 */
  specEqpStFactory?: string;
  /** 备用1 */
  specEqpStBackup1?: string;
  /** 备用2 */
  specEqpStBackup2?: string;
  /** 备用3 */
  specEqpStBackup3?: string;
}

/** 汽轮机分页对象 */
export interface SpecEqpSteamTurbineAccountPageVO {
  /** 序号 */
  id?: number;
  /** 汽轮机设备编码 */
  specEqpStCode?: string;
  /** 汽轮机名称 */
  specEqpStName?: string;
  /** 所在区域 */
  specEqpStArea?: string;
  /** 汽轮机型号 */
  specEqpStModel?: string;
  /** 生产厂家 */
  specEqpStManufacturer?: string;
  /** 出厂编号 */
  specEqpStFactoryNo?: string;
  /** 制造日期 */
  specEqpStProduceDate?: Date;
  /** 安装单位 */
  specEqpStInstallCompany?: string;
  /** 安装日期 */
  specEqpStInstallDate?: Date;
  /** 验收日期 */
  specEqpStAcceptanceDate?: Date;
  /** 投用日期 */
  specEqpStUsageDate?: Date;
  /** 	特种设备使用登记 */
  specEqpStLicenseNo?: string;
  /** 	额定功率（MW） */
  specEqpStPowerRating?: string;
  /** 	额定转速（r/min） */
  specEqpStSpeedRating?: string;
  /** 进汽设计压力（MPa） */
  specEqpStSteamPressure?: string;
  /** 进汽设计温度（℃） */
  specEqpStSteamTemp?: string;
  /** 排汽压力（MPa） */
  specEqpStExhaustPressure?: string;
  /** 	转子材质 */
  specEqpStRotorMaterial?: string;
  /** 	汽缸材质 */
  specEqpStCasingMaterial?: string;
  /** 工作介质（蒸汽 / 过热蒸汽等） */
  specEqpStMedia?: string;
  /** 介质特性（高温、高压等） */
  specEqpStMediaProperty?: string;
  /** 设备状态 */
  specEqpStStatus?: string;
  /** 	上次检验日期 */
  specEqpStLastInspectDate?: Date;
  /** 	下次检验日期 */
  specEqpStNextInspectDate?: Date;
  /** 	检验机构 */
  specEqpStInspectCompany?: string;
  /** 	运维责任人 */
  specEqpStMaintainResponsible?: string;
  /** 维护检修记录 */
  specEqpStMaintainRecord?: string;
  /** 	异常及事故记录 */
  specEqpStAccidentRecord?: string;
  /** 	台账创建时间 */
  specEqpStCreateTime?: Date;
  /** 	台账更新时间 */
  specEqpStUpdateTime?: Date;
  /** 所属工厂 */
  specEqpStFactory?: string;
  /** 备用1 */
  specEqpStBackup1?: string;
  /** 备用2 */
  specEqpStBackup2?: string;
  /** 备用3 */
  specEqpStBackup3?: string;
}
