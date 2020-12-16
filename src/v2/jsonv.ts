import * as $util from "./util"

export const jsonv2: jsonv2.IValidatorDict = {
	$util,
	//字符串
	string(option) {
		return (val, opt, treePath = []) => {
			//基本的处理
			if (option.pretreat) val = option.pretreat(val)
			const isEmpty = this.$util.empty(val, option.emptyVals)
			if (isEmpty && option.default) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && (typeof val != 'string')) return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'not a string')], result: '' as any }
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value')
				//正常处理
				if (!isEmpty) {
					//固定值处理
					if (rule.values && !rule.values.some((v: any) => v === val)) return this.$util.mkerr(rule.message, treePath, `got a error value`)
					//最小最大值
					if (rule.min && val.length < rule.min) return this.$util.mkerr(rule.message, treePath, `got a error value`)
					if (rule.max && val.length > rule.max) return this.$util.mkerr(rule.message, treePath, `got a error value`)
					//正则表达式
					if (rule.pattern) {
						var patterns: Array<RegExp> = (rule.pattern instanceof Array) ? rule.pattern : [rule.pattern]
						if (!patterns.some(p => p.test(val))) return this.$util.mkerr(rule.message, treePath, `got a error value`)
					}
					//类型校验
					if (rule.type) {
						if (rule.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(val)) return this.$util.mkerr(rule.message, treePath, `value not a date`)
						else if (rule.type === 'time' && !/^\d{2}:\d{2}:\d{2}$/.test(val)) return this.$util.mkerr(rule.message, treePath, `value not a time`)
						else if (rule.type === 'datetime' && !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(val)) return this.$util.mkerr(rule.message, treePath, `value not a datetime`)
						else if (rule.type === 'email' && !/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(val)) return this.$util.mkerr(rule.message, treePath, `value not a email`)
						else if (rule.type === 'mobile' && !/^1[34578][0-9]{9}$/.test(val)) return this.$util.mkerr(rule.message, treePath, `value not a mobilephone number`)
						else if (rule.type === 'tel' && !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(val)) return this.$util.mkerr(rule.message, treePath, `value not a tellphone number`)
						else if (rule.type === 'url' && !/^(http[s]?):\/\/[\S]{3,}$/.test(val)) return this.$util.mkerr(rule.message, treePath, `value not a url`)
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
			if (option.pretreat) val = option.pretreat(val)
			const isEmpty = this.$util.empty(val, option.emptyVals)
			if (isEmpty && option.default) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && (typeof val != 'number' || isNaN(val))) return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'not a number')], result: 0 as any }
			//类型转换
			if (option.type == 'int') val = parseInt(val)
			else if (option.decimal) val = parseFloat(val.toFixed(option.decimal))
			//规则
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value')
				if (!isEmpty) {
					//固定值处理
					if (rule.values && !rule.values.some((v: any) => v === val)) return this.$util.mkerr(rule.message, treePath, `got a error value`)
					//最小最大值
					if (rule.min !== undefined && val < rule.min) return this.$util.mkerr(rule.message, treePath, `got a error value`)
					if (rule.max !== undefined && val > rule.max) return this.$util.mkerr(rule.message, treePath, `got a error value`)
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
			if (option.pretreat) val = option.pretreat(val)
			const isEmpty = val === undefined || val === null
			if (isEmpty && option.default) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && (typeof val !== 'boolean')) return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'not a boolean value')], result: undefined! }
			//规则
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value')
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
			if (option.pretreat) val = option.pretreat(val)
			const isEmpty = val === undefined || val === null
			if (isEmpty && option.default) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && (typeof val != 'object')) return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'not a object')], result: {} }
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value')
				if (!isEmpty) {
					//未来的其他可能校验
				}
				//正常
				return null!
			}).filter(s => !!s)
			//数据校验
			const result: any = isEmpty ? val : {}
			if (!isEmpty) Object.keys(option.props).forEach(key => {
				const v = val[key]
				const res = option.props[key as keyof typeof option.props](v, opt, [...treePath, key as string])
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
			if (option.pretreat) val = option.pretreat(val)
			const isEmpty = val === undefined || val === null
			if (isEmpty && option.default) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && !(val instanceof Array)) return { type: 'error', result: [] as any, errors: [this.$util.mkerr(option.typeerr, treePath, 'not a array')] }
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value')
				if (!isEmpty) {
					if (rule.min !== undefined && val.length < rule.min) return this.$util.mkerr(rule.message, treePath, 'got a error value')
					if (rule.max !== undefined && val.length > rule.max) return this.$util.mkerr(rule.message, treePath, 'got a error value')
				}
				//正常
				return null!
			}).filter(s => !!s)
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
			if (option.pretreat) val = option.pretreat(val)
			const isEmpty = val === undefined || val === null
			if (isEmpty && option.default) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			if (!isEmpty && !(val instanceof Array)) return { type: 'error', result: [] as any, errors: [this.$util.mkerr(option.typeerr, treePath, 'got a error tuple')] }
			if (val.length != option.items.length) return { type: 'error', result: [] as any, errors: [this.$util.mkerr(option.typeerr, treePath, 'got a error tuple')] }
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value')
				if (!isEmpty) {
					//未来的其他可能校验
				}
				//正常
				return null!
			}).filter(s => !!s)
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
			if (option.pretreat) val = option.pretreat(val)
			const isEmpty = val === undefined || val === null
			if (isEmpty && option.default) return { type: 'success', errors: [], result: this.$util.default(val, option.default) }
			//规则校验
			const errors = (option.rules || []).map(rule => {
				//非空处理
				if (rule.required && isEmpty) return this.$util.mkerr(rule.message, treePath, 'got a emtpy value')
				if (!isEmpty) {
					//未来的其他可能校验
				}
				//正常
				return null!
			}).filter(s => !!s)
			//检查一下，如果是空，而且没有错误则不进行后续校验
			if (isEmpty && !errors.length) return { type: 'success', errors: [], result: val }
			//继续校验
			for (let i = 0; i < option.items.length; i++) {
				const res = option.items[i](val, opt, treePath)
				if (res.type == 'success') return { type: 'success', errors: [], result: res.result }
			}
			//都没有校验成功，失败了
			return { type: 'error', errors: [this.$util.mkerr(option.typeerr, treePath, 'nothing matched')], result: undefined! }
		}
	},
	//任意值
	any() {
		return (val, opt, treePath) => {
			return { type: 'success', errors: [], result: val }
		}
	},
}
