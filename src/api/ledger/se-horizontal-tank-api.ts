import request from "@/utils/request";

const SEHORIZONTALTANK_BASE_URL = "/api/v1/se-horizontal-tank";

const SeHorizontalTankAPI = {
  /** 获取卧罐分页数据 */
  getPage(queryParams?: SeHorizontalTankPageQuery) {
    return request<any, PageResult<SeHorizontalTankPageVO[]>>({
      url: `${SEHORIZONTALTANK_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取卧罐表单数据
   *
   * @param id 卧罐ID
   * @returns 卧罐表单数据
   */
  getFormData(id: number) {
    return request<any, SeHorizontalTankForm>({
      url: `${SEHORIZONTALTANK_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加卧罐
   *
   *  @param data 卧罐表单数据
   */
  create(data: SeHorizontalTankForm) {
    return request({
      url: `${SEHORIZONTALTANK_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新卧罐
   *
   * @param id 卧罐ID
   * @param data 卧罐表单数据
   */
  update(id: string, data: SeHorizontalTankForm) {
    return request({
      url: `${SEHORIZONTALTANK_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除卧罐，多个以英文逗号(,)分割
   *
   * @param ids 卧罐ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SEHORIZONTALTANK_BASE_URL}/${ids}`,
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
      url: `${SEHORIZONTALTANK_BASE_URL}/export`,
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
      url: `${SEHORIZONTALTANK_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /** 下载用户导入模板 */
  downloadTemplate() {
    return request({
      url: `${SEHORIZONTALTANK_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SeHorizontalTankAPI;

/** 卧罐分页查询参数 */
export interface SeHorizontalTankPageQuery extends PageQuery {
  /** 卧罐设备编号 */
  seHtankEquipCode?: string;
  /** 卧罐名称 */
  seHtankName?: string;
  /** 设备状态 */
  seHtankStatus?: string;
  /** 所属工厂 */
  seHtankFactory?: string;
}

/** 卧罐表单对象 */
export interface SeHorizontalTankForm {
  /** 序号 */
  id?: number;
  /** 卧罐设备编号 */
  seHtankEquipCode?: string;
  /** 卧罐名称 */
  seHtankName?: string;
  /** 规格型号 */
  seHtankSpec?: string;
  /** 设计容积（m³） */
  seHtankDesignVolume?: string;
  /** 工作容积（m³） */
  seHtankOperatingVolume?: string;
  /** 设计压力（MPa） */
  seHtankDesignP?: string;
  /** 工作压力（MPa） */
  seHtankOperatingP?: string;
  /** 设计温度（℃） */
  seHtankDesignT?: string;
  /** 工作温度（℃） */
  seHtankOperatingT?: string;
  /** 储存介质 */
  seHtankMedia?: string;
  /** 主体材质 */
  seHtankMaterial?: string;
  /** 罐体壁厚（mm） */
  seHtankThickness?: string;
  /** 密封形式 */
  seHtankSealType?: string;
  /** 防腐措施 */
  seHtankAntiCorrosion?: string;
  /** 支撑形式 */
  seHtankSupportType?: string;
  /** 安全阀型号规格（核心安全附件，需定期校验） */
  seHtankSafetyValveModel?: string;
  /** 安装位置 */
  seHtankInstallPos?: string;
  /** 投用日期 */
  seHtankInService?: Date;
  /** 定期检验周期（全面检验每 3 年，年度检查每年，按规范执行） */
  seHtankInspectCycle?: string;
  /** 上次检验日期（含无损检测、压力试验、密封校验） */
  seHtankLastInspect?: Date;
  /** 下次检验日期（系统预警用，同步安全附件校验周期） */
  seHtankNextInspect?: Date;
  /** 检验结果 */
  seHtankInspectResult?: string;
  /** 上次水压 / 气压试验日期 */
  seHtankLastPressureTest?: string;
  /** 液位计型号 */
  seHtankLevelGaugeModel?: string;
  /** 腐蚀状况 */
  seHtankCorrosionStatus?: string;
  /** 维保维修记录 */
  seHtankMaintainRecord?: string;
  /** 故障及异常记录 */
  seHtankFaultRecord?: string;
  /** 录入维护人员 */
  seHtankOperator?: string;
  /** 记录创建时间 */
  seHtankCreateTime?: Date;
  /** 最后更新时间 */
  seHtankUpdateTime?: Date;
  /** 设备状态 */
  seHtankStatus?: string;
  /** 所属工厂 */
  seHtankFactory?: string;
  /** 备用1 */
  seHtankReserve1?: string;
  /** 备用2 */
  seHtankReserve2?: string;
  /** 备用3 */
  seHtankReserve3?: string;
}

/** 卧罐分页对象 */
export interface SeHorizontalTankPageVO {
  /** 序号 */
  id?: number;
  /** 卧罐设备编号 */
  seHtankEquipCode?: string;
  /** 卧罐名称 */
  seHtankName?: string;
  /** 规格型号 */
  seHtankSpec?: string;
  /** 设计容积（m³） */
  seHtankDesignVolume?: string;
  /** 工作容积（m³） */
  seHtankOperatingVolume?: string;
  /** 设计压力（MPa） */
  seHtankDesignP?: string;
  /** 工作压力（MPa） */
  seHtankOperatingP?: string;
  /** 设计温度（℃） */
  seHtankDesignT?: string;
  /** 工作温度（℃） */
  seHtankOperatingT?: string;
  /** 储存介质 */
  seHtankMedia?: string;
  /** 主体材质 */
  seHtankMaterial?: string;
  /** 罐体壁厚（mm） */
  seHtankThickness?: string;
  /** 密封形式 */
  seHtankSealType?: string;
  /** 防腐措施 */
  seHtankAntiCorrosion?: string;
  /** 支撑形式 */
  seHtankSupportType?: string;
  /** 安全阀型号规格（核心安全附件，需定期校验） */
  seHtankSafetyValveModel?: string;
  /** 安装位置 */
  seHtankInstallPos?: string;
  /** 投用日期 */
  seHtankInService?: Date;
  /** 定期检验周期（全面检验每 3 年，年度检查每年，按规范执行） */
  seHtankInspectCycle?: string;
  /** 上次检验日期（含无损检测、压力试验、密封校验） */
  seHtankLastInspect?: Date;
  /** 下次检验日期（系统预警用，同步安全附件校验周期） */
  seHtankNextInspect?: Date;
  /** 检验结果 */
  seHtankInspectResult?: string;
  /** 上次水压 / 气压试验日期 */
  seHtankLastPressureTest?: string;
  /** 液位计型号 */
  seHtankLevelGaugeModel?: string;
  /** 腐蚀状况 */
  seHtankCorrosionStatus?: string;
  /** 维保维修记录 */
  seHtankMaintainRecord?: string;
  /** 故障及异常记录 */
  seHtankFaultRecord?: string;
  /** 录入维护人员 */
  seHtankOperator?: string;
  /** 记录创建时间 */
  seHtankCreateTime?: Date;
  /** 最后更新时间 */
  seHtankUpdateTime?: Date;
  /** 设备状态 */
  seHtankStatus?: string;
  /** 所属工厂 */
  seHtankFactory?: string;
  /** 备用1 */
  seHtankReserve1?: string;
  /** 备用2 */
  seHtankReserve2?: string;
  /** 备用3 */
  seHtankReserve3?: string;
}
