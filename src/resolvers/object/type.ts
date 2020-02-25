declare namespace jsonvType {
	export interface IJSONV {
		/**
		 * 定义一个对象参数
		 * @param req 非空控制
		 * @param name 参数名称
		 * @param values 参数值
		 */
		object<T, R extends RequireType>(req: R, name: string, values: T): WSParam<RequireRet<R, { [P in keyof T]: ParamType<T[P]> }>>
	}
}