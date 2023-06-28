<template>
	<div class="layout">
		<router-view v-slot="{ Component, route }">
			<component :is="Component" :key="route.fullPath" />
		</router-view>
	</div>
</template>
<script lang="ts" setup name="PagesLayout"></script>

<style lang="scss" scoped></style>
