<template>
	<div>
		<canvas ref="verify" :width="width" :height="height" @click="handleDraw"></canvas>
	</div>
</template>

<script>
import { ref } from 'vue';
import { setVerify } from '@/hooks/useVerify';
export default {
	setup(props, con) {
		const verify = ref(null);
		return {
			...setVerify(verify)
		};
	}
};
</script>
