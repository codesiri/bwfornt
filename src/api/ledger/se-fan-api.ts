import request from "@/utils/request";

const SEFAN_BASE_URL = "/api/v1/se-fan";

const SeFanAPI = {
  /** 获取特种设备风机台账分页数据 */
  getPage(queryParams?: SeFanPageQuery) {
    return request<any, PageResult<SeFanPageVO[]>>({
      url: `${SEFAN_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取特种设备风机台账表单数据
   *
   * @param id 特种设备风机台账ID
   * @returns 特种设备风机台账表单数据
   */
  getFormData(id: number) {
    return request<any, SeFanForm>({
      url: `${SEFAN_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加特种设备风机台账
   *
   *  @param data 特种设备风机台账表单数据
   */
  create(data: SeFanForm) {
    return request({
      url: `${SEFAN_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新特种设备风机台账
   *
   * @param id 特种设备风机台账ID
   * @param data 特种设备风机台账表单数据
   */
  update(id: string, data: SeFanForm) {
    return request({
      url: `${SEFAN_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除特种设备风机台账，多个以英文逗号(,)分割
   *
   * @param ids 特种设备风机台账ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${SEFAN_BASE_URL}/${ids}`,
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
      url: `${SEFAN_BASE_URL}/export`,
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
      url: `${SEFAN_BASE_URL}/import`,
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
      url: `${SEFAN_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default SeFanAPI;

/** 特种设备风机台账分页查询参数 */
export interface SeFanPageQuery extends PageQuery {
  /** 风机设备编号 */
  seFanEquipCode?: string;
  /** 风机名称 */
  seFanName?: string;
  /** 设备状态 */
  seFanStatus?: string;
  /** 所属工厂 */
  seFanFactory?: string;
}

/** 特种设备风机台账表单对象 */
export interface SeFanForm {
  /** 序号 */
  id?: number;
  /** 风机设备编号 */
  seFanEquipCode?: string;
  /** 风机名称 */
  seFanName?: string;
  /** 风机类型 */
  seFanType?: string;
  /** 设备规格 */
  seFanSpec?: string;
  /** 额定功率（kW） */
  seFanRatedPower?: string;
  /** 额定转速（r/min） */
  seFanRatedSpeed?: string;
  /** 额定压力（kPa，正压 / 负压标注在备注） */
  seFanRatedPressure?: string;
  /** 额定风量（m³/h） */
  seFanRatedFlow?: string;
  /** 输送介质 */
  seFanMedium?: string;
  /** 主体材质 */
  seFanMaterial?: string;
  /** 防爆等级 */
  seFanExplosionProof?: string;
  /** 配套电机型号 */
  seFanMotorModel?: string;
  /** 安装位置 */
  seFanInstallPos?: string;
  /** 投用日期 */
  seFanInService?: string;
  /** 法定检验周期 */
  seFanInspectCycle?: string;
  /** 上次检验日期 */
  seFanLastInspect?: Date;
  /** 下次检验日期 */
  seFanNextInspect?: Date;
  /** 检验结果 */
  seFanInspectResult?: string;
  /** 润滑方式 */
  seFanLubrication?: string;
  /** 上次润滑日期 */
  seFanLastLubricate?: Date;
  /** 下次润滑日期 */
  seFanNextLubricate?: Date;
  /** 运行振动值（mm/s，标准≤4.5mm/s） */
  seFanVibration?: string;
  /** 维保记录 */
  seFanMaintainRecord?: string;
  /** 故障记录 */
  seFanFaultRecord?: string;
  /** 台账录入 / 维护人员 */
  seFanOperator?: string;
  /** 台账记录创建时间 */
  seFanCreateTime?: Date;
  /** 台账记录最后修改时间 */
  seFanUpdateTime?: Date;
  /** 设备状态 */
  seFanStatus?: string;
  /** 所属工厂 */
  seFanFactory?: string;
  /** 备用1 */
  seFanReserve1?: string;
  /** 备用2 */
  seFanReserve2?: string;
  /** 备用3 */
  seFanReserve3?: string;
}

/** 特种设备风机台账分页对象 */
export interface SeFanPageVO {
  /** 序号 */
  id?: number;
  /** 风机设备编号 */
  seFanEquipCode?: string;
  /** 风机名称 */
  seFanName?: string;
  /** 风机类型 */
  seFanType?: string;
  /** 设备规格 */
  seFanSpec?: string;
  /** 额定功率（kW） */
  seFanRatedPower?: string;
  /** 额定转速（r/min） */
  seFanRatedSpeed?: string;
  /** 额定压力（kPa，正压 / 负压标注在备注） */
  seFanRatedPressure?: string;
  /** 额定风量（m³/h） */
  seFanRatedFlow?: string;
  /** 输送介质 */
  seFanMedium?: string;
  /** 主体材质 */
  seFanMaterial?: string;
  /** 防爆等级 */
  seFanExplosionProof?: string;
  /** 配套电机型号 */
  seFanMotorModel?: string;
  /** 安装位置 */
  seFanInstallPos?: string;
  /** 投用日期 */
  seFanInService?: string;
  /** 法定检验周期 */
  seFanInspectCycle?: string;
  /** 上次检验日期 */
  seFanLastInspect?: Date;
  /** 下次检验日期 */
  seFanNextInspect?: Date;
  /** 检验结果 */
  seFanInspectResult?: string;
  /** 润滑方式 */
  seFanLubrication?: string;
  /** 上次润滑日期 */
  seFanLastLubricate?: Date;
  /** 下次润滑日期 */
  seFanNextLubricate?: Date;
  /** 运行振动值（mm/s，标准≤4.5mm/s） */
  seFanVibration?: string;
  /** 维保记录 */
  seFanMaintainRecord?: string;
  /** 故障记录 */
  seFanFaultRecord?: string;
  /** 台账录入 / 维护人员 */
  seFanOperator?: string;
  /** 台账记录创建时间 */
  seFanCreateTime?: Date;
  /** 台账记录最后修改时间 */
  seFanUpdateTime?: Date;
  /** 设备状态 */
  seFanStatus?: string;
  /** 所属工厂 */
  seFanFactory?: string;
  /** 备用1 */
  seFanReserve1?: string;
  /** 备用2 */
  seFanReserve2?: string;
  /** 备用3 */
  seFanReserve3?: string;
}
