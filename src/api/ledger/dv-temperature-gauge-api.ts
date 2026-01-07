import request from "@/utils/request";

const DVTEMPERATUREGAUGE_BASE_URL = "/api/v1/dv-temperature-gauge";

const DvTemperatureGaugeAPI = {
  /** 获取温度分页数据 */
  getPage(queryParams?: DvTemperatureGaugePageQuery) {
    return request<any, PageResult<DvTemperatureGaugePageVO[]>>({
      url: `${DVTEMPERATUREGAUGE_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取温度表单数据
   *
   * @param id 温度ID
   * @returns 温度表单数据
   */
  getFormData(id: number) {
    return request<any, DvTemperatureGaugeForm>({
      url: `${DVTEMPERATUREGAUGE_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加温度
   *
   *  @param data 温度表单数据
   */
  create(data: DvTemperatureGaugeForm) {
    return request({
      url: `${DVTEMPERATUREGAUGE_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新温度
   *
   * @param id 温度ID
   * @param data 温度表单数据
   */
  update(id: string, data: DvTemperatureGaugeForm) {
    return request({
      url: `${DVTEMPERATUREGAUGE_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除温度，多个以英文逗号(,)分割
   *
   * @param ids 温度ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${DVTEMPERATUREGAUGE_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default DvTemperatureGaugeAPI;

/** 温度分页查询参数 */
export interface DvTemperatureGaugePageQuery extends PageQuery {
  tagNumber?: string;
  status?: number;
}

/** 温度表单对象 */
export interface DvTemperatureGaugeForm {
  /** 主键id */
  id?: number;
  /** 装置名称 */
  deviceName?: string;
  /** 位号 */
  tagNumber?: string;
  /** 安装位置以及用途 */
  installationLocationAndPurpose?: string;
  /** 设备名称 */
  deviceNameSuffix?: string;
  /** 分度号 */
  indexNumber?: string;
  /** 规格型号 */
  specificationModel?: string;
  /** 生产厂家 */
  manufacturer?: string;
  /** 测量范围 */
  measurementRange?: string;
  /** 插入深度 */
  insertionDepth?: string;
  /** 连接方式及规格 */
  connectionMethodAndSpecifications?: string;
  /** 精度 */
  precision?: string;
  /** 套管规格和及材质 */
  casingSpecificationsAndMaterial?: string;
  /** 是否带连锁 */
  interlocked?: string;
  /** 联锁设定值 */
  interlockSetValue?: string;
  /** 备注 */
  remark?: string;
  status?: number;
  dvType?: number;
}

/** 温度分页对象 */
export interface DvTemperatureGaugePageVO {
  /** 主键id */
  id?: number;
  /** 装置名称 */
  deviceName?: string;
  /** 位号 */
  tagNumber?: string;
  /** 安装位置以及用途 */
  installationLocationAndPurpose?: string;
  /** 设备名称 */
  deviceNameSuffix?: string;
  /** 分度号 */
  indexNumber?: string;
  /** 规格型号 */
  specificationModel?: string;
  /** 生产厂家 */
  manufacturer?: string;
  /** 测量范围 */
  measurementRange?: string;
  /** 插入深度 */
  insertionDepth?: string;
  /** 连接方式及规格 */
  connectionMethodAndSpecifications?: string;
  /** 精度 */
  precision?: string;
  /** 套管规格和及材质 */
  casingSpecificationsAndMaterial?: string;
  /** 是否带连锁 */
  interlocked?: string;
  /** 联锁设定值 */
  interlockSetValue?: string;
  /** 备注 */
  remark?: string;
  status?: number;
  dvType?: number;
}
