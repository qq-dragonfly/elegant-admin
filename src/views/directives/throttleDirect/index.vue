<script setup lang="ts" name="throttleDirect">
import { ElMessage } from 'element-plus';
const throttleClick = () => {
	ElMessage.success('我是节流按钮触发的事件 🍍🍓🍌');
};
</script>

<template>
	<page-main>
		<div class="card content-box">
			<span class="text">节流指令 🍇🍇🍇🍓🍓🍓</span>
			<el-button v-throttle="throttleClick" type="primary"> 节流按钮 (每隔1S秒后执行) </el-button>
		</div>
	</page-main>
</template>

<style scoped lang="scss">
.content-box {
	position: relative;
	height: 500px;
}
</style>
