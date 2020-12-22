import * as $util from "./util"

const REGEXPS: { [P in jsonv2.TStringType]: [RegExp | Array<RegExp>, string] } = {
	'date': [
		/^\d{4}-\d{2}-\d{2}$/,
		'value not a date',
	],
	'time': [
		/^\d{2}:\d{2}:\d{2}$/,
		'value not a time',
	],
	'datetime': [
		/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
		'value not a datetime',
	],
	'email': [
		/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,
		'value not a email',
	],
	'mobile': [
		/^1[34578][0-9]{9}$/,
		'value not a mobile',
	],
	'tel': [
		/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
		'value not a tel',
	],
	'url': [
		/^(http[s]?):\/\/[\S]{3,}$/,
		'value not a url',
	],
	'ip': [
		/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
		'value not a ip',
	],
	'domain': [
		/^(([a-zA-Z0-9_][a-zA-Z0-9_\-]{0,61})(\.[a-zA-Z0-9_][a-zA-Z0-9_\-]{0,61})*(\.[a-zA-Z0-9]{2,}){1})|([a-zA-Z0-9_][a-zA-Z0-9_\-]{0,61}[a-zA-Z0-9_])$/,
		'value not a domain',
	],
	'hostname': [
		[
			/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
			/^(([a-zA-Z0-9_][a-zA-Z0-9_\-]{0,61})(\.[a-zA-Z0-9_][a-zA-Z0-9_\-]{0,61})*(\.[a-zA-Z0-9]{2,}){1})|([a-zA-Z0-9_][a-zA-Z0-9_\-]{0,61}[a-zA-Z0-9_])$/,
		],
		'value not a hostname'
	],
}

