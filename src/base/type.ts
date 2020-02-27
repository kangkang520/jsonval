/**
 * json校验工具类型定义˝
 */
declare namespace jsonvType {

	/** 非空类型定义 */
	export type RequireType = '!' | '?'

	/** 参数定义 */
	export type WSParam<T> = (val: T) => T

	/** 获取参数的具体类型 */
	export type ParamType<T> = T extends WSParam<infer R> ? R : never

	/** 处理可选型 */
	export type RequireRet<R extends RequireType, T> = R extends '?' ? T | undefined : T

	/**
	 * 
	 */
	export interface IJSONV { }

}