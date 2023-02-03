### 用法

### 示例

```html
<file-upload
	:files="files"
	action="https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/file"
	@on-success="handleSuccess3"
/>
```

```js
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
const files = ref([]);

const handleSuccess3: UploadProps['onSuccess'] = (res, file, fileList) => {
	if (res.error === '') {
		files.value.push({
			name: file.name,
			url: res.error === '' ? res.data.path : ''
		});
	} else {
		fileList.pop();
		ElMessage.warning(res.error);
	}
};
```
