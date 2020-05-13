import * as tools from '../../base/tools'

tools.regist('tuple', (req: '!' | '?', name: string, vals: Array<any>) => {
	return (val: any, voption: any) => {
		if (tools.empty(val)) {
			if (req == '!') tools.erractionof('tuple', 'isEmpty')({ req, name, vals, val, voption })
		} else {
			if (!(val instanceof Array)) tools.erractionof('tuple', 'notArray')({ req, name, vals, val, voption })
			if (val.length != vals.length) tools.erractionof('tuple', 'lenNot')({ req, name, vals, val, voption })
			//对每一个元素进行校验
			val = vals!.map((vi, N) => vi(val[N], voption))
		}
		return val
	}
})


tools.erraction('tuple', 'isEmpty', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不能为空')
})

tools.erraction('tuple', 'notArray', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '应该是一个数组')
})

tools.erraction('tuple', 'lenNot', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '数据个数应该是', option.vals.length)
})