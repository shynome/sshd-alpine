#!/bin/sh

if [ ! $pass ] ; then
  echo "environment required: \`pass\`  "
  exit 1
fi

echo "root:${pass}" | chpasswd

# generate host keys if not present
ssh-keygen -A

# do not detach (-D), log to stderr (-e), passthrough other arguments
exec /usr/sbin/sshd -D -e "$@"