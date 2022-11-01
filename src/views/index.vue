<route lang="yaml">
name: dashboard
meta:
title: 控制台
</route>

<script lang="ts" setup>
const elegantStartkitInfo = ref({
	feature: [
		'支持 TypeScript',
		'默认集成 vue-router 和 pinia',
		'全局 SCSS 资源引入',
		'全局组件自动注册',
		'支持 SVG 图标，CSS 精灵图自动合成',
		'支持 mock 数据，可摆脱后端束缚独立开发',
		'支持 gzip / brotli 优化项目体积，提高加载速度',
		'结合 IDE 插件、ESlint 、stylelint 、Git 钩子，轻松实现团队代码规范'
	]
});
</script>

<template>
	<div>
		<page-header title="欢迎使用 Elegant-admin">
			<template #content>
				<div>
					<div style="margin-bottom: 5px">
						这是一款<b class="text-emphasis">开箱即用</b
						>的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护
					</div>
					<div>注：在作者就职的公司，本框架已在电商、直播、OA、ERP等多个不同领域的中后台系统中应用并稳定运行</div>
				</div>
			</template>
		</page-header>
		<page-main title="">
			<div class="question">
				<ol class="answer">
					<li v-for="(item, index) in elegantStartkitInfo.feature" :key="index">
						{{ item }}
					</li>
				</ol>
			</div>
		</page-main>
	</div>
</template>

<style lang="scss" scoped>
.text-emphasis {
	text-emphasis-style: '❤';
}
.ecology {
	padding: 10px 0 0;
	&.vue {
		h1 {
			color: #41b883;
		}
	}
	&.fa {
		h1 {
			color: #e60000;
		}
	}
	&.osa {
		h1 {
			color: #67c23a;
		}
	}
	.main {
		text-align: center;
		img {
			display: block;
			margin: 0 auto;
		}
		h1 {
			margin: 10px auto 0;
			text-align: center;
		}
		h2 {
			font-size: 16px;
			font-weight: normal;
			color: var(--el-text-color-secondary);
			text-align: center;
		}
	}
	.el-carousel {
		box-shadow: var(--el-box-shadow-light);
		transition: var(--el-transition-box-shadow);
	}
	ul li {
		line-height: 28px;
	}
}
.question {
	.answer {
		padding-left: 20px;
		margin: 20px 0 0;
		font-size: 16px;
		color: var(--el-text-color-secondary);
		li {
			margin-bottom: 10px;
			line-height: 1.5;
			&:last-child {
				margin-bottom: 0;
			}
		}
		span {
			font-weight: bold;
			color: var(--el-text-color-primary);
		}
	}
}
</style>
