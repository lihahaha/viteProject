FROM registry.cn-zhangjiakou.aliyuncs.com/yunli_mid_platform/busybox:latest

# 以docker-componse.yml中build的context指定的目录为根
COPY build /opt/nginx/web
