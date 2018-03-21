## usage

```sh
sudo docker run --name sshd -d \
  -e pass='root' \
  -p 233:22 \
  shynome/sshd-alpine 
```

## ssh test

```sh
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p 233 root@localhost
```
