declare namespace jsonvType {
	export interface IJSONV {
		/**
		 * 定义一个布尔参数
		 * @param req 非空控制
		 * @param name 参数名称
		 */
		boolean<R extends RequireType>(req: R, name: string): WSParam<RequireRet<R, boolean>>
	}
}