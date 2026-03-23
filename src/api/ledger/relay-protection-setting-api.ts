import request from "@/utils/request";

const RELAYPROTECTIONSETTING_BASE_URL = "/api/v1/relay-protection-setting";

const RelayProtectionSettingAPI = {
  /** 获取继电保护定值台账分页数据 */
  getPage(queryParams?: RelayProtectionSettingPageQuery) {
    return request<any, PageResult<RelayProtectionSettingPageVO[]>>({
      url: `${RELAYPROTECTIONSETTING_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取继电保护定值台账表单数据
   *
   * @param id 继电保护定值台账ID
   * @returns 继电保护定值台账表单数据
   */
  getFormData(id: number) {
    return request<any, RelayProtectionSettingForm>({
      url: `${RELAYPROTECTIONSETTING_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加继电保护定值台账
   *
   *  @param data 继电保护定值台账表单数据
   */
  create(data: RelayProtectionSettingForm) {
    return request({
      url: `${RELAYPROTECTIONSETTING_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新继电保护定值台账
   *
   * @param id 继电保护定值台账ID
   * @param data 继电保护定值台账表单数据
   */
  update(id: string, data: RelayProtectionSettingForm) {
    return request({
      url: `${RELAYPROTECTIONSETTING_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除继电保护定值台账，多个以英文逗号(,)分割
   *
   * @param ids 继电保护定值台账ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${RELAYPROTECTIONSETTING_BASE_URL}/${ids}`,
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
      url: `${RELAYPROTECTIONSETTING_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  /**
   * 导入压力表
   *
   * @param file 导入文件
   */
  import(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, ExcelResult>({
      url: `${RELAYPROTECTIONSETTING_BASE_URL}/import`,
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
      url: `${RELAYPROTECTIONSETTING_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default RelayProtectionSettingAPI;

/** 继电保护定值台账分页查询参数 */
export interface RelayProtectionSettingPageQuery extends PageQuery {
  /** 继电器编号 */
  rpsRelayCode?: string;
  /** 继电器类型 */
  rpsRelayType?: string;
  /** 上次校验日期 */
  rpsLastCheckDate?: [string, string];
  /** 下次校验日期 */
  rpsNextCheckDate?: [string, string];
  /** 安装位置 */
  rpsInstallPosition?: string;
  /** 所属工厂 */
  rpsFactory?: string;
}

/** 继电保护定值台账表单对象 */
export interface RelayProtectionSettingForm {
  /** 序号 */
  id?: number;
  /** 继电器编号 */
  rpsRelayCode?: string;
  /** 继电器类型 */
  rpsRelayType?: string;
  /** 继电器型号 */
  rpsRelayModel?: string;
  /** 过流保护定值（A） */
  rpsOvercurrentSetting?: string;
  /** 过流保护延时（s） */
  rpsOvercurrentDelay?: string;
  /** 速断保护定值（A） */
  rpsInstantaneousSetting?: string;
  /** 接地故障定值（A） */
  rpsEarthFaultSetting?: string;
  /** 过载保护定值（%） */
  rpsOverloadSetting?: string;
  /** 定值整定日期 */
  rpsSettingDate?: Date;
  /** 整定人员 */
  rpsSettingPerson?: string;
  /** 上次校验日期 */
  rpsLastCheckDate?: Date;
  /** 下次校验日期 */
  rpsNextCheckDate?: Date;
  /** 定值变更记录 */
  rpsChangeRecord?: string;
  /** 安装位置 */
  rpsInstallPosition?: string;
  /** 所属工厂 */
  rpsFactory?: string;
}

/** 继电保护定值台账分页对象 */
export interface RelayProtectionSettingPageVO {
  /** 序号 */
  id?: number;
  /** 继电器编号 */
  rpsRelayCode?: string;
  /** 继电器类型 */
  rpsRelayType?: string;
  /** 继电器型号 */
  rpsRelayModel?: string;
  /** 过流保护定值（A） */
  rpsOvercurrentSetting?: string;
  /** 过流保护延时（s） */
  rpsOvercurrentDelay?: string;
  /** 速断保护定值（A） */
  rpsInstantaneousSetting?: string;
  /** 接地故障定值（A） */
  rpsEarthFaultSetting?: string;
  /** 过载保护定值（%） */
  rpsOverloadSetting?: string;
  /** 定值整定日期 */
  rpsSettingDate?: Date;
  /** 整定人员 */
  rpsSettingPerson?: string;
  /** 上次校验日期 */
  rpsLastCheckDate?: Date;
  /** 下次校验日期 */
  rpsNextCheckDate?: Date;
  /** 定值变更记录 */
  rpsChangeRecord?: string;
  /** 安装位置 */
  rpsInstallPosition?: string;
  /** 所属工厂 */
  rpsFactory?: string;
}
