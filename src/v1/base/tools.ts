import { jsonv, jsonvErrHandlers } from './jsonv'

type ResolverNames = keyof jsonvType.IJSONV
/**
 * 注册一个验证器
 * @param name 验证方法名称
 * @param resolver 验证处理
 */
export function regist<T extends ResolverNames>(name: T, resolver: jsonvType.IJSONV[T]) {
	jsonv[name] = resolver
}


export function nameof(name: jsonvType.Name, option: any) {
	if (typeof name == 'function')
		return name(option)
	return name
}

/**
 * 添加错误处理
 * @param name 验证方法名称
 * @param errname 错误名称
 * @param resolver 错误处理函数，此函数中一般要求抛出一个错误
 */
export function erraction<T extends keyof jsonvType.IJSONVERR, E extends keyof jsonvType.IJSONVERR[T], R extends jsonvType.IJSONVERR[T][E]>(name: T, errname: E, resolver: R) {
	const funcDict = jsonvErrHandlers[name] = jsonvErrHandlers[name] || {}
	funcDict[errname] = resolver
}

/**
 * 获取错误处理函数
 * @param name 验证方法名称
 * @param errname 错误名称
 */
export function erractionof<T extends keyof jsonvType.IJSONVERR, E extends keyof jsonvType.IJSONVERR[T]>(name: T, errname: E): jsonvType.IJSONVERR[T][E] {
	return jsonvErrHandlers[name][errname]
}

/**
 * 抛出一个异常
 * @param vals 用于拼接的异常信息字符串
 */
export function error(...vals: Array<string | number>): never {
	throw new Error(vals.join(''))
}

/**
 * 校验一个值是否为空（null或undefined）
 * @param val 值
 */
export function empty(val: any) {
	return val === null || val === undefined
}