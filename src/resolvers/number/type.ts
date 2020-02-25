
declare namespace jsonvType {
	/** 整数定义选项 */
	interface INumberOption<ValsT extends number> {
		/** 
		 * 数字的取值范围
		 * * 如果是[null, number]，表示最大值限制
		 * * 如果是[number, null]，表示最小值限制
		 * * 如果是[number, number]，表示范围限制
		 */
		range?: [number | null, number | null]
		/** 定义数字允许的值 */
		values?: Array<ValsT>
	}

	export interface IJSONV {
		/**
		 * 定义一个整数参数
		 * @param req 非空控制
		 * @param name 参数名称
		 * @param opt 参数选项
		 */
		int<R extends RequireType, ValsT extends number = number>(req: R, name: string, opt?: INumberOption<ValsT>): WSParam<RequireRet<R, ValsT>>

		/**
		 * 定义一个浮点数参数
		 * @param req 非空控制
		 * @param name 参数名称
		 * @param opt 参数选项
		 */
		float<R extends RequireType, ValsT extends number = number>(req: R, name: string, opt?: INumberOption<ValsT>): WSParam<RequireRet<R, ValsT>>



		/**
		 * 定义一个对象参数
		 * @param req 非空控制
		 * @param name 参数名称
		 * @param values 参数值
		 */
		object<T, R extends RequireType>(req: R, name: string, values: T): WSParam<RequireRet<R, { [P in keyof T]: ParamType<T[P]> }>>
	}
}