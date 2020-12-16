import * as tools from '../../base/tools'

tools.regist('or', (req, name, vals) => {
	return (val, voption) => {
		if (tools.empty(val)) {
			if (req == '!') tools.erractionof('or', 'isEmpty')({ req, name, vals, val, voption })
		} else {
			let success = false
			//逐个检测，看看是否有一个符合要求
			for (let i = 0; i < vals.length; i++) {
				const vfunc = vals[i] as any
				try {
					//如果没有错误表示成功
					val = vfunc(val, voption)
					success = true
					break
				} catch (e) { }
			}
			if (!success) tools.erractionof('or', 'notMatch')({ req, name, vals, val, voption })
		}
		return val
	}
})


tools.erraction('or', 'isEmpty', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不能为空')
})

tools.erraction('or', 'notMatch', (option) => {
	tools.error(tools.nameof(option.name, option.voption), '不符合预期值')
})