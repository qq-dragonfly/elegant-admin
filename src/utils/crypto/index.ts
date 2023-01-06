import CryptoJS from 'crypto-js';

const CryptoSecret = '__CryptoJS_Secret__';

/**
 * 加密数据
 * @param data - 数据
 */
export function encrypto(data: any) {
	const newData = JSON.stringify(data);
	return CryptoJS.AES.encrypt(newData, CryptoSecret).toString();
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export function decrypto(cipherText: string) {
	const bytes = CryptoJS.AES.decrypt(cipherText, CryptoSecret);
	const originalText = bytes.toString(CryptoJS.enc.Utf8);
	if (originalText) {
		return JSON.parse(originalText);
	}
	return null;
}

/* 常用加解密 */
//MD5加密
export function MD5(data: any) {
	return CryptoJS.MD5(data).toString();
}
//BASE64加密
export function BASE64Encrypt(data: any) {
	return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
}
//BASE64解密
export function BASE64Decrypt(cipher: any) {
	return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8);
}

// AES ECB模式加密，没有iv
export function AesEncrypt(message: any, key: any) {
	// utf8字符串—>WordArray对象，WordArray是一个保存32位整数的数组，相当于转成了二进制
	let keyHex = CryptoJS.enc.Utf8.parse(key); //
	let messageHex = CryptoJS.enc.Utf8.parse(message);
	let encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString(); // base64结果
	//return encrypted.ciphertext.toString();   // 二进制结果
}
// AES ECB模式解密
export function AesDecrypt(messageBase64: any, key: any) {
	// 如果加密后没有转成base64,那么先要转成base64再传入
	//let encryptedHexStr = CryptoJS.enc.Hex.parse(word);   // 从二进制文本转成二进制
	//messageBase64 = CryptoJS.enc.Base64.stringify(encryptedHexStr);    // 转成base64
	let keyHex = CryptoJS.enc.Utf8.parse(key);
	let decrypt = CryptoJS.AES.decrypt(messageBase64, keyHex, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}
