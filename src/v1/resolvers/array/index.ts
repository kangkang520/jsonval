import * as tools from '../../base/tools'

tools.regist('array', (req, name, item) => {
	return (val, voption) => {
		if (tools.empty(val)) {
			if (req == '!') tools.erractionof('array', 'isEmpty')({ req, name, item, val, voption })
		} else {
			if (!(val instanceof Array)) tools.erractionof('array', 'notArray')({ req, name, item, val, voption })
			//对每一个元素进行校验
			val = val!.map(vi => (item as any)(vi, voption)) as any
		}
		return val
	}
})

tools.erraction('array', 'isEmpty', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不能为空')
})

tools.erraction('array', 'notArray', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '应该是一个数组')
})