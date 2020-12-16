import { ValidateError } from "./error"
import { createUtil } from "./util"

declare global {
	/** 校验器命名空间，用于定义 */
	export namespace jsonv2 {
		/** 必选、可选定义 */
		export type TReq = true | false

		/** 错误消息 */
		export type TErrorMessage = string | (() => string) | [string, number] | (() => [string, number])

		/** 结果定义 */
		export type TResult<R, D, T> = R extends true ? T : (undefined extends D ? (T | undefined) : (never extends D ? (T | undefined) : T))

		/** 校验器返回定义 */
		export type VReturn<T> = (val: any, option: any, path?: Array<string>) => { type: 'success' | 'error', errors: Array<ValidateError>, result: T }

		/** 基本校验选项 */
		export interface IBaseValidateOption<D, R, Rule> {
			/** 校验规则 */
			rules?: Array<{
				/** 是否非空 */
				required?: R
				/** 错误消息 */
				message?: TErrorMessage
			} & Partial<Rule>>
			/** 预处理 */
			pretreat?: (val: any) => any
			/** 校验是类型错误时使用此错误信息 */
			typeerr?: TErrorMessage
			/** 默认值，可以使用函数自定义默认值 */
			default?: Exclude<D, undefined> | ((s: null | undefined) => Exclude<D, undefined>)
		}

		/** 字符串校验选项 */
		export interface IStringOption<R extends TReq, S extends string, D extends S | undefined> extends IBaseValidateOption<D, R, {
			/** 允许的取值 */
			values: Array<S>
			/** 最小长度 */
			min: number
			/** 最大长度 */
			max: number
			/** 正则表达式 */
			pattern: RegExp | Array<RegExp>
			/** 类型定义 */
			type: 'date' | 'time' | 'datetime' | 'email' | 'mobile' | 'tel' | 'url'

		}> {
			/** 空值定义，当字符串中存在下列给定值时，会作为空处理，并转换成undefined，默认只有undefined */
			emptyVals?: Array<string | null | undefined>
		}

		/** 数字校验选项 */
		interface INumberOption<R extends TReq, N extends number, D extends N | undefined> extends IBaseValidateOption<D, R, {
			/** 允许的取值 */
			values: Array<N>
			/** 最小值 */
			min: number
			/** 最大值 */
			max: number
		}> {
			/** 数字类型 */
			type?: 'int' | 'float'
			/** 小数位数长度，当类型验证为float时有效 */
			decimal?: number
			/** 空值定义，当数字中存在下列给定值时，会作为空处理，并转换成undefined，默认只有undefined */
			emptyVals?: Array<null | undefined | number>
		}

		/** 布尔校验选项 */
		interface IBooleanOption<R extends TReq, D extends boolean | undefined> extends IBaseValidateOption<D, R, {}> { }

		/** 对象校验选项 */
		interface IObjectOption<R extends boolean, T extends {}, D extends T | undefined> extends IBaseValidateOption<D, R, {}> {
			/** 属性列表 */
			props: {
				[P in keyof T]: VReturn<T[P]>
			}
		}

		/** 数组校验选项 */
		interface IArrayOption<R, T extends any, D extends T | undefined> extends IBaseValidateOption<D, R, {
			/** 最小长度 */
			min: number
			/** 最大长度 */
			max: number
		}> {
			/** 元素定义 */
			items: VReturn<T>
		}

		/** 元组处理 */
		type TupleR<T> = T extends [VReturn<infer T1>] ? [T1] :
			T extends [VReturn<infer T1>, VReturn<infer T2>] ? [T1, T2] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>] ? [T1, T2, T3] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>] ? [T1, T2, T3, T4] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>] ? [T1, T2, T3, T4, T5] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>] ? [T1, T2, T3, T4, T5, T6] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>, VReturn<infer T7>] ? [T1, T2, T3, T4, T5, T6, T7] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>, VReturn<infer T7>, VReturn<infer T8>] ? [T1, T2, T3, T4, T5, T6, T7, T8] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>, VReturn<infer T7>, VReturn<infer T8>, VReturn<infer T9>] ? [T1, T2, T3, T4, T5, T6, T7, T8, T9] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>, VReturn<infer T7>, VReturn<infer T8>, VReturn<infer T9>, VReturn<infer T10>] ? [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>, VReturn<infer T7>, VReturn<infer T8>, VReturn<infer T9>, VReturn<infer T10>, VReturn<infer T11>] ? [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>, VReturn<infer T7>, VReturn<infer T8>, VReturn<infer T9>, VReturn<infer T10>, VReturn<infer T11>, VReturn<infer T12>] ? [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>, VReturn<infer T7>, VReturn<infer T8>, VReturn<infer T9>, VReturn<infer T10>, VReturn<infer T11>, VReturn<infer T12>, VReturn<infer T13>] ? [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>, VReturn<infer T7>, VReturn<infer T8>, VReturn<infer T9>, VReturn<infer T10>, VReturn<infer T11>, VReturn<infer T12>, VReturn<infer T13>, VReturn<infer T14>] ? [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14] :
			T extends [VReturn<infer T1>, VReturn<infer T2>, VReturn<infer T3>, VReturn<infer T4>, VReturn<infer T5>, VReturn<infer T6>, VReturn<infer T7>, VReturn<infer T8>, VReturn<infer T9>, VReturn<infer T10>, VReturn<infer T11>, VReturn<infer T12>, VReturn<infer T13>, VReturn<infer T14>, VReturn<infer T15>] ? [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15] :
			Array<any>

		/** 元组校验选项 */
		interface ITupleOption<R, T extends VReturn<any>[], D extends TupleR<[...T]> | undefined> extends IBaseValidateOption<D, R, {}> {
			/** 元素定义 */
			items: [...T]
		}

		type TOrR<T> = Exclude<T extends Array<VReturn<infer R>> ? R : never, undefined | null>

		/** 或校验选项 */
		interface IOrOption<R extends boolean, T extends VReturn<any>[], D extends TOrR<T> | undefined> extends IBaseValidateOption<D, R, {}> {
			/** 元素定义 */
			items: T
		}

		/** 校验器 */
		export interface IValidatorDict {
			/** 工具 */
			$util: ReturnType<typeof createUtil>
			/**
			 * 字符串校验
			 * @param option 校验选项
			 */
			string<R extends TReq, S extends string, D extends S | undefined>(option: IStringOption<R, S, D>): VReturn<TResult<R, D, S>>
			/**
			 * 数字校验
			 * @param option 校验选项
			 */
			number<R extends TReq, N extends number, D extends N | undefined>(option: INumberOption<R, N, D>): VReturn<TResult<R, D, N>>
			/**
			 * 布尔校验
			 * @param option 校验选项
			 */
			boolean<R extends TReq, D extends boolean | undefined>(option: IBooleanOption<R, D>): VReturn<TResult<R, D, boolean>>
			/**
			 * 对象校验
			 * @param option 校验选项
			 */
			object<R extends TReq, T extends {}, D extends T | undefined>(option: IObjectOption<R, T, D>): VReturn<TResult<R, D, T>>
			/**
			 * 数组校验
			 * @param option 校验选项
			 */
			array<R extends TReq, T extends any, D extends T | undefined>(option: IArrayOption<R, T, D>): VReturn<TResult<R, D, Array<T>>>
			/**
			 * 元组校验
			 * @param option 元组选项
			 */
			tuple<R extends TReq, T extends VReturn<any>[], D extends TupleR<[...T]> | undefined>(option: ITupleOption<R, T, D>): VReturn<TResult<R, D, TupleR<[...T]>>>
			/**
			 * 或校验
			 * 
			 * * 尽量不要使用此校验，使用时以最好只用于校验基础类型：string,number,boolean
			 * * 使用此校验，items的非空选项无效
			 * @param option 校验选项
			 */
			or<R extends TReq, T extends VReturn<any>[], D extends TOrR<T> | undefined>(option: IOrOption<R, T, D>): VReturn<TResult<R, D, TOrR<T>>>
			/** 保持原有值不变 */
			any(): VReturn<TResult<true, any, any>>
		}
	}
}