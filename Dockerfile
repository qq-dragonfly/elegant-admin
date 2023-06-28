# 设置基础镜像
FROM nginx:1.18.0
# 屏蔽掉nginx版本号
COPY nginx.conf /etc/nginx/
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
