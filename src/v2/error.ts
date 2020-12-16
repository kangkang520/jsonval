/** 校验错误 */
export class ValidateError extends Error {
	constructor(message: string,
		/** 错误路径 */
		public readonly path: Array<string>,
		/** 错误编码 */
		public readonly code?: number) {
		super(message)
	}
}