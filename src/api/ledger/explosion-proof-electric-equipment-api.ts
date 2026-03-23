import request from "@/utils/request";

const EXPLOSIONPROOFELECTRICEQUIPMENT_BASE_URL = "/api/v1/explosion-proof-electric-equipment";

const ExplosionProofElectricEquipmentAPI = {
  /** 获取防爆电气设备分页数据 */
  getPage(queryParams?: ExplosionProofElectricEquipmentPageQuery) {
    return request<any, PageResult<ExplosionProofElectricEquipmentPageVO[]>>({
      url: `${EXPLOSIONPROOFELECTRICEQUIPMENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取防爆电气设备表单数据
   *
   * @param id 防爆电气设备ID
   * @returns 防爆电气设备表单数据
   */
  getFormData(id: number) {
    return request<any, ExplosionProofElectricEquipmentForm>({
      url: `${EXPLOSIONPROOFELECTRICEQUIPMENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加防爆电气设备
   *
   *  @param data 防爆电气设备表单数据
   */
  create(data: ExplosionProofElectricEquipmentForm) {
    return request({
      url: `${EXPLOSIONPROOFELECTRICEQUIPMENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新防爆电气设备
   *
   * @param id 防爆电气设备ID
   * @param data 防爆电气设备表单数据
   */
  update(id: string, data: ExplosionProofElectricEquipmentForm) {
    return request({
      url: `${EXPLOSIONPROOFELECTRICEQUIPMENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除防爆电气设备，多个以英文逗号(,)分割
   *
   * @param ids 防爆电气设备ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${EXPLOSIONPROOFELECTRICEQUIPMENT_BASE_URL}/${ids}`,
      method: "delete",
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
      url: `${EXPLOSIONPROOFELECTRICEQUIPMENT_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  export(queryParams: any) {
    return request({
      url: `${EXPLOSIONPROOFELECTRICEQUIPMENT_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  /** 下载用户导入模板 */
  downloadTemplate() {
    return request({
      url: `${EXPLOSIONPROOFELECTRICEQUIPMENT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default ExplosionProofElectricEquipmentAPI;

/** 防爆电气设备分页查询参数 */
export interface ExplosionProofElectricEquipmentPageQuery extends PageQuery {
  /** 设备编号 */
  equipmentCode?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 投运日期 */
  commissioningDate?: [string, string];
  /** 设备状态（在用 / 备用 / 停用 / 报废） */
  status?: string;
  /** 所属工厂 */
  factory?: string;
}

/** 防爆电气设备表单对象 */
export interface ExplosionProofElectricEquipmentForm {
  /** 序号 */
  id?: number;
  /** 设备编号 */
  equipmentCode?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 规格型号 */
  specModel?: string;
  /** 防爆标志（如 Ex d IIB T4 Gb） */
  exMark?: string;
  /** 防爆合格证号 */
  exCertNo?: string;
  /** 防爆合格证有效期 */
  exCertExpire?: string;
  /** 温度组别 */
  tempClass?: string;
  /** 适用爆炸性介质 */
  applicableMedium?: string;
  /** 安装位置及危险区域等级 */
  installArea?: string;
  /** 生产厂家 */
  manufacturer?: string;
  /** 投运日期 */
  commissioningDate?: Date;
  /** 接地电阻测试值（Ω） */
  groundResistance?: string;
  /** 上次防爆检查日期 */
  lastExCheckDate?: Date;
  /** 下次防爆检查日期 */
  nextExCheckDate?: Date;
  /** 设备状态（在用 / 备用 / 停用 / 报废） */
  status?: string;
  /** 所属工厂 */
  factory?: string;
  /** 备用1 */
  reserve1?: string;
  /** 备用2 */
  reserve2?: string;
  /** 备用3 */
  reserve3?: string;
}

/** 防爆电气设备分页对象 */
export interface ExplosionProofElectricEquipmentPageVO {
  /** 序号 */
  id?: number;
  /** 设备编号 */
  equipmentCode?: string;
  /** 设备名称 */
  equipmentName?: string;
  /** 规格型号 */
  specModel?: string;
  /** 防爆标志（如 Ex d IIB T4 Gb） */
  exMark?: string;
  /** 防爆合格证号 */
  exCertNo?: string;
  /** 防爆合格证有效期 */
  exCertExpire?: string;
  /** 温度组别 */
  tempClass?: string;
  /** 适用爆炸性介质 */
  applicableMedium?: string;
  /** 安装位置及危险区域等级 */
  installArea?: string;
  /** 生产厂家 */
  manufacturer?: string;
  /** 投运日期 */
  commissioningDate?: Date;
  /** 接地电阻测试值（Ω） */
  groundResistance?: string;
  /** 上次防爆检查日期 */
  lastExCheckDate?: Date;
  /** 下次防爆检查日期 */
  nextExCheckDate?: Date;
  /** 设备状态（在用 / 备用 / 停用 / 报废） */
  status?: string;
  /** 所属工厂 */
  factory?: string;
  /** 备用1 */
  reserve1?: string;
  /** 备用2 */
  reserve2?: string;
  /** 备用3 */
  reserve3?: string;
}
