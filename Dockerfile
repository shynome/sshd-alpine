FROM alpine
EXPOSE 22
ENTRYPOINT ["/entrypoint.sh"]
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
  && apk add --no-cache openssh \
  && sed -i s/#PermitRootLogin.*/PermitRootLogin\ yes/ /etc/ssh/sshd_config \
  && echo "use env pass to set user:pass"
COPY /rootfs /
RUN chown -R root:root /root/.ssh