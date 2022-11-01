<route lang="yaml">
meta:
  enabled: false
</route>

<template>
	<page-main>
		<router-link :to="{ name: 'breadcrumbExampleDetail2' }">
			<el-link type="primary">查看详情页</el-link>
		</router-link>
	</page-main>
</template>
