declare namespace jsonvType {
	export interface IJSONV {
		/**
		 * 定义一个对象参数
		 * @param req 非空控制
		 * @param name 参数名称
		 * @param values 参数值
		 */
		or<T, R extends RequireType>(req: R, name: Name, values: Array<T>): WSParam<RequireRet<R, ParamType<T>>>
	}

	export interface IJSONVERR {
		or: {
			isEmpty: (option: IErrorOption) => any
			notMatch: (option: IErrorOption) => any
		}
	}
}
