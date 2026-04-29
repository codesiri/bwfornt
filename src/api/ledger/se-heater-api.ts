import request from "@/utils/request";

const SEHEATER_BASE_URL = "/api/v1/se-heater";

const SeHeaterAPI = {
  /** 获取换热器分页数据 */
  getPage(queryParams?: SeHeaterPageQuery) {
    return request<any, PageResult<SeHeaterPageVO[]>>({
      url: `${SEHEATER_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取换热器表单数据
   *
   * @param id 换热器ID
   * @returns 换热器表单数据
   */
  getFormData(id: number) {
    return request<any, SeHeaterForm>({
      url: `${SEHEATER_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加换热器
   *
   *  @param data 换热器表单数据
   */
  create(data: SeHeaterForm) {
    return request({
      url: `${SEHEATER_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新换热器
   *
   * @param id 换热器ID
   * @param data 换热器表单数据
   */
  update(id: string, data: SeHeaterForm) {
    return request({
      url: `${SEHEATER_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除换热器，多个以英文逗号(,)分割
   *
   * @param ids 换热器ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SEHEATER_BASE_URL}/${ids}`,
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
      url: `${SEHEATER_BASE_URL}/export`,
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
      url: `${SEHEATER_BASE_URL}/import`,
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
      url: `${SEHEATER_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SeHeaterAPI;

/** 换热器分页查询参数 */
export interface SeHeaterPageQuery extends PageQuery {
  /** 换热器设备编号 */
  seHeaterEquipCode?: string;
  /** 换热器名称 */
  seHeaterName?: string;
  /** 设备状态 */
  seHeaterStatus?: string;
  /** 所属工厂 */
  seHeaterFactory?: string;
}

/** 换热器表单对象 */
export interface SeHeaterForm {
  /** 序号 */
  id?: number;
  /** 换热器设备编号 */
  seHeaterEquipCode?: string;
  /** 换热器名称 */
  seHeaterName?: string;
  /** 换热器类型 */
  seHeaterType?: string;
  /** 设备规格 */
  seHeaterSpec?: string;
  /** 换热面积（㎡） */
  seHeaterArea?: string;
  /** 设计压力（MPa） */
  seHeaterDesignP?: string;
  /** 设计温度（℃） */
  seHeaterDesignT?: string;
  /** 介质类型 */
  seHeaterMedium?: string;
  /** 主体材质 */
  seHeaterMaterial?: string;
  /** 安装位置 */
  seHeaterInstallPos?: string;
  /** 投用日期 */
  seHeaterInService?: Date;
  /** 法定校验周期 */
  seHeaterInspectCycle?: string;
  /** 上次校验日期 */
  seHeaterLastInspect?: string;
  /** 下次校验日期 */
  seHeaterNextInspect?: string;
  /** 检验结果 */
  seHeaterInspectResult?: string;
  /** 清洗周期 */
  seHeaterCleanCycle?: string;
  /** 上次清洗日期 */
  seHeaterLastClean?: Date;
  /** 下次清洗日期 */
  seHeaterNextClean?: Date;
  /** 污垢热阻（m²・K/W） */
  seHeaterFoulingRate?: string;
  /** 换热效率（%） */
  seHeaterEnergyEff?: string;
  /** 维保记录 */
  seHeaterMaintainRecord?: string;
  /** 故障记录 */
  seHeaterFaultRecord?: string;
  /** 台账录入 / 维护人员 */
  seHeaterOperator?: string;
  /** 台账记录创建时间 */
  seHeaterCreateTime?: Date;
  /** 台账记录最后修改时间 */
  seHeaterUpdateTime?: Date;
  /** 设备状态 */
  seHeaterStatus?: string;
  /** 所属工厂 */
  seHeaterFactory?: string;
  /** 备用1 */
  seHeaterReserve1?: string;
  /** 备用2 */
  seHeaterReserve2?: string;
  /** 备用3 */
  seHeaterReserve3?: string;
}

/** 换热器分页对象 */
export interface SeHeaterPageVO {
  /** 序号 */
  id?: number;
  /** 换热器设备编号 */
  seHeaterEquipCode?: string;
  /** 换热器名称 */
  seHeaterName?: string;
  /** 换热器类型 */
  seHeaterType?: string;
  /** 设备规格 */
  seHeaterSpec?: string;
  /** 换热面积（㎡） */
  seHeaterArea?: string;
  /** 设计压力（MPa） */
  seHeaterDesignP?: string;
  /** 设计温度（℃） */
  seHeaterDesignT?: string;
  /** 介质类型 */
  seHeaterMedium?: string;
  /** 主体材质 */
  seHeaterMaterial?: string;
  /** 安装位置 */
  seHeaterInstallPos?: string;
  /** 投用日期 */
  seHeaterInService?: Date;
  /** 法定校验周期 */
  seHeaterInspectCycle?: string;
  /** 上次校验日期 */
  seHeaterLastInspect?: string;
  /** 下次校验日期 */
  seHeaterNextInspect?: string;
  /** 检验结果 */
  seHeaterInspectResult?: string;
  /** 清洗周期 */
  seHeaterCleanCycle?: string;
  /** 上次清洗日期 */
  seHeaterLastClean?: Date;
  /** 下次清洗日期 */
  seHeaterNextClean?: Date;
  /** 污垢热阻（m²・K/W） */
  seHeaterFoulingRate?: string;
  /** 换热效率（%） */
  seHeaterEnergyEff?: string;
  /** 维保记录 */
  seHeaterMaintainRecord?: string;
  /** 故障记录 */
  seHeaterFaultRecord?: string;
  /** 台账录入 / 维护人员 */
  seHeaterOperator?: string;
  /** 台账记录创建时间 */
  seHeaterCreateTime?: Date;
  /** 台账记录最后修改时间 */
  seHeaterUpdateTime?: Date;
  /** 设备状态 */
  seHeaterStatus?: string;
  /** 所属工厂 */
  seHeaterFactory?: string;
  /** 备用1 */
  seHeaterReserve1?: string;
  /** 备用2 */
  seHeaterReserve2?: string;
  /** 备用3 */
  seHeaterReserve3?: string;
}
