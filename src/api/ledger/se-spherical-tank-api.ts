import request from "@/utils/request";

const SESPHERICALTANK_BASE_URL = "/api/v1/se-spherical-tank";

const SeSphericalTankAPI = {
  /** 获取球罐分页数据 */
  getPage(queryParams?: SeSphericalTankPageQuery) {
    return request<any, PageResult<SeSphericalTankPageVO[]>>({
      url: `${SESPHERICALTANK_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取球罐表单数据
   *
   * @param id 球罐ID
   * @returns 球罐表单数据
   */
  getFormData(id: number) {
    return request<any, SeSphericalTankForm>({
      url: `${SESPHERICALTANK_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加球罐
   *
   *  @param data 球罐表单数据
   */
  create(data: SeSphericalTankForm) {
    return request({
      url: `${SESPHERICALTANK_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新球罐
   *
   * @param id 球罐ID
   * @param data 球罐表单数据
   */
  update(id: string, data: SeSphericalTankForm) {
    return request({
      url: `${SESPHERICALTANK_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除球罐，多个以英文逗号(,)分割
   *
   * @param ids 球罐ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SESPHERICALTANK_BASE_URL}/${ids}`,
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
      url: `${SESPHERICALTANK_BASE_URL}/export`,
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
      url: `${SESPHERICALTANK_BASE_URL}/import`,
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
      url: `${SESPHERICALTANK_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SeSphericalTankAPI;

/** 球罐分页查询参数 */
export interface SeSphericalTankPageQuery extends PageQuery {
  /** 球罐名称 */
  seTankName?: string;
  /** 设备状态 */
  seTankStatus?: string;
  /** 所属工厂 */
  seTankFactory?: string;
}

/** 球罐表单对象 */
export interface SeSphericalTankForm {
  /** 序号 */
  id?: number;
  /** 球罐设备编号 */
  seTankEquipCode?: string;
  /** 球罐名称 */
  seTankName?: string;
  /** 规格型号 */
  seTankSpec?: string;
  /** 设计容积（m³） */
  seTankDesignVolume?: string;
  /** 工作容积（m³） */
  seTankOperatingVolume?: string;
  /** 设计压力（MPa） */
  seTankDesignP?: string;
  /** 工作压力（MPa） */
  seTankOperatingP?: string;
  /** 设计温度（℃） */
  seTankDesignT?: string;
  /** 工作温度（℃） */
  seTankOperatingT?: string;
  /** 储存介质 */
  seTankMedia?: string;
  /** 主体材质 */
  seTankMaterial?: string;
  /** 罐体壁厚（mm） */
  seTankThickness?: string;
  /** 密封形式 */
  seTankSealType?: string;
  /** 防腐措施 */
  seTankAntiCorrosion?: string;
  /** 安全阀型号规格 */
  seTankSafetyValveModel?: string;
  /** 安装位置 */
  seTankInstallPos?: string;
  /** 投用日期 */
  seTankInService?: string;
  /** 定期检验周期 */
  seTankInspectCycle?: string;
  /** 上次检验日期 */
  seTankLastInspect?: Date;
  /** 下次检验日期 */
  seTankNextInspect?: Date;
  /** 检验结果 */
  seTankInspectResult?: string;
  /** 上次水压 / 气压试验日期 */
  seTankLastPressureTest?: Date;
  /** 液位计型号 */
  seTankLevelGaugeModel?: string;
  /** 腐蚀状况 */
  seTankCorrosionStatus?: string;
  /** 维保维修记录 */
  seTankMaintainRecord?: string;
  /** 故障及异常记录 */
  seTankFaultRecord?: string;
  /** 录入维护人员 */
  seTankOperator?: string;
  /** 记录创建时间 */
  seTankCreateTime?: Date;
  /** 最后更新时间 */
  seTankUpdateTime?: Date;
  /** 设备状态 */
  seTankStatus?: string;
  /** 所属工厂 */
  seTankFactory?: string;
  /** 备用1 */
  seTankReserve1?: string;
  /** 备用2 */
  seTankReserve2?: string;
  /** 备用3 */
  seTankReserve3?: string;
}

/** 球罐分页对象 */
export interface SeSphericalTankPageVO {
  /** 序号 */
  id?: number;
  /** 球罐设备编号 */
  seTankEquipCode?: string;
  /** 球罐名称 */
  seTankName?: string;
  /** 规格型号 */
  seTankSpec?: string;
  /** 设计容积（m³） */
  seTankDesignVolume?: string;
  /** 工作容积（m³） */
  seTankOperatingVolume?: string;
  /** 设计压力（MPa） */
  seTankDesignP?: string;
  /** 工作压力（MPa） */
  seTankOperatingP?: string;
  /** 设计温度（℃） */
  seTankDesignT?: string;
  /** 工作温度（℃） */
  seTankOperatingT?: string;
  /** 储存介质 */
  seTankMedia?: string;
  /** 主体材质 */
  seTankMaterial?: string;
  /** 罐体壁厚（mm） */
  seTankThickness?: string;
  /** 密封形式 */
  seTankSealType?: string;
  /** 防腐措施 */
  seTankAntiCorrosion?: string;
  /** 安全阀型号规格 */
  seTankSafetyValveModel?: string;
  /** 安装位置 */
  seTankInstallPos?: string;
  /** 投用日期 */
  seTankInService?: string;
  /** 定期检验周期 */
  seTankInspectCycle?: string;
  /** 上次检验日期 */
  seTankLastInspect?: Date;
  /** 下次检验日期 */
  seTankNextInspect?: Date;
  /** 检验结果 */
  seTankInspectResult?: string;
  /** 上次水压 / 气压试验日期 */
  seTankLastPressureTest?: Date;
  /** 液位计型号 */
  seTankLevelGaugeModel?: string;
  /** 腐蚀状况 */
  seTankCorrosionStatus?: string;
  /** 维保维修记录 */
  seTankMaintainRecord?: string;
  /** 故障及异常记录 */
  seTankFaultRecord?: string;
  /** 录入维护人员 */
  seTankOperator?: string;
  /** 记录创建时间 */
  seTankCreateTime?: Date;
  /** 最后更新时间 */
  seTankUpdateTime?: Date;
  /** 设备状态 */
  seTankStatus?: string;
  /** 所属工厂 */
  seTankFactory?: string;
  /** 备用1 */
  seTankReserve1?: string;
  /** 备用2 */
  seTankReserve2?: string;
  /** 备用3 */
  seTankReserve3?: string;
}