export const jsonv2: jsonv2.IValidatorDict = {
	$util,
	//字符串
	string(option) {
		return (val, opt, treePath = []) => {
			//基本的处理
			if (option.pretreat) val = option.pretreat(val, opt)
			const isEmpty = this.$util.empty(val, option.emptyVals)
			if (isEmpty && !this.$util.empty(option.default)) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && (typeof val != 'string')) return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'not a string', val, opt)], result: '' as any }
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value', val, opt)
				//正常处理
				if (!isEmpty) {
					//固定值处理
					if (rule.values && !rule.values.some((v: any) => v === val)) return this.$util.mkerr(rule.message, treePath, `got a error value`, val, opt)
					//最小最大值
					if (rule.min && val.length < rule.min) return this.$util.mkerr(rule.message, treePath, `got a error value`, val, opt)
					if (rule.max && val.length > rule.max) return this.$util.mkerr(rule.message, treePath, `got a error value`, val, opt)
					//正则表达式
					if (rule.pattern) {
						var patterns: Array<RegExp> = (rule.pattern instanceof Array) ? rule.pattern : [rule.pattern]
						if (!patterns.some(p => p.test(val))) return this.$util.mkerr(rule.message, treePath, `got a error value`, val, opt)
					}
					//类型校验
					if (rule.type && REGEXPS[rule.type]) {
						const [reg, msg] = REGEXPS[rule.type]
						if (
							//没有一个通过
							((reg instanceof Array) && !reg.some(reg => reg.test(val)))
							//不通过
							|| (reg instanceof RegExp && !reg.test(val))
						) return this.$util.mkerr(rule.message, treePath, msg, val, opt)
					}
				}
				//其他正常
				return null!
			}).filter(s => !!s)
			//有错误则返回错误信息
			if (errors.length) return { type: 'error', errors, result: '' as any }
			//返回成功
			return { type: 'success', errors: [], result: val }
		}
	},
	//数字
	number(option) {
		return (val, opt, treePath = []) => {
			//基本处理
			if (option.pretreat) val = option.pretreat(val, opt)
			const isEmpty = this.$util.empty(val, option.emptyVals)
			if (isEmpty && !this.$util.empty(option.default)) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			//类型校验及转换
			if (!isEmpty) {
				if (typeof val != 'number' || isNaN(val)) return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'not a number', val, opt)], result: 0 as any }
				if (option.type == 'int') val = parseInt(val as any)
				else if (option.decimal) val = parseFloat(val.toFixed(option.decimal))
			}
			//规则
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value', val, opt)
				if (!isEmpty) {
					//固定值处理
					if (rule.values && !rule.values.some((v: any) => v === val)) return this.$util.mkerr(rule.message, treePath, `got a error value`, val, opt)
					//最小最大值
					if (rule.min !== undefined && val < rule.min) return this.$util.mkerr(rule.message, treePath, `got a error value`, val, opt)
					if (rule.max !== undefined && val > rule.max) return this.$util.mkerr(rule.message, treePath, `got a error value`, val, opt)
				}
				//正常
				return null!
			}).filter(r => !!r)
			if (errors.length) return { type: 'error', errors, result: 0 as any }
			//正常返回
			return { type: 'success', errors: [], result: val as any }
		}
	},
	//布尔
	boolean(option) {
		return (val, opt, treePath = []) => {
			//值处理
			if (option.pretreat) val = option.pretreat(val, opt)
			const isEmpty = val === undefined || val === null
			if (isEmpty && !this.$util.empty(option.default)) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && (typeof val !== 'boolean')) return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'not a boolean value', val, opt)], result: undefined! }
			//规则
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value', val, opt)
				if (!isEmpty) {
					//未来的其他可能校验
				}
				//正常
				return null!
			}).filter(r => !!r)
			if (errors.length) return { type: 'error', errors, result: 0 as any }
			//正常返回
			return { type: 'success', errors: [], result: val as any }
		}
	},
	//对象
	object(option) {
		return (val, opt, treePath = []) => {
			//基本处理
			if (option.pretreat) val = option.pretreat(val, opt)
			const isEmpty = val === undefined || val === null
			if (isEmpty && !this.$util.empty(option.default)) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && (typeof val != 'object')) return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'not a object', val, opt)], result: {} }
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value', val, opt)
				if (!isEmpty) {
					//未来的其他可能校验
				}
				//正常
				return null!
			}).filter(s => !!s)
			//空返回
			if (isEmpty) {
				if (errors.length) return { type: 'error', errors, result: undefined }
				else return { type: 'success', errors: [], result: val }
			}
			//数据校验
			const result: any = {}
			Object.keys(option.props).forEach(key => {
				const v = val[key]
				const res = (option.props as any)[key](v, opt, [...treePath, key as string])
				if (res.type == 'error') errors.push(...res.errors)
				result[key] = res.result
			})
			//返回结果
			return { type: (errors.length ? 'error' : 'success'), errors, result }
		}
	},
	//数组
	array(option) {
		return (val: Array<any>, opt, treePath = []) => {
			//基本处理
			if (option.pretreat) val = option.pretreat(val, opt)
			const isEmpty = val === undefined || val === null
			if (isEmpty && !this.$util.empty(option.default)) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && !(val instanceof Array)) return { type: 'error', result: [] as any, errors: [this.$util.mkerr(option.typeerr, treePath, 'not a array', val, opt)] }
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value', val, opt)
				if (!isEmpty) {
					if (rule.min !== undefined && val.length < rule.min) return this.$util.mkerr(rule.message, treePath, 'got a error value', val, opt)
					if (rule.max !== undefined && val.length > rule.max) return this.$util.mkerr(rule.message, treePath, 'got a error value', val, opt)
				}
				//正常
				return null!
			}).filter(s => !!s)
			//如果为空，直接结束
			if (isEmpty) {
				if (errors.length) return { type: 'error', errors, result: undefined }
				else return { type: 'success', errors: [], result: val }
			}
			//数据校验
			const result: Array<any> = []
			val.forEach((val, N) => {
				const res = option.items(val, opt, [...treePath, `[${N}]`])
				if (res.type == 'error') errors.push(...res.errors)
				result.push(res.result)
			})
			//返回结果
			return { type: (errors.length ? 'error' : 'success'), errors, result: result as any }
		}
	},
	//元组
	tuple(option) {
		return (val, opt, treePath = []) => {
			//基本处理
			if (option.pretreat) val = option.pretreat(val, opt)
			const isEmpty = val === undefined || val === null
			if (isEmpty && !this.$util.empty(option.default)) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty) {
				if (!(val instanceof Array)) return { type: 'error', result: [] as any, errors: [this.$util.mkerr(option.typeerr, treePath, 'got a error tuple', val, opt)] }
				if (val.length != option.items.length) return { type: 'error', result: [] as any, errors: [this.$util.mkerr(option.typeerr, treePath, 'got a error tuple', val, opt)] }
			}
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value', val, opt)
				if (!isEmpty) {
					//未来的其他可能校验
				}
				//正常
				return null!
			}).filter(s => !!s)
			//空直接结束
			if (isEmpty) {
				if (errors.length) return { type: 'error', errors, result: undefined }
				else return { type: 'success', errors: [], result: val }
			}
			//数据校验
			const result: Array<any> = []
			option.items.forEach((item, N) => {
				const res = item(val[N], opt, [...treePath, `[${N}]`])
				if (res.type == 'error') errors.push(...res.errors)
				result.push(res.result)
			})
			//返回结果
			return { type: errors.length ? 'error' : 'success', errors, result: result as any }
		}
	},
	//或
	or(option) {
		return (val, opt, treePath = []) => {
			//基础处理
			if (option.pretreat) val = option.pretreat(val, opt)
			const isEmpty = val === undefined || val === null
			if (isEmpty && !this.$util.empty(option.default)) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value', val, opt)
				if (!isEmpty) {
					//未来的其他可能校验
				}
				//正常
				return null!
			}).filter(s => !!s)
			//检查一下，如果是空，而且没有错误则不进行后续校验
			if (isEmpty) {
				if (errors.length) return { type: 'error', errors, result: val }
				else return { type: 'success', errors: [], result: val }
			}
			//继续校验
			for (let i = 0; i < option.items.length; i++) {
				const res = option.items[i](val, opt, treePath)
				if (res.type == 'success') return { type: 'success', errors: [], result: res.result }
			}
			//都没有校验成功，失败了
			return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'nothing matched', val, opt)], result: undefined! }
		}
	},
	//任意值
	any() {
		return (val, opt, treePath) => {
			return { type: 'success', errors: [], result: val }
		}
	},
}


