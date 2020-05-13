# JSONVAL

一个json值验证工具

## 使用校验

通过`jsonv`提供的方法即可对值进行校验

```typescript
import { jsonv } from 'jsonval'

const validator = jsonv.object('!', '用户信息', {
	id: jsonv.int('!', 'ID', { range: [1, null] }),
	name: jsonv.object('!', '姓名', {
		first: jsonv.string('!', '姓氏', { length: [1, 3] }),
		last: jsonv.string('!', '名字', { length: [1, 3] }),
	}),
	gender: jsonv.string('?', '性别', { values: ['男', '女'] }),
	love: jsonv.array('?', '爱好列表', jsonv.string('!', '爱好', { length: [1,5] }))
})

const result = validator({
	id: 2,
	name: { first:'张', last:'飞' },
	gender: '男'
})

console.log(result)
```


## 扩展校验规则

通过`tools.regist`方法即可注册自己的校验规则（如果是typescript，则还需要扩展`IJSONV`接口，具体操作不做描述）

校验方式扩展示例：
```typescript
import {tools} from 'jsonval'

//新扩展校验
tools.regist('id', (req, name) => {
	//只需要返回一个校验函数即可
	//校验函数的参数是需要校验的值，返回值是经过校验之后应该得到的值
	return (val)=>{
		//是否必填检测
		if (tools.empty(val)) {
			if (req == '!') tools.error(name, '不能为空')
		}
		//结果处理
		else {
			val = val + ''
			if(!/^\d{1,20}$/.test(val)) tools.error(name, '不是有效ID')
		}
		return val
	}
})

//使用现有扩展进行组合
tools.regist('userName', (req, name)=>{
	return jsonv.object(req, name, {
		first: jsonv.string(req, '姓氏', { length: [1, 3] }),
		last: jsonv.string(req, '名字', { length: [1, 3] }),
	})
})
```

对于扩展后的校验器的使用：
```typescript
import { jsonv } from 'jsonval'

const validator = jsonv.object('!', '用户信息', {
	id: jsonv.id('!', 'ID'),
	name: jsonv.userName('!', '姓名'),
	gender: jsonv.string('?', '性别', { values: ['男', '女'] }),
	love: jsonv.array('?', '爱好列表', jsonv.string('!', '爱好', { length: [1,5] }))
})
```


## 自定义错误处理

通过自定义错误处理，可以实现国际化等其他功能。

* 通过`jsonv.tools.erraction`用来注册或重写错误处理程序。
* 通过`jsonv.tools.erractionof`来获取已注册的错误处理程序。
* 先在`jsonvType.IJSONVERR`中定义相关的错误处理程序，之后便可以使用`jsonv.tools.erraction`来注册。
* 如果已经注册了错误处理程序，则不应该直接抛出异常，而是调用错误处理程序来处理。
* 错误处理程序参数`option.voption`是在进行校验时通过第二个参数传递的。