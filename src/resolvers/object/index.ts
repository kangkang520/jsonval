import * as tools from '../../base/tools'

tools.regist('object', (req: jsonvType.RequireType, name: string, vals: any) => {
	return (val: any) => {
		if (tools.empty(val)) {
			if (req == '!') tools.error(name, '不能为空')
		} else {
			if (typeof val != 'object') tools.error(name, '不是一个有效对象')
			//校验对象中的每个值
			Object.keys(vals).forEach(key => {
				(val as any)[key] = (vals as any)[key]((val as any)[key])
			})
		}
		return val
	}
})