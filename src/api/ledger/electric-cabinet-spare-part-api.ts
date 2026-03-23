import request from "@/utils/request";

const ELECTRICCABINETSPAREPART_BASE_URL = "/api/v1/electric-cabinet-spare-part";

const ElectricCabinetSparePartAPI = {
  /** 获取电器备品备件管理记录分页数据 */
  getPage(queryParams?: ElectricCabinetSparePartPageQuery) {
    return request<any, PageResult<ElectricCabinetSparePartPageVO[]>>({
      url: `${ELECTRICCABINETSPAREPART_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取电器备品备件管理记录表单数据
   *
   * @param id 电器备品备件管理记录ID
   * @returns 电器备品备件管理记录表单数据
   */
  getFormData(id: number) {
    return request<any, ElectricCabinetSparePartForm>({
      url: `${ELECTRICCABINETSPAREPART_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加电器备品备件管理记录
   *
   *  @param data 电器备品备件管理记录表单数据
   */
  create(data: ElectricCabinetSparePartForm) {
    return request({
      url: `${ELECTRICCABINETSPAREPART_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新电器备品备件管理记录
   *
   * @param id 电器备品备件管理记录ID
   * @param data 电器备品备件管理记录表单数据
   */
  update(id: string, data: ElectricCabinetSparePartForm) {
    return request({
      url: `${ELECTRICCABINETSPAREPART_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除电器备品备件管理记录，多个以英文逗号(,)分割
   *
   * @param ids 电器备品备件管理记录ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ELECTRICCABINETSPAREPART_BASE_URL}/${ids}`,
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
      url: `${ELECTRICCABINETSPAREPART_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
};

export default ElectricCabinetSparePartAPI;

/** 电器备品备件管理记录分页查询参数 */
export interface ElectricCabinetSparePartPageQuery extends PageQuery {
  /** 备件名称 */
  ecspPartName?: string;
  /** 规格型号 */
  ecspSpecModel?: string;
  /** 生产厂家 */
  ecspManufacturer?: string;
  /** 入库日期 */
  ecspStockDate?: [string, string];
  /** 领用日期 */
  ecspUsedDate?: [string, string];
  /** 领用人 */
  ecspUser?: string;
  /** 所属工厂 */
  ecspFactory?: string;
}

/** 电器备品备件管理记录表单对象 */
export interface ElectricCabinetSparePartForm {
  /** 序号 */
  id?: number;
  /** 备件名称 */
  ecspPartName?: string;
  /** 规格型号 */
  ecspSpecModel?: string;
  /** 对应柜体 / 抽屉 */
  ecspCorrespondingCabinet?: string;
  /** 额定参数 */
  ecspRatedParameters?: string;
  /** 生产厂家 */
  ecspManufacturer?: string;
  /** 库存数量 */
  ecspStockQuantity?: string;
  /** 入库日期 */
  ecspStockDate?: Date;
  /** 领用数量 */
  ecspUsedQuantity?: string;
  /** 领用日期 */
  ecspUsedDate?: Date;
  /** 领用原因 */
  ecspUsedReason?: string;
  /** 领用人 */
  ecspUser?: string;
  /** 补充日期 */
  ecspSupplementDate?: Date;
  /** 所属工厂 */
  ecspFactory?: string;
}

/** 电器备品备件管理记录分页对象 */
export interface ElectricCabinetSparePartPageVO {
  /** 序号 */
  id?: number;
  /** 备件名称 */
  ecspPartName?: string;
  /** 规格型号 */
  ecspSpecModel?: string;
  /** 对应柜体 / 抽屉 */
  ecspCorrespondingCabinet?: string;
  /** 额定参数 */
  ecspRatedParameters?: string;
  /** 生产厂家 */
  ecspManufacturer?: string;
  /** 库存数量 */
  ecspStockQuantity?: string;
  /** 入库日期 */
  ecspStockDate?: Date;
  /** 领用数量 */
  ecspUsedQuantity?: string;
  /** 领用日期 */
  ecspUsedDate?: Date;
  /** 领用原因 */
  ecspUsedReason?: string;
  /** 领用人 */
  ecspUser?: string;
  /** 补充日期 */
  ecspSupplementDate?: Date;
  /** 所属工厂 */
  ecspFactory?: string;
}
