import request from "@/utils/request";

const STATICEQUIP_BASE_URL = "/api/v1/static-equip";

const StaticEquipAPI = {
  /** 获取静设备分页数据 */
  getPage(queryParams?: StaticEquipPageQuery) {
    return request<any, PageResult<StaticEquipPageVO[]>>({
      url: `${STATICEQUIP_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取静设备表单数据
   *
   * @param id 静设备ID
   * @returns 静设备表单数据
   */
  getFormData(id: number) {
    return request<any, StaticEquipForm>({
      url: `${STATICEQUIP_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加静设备
   *
   *  @param data 静设备表单数据
   */
  create(data: StaticEquipForm) {
    return request({
      url: `${STATICEQUIP_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新静设备
   *
   * @param id 静设备ID
   * @param data 静设备表单数据
   */
  update(id: string, data: StaticEquipForm) {
    return request({
      url: `${STATICEQUIP_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除静设备，多个以英文逗号(,)分割
   *
   * @param ids 静设备ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${STATICEQUIP_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default StaticEquipAPI;

/** 静设备分页查询参数 */
export interface StaticEquipPageQuery extends PageQuery {
  /** 设备名称 */
  staticEquipName?: string;
  /** 位号 */
  staticEquipTag?: string;
  /** 设备状态 */
  status?: number;
  /** 设备编码 */
  dvCode?: string;
}

/** 静设备表单对象 */
export interface StaticEquipForm {
  id?: string;
  /** 设备名称 */
  staticEquipName?: string;
  /** 位号 */
  staticEquipTag?: string;
  /** 所处位置 */
  staticEquipLoc?: string;
  /** 操作温度 */
  staticEquipOpTemp?: string;
  /** 操作压力 */
  staticEquipOpPress?: string;
  /** 介质 */
  staticEquipMed?: string;
  /** 出厂编号 */
  staticEquipFactoryNo?: string;
  /** 类别 */
  staticEquipCategory?: string;
  /** 重量（kg） */
  staticEquipWeght?: string;
  /** 检验日期 */
  staticEquipInspestDate?: Date;
  /** 下次检验日期 */
  staticEquipNextInspestDate?: Date;
  /** 设备状态 */
  status?: number;
  /** 设备编码 */
  dvCode?: string;
}

/** 静设备分页对象 */
export interface StaticEquipPageVO {
  /** 设备名称 */
  staticEquipName?: string;
  /** 位号 */
  staticEquipTag?: string;
  /** 所处位置 */
  staticEquipLoc?: string;
  /** 操作温度 */
  staticEquipOpTemp?: string;
  /** 操作压力 */
  staticEquipOpPress?: string;
  /** 介质 */
  staticEquipMed?: string;
  /** 出厂编号 */
  staticEquipFactoryNo?: string;
  /** 类别 */
  staticEquipCategory?: string;
  /** 重量（kg） */
  staticEquipWeght?: string;
  /** 检验日期 */
  staticEquipInspestDate?: Date;
  /** 下次检验日期 */
  staticEquipNextInspestDate?: Date;
  /** 设备状态 */
  status?: number;
  /** 设备编码 */
  dvCode?: string;
}
