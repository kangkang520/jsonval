import * as tools from '../../base/tools'

tools.regist('boolean', (req, name) => {
	return (val) => {
		if (tools.empty(val)) {
			if (req == '!') tools.error(name, '不能为空')
		} else {
			if (typeof val != 'boolean') tools.error(name, '参数应该是布尔值')
		}
		return val
	}
})