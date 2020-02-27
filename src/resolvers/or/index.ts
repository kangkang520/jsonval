import * as tools from '../../base/tools'

tools.regist('or', (req, name, vals) => {
	return (val) => {
		if (tools.empty(val)) {
			if (req == '!') tools.error(name, '不能为空')
		} else {
			let success = false
			//逐个检测，看看是否有一个符合要求
			for (let i = 0; i < vals.length; i++) {
				const vfunc = vals[i] as any
				try {
					//如果没有错误表示成功
					val = vfunc(val)
					success = true
					break
				} catch (e) { }
			}
			if (!success) tools.error(name, '不符合预期值')
		}
		return val
	}
})