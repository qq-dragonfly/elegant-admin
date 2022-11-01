<route lang="yaml">
meta:
enabled: false
</route>

<script setup lang="ts" name="dragDirect"></script>

<template>
	<page-main>
		<div class="card content-box">
			<span class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</span>
			<div v-draggable class="drag-box flx-center">我可以拖拽哦~</div>
		</div>
	</page-main>
</template>

<style scoped lang="scss">
.content-box {
	position: relative;
	height: 500px;
	.drag-box {
		position: absolute;
		top: 110px;
		width: 300px;
		height: 300px;
		font-size: 23px;
		font-weight: bold;
		color: rgb(46 127 138);
		background: #b8d2dd;
		border-radius: 50%;
	}
}
</style>