// const xx = jsonv2.or({
// 	typeerr: '服务器进程数无效,应该是: "cpus" | [1,128]',
// 	items: [
// 		jsonv2.string({ rules: [{ values: ['cpus'] }] }),
// 		jsonv2.number({ type: 'int', rules: [{ min: 1, max: 128 }] })
// 	],
// 	default: 'cpus',
// })(undefined, {})

// jsonv2.string({
// 	rules: [{ values: ['dev', 'pro'], message: '代码模式错误，应该是dev或pro' }],
// 	default: 'dev'
// })

// type xxx = Exclude<undefined | 'str', undefined>

// type TResult<R, D, T> = true extends R ? T : (Exclude<D, undefined> extends never ? (T | undefined) : T)

// type t1 = true extends false ? 't' : 'f'

// type xx = TResult<false, ("22")[] | ((s: null | undefined) => ("22")[]) | undefined, 333>

// type xxx = Exclude<true, true>

// const validators1 = jsonv2.tuple({
// 	// rules: [{ required: true, message: '配置不存在或配置为空' }],
// 	items: [jsonv2.string({
// 		rules: [{ values: ['dev', 'pro'], message: '代码模式错误，应该是dev或pro' }],
// 		default: 'dev'
// 	})],
// 	// default: ['dev']
// })(undefined, {})
// validators1.result[0]

// const validators2 = jsonv2.object({
// 	props: {
// 		items: jsonv2.string({
// 			rules: [{ values: ['dev', 'pro'], message: '代码模式错误，应该是dev或pro' }],
// 			default: 'dev'
// 		}),
// 	},
// 	default: { items: 'dev' }
// })(undefined, {})
// validators2.result.items