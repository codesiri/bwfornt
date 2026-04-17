import request from "@/utils/request";

const CABLELINEEQUIPMENT_BASE_URL = "/api/v1/cable-line-equipment";

const CableLineEquipmentAPI = {
  /** 获取电器电缆线路分页数据 */
  getPage(queryParams?: CableLineEquipmentPageQuery) {
    return request<any, PageResult<CableLineEquipmentPageVO[]>>({
      url: `${CABLELINEEQUIPMENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取电器电缆线路表单数据
   *
   * @param id 电器电缆线路ID
   * @returns 电器电缆线路表单数据
   */
  getFormData(id: number) {
    return request<any, CableLineEquipmentForm>({
      url: `${CABLELINEEQUIPMENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加电器电缆线路
   *
   *  @param data 电器电缆线路表单数据
   */
  create(data: CableLineEquipmentForm) {
    return request({
      url: `${CABLELINEEQUIPMENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新电器电缆线路
   *
   * @param id 电器电缆线路ID
   * @param data 电器电缆线路表单数据
   */
  update(id: string, data: CableLineEquipmentForm) {
    return request({
      url: `${CABLELINEEQUIPMENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除电器电缆线路，多个以英文逗号(,)分割
   *
   * @param ids 电器电缆线路ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${CABLELINEEQUIPMENT_BASE_URL}/${ids}`,
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
      url: `${CABLELINEEQUIPMENT_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  /**
   * 导入文件
   *
   * @param file 文件
   */
  importFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, any>({
      url: `${CABLELINEEQUIPMENT_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   * 下载导入模板
   */
  downloadtemplate() {
    return request({
      url: `${CABLELINEEQUIPMENT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default CableLineEquipmentAPI;

/** 电器电缆线路分页查询参数 */
export interface CableLineEquipmentPageQuery extends PageQuery {
  /** 电缆编号 */
  cleCableCode?: string;
  /** 电缆名称 */
  cleCableName?: string;
  /** 规格型号 */
  cleSpecModel?: string;
  /** 生产厂家 */
  cleManufacturer?: string;
  /** 所属工厂 */
  cleFactory?: string;
}

/** 电器电缆线路表单对象 */
export interface CableLineEquipmentForm {
  /** 序号 */
  id?: number;
  /** 电缆编号 */
  cleCableCode?: string;
  /** 电缆名称 */
  cleCableName?: string;
  /** 规格型号 */
  cleSpecModel?: string;
  /** 绝缘等级 */
  cleInsulationLevel?: string;
  /** 电缆长度（m） */
  cleCableLength?: string;
  /** 敷设方式 */
  cleLayingMethod?: string;
  /** 敷设路径 */
  cleLayingPath?: string;
  /** 安装区域及危险等级 */
  cleInstallArea?: string;
  /** 电缆芯数 */
  cleCoreNumber?: string;
  /** 芯线截面（mm²） */
  cleCoreSection?: string;
  /** 生产厂家 */
  cleManufacturer?: string;
  /** 生产日期 */
  cleProductionDate?: Date;
  /** 敷设安装日期 */
  cleInstallDate?: Date;
  /** 上次耐压 / 绝缘测试日期 */
  cleLastTestDate?: Date;
  /** 上次测试数据（MΩ/kV） */
  cleLastTestData?: string;
  /** 中间接头数量 */
  cleJointCount?: string;
  /** 电缆状态（在用 / 备用 / 停用） */
  cleStatus?: string;
  /** 所属工厂 */
  cleFactory?: string;
}

/** 电器电缆线路分页对象 */
export interface CableLineEquipmentPageVO {
  /** 序号 */
  id?: number;
  /** 电缆编号 */
  cleCableCode?: string;
  /** 电缆名称 */
  cleCableName?: string;
  /** 规格型号 */
  cleSpecModel?: string;
  /** 绝缘等级 */
  cleInsulationLevel?: string;
  /** 电缆长度（m） */
  cleCableLength?: string;
  /** 敷设方式 */
  cleLayingMethod?: string;
  /** 敷设路径 */
  cleLayingPath?: string;
  /** 安装区域及危险等级 */
  cleInstallArea?: string;
  /** 电缆芯数 */
  cleCoreNumber?: string;
  /** 芯线截面（mm²） */
  cleCoreSection?: string;
  /** 生产厂家 */
  cleManufacturer?: string;
  /** 生产日期 */
  cleProductionDate?: Date;
  /** 敷设安装日期 */
  cleInstallDate?: Date;
  /** 上次耐压 / 绝缘测试日期 */
  cleLastTestDate?: Date;
  /** 上次测试数据（MΩ/kV） */
  cleLastTestData?: string;
  /** 中间接头数量 */
  cleJointCount?: string;
  /** 电缆状态（在用 / 备用 / 停用） */
  cleStatus?: string;
  /** 所属工厂 */
  cleFactory?: string;
}
