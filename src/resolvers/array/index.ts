import * as tools from '../../base/tools'

tools.regist('array', (req, name, item) => {
	return (val) => {
		if (tools.empty(val)) {
			if (req == '!') tools.error(name, '不能为空')
		} else {
			if (!(val instanceof Array)) tools.error(name, '应该是一个数组')
			//对每一个元素进行校验
			val = val!.map(vi => (item as any)(vi)) as any
		}
		return val
	}
})
