import request from "@/utils/request";

const DVPRESSUREINSTRUMENT_BASE_URL = "/api/v1/pressure-instrument";

const DvPressureInstrumentAPI = {
  /** 获取压力分页数据   pressure_instrument*/
  getPage(queryParams?: DvPressureInstrumentPageQuery) {
    return request<any, PageResult<DvPressureInstrumentPageVO[]>>({
      url: `${DVPRESSUREINSTRUMENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取压力表单数据
   *
   * @param id 压力ID
   * @returns 压力表单数据
   */
  getFormData(id: number) {
    return request<any, DvPressureInstrumentForm>({
      url: `${DVPRESSUREINSTRUMENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加压力
   *
   *  @param data 压力表单数据
   */
  create(data: DvPressureInstrumentForm) {
    return request({
      url: `${DVPRESSUREINSTRUMENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新压力
   *
   * @param id 压力ID
   * @param data 压力表单数据
   */
  update(id: string, data: DvPressureInstrumentForm) {
    return request({
      url: `${DVPRESSUREINSTRUMENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除压力，多个以英文逗号(,)分割
   *
   * @param ids 压力ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${DVPRESSUREINSTRUMENT_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
  /**
   * 压力表导出
   *
   * @param queryParams 查询参数
   */
  export(queryParams: DvPressureInstrumentPageQuery) {
    return request({
      url: `${DVPRESSUREINSTRUMENT_BASE_URL}/export`,
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
      url: `${DVPRESSUREINSTRUMENT_BASE_URL}/import`,
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
      url: `${DVPRESSUREINSTRUMENT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default DvPressureInstrumentAPI;

/** 压力分页查询参数 */
export interface DvPressureInstrumentPageQuery extends PageQuery {
  pressureTag?: string;
  pressureDevice?: string;
}

/** 压力表单对象 */
export interface DvPressureInstrumentForm {
  /** 主键id */
  id?: number;
  /** 装置名称 */
  pressureDevice?: string;
  /** 位号 */
  pressureTag?: string;
  /** 安装位置以及用途 */
  pressureLocation?: string;
  /** 设备名称 */
  pressureEquip?: string;
  /** 规格型号 */
  pressureModel?: string;
  /** 生产厂家 */
  pressureManu?: string;
  /** 测量范围 */
  pressureRange?: string;
  /** 连接方式及规格 */
  pressureConnection?: string;
  /** 精度 */
  pressureAccuracy?: string;
  /** 电源（如 24V DC） */
  pressurePower?: string;
  /** 输出信号（如 4-20mA） */
  pressureOutput?: string;
  /** 是否伴热（是 / 否） */
  pressureHeat?: string;
  /** 是否带连锁 */
  pressureInterlock?: string;
  /** 联锁设定值 */
  pressureInterlockVal?: string;
  /** 备注 */
  pressureRemark?: string;
}

/** 压力分页对象  pressure_instrument*/
export interface DvPressureInstrumentPageVO {
  /** 主键id */
  id?: number;
  /** 装置名称 */
  pressureDevice?: string;
  /** 位号 */
  pressureTag?: string;
  /** 安装位置以及用途 */
  pressureLocation?: string;
  /** 设备名称 */
  pressureEquip?: string;
  /** 规格型号 */
  pressureModel?: string;
  /** 生产厂家 */
  pressureManu?: string;
  /** 测量范围 */
  pressureRange?: string;
  /** 连接方式及规格 */
  pressureConnection?: string;
  /** 精度 */
  pressureAccuracy?: string;
  /** 电源（如 24V DC） */
  pressurePower?: string;
  /** 输出信号（如 4-20mA） */
  pressureOutput?: string;
  /** 是否伴热（是 / 否） */
  pressureHeat?: string;
  /** 是否带连锁 */
  pressureInterlock?: string;
  /** 联锁设定值 */
  pressureInterlock_val?: string;
  /** 备注 */
  pressureRemark?: string;
}
