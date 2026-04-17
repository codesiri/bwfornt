import request from "@/utils/request";

const MAINTAINPLAN_BASE_URL = "/api/v1/maintain-plan";

const MaintainPlanAPI = {
  /** 获取维修计划分页数据 */
  getPage(queryParams?: MaintainPlanPageQuery) {
    return request<any, PageResult<MaintainPlanPageVO[]>>({
      url: `${MAINTAINPLAN_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取维修计划表单数据
   *
   * @param id 维修计划ID
   * @returns 维修计划表单数据
   */
  getFormData(id: number) {
    return request<any, MaintainPlanForm>({
      url: `${MAINTAINPLAN_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加维修计划
   *
   *  @param data 维修计划表单数据
   */
  create(data: MaintainPlanForm) {
    return request({
      url: `${MAINTAINPLAN_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新维修计划
   *
   * @param id 维修计划ID
   * @param data 维修计划表单数据
   */
  update(id: string, data: MaintainPlanForm) {
    return request({
      url: `${MAINTAINPLAN_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除维修计划，多个以英文逗号(,)分割
   *
   * @param ids 维修计划ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${MAINTAINPLAN_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default MaintainPlanAPI;

/** 维修计划分页查询参数 */
export interface MaintainPlanPageQuery extends PageQuery {
  /** 计划类型 */
  maintainPlanType?: string;
  /** 计划年度 */
  maintainPlanYear?: number;
  /** 计划月份 */
  maintainPlanMonth?: number;
  /** 设备编号 */
  maintainPlanEquipCode?: string;
  /** 设备名称 */
  maintainPlanEquipName?: string;
  /** 设备类型 */
  maintainPlanEquipType?: string;
  /** 维修/检修内容 */
  maintainPlanContent?: string;
  /** 计划执行日期 */
  maintainPlanScheduleDate?: [string, string];
  /** 计划时长 */
  maintainPlanDuration?: number;
  /** 负责部门 */
  maintainPlanDept?: string;
  /** 负责人 */
  maintainPlanPerson?: string;
  /** 安全风险等级 */
  maintainPlanSafetyLevel?: string;
  /** 安全防护措施 */
  maintainPlanSafetyMeasure?: string;
  /** 计划状态 */
  maintainPlanStatus?: string;
  /** 实际执行日期 */
  maintainPlanActualDate?: [string, string];
}

/** 维修计划表单对象 */
export interface MaintainPlanForm {
  id?: number;
  /** 计划类型 */
  maintainPlanType?: string;
  /** 计划年度 */
  maintainPlanYear?: number;
  /** 计划月份 */
  maintainPlanMonth?: number;
  /** 设备编号 */
  maintainPlanEquipCode?: string;
  /** 设备名称 */
  maintainPlanEquipName?: string;
  /** 设备类型 */
  maintainPlanEquipType?: string;
  /** 维修/检修内容 */
  maintainPlanContent?: string;
  /** 计划执行日期 */
  maintainPlanScheduleDate?: Date;
  /** 计划时长 */
  maintainPlanDuration?: number;
  /** 负责部门 */
  maintainPlanDept?: string;
  /** 负责人 */
  maintainPlanPerson?: string;
  /** 安全风险等级 */
  maintainPlanSafetyLevel?: string;
  /** 安全防护措施 */
  maintainPlanSafetyMeasure?: string;
  /** 计划状态 */
  maintainPlanStatus?: string;
  /** 实际执行日期 */
  maintainPlanActualDate?: Date;
}

/** 维修计划分页对象 */
export interface MaintainPlanPageVO {
  /** 序号 */
  id?: number;
  /** 计划类型 */
  maintainPlanType?: string;
  /** 计划年度 */
  maintainPlanYear?: number;
  /** 计划月份 */
  maintainPlanMonth?: number;
  /** 设备编号 */
  maintainPlanEquipCode?: string;
  /** 设备名称 */
  maintainPlanEquipName?: string;
  /** 设备类型 */
  maintainPlanEquipType?: string;
  /** 维修/检修内容 */
  maintainPlanContent?: string;
  /** 计划执行日期 */
  maintainPlanScheduleDate?: Date;
  /** 计划时长 */
  maintainPlanDuration?: number;
  /** 负责部门 */
  maintainPlanDept?: string;
  /** 负责人 */
  maintainPlanPerson?: string;
  /** 安全风险等级 */
  maintainPlanSafetyLevel?: string;
  /** 安全防护措施 */
  maintainPlanSafetyMeasure?: string;
  /** 计划状态 */
  maintainPlanStatus?: string;
  /** 实际执行日期 */
  maintainPlanActualDate?: Date;
}
