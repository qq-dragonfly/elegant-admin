### 用法
1、在 Iconfont 下载需要的 svg 图标

2、将 svg 文件放入 ./src/assets/icons 目录下，文件名即为 name

### 示例
```html
<el-icon>
	<svg-icon name="example-emotion-line" :flip="flip" :rotate="rotate" />
</el-icon>
```

```js
const flip = ref<'horizontal' | 'vertical' | 'both' | ''>('');
const rotate = ref(0);
```
