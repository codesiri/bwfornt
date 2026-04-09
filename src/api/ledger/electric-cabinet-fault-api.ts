import request from "@/utils/request";

const ELECTRICCABINETFAULT_BASE_URL = "/api/v1/electric-cabinet-fault";

const ElectricCabinetFaultAPI = {
  /** 获取抽屉柜故障维修记录分页数据 */
  getPage(queryParams?: ElectricCabinetFaultPageQuery) {
    return request<any, PageResult<ElectricCabinetFaultPageVO[]>>({
      url: `${ELECTRICCABINETFAULT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取抽屉柜故障维修记录表单数据
   *
   * @param id 抽屉柜故障维修记录ID
   * @returns 抽屉柜故障维修记录表单数据
   */
  getFormData(id: number) {
    return request<any, ElectricCabinetFaultForm>({
      url: `${ELECTRICCABINETFAULT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加抽屉柜故障维修记录
   *
   *  @param data 抽屉柜故障维修记录表单数据
   */
  create(data: ElectricCabinetFaultForm) {
    return request({
      url: `${ELECTRICCABINETFAULT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新抽屉柜故障维修记录
   *
   * @param id 抽屉柜故障维修记录ID
   * @param data 抽屉柜故障维修记录表单数据
   */
  update(id: string, data: ElectricCabinetFaultForm) {
    return request({
      url: `${ELECTRICCABINETFAULT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除抽屉柜故障维修记录，多个以英文逗号(,)分割
   *
   * @param ids 抽屉柜故障维修记录ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ELECTRICCABINETFAULT_BASE_URL}/${ids}`,
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
      url: `${ELECTRICCABINETFAULT_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  import(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, ExcelResult>({
      url: `${ELECTRICCABINETFAULT_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /** 下载用户导入模板 */
  downloadtemplate() {
    return request({
      url: `${ELECTRICCABINETFAULT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default ElectricCabinetFaultAPI;

/** 抽屉柜故障维修记录分页查询参数 */
export interface ElectricCabinetFaultPageQuery extends PageQuery {
  /** 故障日期 */
  ecfFaultDate?: [string, string];
  /** 故障发生时间 */
  ecfFaultTime?: [string, string];
  /** 故障柜体 / 抽屉编号 */
  ecfFaultCabinet?: string;
  /** 维修人员 */
  ecfRepairPerson?: string;
  /** 维修完成时间 */
  ecfRepairCompleteTime?: [string, string];
  /** 	恢复运行时间 */
  ecfRecoverTime?: [string, string];
  /** 验收人 */
  ecfChecker?: string;
  /** 故障分类 */
  ecfFaultType?: string;
  /** 所属工厂 */
  ecfFactory?: string;
}

/** 抽屉柜故障维修记录表单对象 */
export interface ElectricCabinetFaultForm {
  /** 序号 */
  id?: number;
  /** 故障日期 */
  ecfFaultDate?: Date;
  /** 故障发生时间 */
  ecfFaultTime?: Date;
  /** 故障柜体 / 抽屉编号 */
  ecfFaultCabinet?: string;
  /** 故障现象 */
  ecfFaultPhenomenon?: string;
  /** 故障原因分析 */
  ecfFaultReason?: string;
  /** 维修人员 */
  ecfRepairPerson?: string;
  /** 维修方案 */
  ecfRepairScheme?: string;
  /** 更换元器件 */
  ecfReplaceComponent?: string;
  /** 维修完成时间 */
  ecfRepairCompleteTime?: Date;
  /** 	恢复运行时间 */
  ecfRecoverTime?: Date;
  /** 维修结果 */
  ecfRepairResult?: string;
  /** 验收人 */
  ecfChecker?: string;
  /** 故障分类 */
  ecfFaultType?: string;
  /** 所属工厂 */
  ecfFactory?: string;
  /** 备用1 */
  ecfReserve1?: string;
  /** 备用2 */
  ecfReserve2?: string;
  /** 备用3 */
  ecfReserve3?: string;
}

/** 抽屉柜故障维修记录分页对象 */
export interface ElectricCabinetFaultPageVO {
  /** 序号 */
  id?: number;
  /** 故障日期 */
  ecfFaultDate?: Date;
  /** 故障发生时间 */
  ecfFaultTime?: Date;
  /** 故障柜体 / 抽屉编号 */
  ecfFaultCabinet?: string;
  /** 故障现象 */
  ecfFaultPhenomenon?: string;
  /** 故障原因分析 */
  ecfFaultReason?: string;
  /** 维修人员 */
  ecfRepairPerson?: string;
  /** 维修方案 */
  ecfRepairScheme?: string;
  /** 更换元器件 */
  ecfReplaceComponent?: string;
  /** 维修完成时间 */
  ecfRepairCompleteTime?: Date;
  /** 	恢复运行时间 */
  ecfRecoverTime?: Date;
  /** 维修结果 */
  ecfRepairResult?: string;
  /** 验收人 */
  ecfChecker?: string;
  /** 故障分类 */
  ecfFaultType?: string;
  /** 所属工厂 */
  ecfFactory?: string;
  /** 备用1 */
  ecfReserve1?: string;
  /** 备用2 */
  ecfReserve2?: string;
  /** 备用3 */
  ecfReserve3?: string;
}
