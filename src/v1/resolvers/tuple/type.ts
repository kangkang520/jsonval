declare namespace jsonvType {
	export interface IJSONV {
		/**
		 * 创建一个元组参数
		 * @param req 非空控制
		 * @param name 参数名称
		 * @param vals 参数值
		 */
		tuple<T, R extends RequireType>(req: R, name: Name, vals: [T]): WSParam<RequireRet<R, [ParamType<T>]>>
		tuple<T, T2, R extends RequireType>(req: R, name: Name, vals: [T, T2]): WSParam<RequireRet<R, [ParamType<T>, ParamType<T2>]>>
		tuple<T, T2, T3, R extends RequireType>(req: R, name: Name, vals: [T, T2, T3]): WSParam<RequireRet<R, [ParamType<T>, ParamType<T2>, ParamType<T3>]>>
		tuple<T, T2, T3, T4, R extends RequireType>(req: R, name: Name, vals: [T, T2, T3, T4]): WSParam<RequireRet<R, [ParamType<T>, ParamType<T2>, ParamType<T3>, ParamType<T4>]>>
		tuple<T, T2, T3, T4, T5, R extends RequireType>(req: R, name: Name, vals: [T, T2, T3, T4, T5,]): WSParam<RequireRet<R, [ParamType<T>, ParamType<T2>, ParamType<T3>, ParamType<T4>, ParamType<T5>]>>
		tuple<T, T2, T3, T4, T5, T6, R extends RequireType>(req: R, name: Name, vals: [T, T2, T3, T4, T5, T6,]): WSParam<RequireRet<R, [ParamType<T>, ParamType<T2>, ParamType<T3>, ParamType<T4>, ParamType<T5>, ParamType<T6>]>>
		tuple<T, T2, T3, T4, T5, T6, T7, R extends RequireType>(req: R, name: Name, vals: [T, T2, T3, T4, T5, T6, T7,]): WSParam<RequireRet<R, [ParamType<T>, ParamType<T2>, ParamType<T3>, ParamType<T4>, ParamType<T5>, ParamType<T6>, ParamType<T7>]>>
		tuple<T, T2, T3, T4, T5, T6, T7, T8, R extends RequireType>(req: R, name: Name, vals: [T, T2, T3, T4, T5, T6, T7, T8,]): WSParam<RequireRet<R, [ParamType<T>, ParamType<T2>, ParamType<T3>, ParamType<T4>, ParamType<T5>, ParamType<T6>, ParamType<T7>, ParamType<T8>]>>
		tuple<T, T2, T3, T4, T5, T6, T7, T8, T9, R extends RequireType>(req: R, name: Name, vals: [T, T2, T3, T4, T5, T6, T7, T8, T9,]): WSParam<RequireRet<R, [ParamType<T>, ParamType<T2>, ParamType<T3>, ParamType<T4>, ParamType<T5>, ParamType<T6>, ParamType<T7>, ParamType<T8>, ParamType<T9>]>>
		tuple<T, T2, T3, T4, T5, T6, T7, T8, T9, T10, R extends RequireType>(req: R, name: Name, vals: [T, T2, T3, T4, T5, T6, T7, T8, T9, T10]): WSParam<RequireRet<R, [ParamType<T>, ParamType<T2>, ParamType<T3>, ParamType<T4>, ParamType<T5>, ParamType<T6>, ParamType<T7>, ParamType<T8>, ParamType<T9>, ParamType<T10>]>>
	}

	export interface IJSONVERR {
		tuple: {
			isEmpty: (option: IErrorOption) => any
			notArray: (option: IErrorOption) => any
			lenNot: (option: IErrorOption) => any
		}
	}
}