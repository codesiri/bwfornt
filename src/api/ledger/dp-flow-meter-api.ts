import request from "@/utils/request";

const DPFLOWMETER_BASE_URL = "/api/v1/dp-flow-meter";

const DpFlowMeterAPI = {
    /** 获取差压流量计分页数据 */
    getPage(queryParams?: DpFlowMeterPageQuery) {
        return request<any, PageResult<DpFlowMeterPageVO[]>>({
            url: `${DPFLOWMETER_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取差压流量计表单数据
     *
     * @param id 差压流量计ID
     * @returns 差压流量计表单数据
     */
    getFormData(id: number) {
        return request<any, DpFlowMeterForm>({
            url: `${DPFLOWMETER_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加差压流量计
     *
     *  @param data 差压流量计表单数据
     */
    create(data: DpFlowMeterForm) {
        return request({
            url: `${DPFLOWMETER_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新差压流量计
     *
     * @param id 差压流量计ID
     * @param data 差压流量计表单数据
     */
     update(id: string, data: DpFlowMeterForm) {
        return request({
            url: `${DPFLOWMETER_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除差压流量计，多个以英文逗号(,)分割
     *
     * @param ids 差压流量计ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${DPFLOWMETER_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default DpFlowMeterAPI;

/** 差压流量计分页查询参数 */
export interface DpFlowMeterPageQuery extends PageQuery {
    /** 位号 */
    dpFlowTag?: string;
    /** 是否伴热（是 / 否） */
    dpFlowHeat?: number;
    /** 是否联锁（是 / 否） */
    dpFlowInterlock?: number;
    /** 设备编码 */
    dvCode?: string;
    /** 设备状态 */
    status?: number;
    /** 设备类型 */
    dvType?: string;
}

/** 差压流量计表单对象 */
export interface DpFlowMeterForm {
    /** 序号 */
    id?:  number;
    /** 装置名称 */
    dpFlowDevice?:  string;
    /** 位号 */
    dpFlowTag?:  string;
    /** 安装位置及用途 */
    dpFlowLocation?:  string;
    /** 设备名称（差压流量计） */
    dpFlowEquip?:  string;
    /** 规格型号 */
    dpFlowModel?:  string;
    /** 生产厂家 */
    dpFlowManu?:  string;
    /** 量程 */
    dpFlowRange?:  string;
    /** 测量范围 */
    dpFlowMeasRange?:  string;
    /** 介质名称 */
    dpFlowMedName?:  string;
    /** 介质设计温度 */
    dpFlowMedTemp?:  string;
    /** 介质设计力（MPa） */
    dpFlowMedPress?:  string;
    /** 连接方式及规格 */
    dpFlowConnection?:  string;
    /** 精度 */
    dpFlowAccuracy?:  string;
    /** 是否伴热（是 / 否） */
    dpFlowHeat?:  number;
    /** 是否联锁（是 / 否） */
    dpFlowInterlock?:  number;
    /** 联锁设定值 */
    dpFlowInterlockVal?:  string;
    /** 备注 */
    dpFlowRemark?:  string;
    /** 设备编码 */
    dvCode?:  string;
    /** 设备状态 */
    status?:  number;
    /** 设备类型 */
    dvType?:  string;
}

/** 差压流量计分页对象 */
export interface DpFlowMeterPageVO {
    /** 序号 */
    id?: number;
    /** 装置名称 */
    dpFlowDevice?: string;
    /** 位号 */
    dpFlowTag?: string;
    /** 安装位置及用途 */
    dpFlowLocation?: string;
    /** 设备名称（差压流量计） */
    dpFlowEquip?: string;
    /** 规格型号 */
    dpFlowModel?: string;
    /** 生产厂家 */
    dpFlowManu?: string;
    /** 量程 */
    dpFlowRange?: string;
    /** 测量范围 */
    dpFlowMeasRange?: string;
    /** 介质名称 */
    dpFlowMedName?: string;
    /** 介质设计温度 */
    dpFlowMedTemp?: string;
    /** 介质设计力（MPa） */
    dpFlowMedPress?: string;
    /** 连接方式及规格 */
    dpFlowConnection?: string;
    /** 精度 */
    dpFlowAccuracy?: string;
    /** 是否伴热（是 / 否） */
    dpFlowHeat?: number;
    /** 是否联锁（是 / 否） */
    dpFlowInterlock?: number;
    /** 联锁设定值 */
    dpFlowInterlockVal?: string;
    /** 备注 */
    dpFlowRemark?: string;
    /** 设备编码 */
    dvCode?: string;
    /** 设备状态 */
    status?: number;
    /** 设备类型 */
    dvType?: string;
}
