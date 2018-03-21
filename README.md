## usage

```sh
sudo docker run --name sshd -d \
  -e user='root:root' \
  -p 233:22 \
  shynome/sshd-alpine 
```

