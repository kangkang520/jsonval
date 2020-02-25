import * as tools from '../../base/tools'

tools.regist('tuple', (req: '!' | '?', name: string, vals: Array<any>) => {
	return (val: any) => {
		if (tools.empty(val)) {
			if (req == '!') tools.error(name, '不能为空')
		} else {
			if (!(val instanceof Array)) tools.error(name, '应该是一个数组')
			if (val.length != vals.length) tools.error(name, '数据个数应该是', vals.length)
			//对每一个元素进行校验
			val = vals!.map((vi, N) => vi(val[N]))
		}
		return val
	}
})