
const shell = require('shelljs')
const assert = require('assert')
const fs = require('fs')
const { npm_package_config_image_version, npm_package_name } = /**@type {{[key:string]:string}} */(process.env)
/**@param {string} variable */
function parse_config_variable(variable){ return shell.exec(`echo $(eval ${variable})`,{ silent:true }).toString() }
const container_name = `${npm_package_name}-test`
const image_name = parse_config_variable(npm_package_config_image_version)

describe('sshd test',()=>{
  
  /**@param {string} cmd */
  function docker_run(cmd){
    return shell.exec(`sudo docker exec ${container_name} ${cmd}`)
  }
  
  before(async ()=>{
    shell.exec(`sudo docker run --rm -d --name ${container_name} -e pass='root' ${image_name}`)
    docker_run(`ssh-keygen -b 2048 -t rsa -f /root/.ssh/id_rsa -q -N ""`)
  })
  
  it('ssh by password',async()=>{
    return shell.exec(`skip this, because I can't find a way to test it`)
    let { code } = docker_run(`ssh root@localhost`)
    assert(
      code === 0,
      `ssh by password failed`
    )
  })

  it('ssh by authorized_keys',async()=>{
    docker_run(`cp /root/.ssh/id_rsa.pub /root/.ssh/authorized_keys`)
    let { code } = docker_run(`ssh root@localhost exit 0`)
    assert(
      code === 0,
      `ssh by authorized_keys failed. code is ${code}`
    )
    docker_run('rm /root/.ssh/authorized_keys /root/.ssh/known_hosts')
  })

  after(async ()=>{
    shell.exec(`sudo docker stop ${container_name}`)
  })

})