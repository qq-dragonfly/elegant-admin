### 用法

### 示例

```html
<images-upload
	v-model:url="images"
	action="https://console-mock.apipost.cn/app/mock/project/1f50f1da-5189-4282-d3c7-c133a514c5a8/upload/image"
	name="image"
	@on-success="handleSuccess2"
/>
```

```js
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
const images = ref([]);

const handleSuccess2: UploadProps['onSuccess'] = res => {
  if (res.error === '') {
    images.value.push(res.data.path);
  } else {
    ElMessage.warning(res.error);
  }
};
```
