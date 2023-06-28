<template>
	<div class="header py-3 px-4 mb-2.5 relative flex justify-between items-center">
		<div class="main">
			<div class="title font-medium flex items-center mb-2.5">
				<el-icon>
					<svg-icon name="local-page_grid" />
				</el-icon>
				<span class="ml-2">{{ title }}</span>
			</div>
			<div class="content">
				<slot name="content">
					{{ content }}
				</slot>
			</div>
		</div>
		<div class="sub">
			<slot />
		</div>
	</div>
</template>
<script lang="ts" setup name="PageHeader">
defineProps({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		default: ''
	}
});
</script>

<style lang="scss" scoped>
.header {
	background-color: var(--g-app-bg);
	transition: background-color 0.3s;
	.main {
		flex: 1;
		.title {
			font-size: 16px;
			color: var(--el-text-color-primary);
			transition: var(--el-transition-color);
		}
		.content {
			font-size: 14px;
			color: var(--el-text-color-secondary);
			transition: var(--el-transition-color);
			&:empty {
				display: none;
			}
		}
	}
	.sub {
		flex: none;
	}
}
</style>
