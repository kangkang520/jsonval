import * as tools from '../../base/tools'

tools.regist('string', (req, name, opt) => {
	return (val) => {
		opt = opt || {}
		if (tools.empty(val)) {
			if (req == '!') tools.error(name, '不能为空')
		} else {
			//类型校验
			if (typeof val != 'string') tools.error(name, '参数应该是字符串')
			const slen = val!.length
			//长度校验
			if (typeof opt.length == 'number') {
				if (slen != opt.length) tools.error(name, '长度应该是', opt.length)
			} else if (opt.length instanceof Array) {
				const [min, max] = opt.length
				if (min && max) {
					if (slen < min || slen > max) tools.error(name, '长度应该在', `${min}~${max}`, '间')
				}
				else if (min) {
					if (slen < min) tools.error(name, '长度不能小于', min)
				}
				else if (max) {
					if (slen > max) tools.error(name, '长度不能超过', max)
				}
			}
			//值枚举校验
			if (opt.values && !opt.values.includes(val as any)) tools.error(name, '应该是', opt.values.join('、'), '之一')
			//正则表达式校验
			if (opt.regexp) {
				const [exp, msg] = opt.regexp
				const regs = (exp instanceof Array) ? exp : [exp]
				if (regs.length && !regs.some(r => r.test(val!))) {
					msg ? tools.error(msg) : tools.error(name, '不符个预期规则')
				}
			}
		}
		//没有问题返回给定值
		return val
	}
})