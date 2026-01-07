import request from "@/utils/request";

const DVMACHINERYTYPE_BASE_URL = "/api/v1/dv-machinery-type";

const DvMachineryTypeAPI = {
  /** 获取设备类型分页数据 */
  getPage(queryParams?: DvMachineryTypePageQuery) {
    return request<any, PageResult<DvMachineryTypePageVO[]>>({
      url: `${DVMACHINERYTYPE_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },

  /**获取全部设备类型 */
  getList(queryParams?: DvMachineryTypeForm) {
    return request<any, DvMachineryTypePageVO[]>({
      url: `${DVMACHINERYTYPE_BASE_URL}/list`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取设备类型表单数据
   *
   * @param id 设备类型ID
   * @returns 设备类型表单数据
   */
  getFormData(id: number) {
    return request<any, DvMachineryTypeForm>({
      url: `${DVMACHINERYTYPE_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加设备类型
   *
   *  @param data 设备类型表单数据
   */
  create(data: DvMachineryTypeForm) {
    return request({
      url: `${DVMACHINERYTYPE_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新设备类型
   *
   * @param id 设备类型ID
   * @param data 设备类型表单数据
   */
  update(id: string, data: DvMachineryTypeForm) {
    return request({
      url: `${DVMACHINERYTYPE_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除设备类型，多个以英文逗号(,)分割
   *
   * @param ids 设备类型ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${DVMACHINERYTYPE_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default DvMachineryTypeAPI;

/** 设备类型分页查询参数 */
export interface DvMachineryTypePageQuery extends PageQuery {}

/** 设备类型表单对象 */
export interface DvMachineryTypeForm {
  /** 设备类型ID */
  machineryTypeId?: number;
  /** 设备类型编码 */
  machineryTypeCode?: string;
  /** 设备类型名称 */
  machineryTypeName?: string;
  /** 父类型ID */
  parentTypeId?: number;
  /** 所有父节点ID */
  ancestors?: string;
  /** 是否启用 */
  enableFlag?: string;
  /** 备注 */
  remark?: string;
  /** 创建者 */
  createBy?: string;
  /** 创建时间 */
  createTime?: Date;
  /** 更新者 */
  updateBy?: string;
  /** 更新时间 */
  updateTime?: Date;
}

export interface DvMachineryTypeFormTree {
  /** 设备类型ID */
  machineryTypeId?: number;
  /** 设备类型编码 */
  machineryTypeCode?: string;
  /** 设备类型名称 */
  machineryTypeName?: string;
  /** 父类型ID */
  parentTypeId?: number;
  /** 所有父节点ID */
  ancestors?: string;
  /** 是否启用 */
  enableFlag?: string;
  /** 备注 */
  remark?: string;
  /** 创建者 */
  createBy?: string;
  /** 创建时间 */
  createTime?: Date;
  /** 更新者 */
  updateBy?: string;
  /** 更新时间 */
  updateTime?: Date;
  children?: DvMachineryTypeFormTree[];
}
export type DvMachineryTypeFormTreeList = DvMachineryTypeFormTree[];
/** 设备类型分页对象 */
export interface DvMachineryTypePageVO {
  /** 设备类型ID */
  machineryTypeId?: number;
  /** 设备类型编码 */
  machineryTypeCode?: string;
  /** 设备类型名称 */
  machineryTypeName?: string;
  /** 父类型ID */
  parentTypeId?: number;
  /** 所有父节点ID */
  ancestors?: string;
  /** 是否启用 */
  enableFlag?: string;
  /** 备注 */
  remark?: string;
  /** 创建者 */
  createBy?: string;
  /** 创建时间 */
  createTime?: Date;
  /** 更新者 */
  updateBy?: string;
  /** 更新时间 */
  updateTime?: Date;
}
