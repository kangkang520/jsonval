import * as tools from '../../base/tools'

tools.regist('boolean', (req, name) => {
	return (val, voption) => {
		if (tools.empty(val)) {
			if (req == '!') tools.erractionof('boolean', 'isEmpty')({ req, name, val, voption })
		} else {
			if (typeof val != 'boolean') tools.erractionof('boolean', 'notBoolean')({ req, name, val, voption })
		}
		return val
	}
})

tools.erraction('boolean', 'isEmpty', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不能为空')
})

tools.erraction('boolean', 'notBoolean', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '参数应该是布尔值')
})