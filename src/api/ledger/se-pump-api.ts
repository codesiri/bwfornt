import request from "@/utils/request";

const SEPUMP_BASE_URL = "/api/v1/se-pump";

const SePumpAPI = {
  /** 获取泵分页数据 */
  getPage(queryParams?: SePumpPageQuery) {
    return request<any, PageResult<SePumpPageVO[]>>({
      url: `${SEPUMP_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取泵表单数据
   *
   * @param id 泵ID
   * @returns 泵表单数据
   */
  getFormData(id: number) {
    return request<any, SePumpForm>({
      url: `${SEPUMP_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加泵
   *
   *  @param data 泵表单数据
   */
  create(data: SePumpForm) {
    return request({
      url: `${SEPUMP_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新泵
   *
   * @param id 泵ID
   * @param data 泵表单数据
   */
  update(id: string, data: SePumpForm) {
    return request({
      url: `${SEPUMP_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除泵，多个以英文逗号(,)分割
   *
   * @param ids 泵ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SEPUMP_BASE_URL}/${ids}`,
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
      url: `${SEPUMP_BASE_URL}/export`,
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
      url: `${SEPUMP_BASE_URL}/import`,
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
      url: `${SEPUMP_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SePumpAPI;

/** 泵分页查询参数 */
export interface SePumpPageQuery extends PageQuery {
  /** 泵设备编号 */
  sePumpEquipCode?: string;
  /** 设备名称 */
  sePumpName?: string;
  /** 泵类型 */
  sePumpType?: string;
  /** 设备状态 */
  sePumpStatus?: string;
}

/** 泵表单对象 */
export interface SePumpForm {
  /** 序号 */
  id?: number;
  /** 泵设备编号 */
  sePumpEquipCode?: string;
  /** 设备名称 */
  sePumpName?: string;
  /** 泵类型 */
  sePumpType?: string;
  /** 设备状态 */
  sePumpStatus?: string;
  /** 规格型号 */
  sePumpSpec?: string;
  /** 额定流量 */
  sePumpFlow?: string;
  /** 额定量程 */
  sePumpHead?: string;
  /** 额定功率 */
  sePumpRatedPower?: string;
  /** 额定转速 */
  sePumpRatedSpeed?: string;
  /** 输送介质 */
  sePumpMedium?: string;
  /** 介质温度 */
  sePumpMediumTemp?: string;
  /** 设计压力 */
  sePumpDesignP?: string;
  /** 过流部件材质 */
  sePumpMaterial?: string;
  /** 密封形式 */
  sePumpSealType?: string;
  /** 防爆等级 */
  sePumpExplosionProof?: string;
  /** 配套电机型号 */
  sePumpMotorModel?: string;
  /** 安装位置 */
  sePumpInstallPos?: string;
  /** 投用日期 */
  sePumpInService?: string;
  /** 定期检验周期 */
  sePumpInspectCycle?: string;
  /** 上次检验日期 */
  sePumpLastInspect?: Date;
  /** 下次检验日期 */
  sePumpNextInspect?: Date;
  /** 检验结果 */
  sePumpInspectResult?: string;
  /** 上次维保日期 */
  sePumpLastMaintain?: Date;
  /** 下次维保日期 */
  sePumpNextMaintain?: Date;
  /** 运行振动值 */
  sePumpVibration?: string;
  /** 密封泄漏状态 */
  sePumpLeakStatus?: string;
  /** 维保维修记录 */
  sePumpMaintainRecord?: string;
  /** 故障及异常记录 */
  sePumpFaultRecord?: string;
  /** 录入维护人员 */
  sePumpOperator?: string;
  /** 记录创建时间 */
  sePumpCreateTime?: Date;
  /** 最后更新时间 */
  sePumpUpdateTime?: Date;
  /** 所属工厂 */
  sePumpFactory?: string;
  /** 备用1 */
  sePumpReserve1?: string;
  /** 备用2 */
  sePumpReserve2?: string;
  /** 备用3 */
  sePumpReserve3?: string;
}

/** 泵分页对象 */
export interface SePumpPageVO {
  /** 序号 */
  id?: number;
  /** 泵设备编号 */
  sePumpEquipCode?: string;
  /** 设备名称 */
  sePumpName?: string;
  /** 泵类型 */
  sePumpType?: string;
  /** 设备状态 */
  sePumpStatus?: string;
  /** 规格型号 */
  sePumpSpec?: string;
  /** 额定流量 */
  sePumpFlow?: string;
  /** 额定量程 */
  sePumpHead?: string;
  /** 额定功率 */
  sePumpRatedPower?: string;
  /** 额定转速 */
  sePumpRatedSpeed?: string;
  /** 输送介质 */
  sePumpMedium?: string;
  /** 介质温度 */
  sePumpMediumTemp?: string;
  /** 设计压力 */
  sePumpDesignP?: string;
  /** 过流部件材质 */
  sePumpMaterial?: string;
  /** 密封形式 */
  sePumpSealType?: string;
  /** 防爆等级 */
  sePumpExplosionProof?: string;
  /** 配套电机型号 */
  sePumpMotorModel?: string;
  /** 安装位置 */
  sePumpInstallPos?: string;
  /** 投用日期 */
  sePumpInService?: string;
  /** 定期检验周期 */
  sePumpInspectCycle?: string;
  /** 上次检验日期 */
  sePumpLastInspect?: Date;
  /** 下次检验日期 */
  sePumpNextInspect?: Date;
  /** 检验结果 */
  sePumpInspectResult?: string;
  /** 上次维保日期 */
  sePumpLastMaintain?: Date;
  /** 下次维保日期 */
  sePumpNextMaintain?: Date;
  /** 运行振动值 */
  sePumpVibration?: string;
  /** 密封泄漏状态 */
  sePumpLeakStatus?: string;
  /** 维保维修记录 */
  sePumpMaintainRecord?: string;
  /** 故障及异常记录 */
  sePumpFaultRecord?: string;
  /** 录入维护人员 */
  sePumpOperator?: string;
  /** 记录创建时间 */
  sePumpCreateTime?: Date;
  /** 最后更新时间 */
  sePumpUpdateTime?: Date;
  /** 所属工厂 */
  sePumpFactory?: string;
  /** 备用1 */
  sePumpReserve1?: string;
  /** 备用2 */
  sePumpReserve2?: string;
  /** 备用3 */
  sePumpReserve3?: string;
}
