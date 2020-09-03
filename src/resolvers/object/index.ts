import * as tools from '../../base/tools'

tools.regist('object', (req, name, vals) => {
	return (val, voption) => {
		const result: any = {}
		if (tools.empty(val)) {
			if (req == '!') tools.erractionof('object', 'isEmpty')({ req, name, vals, val, voption })
		} else {
			if (typeof val != 'object') tools.erractionof('object', 'notObject')({ req, name, vals, val, voption })
			//校验对象中的每个值
			Object.keys(vals).forEach(key => {
				result[key] = (vals as any)[key]((val as any)[key], voption)
			})
		}
		return result
	}
})

tools.erraction('object', 'isEmpty', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不能为空')
})

tools.erraction('object', 'notObject', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不是一个有效对象')
})