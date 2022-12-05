<template>
	<footer v-if="route.meta.copyright ?? settingsStore.copyright.enable" class="copyright">
		<span>Copyright</span>
		<span class="icon">©</span>
		<span v-if="settingsStore.copyright.dates">{{ settingsStore.copyright.dates }}</span>
	</footer>
</template>
<script lang="ts" setup name="Copyright">
import useSettingsStore from '@/store/modules/settings';

const route = useRoute();
const settingsStore = useSettingsStore();
</script>

<style lang="scss" scoped>
footer {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 32px 0 20px;
	font-size: 14px;
	color: var(--el-text-color-secondary);
	span,
	a {
		padding: 0 5px;
	}
	a {
		color: var(--el-text-color-secondary);
		text-decoration: none;
		transition: var(--el-transition-color);
		&:hover {
			color: var(--el-text-color-primary);
		}
	}
	.icon {
		padding: 0;
		font-size: 18px;
	}
}
</style>
