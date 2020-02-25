
import * as tools from '../../base/tools'

function number(req: '!' | '?', name: string, type: 'float' | 'int', opt: any) {
	return (val: number) => {
		opt = opt || {}
		if (tools.empty(val)) {
			if (req == '!') tools.error(name, '不能为空')
		}
		else {
			//类型校验
			if (type == 'int') {
				var intv = parseInt(val as any)
				if (intv != val) tools.error(name, '应该是整数')
			}
			//范围校验
			if (opt.range) {
				const [min, max] = opt.range
				if (min !== null && max !== null) {
					if (val < min || val > max) tools.error(name, '应该在', `${min}~${max}`, '间')
				}
				else if (min !== null) {
					if (val < min) tools.error(name, '不能小于', min)
				}
				else if (max !== null) {
					if (val > max) tools.error(name, '不能大于', max)
				}
			}
			//具体值校验
			if (opt.values && opt.values.length) {
				if (!opt.values.some((v: any) => v == val)) tools.error(name, '应该是', opt.values.join(','), '之一')
			}
		}
		return val
	}
}

tools.regist('int', (req, name, opt) => {
	return number(req, name, 'int', opt) as any
})

tools.regist('float', (req, name, opt) => {
	return number(req, name, 'float', opt) as any
})

