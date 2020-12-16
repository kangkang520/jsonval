
import * as tools from '../../base/tools'

function number(req: '!' | '?', name: jsonvType.Name, type: 'float' | 'int', opt: any) {
	return (val: number, voption: any) => {
		opt = opt || {}
		if (tools.empty(val)) {
			if (req == '!') tools.erractionof('number', 'isEmpty')({ req, name, opt, val, voption })
		}
		else {
			if (typeof val != 'number') tools.erractionof('number', 'notNumber')({ req, name, opt, val, voption })
			//类型校验
			if (type == 'int') {
				var intv = parseInt(val as any)
				if (intv != val) tools.erractionof('number', 'notInt')({ req, name, opt, val, voption })
			}
			//范围校验
			if (opt.range) {
				const [min, max] = opt.range
				if (min !== null && max !== null) {
					if (val < min || val > max) tools.erractionof('number', 'notInRang')({ req, name, opt, val, voption })
				}
				else if (min !== null) {
					if (val < min) tools.erractionof('number', 'cantLT')({ req, name, opt, val, voption })
				}
				else if (max !== null) {
					if (val > max) tools.erractionof('number', 'cantGT')({ req, name, opt, val, voption })
				}
			}
			//具体值校验
			if (opt.values && opt.values.length) {
				if (!opt.values.some((v: any) => v == val)) tools.erractionof('number', 'notInValues')({ req, name, opt, val, voption })
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


tools.erraction('number', 'isEmpty', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不能为空')
})

tools.erraction('number', 'notNumber', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '应该是数字')
})

tools.erraction('number', 'notInt', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '应该是整数')
})

tools.erraction('number', 'notInRang', (option) => {
	const [min, max] = option.opt.range
	tools.error(tools.nameof(option.name, option.voption), '应该在', `${min}~${max}`, '间')
})

tools.erraction('number', 'cantLT', (option) => {
	const [min, max] = option.opt.range
	tools.error(tools.nameof(option.name, option.voption), '不能小于', min!)
})

tools.erraction('number', 'cantGT', (option) => {
	const [min, max] = option.opt.range
	tools.error(tools.nameof(option.name, option.voption), '不能大于', max!)
})

tools.erraction('number', 'notInValues', (option) => {
	const values = option.opt.values
	tools.error(tools.nameof(option.name, option.voption), '应该是', values.join(','), '之一')
})