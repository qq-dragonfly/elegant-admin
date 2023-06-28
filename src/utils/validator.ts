export function matching(value: any, callback: any, reg: any, message: any) {
	if (value === '' || value === undefined || value === null) {
		callback(new Error(message));
	} else {
		if (!reg.test(value)) {
			callback(new Error(message));
		} else {
			callback();
		}
	}
}
const validator: any = {
	Username(rule: any, value: any, callback: any) {
		let reg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,12}$/;
		matching(value, callback, reg, '请输入6-12位字母和数字组合');
	},
	SimplePwd(rule: any, value: any, callback: any) {
		let reg = /^[_a-zA-Z0-9]+$/;
		matching(value, callback, reg, '包含英文字母、数字及下划线组成');
	},
	ComplexPwd(rule: any, value: any, callback: any) {
		let reg = /^(?!\d+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){8,20}$/;
		matching(value, callback, reg, '请输入8-20位英文字母、数字或者符号');
	},
	Phone(rule: any, value: any, callback: any) {
		let reg = /^[1][3, 4, 5, 6, 7, 8][0-9]{9}$/;
		matching(value, callback, reg, '请输入正确的手机');
	},
	Email(rule: any, value: any, callback: any) {
		let reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
		matching(value, callback, reg, '输入正确的邮箱');
	},
	IdCard(rule: any, value: any, callback: any) {
		let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		matching(value, callback, reg, '输入正确的身份证号码');
	},
	Company(rule: any, value: any, callback: any) {
		let reg = /^[A-Z0-9]{8}-[A-Z0-9]$|^[A-Z0-9]{8}-[A-Z0-9]-[0-9]{2}$/;
		matching(value, callback, reg, '请输入正确的营业执照');
	},
	Integer(rule: any, value: any, callback: any) {
		let reg = /^[1-9][0-9]*$/;
		matching(value, callback, reg, '请输入正确的整数');
	},
	Number(rule: any, value: any, callback: any) {
		let reg = /^\d+$|^\d+[.]?\d+$/;
		matching(value, callback, reg, '请输入纯数字');
	},
	Landline(rule: any, value: any, callback: any) {
		let reg = /^(\d{3,4}-)?\d{7,8}$/;
		matching(value, callback, reg, '请输入正确的座机');
	},
	Ip(rule: any, value: any, callback: any) {
		let reg =
			/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		matching(value, callback, reg, '请输入正确的IP');
	},
	Price(rule: any, value: any, callback: any) {
		let reg = /^-?\d{1,4}(?:\.\d{1,2})?$ /;
		matching(value, callback, reg, '请输入正确的价格');
	},
	BankCard(rule: any, value: any, callback: any) {
		let reg = /^([1-9]{1})(\d{14}|\d{18})$/;
		matching(value, callback, reg, '请输入正确的银行卡');
	}
};
export default validator;
