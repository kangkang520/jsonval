import { jsonv } from './jsonv'

type ResolverNames = keyof jsonvType.IJSONV
/**
 * 注册一个验证器
 * @param name 验证方法名称
 * @param resolver 验证处理
 */
export function regist<T extends ResolverNames>(name: T, resolver: jsonvType.IJSONV[T]) {
	jsonv[name] = resolver
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