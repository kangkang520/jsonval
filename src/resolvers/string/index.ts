import * as tools from '../../base/tools'

tools.regist('string', (req, name, opt) => {
	return (val, voption) => {
		opt = opt || {}
		if (tools.empty(val)) {
			if (req == '!') tools.erractionof('string', 'isEmpty')({ req, name, opt, val, voption })
		} else {
			//类型校验
			if (typeof val != 'string') tools.erractionof('string', 'notString')({ req, name, opt, val, voption })
			const slen = val!.length
			//长度校验
			if (typeof opt.length == 'number') {
				if (slen != opt.length) tools.erractionof('string', 'lenNot')({ req, name, opt, val, voption })
			} else if (opt.length instanceof Array) {
				const [min, max] = opt.length
				if (min && max) {
					if (slen < min || slen > max) tools.erractionof('string', 'lenNotInRange')({ req, name, opt, val, voption })
				}
				else if (min) {
					if (slen < min) tools.erractionof('string', 'lenLT')({ req, name, opt, val, voption })
				}
				else if (max) {
					if (slen > max) tools.erractionof('string', 'lenGT')({ req, name, opt, val, voption })
				}
			}
			//值枚举校验
			if (opt.values && !opt.values.includes(val as any)) tools.erractionof('string', 'notInValues')({ req, name, opt, val, voption })
			//正则表达式校验
			if (opt.regexp) {
				const [exp, msg] = opt.regexp
				const regs = (exp instanceof Array) ? exp : [exp]
				if (regs.length && !regs.some(r => r.test(val!))) {
					if (msg) {
						tools.erractionof('string', 'costomError')({ err: msg, req, name, opt, val, voption })
					}
					else {
						tools.erractionof('string', 'notMatch')({ req, name, opt, val, voption })
					}
				}
			}
		}
		//没有问题返回给定值
		return val
	}
})



tools.erraction('string', 'isEmpty', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不能为空')
})

tools.erraction('string', 'notString', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '应该是字符串')
})

tools.erraction('string', 'lenNot', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '长度应该是', option.opt.length)
})

tools.erraction('string', 'lenNotInRange', (option) => {
	const [min, max] = option.opt.length
	tools.error(tools.nameof(option.name, option.voption), '长度应该在', `${min}~${max}`, '间')
})

tools.erraction('string', 'lenLT', (option) => {
	const [min, max] = option.opt.length
	tools.error(tools.nameof(option.name, option.voption), '长度不能小于', min)
})

tools.erraction('string', 'lenGT', (option) => {
	const [min, max] = option.opt.length
	tools.error(tools.nameof(option.name, option.voption), '长度不能超过', max)
})

tools.erraction('string', 'notInValues', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '应该是', option.opt.values.join('、'), '之一')
})

tools.erraction('string', 'notMatch', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不符个预期规则')
})

tools.erraction('string', 'costomError', (option) => {
	tools.error(tools.nameof(option.err, option.voption))
})