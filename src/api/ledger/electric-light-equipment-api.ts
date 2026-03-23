import request from "@/utils/request";

const ELECTRICLIGHTEQUIPMENT_BASE_URL = "/api/v1/electric-light-equipment";

const ElectricLightEquipmentAPI = {
  /** 获取电气照明设备分页数据 */
  getPage(queryParams?: ElectricLightEquipmentPageQuery) {
    return request<any, PageResult<ElectricLightEquipmentPageVO[]>>({
      url: `${ELECTRICLIGHTEQUIPMENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取电气照明设备表单数据
   *
   * @param id 电气照明设备ID
   * @returns 电气照明设备表单数据
   */
  getFormData(id: number) {
    return request<any, ElectricLightEquipmentForm>({
      url: `${ELECTRICLIGHTEQUIPMENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加电气照明设备
   *
   *  @param data 电气照明设备表单数据
   */
  create(data: ElectricLightEquipmentForm) {
    return request({
      url: `${ELECTRICLIGHTEQUIPMENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新电气照明设备
   *
   * @param id 电气照明设备ID
   * @param data 电气照明设备表单数据
   */
  update(id: string, data: ElectricLightEquipmentForm) {
    return request({
      url: `${ELECTRICLIGHTEQUIPMENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除电气照明设备，多个以英文逗号(,)分割
   *
   * @param ids 电气照明设备ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ELECTRICLIGHTEQUIPMENT_BASE_URL}/${ids}`,
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
      url: `${ELECTRICLIGHTEQUIPMENT_BASE_URL}/import`,
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
      url: `${ELECTRICLIGHTEQUIPMENT_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
};

export default ElectricLightEquipmentAPI;

/** 电气照明设备分页查询参数 */
export interface ElectricLightEquipmentPageQuery extends PageQuery {
  /** 设备名称 */
  eleLightName?: string;
  /** 生产厂家 */
  eleManufacturer?: string;
  /** 投运日期 */
  eleCommissioningDate?: [string, string];
  /** 上次维护日期 */
  eleLastMaintainDate?: [string, string];
  /** 下次维护日期 */
  eleNextMaintainDate?: [string, string];
  /** 	设备状态 */
  eleStatus?: number;
  /** 所属工厂 */
  eleFactory?: string;
}

/** 电气照明设备表单对象 */
export interface ElectricLightEquipmentForm {
  /** 序号 */
  id?: number;
  /** 照明设备编号 */
  eleLightCode?: string;
  /** 设备名称 */
  eleLightName?: string;
  /** 规格型号 */
  eleSpecModel?: string;
  /** 防爆标志 */
  eleExMark?: string;
  /** 防爆合格证号（仅防爆区域照明设备填写） */
  eleExCertNo?: number;
  /** 防爆合格证有效期（仅防爆区域照明设备填写） */
  eleExCertExpire?: string;
  /** 额定功率（W） */
  eleRatedPower?: string;
  /** 额定电压（如 AC220V、DC36V、AC380V） */
  eleRatedVoltage?: string;
  /** 安装位置及危险区域等级 */
  eleInstallArea?: string;
  /** 安装高度（m） */
  eleInstallHeight?: number;
  /** 生产厂家 */
  eleManufacturer?: string;
  /** 投运日期 */
  eleCommissioningDate?: Date;
  /** 上次维护日期 */
  eleLastMaintainDate?: Date;
  /** 下次维护日期 */
  eleNextMaintainDate?: Date;
  /** 是否为应急照明（0 = 否，1 = 是） */
  eleIsEmergency?: string;
  /** 	设备状态 */
  eleStatus?: number;
  /** 所属工厂 */
  eleFactory?: string;
  /** 备用1 */
  eleReserve1?: string;
  /** 备用2 */
  eleReserve2?: string;
  /** 备用3 */
  eleReserve3?: string;
}

/** 电气照明设备分页对象 */
export interface ElectricLightEquipmentPageVO {
  /** 序号 */
  id?: number;
  /** 照明设备编号 */
  eleLightCode?: string;
  /** 设备名称 */
  eleLightName?: string;
  /** 规格型号 */
  eleSpecModel?: string;
  /** 防爆标志 */
  eleExMark?: string;
  /** 防爆合格证号（仅防爆区域照明设备填写） */
  eleExCertNo?: number;
  /** 防爆合格证有效期（仅防爆区域照明设备填写） */
  eleExCertExpire?: string;
  /** 额定功率（W） */
  eleRatedPower?: string;
  /** 额定电压（如 AC220V、DC36V、AC380V） */
  eleRatedVoltage?: string;
  /** 安装位置及危险区域等级 */
  eleInstallArea?: string;
  /** 安装高度（m） */
  eleInstallHeight?: number;
  /** 生产厂家 */
  eleManufacturer?: string;
  /** 投运日期 */
  eleCommissioningDate?: Date;
  /** 上次维护日期 */
  eleLastMaintainDate?: Date;
  /** 下次维护日期 */
  eleNextMaintainDate?: Date;
  /** 是否为应急照明（0 = 否，1 = 是） */
  eleIsEmergency?: string;
  /** 	设备状态 */
  eleStatus?: number;
  /** 所属工厂 */
  eleFactory?: string;
  /** 备用1 */
  eleReserve1?: string;
  /** 备用2 */
  eleReserve2?: string;
  /** 备用3 */
  eleReserve3?: string;
}
