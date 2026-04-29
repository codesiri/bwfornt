import request from "@/utils/request";

const SPECEQPTOWERACCOUNT_BASE_URL = "/api/v1/spec-eqp-tower-account";

const SpecEqpTowerAccountAPI = {
  /** 获取塔类分页数据 */
  getPage(queryParams?: SpecEqpTowerAccountPageQuery) {
    return request<any, PageResult<SpecEqpTowerAccountPageVO[]>>({
      url: `${SPECEQPTOWERACCOUNT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取塔类表单数据
   *
   * @param id 塔类ID
   * @returns 塔类表单数据
   */
  getFormData(id: number) {
    return request<any, SpecEqpTowerAccountForm>({
      url: `${SPECEQPTOWERACCOUNT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加塔类
   *
   *  @param data 塔类表单数据
   */
  create(data: SpecEqpTowerAccountForm) {
    return request({
      url: `${SPECEQPTOWERACCOUNT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新塔类
   *
   * @param id 塔类ID
   * @param data 塔类表单数据
   */
  update(id: string, data: SpecEqpTowerAccountForm) {
    return request({
      url: `${SPECEQPTOWERACCOUNT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除塔类，多个以英文逗号(,)分割
   *
   * @param ids 塔类ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SPECEQPTOWERACCOUNT_BASE_URL}/${ids}`,
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
      url: `${SPECEQPTOWERACCOUNT_BASE_URL}/export`,
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
      url: `${SPECEQPTOWERACCOUNT_BASE_URL}/import`,
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
      url: `${SPECEQPTOWERACCOUNT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SpecEqpTowerAccountAPI;

/** 塔类分页查询参数 */
export interface SpecEqpTowerAccountPageQuery extends PageQuery {
  /** 塔类设备名称 */
  specEqpTowerName?: string;
  /** 塔器类型 */
  specEqpTowerType?: string;
  /** 设备状态 */
  specEqpTowerStatus?: string;
  /** 所属工厂 */
  specEqpTowerFactory?: string;
}

/** 塔类表单对象 */
export interface SpecEqpTowerAccountForm {
  /** 序号 */
  id?: number;
  /** 塔类设备编码 */
  specEqpTowerCode?: string;
  /** 塔类设备名称 */
  specEqpTowerName?: string;
  /** 所在区域 */
  specEqpTowerArea?: string;
  /** 塔类设备型号 */
  specEqpTowerModel?: string;
  /** 塔器类型 */
  specEqpTowerType?: string;
  /** 塔体材质 */
  specEqpTowerMaterial?: string;
  /** 塔体总高度（m） */
  specEqpTowerHeight?: string;
  /** 塔体公称直径（m） */
  specEqpTowerDiameter?: string;
  /** 塔板层数 / 填料高度（层 /m） */
  specEqpTowerLayer?: string;
  /** 设计压力（MPa） */
  specEqpTowerDesignPressure?: string;
  /** 设计温度（℃） */
  specEqpTowerDesignTemp?: string;
  /** 处理介质 */
  specEqpTowerMedia?: string;
  /** 介质特性 */
  specEqpTowerMediaProperty?: string;
  /** 制造厂家 */
  specEqpTowerManufacturer?: string;
  /** 出厂编号 */
  specEqpTowerFactoryNo?: string;
  /** 制造日期 */
  specEqpTowerProduceDate?: Date;
  /** 安装单位 */
  specEqpTowerInstallCompany?: string;
  /** 安装日期 */
  specEqpTowerInstallDate?: Date;
  /** 验收日期 */
  specEqpTowerAcceptanceDate?: Date;
  /** 投用日期 */
  specEqpTowerUsageDate?: Date;
  /** 特种设备使用登记 */
  specEqpTowerLicenseNo?: string;
  /** 设备状态 */
  specEqpTowerStatus?: string;
  /** 上次检验日期 */
  specEqpTowerLastInspectDate?: Date;
  /** 下次检验日期 */
  specEqpTowerNextInspectDate?: Date;
  /** 检验机构 */
  specEqpTowerInspectCompany?: string;
  /** 运维负责人 */
  specEqpTowerMaintainResponsible?: string;
  /** 最后一次维护记录 */
  specEqpTowerMaintainRecord?: string;
  /** 事故记录 */
  specEqpTowerAccidentRecord?: string;
  /** 创建时间 */
  specEqpTowerCreateTime?: Date;
  /** 更新时间 */
  specEqpTowerUpdateTime?: Date;
  /** 所属工厂 */
  specEqpTowerFactory?: string;
  /** 备用1 */
  specEqpTowerBackup1?: string;
  /** 备用2 */
  specEqpTowerBackup2?: string;
  /** 备用3 */
  specEqpTowerBackup3?: string;
}

/** 塔类分页对象 */
export interface SpecEqpTowerAccountPageVO {
  /** 序号 */
  id?: number;
  /** 塔类设备编码 */
  specEqpTowerCode?: string;
  /** 塔类设备名称 */
  specEqpTowerName?: string;
  /** 所在区域 */
  specEqpTowerArea?: string;
  /** 塔类设备型号 */
  specEqpTowerModel?: string;
  /** 塔器类型 */
  specEqpTowerType?: string;
  /** 塔体材质 */
  specEqpTowerMaterial?: string;
  /** 塔体总高度（m） */
  specEqpTowerHeight?: string;
  /** 塔体公称直径（m） */
  specEqpTowerDiameter?: string;
  /** 塔板层数 / 填料高度（层 /m） */
  specEqpTowerLayer?: string;
  /** 设计压力（MPa） */
  specEqpTowerDesignPressure?: string;
  /** 设计温度（℃） */
  specEqpTowerDesignTemp?: string;
  /** 处理介质 */
  specEqpTowerMedia?: string;
  /** 介质特性 */
  specEqpTowerMediaProperty?: string;
  /** 制造厂家 */
  specEqpTowerManufacturer?: string;
  /** 出厂编号 */
  specEqpTowerFactoryNo?: string;
  /** 制造日期 */
  specEqpTowerProduceDate?: Date;
  /** 安装单位 */
  specEqpTowerInstallCompany?: string;
  /** 安装日期 */
  specEqpTowerInstallDate?: Date;
  /** 验收日期 */
  specEqpTowerAcceptanceDate?: Date;
  /** 投用日期 */
  specEqpTowerUsageDate?: Date;
  /** 特种设备使用登记 */
  specEqpTowerLicenseNo?: string;
  /** 设备状态 */
  specEqpTowerStatus?: string;
  /** 上次检验日期 */
  specEqpTowerLastInspectDate?: Date;
  /** 下次检验日期 */
  specEqpTowerNextInspectDate?: Date;
  /** 检验机构 */
  specEqpTowerInspectCompany?: string;
  /** 运维负责人 */
  specEqpTowerMaintainResponsible?: string;
  /** 最后一次维护记录 */
  specEqpTowerMaintainRecord?: string;
  /** 事故记录 */
  specEqpTowerAccidentRecord?: string;
  /** 创建时间 */
  specEqpTowerCreateTime?: Date;
  /** 更新时间 */
  specEqpTowerUpdateTime?: Date;
  /** 所属工厂 */
  specEqpTowerFactory?: string;
  /** 备用1 */
  specEqpTowerBackup1?: string;
  /** 备用2 */
  specEqpTowerBackup2?: string;
  /** 备用3 */
  specEqpTowerBackup3?: string;
}
