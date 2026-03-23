import request from "@/utils/request";

const GROUNDSYSTEMEQUIPMENT_BASE_URL = "/api/v1/ground-system-equipment";

const GroundSystemEquipmentAPI = {
  /** 获取电器接地系统分页数据 */
  getPage(queryParams?: GroundSystemEquipmentPageQuery) {
    return request<any, PageResult<GroundSystemEquipmentPageVO[]>>({
      url: `${GROUNDSYSTEMEQUIPMENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取电器接地系统表单数据
   *
   * @param id 电器接地系统ID
   * @returns 电器接地系统表单数据
   */
  getFormData(id: number) {
    return request<any, GroundSystemEquipmentForm>({
      url: `${GROUNDSYSTEMEQUIPMENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加电器接地系统
   *
   *  @param data 电器接地系统表单数据
   */
  create(data: GroundSystemEquipmentForm) {
    return request({
      url: `${GROUNDSYSTEMEQUIPMENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新电器接地系统
   *
   * @param id 电器接地系统ID
   * @param data 电器接地系统表单数据
   */
  update(id: string, data: GroundSystemEquipmentForm) {
    return request({
      url: `${GROUNDSYSTEMEQUIPMENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除电器接地系统，多个以英文逗号(,)分割
   *
   * @param ids 电器接地系统ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${GROUNDSYSTEMEQUIPMENT_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
  export(queryParams: any) {
    return request({
      url: `${GROUNDSYSTEMEQUIPMENT_BASE_URL}/export`,
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
      url: `${GROUNDSYSTEMEQUIPMENT_BASE_URL}/import`,
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
      url: `${GROUNDSYSTEMEQUIPMENT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default GroundSystemEquipmentAPI;

/** 电器接地系统分页查询参数 */
export interface GroundSystemEquipmentPageQuery extends PageQuery {
  /** 接地编号 */
  gseGroundCode?: string;
  /** 接地类型 */
  gseGroundType?: string;
  /** 安装位置 */
  gseInstallArea?: string;
  /** 安装区域及危险等级 */
  gseInstallPosition?: string;
  /** 上次接地电阻测试日期 */
  gseLastTestDate?: [string, string];
  /** 上次测试电阻值（Ω） */
  gseLastTestData?: string;
  /** 下次测试日期 */
  gseNextTestDate?: [string, string];
  /** 测试人员 */
  gseTestPerson?: string;
  /** 安装日期 */
  gseInstallDate?: [string, string];
  /** 接地状态 */
  gseStatus?: string;
  /** 所属工厂 */
  gseFactory?: string;
}

/** 电器接地系统表单对象 */
export interface GroundSystemEquipmentForm {
  /** 序号 */
  id?: number;
  /** 接地编号 */
  gseGroundCode?: string;
  /** 接地类型 */
  gseGroundType?: string;
  /** 接地结构 */
  gseGroundStruct?: string;
  /** 材质 */
  gseMaterial?: string;
  /** 安装位置 */
  gseInstallArea?: string;
  /** 安装区域及危险等级 */
  gseInstallPosition?: string;
  /** 设计接地电阻值（Ω） */
  gseDesignResistance?: string;
  /** 上次接地电阻测试日期 */
  gseLastTestDate?: Date;
  /** 上次测试电阻值（Ω） */
  gseLastTestData?: string;
  /** 下次测试日期 */
  gseNextTestDate?: Date;
  /** 测试人员 */
  gseTestPerson?: string;
  /** 安装日期 */
  gseInstallDate?: Date;
  /** 接地状态 */
  gseStatus?: string;
  /** 所属工厂 */
  gseFactory?: string;
}

/** 电器接地系统分页对象 */
export interface GroundSystemEquipmentPageVO {
  /** 序号 */
  id?: number;
  /** 接地编号 */
  gseGroundCode?: string;
  /** 接地类型 */
  gseGroundType?: string;
  /** 接地结构 */
  gseGroundStruct?: string;
  /** 材质 */
  gseMaterial?: string;
  /** 安装位置 */
  gseInstallArea?: string;
  /** 安装区域及危险等级 */
  gseInstallPosition?: string;
  /** 设计接地电阻值（Ω） */
  gseDesignResistance?: string;
  /** 上次接地电阻测试日期 */
  gseLastTestDate?: Date;
  /** 上次测试电阻值（Ω） */
  gseLastTestData?: string;
  /** 下次测试日期 */
  gseNextTestDate?: Date;
  /** 测试人员 */
  gseTestPerson?: string;
  /** 安装日期 */
  gseInstallDate?: Date;
  /** 接地状态 */
  gseStatus?: string;
  /** 所属工厂 */
  gseFactory?: string;
}
