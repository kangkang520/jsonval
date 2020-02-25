const { jsonv, tools } = require('..')

tools.regist('loves', (req, name, vals) => {
	return jsonv.array(req, name, jsonv.string('!', name, { values: vals }))
})

const objv = jsonv.object('!', 'user info', {
	id: jsonv.string('!', 'user id', { length: [1, 20] }),
	name: jsonv.string('!', 'user name', { length: [2, 5] }),
	age: jsonv.int('?', 'user age', { range: [0, null] }),
	loves: jsonv.loves('?', 'user love', ['eat', 'sleep', 'walk'])
})

console.log(objv({
	id: '1',
	name: 'Jone',
	age: 27,
	loves: ['eat', 'sleep'],
}))