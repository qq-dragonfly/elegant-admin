<template>
	<div>
		<div class="bg-banner">
			<login-bg :theme-color="bgThemeColor" v-if="settingsStore.mode === 'pc'" />
		</div>
		<div id="login-box" :class="{ shadow: settingsStore.mode === 'pc', 'login-box': settingsStore.mode === 'pc' }">
			<el-form
				v-show="formType === 'login'"
				ref="loginFormRef"
				:model="loginForm"
				:rules="loginRules"
				class="login-form"
				autocomplete="on"
			>
				<div class="title-container flex items-center justify-start">
					<div class="w-14 h-14 rounded-md overflow-hidden flex mr-5">
						<img src="../../assets/images/logo.png" alt="" />
					</div>
					<h3 class="title">欢迎来到 {{ title }} !</h3>
				</div>
				<div>
					<el-form-item prop="username">
						<el-input ref="name" v-model="loginForm.username" placeholder="用户名" text clearable tabindex="1" autocomplete="on">
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:user" />
								</el-icon>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							ref="loginPasswordRef"
							v-model="loginForm.password"
							:type="passwordType"
							placeholder="密码"
							tabindex="2"
							autocomplete="on"
							clearable
							@keyup.enter="handleLogin"
						>
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:lock" />
								</el-icon>
							</template>
							<template #suffix>
								<el-icon>
									<svg-icon :name="passwordType === 'password' ? 'ep:hide' : 'ep:view'" @click="showPassword(loginPasswordRef)" />
								</el-icon>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="verifyCode">
						<el-input
							ref="loginPasswordRef"
							v-model="loginForm.verifyCode"
							text
							placeholder="请输入验证码"
							tabindex="2"
							autocomplete="on"
							clearable
							@keyup.enter="handleLogin"
						>
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:lock" />
								</el-icon>
							</template>
							<template #append>
								<img v-if="captchaImg" :src="captchaImg" class="w-full h-12 verify-code-img" @click="getImageCaptcha" alt="" />
							</template>
						</el-input>
					</el-form-item>
				</div>
				<div class="flex-bar">
					<el-checkbox v-model="loginForm.remember"> 记住我</el-checkbox>
					<el-link type="primary" :underline="false" @click="formType = 'reset'"> 忘记密码了?</el-link>
				</div>
				<el-button
					class="h-12 rounded-full"
					:loading="loading"
					type="primary"
					size="large"
					style="width: 100%"
					@click.prevent="handleLogin"
				>
					登录
				</el-button>
				<div class="sub-link" v-if="false">
					<span class="text">还没有帐号?</span>
					<el-link type="primary" :underline="false" @click="formType = 'register'"> 创建新帐号</el-link>
				</div>
			</el-form>
			<el-form
				v-show="formType === 'register'"
				ref="registerFormRef"
				:model="registerForm"
				:rules="registerRules"
				class="login-form"
				auto-complete="on"
			>
				<div class="title-container">
					<h3 class="title">探索从这里开始! 🚀</h3>
				</div>
				<div>
					<el-form-item prop="username">
						<el-input ref="name" clearable v-model="registerForm.username" placeholder="用户名" tabindex="1" autocomplete="on">
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:user" />
								</el-icon>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="captcha" class="relative">
						<el-input ref="captcha" clearable v-model="registerForm.captcha" placeholder="验证码" tabindex="2" autocomplete="on">
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:key" />
								</el-icon>
							</template>
						</el-input>
						<el-link
							type="primary"
							:underline="false"
							class="border-transparent absolute w-24 right-6 h-5/6 rounded-tr-full rounded-br-full"
						>
							发送验证码
						</el-link>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							ref="registerPasswordRef"
							clearable
							v-model="registerForm.password"
							:type="passwordType"
							placeholder="密码"
							tabindex="3"
							autocomplete="on"
						>
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:lock" />
								</el-icon>
							</template>
							<template #suffix>
								<el-icon>
									<svg-icon
										:name="passwordType === 'password' ? 'ep:hide' : 'ep:view'"
										@click="showPassword(registerPasswordRef)"
									/>
								</el-icon>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="checkPassword">
						<el-input
							clearable
							ref="registerCheckPasswordRef"
							v-model="registerForm.checkPassword"
							:type="passwordType"
							placeholder="确认密码"
							tabindex="4"
							autocomplete="on"
						>
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:lock" />
								</el-icon>
							</template>
							<template #suffix>
								<el-icon>
									<svg-icon
										:name="passwordType === 'password' ? 'ep:hide' : 'ep:view'"
										@click="showPassword(registerCheckPasswordRef)"
									/>
								</el-icon>
							</template>
						</el-input>
					</el-form-item>
				</div>
				<el-button :loading="loading" type="primary" size="large" class="h-12 rounded-full mt-5" @click.prevent="handleRegister">
					注册
				</el-button>
				<div class="sub-link">
					<span class="text">已经有帐号?</span>
					<el-link type="primary" :underline="false" @click="formType = 'login'"> 去登录</el-link>
				</div>
			</el-form>
			<el-form
				v-show="formType === 'reset'"
				ref="resetFormRef"
				:model="resetForm"
				:rules="resetRules"
				class="login-form"
				auto-complete="on"
			>
				<div class="title-container">
					<h3 class="title">忘记密码了? 🔒</h3>
				</div>
				<div>
					<el-form-item prop="username">
						<el-input ref="name" clearable v-model="resetForm.username" placeholder="用户名" tabindex="1" autocomplete="on">
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:user" />
								</el-icon>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="captcha" class="relative">
						<el-input ref="captcha" clearable v-model="resetForm.captcha" placeholder="验证码" tabindex="2" autocomplete="on">
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:key" />
								</el-icon>
							</template>
						</el-input>
						<el-link
							type="primary"
							:underline="false"
							class="border-transparent absolute w-24 right-6 h-5/6 rounded-tr-full rounded-br-full"
						>
							发送验证码
						</el-link>
					</el-form-item>
					<el-form-item prop="newPassword">
						<el-input
							ref="resetNewPasswordRef"
							v-model="resetForm.newPassword"
							:type="passwordType"
							placeholder="新密码"
							tabindex="3"
							clearable
							autocomplete="on"
						>
							<template #prefix>
								<el-icon>
									<svg-icon name="ep:lock" />
								</el-icon>
							</template>
							<template #suffix>
								<el-icon>
									<svg-icon
										:name="passwordType === 'password' ? 'ep:hide' : 'ep:view'"
										@click="showPassword(resetNewPasswordRef)"
									/>
								</el-icon>
							</template>
						</el-input>
					</el-form-item>
				</div>
				<el-button :loading="loading" type="primary" size="large" class="h-12 rounded-full mt-5" @click.prevent="handleReset">
					确认
				</el-button>
				<div class="sub-link">
					<el-link type="primary" :underline="false" @click="formType = 'login'"> 返回登录</el-link>
				</div>
			</el-form>
		</div>
		<Copyright />
	</div>
