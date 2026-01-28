import request from "@/utils/request";

const LEVELGAUGE_BASE_URL = "/api/v1/level-gauge";

const LevelGaugeAPI = {
  /** 获取液位计分页数据 */
  getPage(queryParams?: LevelGaugePageQuery) {
    return request<any, PageResult<LevelGaugePageVO[]>>({
      url: `${LEVELGAUGE_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取液位计表单数据
   *
   * @param id 液位计ID
   * @returns 液位计表单数据
   */
  getFormData(id: number) {
    return request<any, LevelGaugeForm>({
      url: `${LEVELGAUGE_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加液位计
   *
   *  @param data 液位计表单数据
   */
  create(data: LevelGaugeForm) {
    return request({
      url: `${LEVELGAUGE_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新液位计
   *
   * @param id 液位计ID
   * @param data 液位计表单数据
   */
  update(id: string, data: LevelGaugeForm) {
    return request({
      url: `${LEVELGAUGE_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除液位计，多个以英文逗号(,)分割
   *
   * @param ids 液位计ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${LEVELGAUGE_BASE_URL}/${ids}`,
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
      url: `${LEVELGAUGE_BASE_URL}/export`,
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
      url: `${LEVELGAUGE_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default LevelGaugeAPI;

/** 液位计分页查询参数 */
export interface LevelGaugePageQuery extends PageQuery {
  /** 位号 */
  levelTag?: string;
  /** 设备名称（液位计） */
  levelEquip?: string;
  /** 是否联锁（是 / 否） */
  levelInterlock?: number;
  /** 设备类型 */
  dvType?: number;
}

/** 液位计表单对象 */
export interface LevelGaugeForm {
  /** 序号 */
  id?: number;
  /** 装置名称 */
  levelDevice?: string;
  /** 位号 */
  levelTag?: string;
  /** 安装位置及用途 */
  levelLocation?: string;
  /** 设备名称（液位计） */
  levelEquip?: string;
  /** 规格型号 */
  levelModel?: string;
  /** 生产厂家 */
  levelManu?: string;
  /** 介质 */
  levelMedium?: string;
  /** 测量范围 */
  levelRange?: string;
  /** 精度 */
  levelAccuracy?: string;
  /** 电源 */
  levelPower?: string;
  /** 输出信号 */
  levelOutput?: string;
  /** 连接方式及规格 */
  levelConnection?: string;
  /** 是否联锁（是 / 否） */
  levelInterlock?: number;
  /** 联锁设定值 */
  levelInterlockVal?: string;
  /** 备注 */
  levelRemark?: string;
  /** 设备状态 */
  status?: number;
  /** 设备类型 */
  dvType?: number;
}

/** 液位计分页对象 */
export interface LevelGaugePageVO {
  /** 序号 */
  id?: number;
  /** 装置名称 */
  levelDevice?: string;
  /** 位号 */
  levelTag?: string;
  /** 安装位置及用途 */
  levelLocation?: string;
  /** 设备名称（液位计） */
  levelEquip?: string;
  /** 规格型号 */
  levelModel?: string;
  /** 生产厂家 */
  levelManu?: string;
  /** 介质 */
  levelMedium?: string;
  /** 测量范围 */
  levelRange?: string;
  /** 精度 */
  levelAccuracy?: string;
  /** 电源 */
  levelPower?: string;
  /** 输出信号 */
  levelOutput?: string;
  /** 连接方式及规格 */
  levelConnection?: string;
  /** 是否联锁（是 / 否） */
  levelInterlock?: number;
  /** 联锁设定值 */
  levelInterlockVal?: string;
  /** 备注 */
  levelRemark?: string;
  /** 设备状态 */
  status?: number;
  /** 设备类型 */
  dvType?: number;
}
