<template>
	<div class="">
		<div class="absolute -right-96 -top-full">
			<corner-top :start-olor="lightColor" :end-color="darkColor" />
		</div>
		<div class="absolute -left-72 -bottom-80">
			<corner-bottom :start-olor="lightColor" :end-color="darkColor" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { CornerBottom, CornerTop } from './components';

interface Props {
	/** 主题颜色 */
	themeColor?: string;
}

const props = defineProps<Props>();
const lightColor = computed(() => props.themeColor);
const darkColor = computed(() => props.themeColor);
</script>

<style scoped></style>
