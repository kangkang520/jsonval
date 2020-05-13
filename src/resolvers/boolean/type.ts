declare namespace jsonvType {
	export interface IJSONV {
		/**
		 * 定义一个布尔参数
		 * @param req 非空控制
		 * @param name 参数名称
		 */
		boolean<R extends RequireType>(req: R, name: Name): WSParam<RequireRet<R, boolean>>
	}

	export interface IJSONVERR {
		boolean: {
			isEmpty: (option: jsonvType.IErrorOption) => any
			notBoolean: (option: jsonvType.IErrorOption) => any
		}
	}
}