import request from "@/utils/request";

const ELECTRICCABINETINSPECTION_BASE_URL = "/api/v1/electric-cabinet-inspection";

const ElectricCabinetInspectionAPI = {
  /** 获取抽屉柜检修试验记录分页数据 */
  getPage(queryParams?: ElectricCabinetInspectionPageQuery) {
    return request<any, PageResult<ElectricCabinetInspectionPageVO[]>>({
      url: `${ELECTRICCABINETINSPECTION_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取抽屉柜检修试验记录表单数据
   *
   * @param id 抽屉柜检修试验记录ID
   * @returns 抽屉柜检修试验记录表单数据
   */
  getFormData(id: number) {
    return request<any, ElectricCabinetInspectionForm>({
      url: `${ELECTRICCABINETINSPECTION_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加抽屉柜检修试验记录
   *
   *  @param data 抽屉柜检修试验记录表单数据
   */
  create(data: ElectricCabinetInspectionForm) {
    return request({
      url: `${ELECTRICCABINETINSPECTION_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新抽屉柜检修试验记录
   *
   * @param id 抽屉柜检修试验记录ID
   * @param data 抽屉柜检修试验记录表单数据
   */
  update(id: string, data: ElectricCabinetInspectionForm) {
    return request({
      url: `${ELECTRICCABINETINSPECTION_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除抽屉柜检修试验记录，多个以英文逗号(,)分割
   *
   * @param ids 抽屉柜检修试验记录ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ELECTRICCABINETINSPECTION_BASE_URL}/${ids}`,
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
      url: `${ELECTRICCABINETINSPECTION_BASE_URL}/export`,
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
      url: `${ELECTRICCABINETINSPECTION_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default ElectricCabinetInspectionAPI;

/** 抽屉柜检修试验记录分页查询参数 */
export interface ElectricCabinetInspectionPageQuery extends PageQuery {
  /** 报告编号 */
  eciReportNo?: string;
  /** 检修 / 试验日期 */
  eciInspectDate?: [string, string];
  /** 检修 / 试验单位 */
  eciInspectUnit?: string;
  /** 检修 / 试验人员 */
  eciInspectPerson?: string;
  /** 检修 / 试验类型 */
  eciInspectType?: string;
  /** 检修 / 试验项目 */
  eciInspectItem?: string;
  /** 试验数据 */
  eciTestData?: string;
  /** 合格标准 */
  eciStandard?: string;
  /** 所属工厂 */
  eciFactory?: string;
}

/** 抽屉柜检修试验记录表单对象 */
export interface ElectricCabinetInspectionForm {
  /** 序号 */
  id?: number;
  /** 报告编号 */
  eciReportNo?: string;
  /** 检修 / 试验日期 */
  eciInspectDate?: Date;
  /** 检修 / 试验单位 */
  eciInspectUnit?: string;
  /** 检修 / 试验人员 */
  eciInspectPerson?: string;
  /** 检修 / 试验类型 */
  eciInspectType?: string;
  /** 检修 / 试验项目 */
  eciInspectItem?: string;
  /** 试验数据 */
  eciTestData?: string;
  /** 合格标准 */
  eciStandard?: string;
  /** 结果判定 */
  eciResult?: string;
  /** 整改内容 */
  eciRectifyContent?: string;
  /** 复检结果 */
  eciRecheckResult?: string;
  /** 所属工厂 */
  eciFactory?: string;
  /** 备用1 */
  eciReserve1?: string;
  /** 备用2 */
  eciReserve2?: string;
  /** 备用3 */
  eciReserve3?: string;
}

/** 抽屉柜检修试验记录分页对象 */
export interface ElectricCabinetInspectionPageVO {
  /** 序号 */
  id?: number;
  /** 报告编号 */
  eciReportNo?: string;
  /** 检修 / 试验日期 */
  eciInspectDate?: Date;
  /** 检修 / 试验单位 */
  eciInspectUnit?: string;
  /** 检修 / 试验人员 */
  eciInspectPerson?: string;
  /** 检修 / 试验类型 */
  eciInspectType?: string;
  /** 检修 / 试验项目 */
  eciInspectItem?: string;
  /** 试验数据 */
  eciTestData?: string;
  /** 合格标准 */
  eciStandard?: string;
  /** 结果判定 */
  eciResult?: string;
  /** 整改内容 */
  eciRectifyContent?: string;
  /** 复检结果 */
  eciRecheckResult?: string;
  /** 所属工厂 */
  eciFactory?: string;
  /** 备用1 */
  eciReserve1?: string;
  /** 备用2 */
  eciReserve2?: string;
  /** 备用3 */
  eciReserve3?: string;
}