</template>
<script lang="ts" setup name="Login">
import { getImageCaptchaApi } from '@/api/modules/login';
import { getTimeState, randomString } from '@/utils';
import { setLocal, getLocal, removeLocal } from '@/utils/storage';
import { AesEncrypt, AesDecrypt } from '@/utils/crypto';
import { setSession } from '@/utils/storage';
import type { ElForm, FormRules } from 'element-plus';
import { ElNotification, ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';
import { ref } from 'vue';
import LoginBg from './components/LoginBg/index.vue';
import useSettingsStore from '@/store/modules/settings';
const route = useRoute();
const router = useRouter();
const settingsStore = useSettingsStore();
const userStore = useUserStore();
const title = import.meta.env.VITE_APP_TITLE;

// 表单类型，login 登录，reset 重置密码
const formType = ref('login');
const loading = ref(false);
const passwordType = ref<string>('password');
const redirect = ref(route.query.redirect?.toString() ?? '/');
// 登录
// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginPasswordRef = ref<HTMLElement>();
const loginForm = reactive({
	username: (getLocal('login_username') as string) || 'admin',
	password: '203899',
	remember: !!getLocal('login_username'),
	verifyCode: '',
	captchaId: ''
});
const loginRules = ref<FormRules>({
	username: [
		{
			required: true,
			trigger: 'blur',
			message: '请输入用户名'
		}
	],
	password: [
		{
			required: true,
			trigger: 'blur',
			message: '请输入密码'
		},
		{
			min: 6,
			max: 18,
			trigger: 'blur',
			message: '密码长度为6到18位'
		}
	],
	verifyCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
});
onMounted(() => {
	getImageCaptcha();
});
//获取图形验证码
const captchaImg = ref('');
function getImageCaptcha() {
	loginForm.captchaId = randomString(64);
	let para = {
		id: loginForm.captchaId
	};
	getImageCaptchaApi(para).then((res: any) => {
		captchaImg.value = window.URL.createObjectURL(res);
	});
}
function handleLogin() {
	loginFormRef.value &&
		loginFormRef.value.validate(valid => {
			if (valid) {
				loading.value = true;
				let randomNumber = randomString(16);
				let password = AesEncrypt(loginForm.password, randomNumber);
				// console.log('加密后----->', password)
				setSession('psKey', randomNumber);
				// proxy.$TOOL.session.set('psKey', randomNumber);
				// let aesDecryptVal = await AesDecrypt(password, randomNumber)
				// console.log('aesDecryptVal', aesDecryptVal)

				let para = {
					username: loginForm.username,
					password: password,
					captcha: loginForm.verifyCode,
					id: loginForm.captchaId
				};
				userStore
					.login(para)
					.then(async (res: any) => {
						if (res.code === 200) {
							await userStore.getUserInfo();
							if (loginForm.remember) {
								setLocal('login_username', loginForm.username);
							} else {
								removeLocal('login_username');
							}
							await router.push(redirect.value);
							ElNotification({
								title: getTimeState(),
								message: `欢迎登录 ${title}`,
								type: 'success',
								duration: 3000
							});
						}
						loading.value = false;
					})
					.catch(() => {
						loading.value = false;
					});
			}
		});
}

// 注册
const registerFormRef = ref<FormInstance>();
const registerPasswordRef = ref<HTMLElement>();
const registerCheckPasswordRef = ref<HTMLElement>();
const registerForm = ref({
	username: '',
	captcha: '',
	password: '',
	checkPassword: ''
});
const registerRules = ref<FormRules>({
	username: [
		{
			required: true,
			trigger: 'blur',
			message: '请输入用户名'
		}
	],
	captcha: [
		{
			required: true,
			trigger: 'blur',
			message: '请输入验证码'
		}
	],
	password: [
		{
			required: true,
			trigger: 'blur',
			message: '请输入密码'
		},
		{
			min: 6,
			max: 18,
			trigger: 'blur',
			message: '密码长度为6到18位'
		}
	],
	checkPassword: [
		{
			required: true,
			trigger: 'blur',
			message: '请再次输入密码'
		},
		{
			validator: (rule, value, callback) => {
				if (value !== registerForm.value.password) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			}
		}
	]
});

function handleRegister() {
	ElMessage({
		message: '注册模块仅提供界面，无实际功能',
		type: 'warning'
	});
	registerFormRef.value &&
		registerFormRef.value.validate(valid => {
			if (valid) {
				// 这里编写业务代码
			}
		});
}

// 重置密码
const resetFormRef = ref<FormInstance>();
const resetNewPasswordRef = ref<HTMLElement>();
const resetForm = ref({
	username: getLocal('login_username') || '',
	captcha: '',
	newPassword: ''
});
const resetRules = ref<FormRules>({
	username: [
		{
			required: true,
			trigger: 'blur',
			message: '请输入用户名'
		}
	],
	captcha: [
		{
			required: true,
			trigger: 'blur',
			message: '请输入验证码'
		}
	],
	newPassword: [
		{
			required: true,
			trigger: 'blur',
			message: '请输入新密码'
		},
		{
			min: 6,
			max: 18,
			trigger: 'blur',
			message: '密码长度为6到18位'
		}
	]
});

function handleReset() {
	ElMessage({
		message: '重置密码模块仅提供界面，无实际功能',
		type: 'warning'
	});
	resetFormRef.value &&
		resetFormRef.value.validate(valid => {
			if (valid) {
				// 这里编写业务代码
			}
		});
}

function showPassword(passwordEl: HTMLElement | undefined) {
	passwordType.value = passwordType.value === 'password' ? '' : 'password';
	nextTick(() => {
		passwordEl?.focus();
	});
}

const bgThemeColor = computed(() => settingsStore.app.themeColor);
</script>

<style lang="scss" scoped>
[data-mode='mobile'] {
	#login-box {
		position: relative;
		top: 100px;
		left: inherit;
		flex-direction: column;
		justify-content: start;
		width: 100%;
		height: 100%;
		border-radius: 0;
		transform: translateX(0) translateY(0);
		.login-form {
			width: 100%;
			min-height: auto;
			padding: 30px;
			:deep(.el-input-group__append) {
				width: 130px;
				padding: 0;
				cursor: pointer;
			}
		}
	}
}
:deep(input[type='password']::-ms-reveal) {
	display: none;
}
.bg-banner {
	position: fixed;
	z-index: 0;
	width: 100%;
	height: 100%;
	background-color: var(--el-color-primary-light-8);
}
#login-box {
	position: absolute;
	top: 50%;
	left: 50%;
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	border-radius: 10px;
	transform: translateX(-50%) translateY(-50%);
	.login-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 500px;
		min-height: 500px;
		padding: 50px;
		overflow: hidden;
		:deep(.el-input-group__append) {
			width: 130px;
			padding: 0;
			cursor: pointer;
		}
		.title-container {
			position: relative;
			margin-bottom: 30px;
			.title {
				font-size: 1.3em;
				font-weight: bold;
				color: var(--el-text-color-primary);
			}
		}
	}
	.el-form-item {
		margin-bottom: 24px;
		:deep(.el-input) {
			width: 100%;
			height: 48px;
			line-height: inherit;
			input {
				height: 48px;
			}
			.el-input__prefix,
			.el-input__suffix {
				display: flex;
				align-items: center;
			}
			.el-input__prefix {
				left: 10px;
			}
			.el-input__suffix {
				right: 10px;
			}
		}
	}
	.flex-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
	}
	.sub-link {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
		font-size: 14px;
		color: var(--el-text-color-secondary);
		.text {
			margin-right: 10px;
		}
	}
}
.login-box {
	background-color: var(--el-bg-color);
}
.copyright {
	position: absolute;
	bottom: 30px;
	width: 100%;
	margin: 0;
}
</style>
