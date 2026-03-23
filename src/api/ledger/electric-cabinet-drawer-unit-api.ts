import request from "@/utils/request";

const ELECTRICCABINETDRAWERUNIT_BASE_URL = "/api/v1/electric-cabinet-drawer-unit";

const ElectricCabinetDrawerUnitAPI = {
  /** 获取抽屉柜抽屉单元明细分页数据 */
  getPage(queryParams?: ElectricCabinetDrawerUnitPageQuery) {
    return request<any, PageResult<ElectricCabinetDrawerUnitPageVO[]>>({
      url: `${ELECTRICCABINETDRAWERUNIT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取抽屉柜抽屉单元明细表单数据
   *
   * @param id 抽屉柜抽屉单元明细ID
   * @returns 抽屉柜抽屉单元明细表单数据
   */
  getFormData(id: number) {
    return request<any, ElectricCabinetDrawerUnitForm>({
      url: `${ELECTRICCABINETDRAWERUNIT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加抽屉柜抽屉单元明细
   *
   *  @param data 抽屉柜抽屉单元明细表单数据
   */
  create(data: ElectricCabinetDrawerUnitForm) {
    return request({
      url: `${ELECTRICCABINETDRAWERUNIT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新抽屉柜抽屉单元明细
   *
   * @param id 抽屉柜抽屉单元明细ID
   * @param data 抽屉柜抽屉单元明细表单数据
   */
  update(id: string, data: ElectricCabinetDrawerUnitForm) {
    return request({
      url: `${ELECTRICCABINETDRAWERUNIT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除抽屉柜抽屉单元明细，多个以英文逗号(,)分割
   *
   * @param ids 抽屉柜抽屉单元明细ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ELECTRICCABINETDRAWERUNIT_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default ElectricCabinetDrawerUnitAPI;

/** 抽屉柜抽屉单元明细分页查询参数 */
export interface ElectricCabinetDrawerUnitPageQuery extends PageQuery {
  /** 单元名称 */
  ecduUnitName?: string;
  /** 开关型号 */
  ecduSwitchModel?: string;
  /** 单元状态 */
  ecduUnitStatus?: string;
  /** 所属工厂 */
  ecduFactory?: string;
}

/** 抽屉柜抽屉单元明细表单对象 */
export interface ElectricCabinetDrawerUnitForm {
  /** 序号 */
  id?: number;
  /** 抽屉编号 */
  ecduDrawerNo?: string;
  /** 单元名称 */
  ecduUnitName?: string;
  /** 额定电流（A） */
  ecduRatedCurrent?: string;
  /** 额定电压（V） */
  ecduRatedVoltage?: string;
  /** 开关型号 */
  ecduSwitchModel?: string;
  /** 开关厂家 */
  ecduSwitchManufacturer?: string;
  /** 整定电流（A） */
  ecduSettingCurrent?: string;
  /** 对应负载 */
  ecduCorrespondingLoad?: string;
  /** 安装位置 */
  ecduInstallLocation?: string;
  /** 单元状态 */
  ecduUnitStatus?: string;
  /** 所属工厂 */
  ecduFactory?: string;
  /** 备用1 */
  ecduReserve1?: string;
  /** 备用2 */
  ecduReserve2?: string;
  /** 备用3 */
  ecduReserve3?: string;
}

/** 抽屉柜抽屉单元明细分页对象 */
export interface ElectricCabinetDrawerUnitPageVO {
  /** 序号 */
  id?: number;
  /** 抽屉编号 */
  ecduDrawerNo?: string;
  /** 单元名称 */
  ecduUnitName?: string;
  /** 额定电流（A） */
  ecduRatedCurrent?: string;
  /** 额定电压（V） */
  ecduRatedVoltage?: string;
  /** 开关型号 */
  ecduSwitchModel?: string;
  /** 开关厂家 */
  ecduSwitchManufacturer?: string;
  /** 整定电流（A） */
  ecduSettingCurrent?: string;
  /** 对应负载 */
  ecduCorrespondingLoad?: string;
  /** 安装位置 */
  ecduInstallLocation?: string;
  /** 单元状态 */
  ecduUnitStatus?: string;
  /** 所属工厂 */
  ecduFactory?: string;
  /** 备用1 */
  ecduReserve1?: string;
  /** 备用2 */
  ecduReserve2?: string;
  /** 备用3 */
  ecduReserve3?: string;
}
