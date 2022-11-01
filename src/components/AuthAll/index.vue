<template>
	<div>
		<slot v-if="check()" />
		<slot v-else name="no-auth" />
	</div>
</template>
<script lang="ts" setup name="AuthAll">
const props = defineProps<{
	value: string[];
}>();

function check() {
	return useAuth().authAll(props.value);
}
</script>
