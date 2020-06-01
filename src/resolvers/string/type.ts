declare namespace jsonvType {
	/** 字符串定义选项 */
	interface IStringOption<ValsT extends string> {
		/** 
		 * 字符串长度限制
		 * * 如果给一个number，表示长度必须是给定的长度。
		 * * 如果给一个[null, number]，表示限制最大长度
		 * * 如果给一个[number, null]，表示限制最小长度
		 * * 如果给一个[number,number]，表示限制在某个区间
		 */
		length?: number | [number, number] | [number, null] | [null, number]
		/** 
		 * 指定字符串允许的值
		 */
		values?: Array<ValsT>
		/** 
		 * 正则表达式校验
		 * 
		 * 格式：第一个参数为正则表达式，第二个参数是验证失败时的错误提示
		 * 
		 * 如果给定多个，则只要某一个满足即可
		 */
		regexp?: [RegExp | Array<RegExp>, Name?]
	}

	export interface IJSONV {
		/**
		 * 定义一个字符串参数
		 * @param req 非空控制
		 * @param name 参数名称
		 * @param opt 选项
		 */
		string<R extends RequireType, ValsT extends string = string>(req: R, name: Name, opt?: IStringOption<ValsT>): WSParam<RequireRet<R, ValsT>>
	}

	export interface IJSONVERR {
		string: {
			isEmpty: (option: IErrorOption) => any
			notString: (option: IErrorOption) => any
			lenNot: (option: IErrorOption) => any
			lenNotInRange: (option: IErrorOption) => any
			lenGT: (option: IErrorOption) => any
			lenLT: (option: IErrorOption) => any
			notInValues: (option: IErrorOption) => any
			notMatch: (option: IErrorOption) => any
			costomError: (option: IErrorOption) => any
		}
	}
}