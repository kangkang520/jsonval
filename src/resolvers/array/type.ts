declare namespace jsonvType {
	export interface IJSONV {
		/**
		 * 定义一个数组参数
		 * @param req 非空控制
		 * @param name 参数名称
		 * @param item 每个参数的定义
		 */
		array<T, R extends RequireType>(req: R, name: Name, item: T): WSParam<RequireRet<R, Array<ParamType<T>>>>
	}

	export interface IJSONVERR {
		array: {
			isEmpty: (option: jsonvType.IErrorOption) => any
			notArray: (option: jsonvType.IErrorOption) => any
		}
	}
}