import { ValidateError } from "./error"
import { jsonv2 } from "./jsonv"

/**
 * 校验空值
 * @param v 要校验的值
 * @param emptyVals 那些值作为空值，默认undefined和null
 */
export function empty(v: any, emptyVals?: Array<any>) {
	emptyVals = emptyVals || [undefined, null]
	return emptyVals.some(ev => ev === v)
}

/**
 * 取默认值
 * @param val 当前值
 * @param defaultv 默认值，可以使具体值，也可以是函数
 */
export default function (val: any, defaultv: any) {
	if (typeof defaultv == 'function') return defaultv(val)
	return defaultv
}

/**
 * 构建错误
 * @param message TErrorMessage结构
 * @param path 错误路径
 * @param defaultErr 默认错误
 */
export function mkerr(message: jsonv2.TErrorMessage | undefined, path: Array<string>, defaultErr: string, val: any, option: any) {
	if (!message) return new ValidateError(defaultErr, path)
	//基本的校验函数
	const baseRet = (message: string | [string, number]) => {
		//字符串
		if (typeof message == 'string') return new ValidateError(message, path)
		//[string,number]
		else return new ValidateError(message[0], path, message[1])
	}
	if (typeof message == 'function') return baseRet(message(val, option))
	else return baseRet(message)
}
/**
 * 注册校验器
 * 
 * 注册前应该先在`jsonv2.IValidatorDict`中定义
 * @param name 校验器名称
 * @param validator 校验器
 */
export function regist<K extends jsonv2.TValidatorName>(name: K, validator: jsonv2.IValidatorDict[K]) {
	jsonv2[name] = validator
}
