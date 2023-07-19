<template>
	<div>
		<canvas ref="verify" :width="width" :height="height" @click="handleDraw"></canvas>
	</div>
</template>

<script lang="ts" name="ImgVerify">
import { ref } from 'vue';
import { setVerify } from '@/hooks/useVerify';
export default {
	setup(props: any, con: any) {
		const verify = ref(null);
		return {
			...setVerify(verify)
		};
	}
};
</script>
