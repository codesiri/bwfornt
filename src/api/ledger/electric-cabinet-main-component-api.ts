import request from "@/utils/request";

const ELECTRICCABINETMAINCOMPONENT_BASE_URL = "/api/v1/electric-cabinet-main-component";

const ElectricCabinetMainComponentAPI = {
  /** 获取抽屉柜主要元器件信息分页数据 */
  getPage(queryParams?: ElectricCabinetMainComponentPageQuery) {
    return request<any, PageResult<ElectricCabinetMainComponentPageVO[]>>({
      url: `${ELECTRICCABINETMAINCOMPONENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取抽屉柜主要元器件信息表单数据
   *
   * @param id 抽屉柜主要元器件信息ID
   * @returns 抽屉柜主要元器件信息表单数据
   */
  getFormData(id: number) {
    return request<any, ElectricCabinetMainComponentForm>({
      url: `${ELECTRICCABINETMAINCOMPONENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加抽屉柜主要元器件信息
   *
   *  @param data 抽屉柜主要元器件信息表单数据
   */
  create(data: ElectricCabinetMainComponentForm) {
    return request({
      url: `${ELECTRICCABINETMAINCOMPONENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新抽屉柜主要元器件信息
   *
   * @param id 抽屉柜主要元器件信息ID
   * @param data 抽屉柜主要元器件信息表单数据
   */
  update(id: string, data: ElectricCabinetMainComponentForm) {
    return request({
      url: `${ELECTRICCABINETMAINCOMPONENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除抽屉柜主要元器件信息，多个以英文逗号(,)分割
   *
   * @param ids 抽屉柜主要元器件信息ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${ELECTRICCABINETMAINCOMPONENT_BASE_URL}/${ids}`,
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
      url: `${ELECTRICCABINETMAINCOMPONENT_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /**
   * 表导出
   *
   * @param queryParams 查询参数
   */
  export(queryParams: any) {
    return request({
      url: `${ELECTRICCABINETMAINCOMPONENT_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },
  downloadtemplate() {
    return request({
      url: `${ELECTRICCABINETMAINCOMPONENT_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },
};

export default ElectricCabinetMainComponentAPI;

/** 抽屉柜主要元器件信息分页查询参数 */
export interface ElectricCabinetMainComponentPageQuery extends PageQuery {
  /** 元器件名称 */
  ecmComponentName?: string;
  /** 生产厂家 */
  ecmManufacturer?: string;
  /** 	出厂编号 */
  ecmFactoryNo?: string;
}

/** 抽屉柜主要元器件信息表单对象 */
export interface ElectricCabinetMainComponentForm {
  /** 序号 */
  id?: number;
  /** 元器件名称 */
  ecmComponentName?: string;
  /** 规格型号 */
  ecmSpecModel?: string;
  /** 生产厂家 */
  ecmManufacturer?: string;
  /** 	出厂编号 */
  ecmFactoryNo?: string;
  /** 安装位置 */
  ecmInstallLocation?: string;
  /** 投运日期 */
  ecmCommissioningDate?: Date;
  /** 额定参数 */
  ecmRatedParameters?: string;
  /** 所属工厂 */
  ecmFactory?: string;
  /** 备用1 */
  ecmReserve1?: string;
  /** 备用2 */
  ecmReserve2?: string;
  /** 备用3 */
  ecmReserve3?: string;
}

/** 抽屉柜主要元器件信息分页对象 */
export interface ElectricCabinetMainComponentPageVO {
  /** 序号 */
  id?: number;
  /** 元器件名称 */
  ecmComponentName?: string;
  /** 规格型号 */
  ecmSpecModel?: string;
  /** 生产厂家 */
  ecmManufacturer?: string;
  /** 	出厂编号 */
  ecmFactoryNo?: string;
  /** 安装位置 */
  ecmInstallLocation?: string;
  /** 投运日期 */
  ecmCommissioningDate?: Date;
  /** 额定参数 */
  ecmRatedParameters?: string;
  /** 所属工厂 */
  ecmFactory?: string;
  /** 备用1 */
  ecmReserve1?: string;
  /** 备用2 */
  ecmReserve2?: string;
  /** 备用3 */
  ecmReserve3?: string;
}
