import setupExtend from 'vite-plugin-vue-setup-extend';
// 使用setup语法带来的第一个问题就是无法自定义name，
// 而我们使用keep-alive往往是需要name的，解决这个问题通常是通过写两个script标签来解决
//这时候借助本插件可以让我们更优雅的解决这个问题，不用写两个script标签，可以直接在script标签上定义name
export default function createSetupExtend() {
	return setupExtend();
}
