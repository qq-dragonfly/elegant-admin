### 用法

### 示例

```html
<image-upload
	v-model:url="image"
	action="https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/image"
	name="image"
	:width="250"
	:height="150"
	@on-success="handleSuccess1"
/>
```

```js
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
const image = ref('');
const handleSuccess1: UploadProps['onSuccess'] = res => {
	if (res.error === '') {
		image.value = res.data.path;
	} else {
		ElMessage.warning(res.error);
	}
};
```
