<template>
	<router-link :to="to" class="title" :class="{ 'is-link': settingsStore.home.enable }" :title="title">
		<img v-if="showLogo" :src="logo" class="logo" alt="" />
		<span v-if="showTitle" class="text-xl">{{ title }}</span>
	</router-link>
</template>
<script lang="ts" setup name="Logo">
import imgLogo from '@/assets/images/logo.png';
import useSettingsStore from '@/store/modules/settings';

defineProps({
	showLogo: {
		type: Boolean,
		default: true
	},
	showTitle: {
		type: Boolean,
		default: true
	}
});

const settingsStore = useSettingsStore();

const title = ref(import.meta.env.VITE_APP_TITLE);
const logo = ref(imgLogo);

const to = computed(() => {
	const rtn: {
		name?: string;
	} = {};
	if (settingsStore.home.enable) {
		rtn.name = 'dashboard';
	}
	return rtn;
});
</script>

<style lang="scss" scoped>
.title {
	position: fixed;
	top: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	width: inherit;
	height: var(--g-sidebar-logo-height);
	padding: 0 10px;
	overflow: hidden;
	text-align: center;
	text-decoration: none;
	&.is-link {
		cursor: pointer;
	}
	.logo {
		width: 30px;
		height: 30px;
		border-radius: 5px;
		& + span {
			margin-left: 10px;
		}
	}
	span {
		display: block;
		font-size: 20px;
		font-weight: bold;
		color: var(--g-title-color);

		@include text-overflow;
	}
}
</style>
