import request from "@/utils/request";

const ELECMOTOR_BASE_URL = "/api/v1/elec-motor";

const ElecMotorAPI = {
  /** 获取电器电动机分页数据 */
  getPage(queryParams?: ElecMotorPageQuery) {
    return request<any, PageResult<ElecMotorPageVO[]>>({
      url: `${ELECMOTOR_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取电器电动机表单数据
   *
   * @param id 电器电动机ID
   * @returns 电器电动机表单数据
   */
  getFormData(id: number) {
    return request<any, ElecMotorForm>({
      url: `${ELECMOTOR_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加电器电动机
   *
   *  @param data 电器电动机表单数据
   */
  create(data: ElecMotorForm) {
    return request({
      url: `${ELECMOTOR_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新电器电动机
   *
   * @param id 电器电动机ID
   * @param data 电器电动机表单数据
   */
  update(id: string, data: ElecMotorForm) {
    return request({
      url: `${ELECMOTOR_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除电器电动机，多个以英文逗号(,)分割
   *
   * @param ids 电器电动机ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ELECMOTOR_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default ElecMotorAPI;

/** 电器电动机分页查询参数 */
export interface ElecMotorPageQuery extends PageQuery {
  /** 位号 */
  elecMotorTag?: string;
  /** 生产日期 */
  elecMotorProdDate?: [string, string];
  /** 生产厂家 */
  elecMotorManufacturer?: string;
}

/** 电器电动机表单对象 */
export interface ElecMotorForm {
  /** 位号 */
  elecMotorTag?: string;
  /** 工艺名称 */
  elecMotorProcess?: string;
  /** 型号 */
  elecMotorModel?: string;
  /** 额定功率 */
  elecMotorRatedPower?: string;
  /** 额定电压 */
  elecMotorRatedVoltage?: string;
  /** 额定电流 */
  elecMotorRatedCurrent?: string;
  /** 额定频率 */
  elecMotorRatedFreq?: string;
  /** 转速 */
  elecMotorSpeed?: string;
  /** 功率因数 */
  elecMotorPowerFactor?: string;
  /** 工作效率 */
  elecMotorEfficiency?: string;
  /** 接线方式 */
  elecMotorWiringMode?: string;
  /** 轴承型号 */
  elecMotorBearingModel?: string;
  /** 防爆标志 */
  elecMotorExplosionMark?: string;
  /** 绝缘等级 */
  elecMotorInsulation?: string;
  /** 防护等级 */
  elecMotorProtection?: string;
  /** 工作制 */
  elecMotorWorkSystem?: string;
  /** 出厂编号 */
  elecMotorFactoryNo?: string;
  /** 重量（KG） */
  elecMotorWeight?: string;
  /** 生产日期 */
  elecMotorProdDate?: Date;
  /** 生产厂家 */
  elecMotorManufacturer?: string;
}

/** 电器电动机分页对象 */
export interface ElecMotorPageVO {
  /** 位号 */
  elecMotorTag?: string;
  /** 工艺名称 */
  elecMotorProcess?: string;
  /** 型号 */
  elecMotorModel?: string;
  /** 额定功率 */
  elecMotorRatedPower?: string;
  /** 额定电压 */
  elecMotorRatedVoltage?: string;
  /** 额定电流 */
  elecMotorRatedCurrent?: string;
  /** 额定频率 */
  elecMotorRatedFreq?: string;
  /** 转速 */
  elecMotorSpeed?: string;
  /** 功率因数 */
  elecMotorPowerFactor?: string;
  /** 工作效率 */
  elecMotorEfficiency?: string;
  /** 接线方式 */
  elecMotorWiringMode?: string;
  /** 轴承型号 */
  elecMotorBearingModel?: string;
  /** 防爆标志 */
  elecMotorExplosionMark?: string;
  /** 绝缘等级 */
  elecMotorInsulation?: string;
  /** 防护等级 */
  elecMotorProtection?: string;
  /** 工作制 */
  elecMotorWorkSystem?: string;
  /** 出厂编号 */
  elecMotorFactoryNo?: string;
  /** 重量（KG） */
  elecMotorWeight?: string;
  /** 生产日期 */
  elecMotorProdDate?: Date;
  /** 生产厂家 */
  elecMotorManufacturer?: string;
}
