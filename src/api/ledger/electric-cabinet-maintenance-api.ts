import request from "@/utils/request";

const ELECTRICCABINETMAINTENANCE_BASE_URL = "/api/v1/electric-cabinet-maintenance";

const ElectricCabinetMaintenanceAPI = {
    /** 获取抽屉柜维护保养记录分页数据 */
    getPage(queryParams?: ElectricCabinetMaintenancePageQuery) {
        return request<any, PageResult<ElectricCabinetMaintenancePageVO[]>>({
            url: `${ELECTRICCABINETMAINTENANCE_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取抽屉柜维护保养记录表单数据
     *
     * @param id 抽屉柜维护保养记录ID
     * @returns 抽屉柜维护保养记录表单数据
     */
    getFormData(id: number) {
        return request<any, ElectricCabinetMaintenanceForm>({
            url: `${ELECTRICCABINETMAINTENANCE_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加抽屉柜维护保养记录
     *
     *  @param data 抽屉柜维护保养记录表单数据
     */
    create(data: ElectricCabinetMaintenanceForm) {
        return request({
            url: `${ELECTRICCABINETMAINTENANCE_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新抽屉柜维护保养记录
     *
     * @param id 抽屉柜维护保养记录ID
     * @param data 抽屉柜维护保养记录表单数据
     */
     update(id: string, data: ElectricCabinetMaintenanceForm) {
        return request({
            url: `${ELECTRICCABINETMAINTENANCE_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除抽屉柜维护保养记录，多个以英文逗号(,)分割
     *
     * @param ids 抽屉柜维护保养记录ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${ELECTRICCABINETMAINTENANCE_BASE_URL}/${ids}`,
            method: "delete",
        });
    },
    /**
     * 导出
     *
     * @param queryParams 查询参数
     */
    export(queryParams: any) {
        return request({
            url: `${ELECTRICCABINETMAINTENANCE_BASE_URL}/export`,
            method: "get",
            params: queryParams,
            responseType: "blob",
        });
    },
    /**
     * 导入文件
     *
     * @param file 文件
     */
    importFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        return request<any, any>({
            url: `${ELECTRICCABINETMAINTENANCE_BASE_URL}/import`,
            method: "post",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    /**
     * 下载导入模板
     */
    downloadtemplate() {
        return request({
            url: `${ELECTRICCABINETMAINTENANCE_BASE_URL}/template`,
            method: "get",
            responseType: "blob",
        });
    }
}

export default ElectricCabinetMaintenanceAPI;

/** 抽屉柜维护保养记录分页查询参数 */
export interface ElectricCabinetMaintenancePageQuery extends PageQuery {
    /** 保养人员 */
    ecmMaintainPerson?: string;
    /** 保养级别 */
    ecmMaintainLevel?: string;
    /** 所属工厂 */
    ecmFactory?: string;
}

/** 抽屉柜维护保养记录表单对象 */
export interface ElectricCabinetMaintenanceForm {
    /** 序号 */
    id?:  number;
    /** 保养日期 */
    ecmMaintainDate?:  Date;
    /** 保养人员 */
    ecmMaintainPerson?:  string;
    /** 保养级别 */
    ecmMaintainLevel?:  string;
    /** 保养项目 */
    ecmMaintainItem?:  string;
    /** 保养内容 */
    ecmMaintainContent?:  string;
    /** 更换元器件 */
    ecmReplaceComponent?:  string;
    /** 保养结果 */
    ecmMaintainResult?:  string;
    /** 验收人 */
    ecmChecker?:  string;
    /** 下次保养日期 */
    ecmNextMaintainDate?:  Date;
    /** 所属工厂 */
    ecmFactory?:  string;
    /** 备用1 */
    ecmReserve1?:  string;
    /** 备用2 */
    ecmReserve2?:  string;
    /** 备用3 */
    ecmReserve3?:  string;
}

/** 抽屉柜维护保养记录分页对象 */
export interface ElectricCabinetMaintenancePageVO {
    /** 序号 */
    id?: number;
    /** 保养日期 */
    ecmMaintainDate?: Date;
    /** 保养人员 */
    ecmMaintainPerson?: string;
    /** 保养级别 */
    ecmMaintainLevel?: string;
    /** 保养项目 */
    ecmMaintainItem?: string;
    /** 保养内容 */
    ecmMaintainContent?: string;
    /** 更换元器件 */
    ecmReplaceComponent?: string;
    /** 保养结果 */
    ecmMaintainResult?: string;
    /** 验收人 */
    ecmChecker?: string;
    /** 下次保养日期 */
    ecmNextMaintainDate?: Date;
    /** 所属工厂 */
    ecmFactory?: string;
    /** 备用1 */
    ecmReserve1?: string;
    /** 备用2 */
    ecmReserve2?: string;
    /** 备用3 */
    ecmReserve3?: string;
}
