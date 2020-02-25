/**
 * json校验工具类型定义˝
 */
declare namespace jsonvType {

	/** 字符串定义选项 */
	export interface IStringOption<ValsT extends string> {
		/** 
		 * 字符串长度限制
		 * * 如果给一个number，表示长度必须是给定的长度。
		 * * 如果给一个[null, number]，表示限制最大长度
		 * * 如果给一个[number, null]，表示限制最小长度
		 * * 如果给一个[number,number]，表示限制在某个区间
		 */
		length?: number | [number, number]
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
		regexp?: [RegExp | Array<RegExp>, string?]
	}

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