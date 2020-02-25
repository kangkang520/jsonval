declare namespace jsonvType {
	export interface IJSONV {
		/**
		 * 定义一个字符串参数
		 * @param req 非空控制
		 * @param name 参数名称
		 * @param opt 选项
		 */
		string<R extends RequireType, ValsT extends string = string>(req: R, name: string, opt?: IStringOption<ValsT>): WSParam<RequireRet<R, ValsT>>
	}
}