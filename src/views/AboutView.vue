<template>
  <div class="about">
    <!-- 
      name(必传)：应用名称
      url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
     -->
    <!-- iframe不加会报错----Cannot use import statement outside a module -->
    <micro-app
      :name="appName"
      :data="data"
      @datachange="dataChange"
      url="http://127.0.0.1:4321/child-base/"
      iframe
    ></micro-app>
  </div>
</template>
<script lang="ts" setup>
import renamedMicroApp from '@micro-zoe/micro-app'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const appName = 'child-app'
const data = ref({
  msg: '我是主系统通过data属性传给子系统的值',
  path: route.path
})

const dataChange = (v: any) => {
  console.log('通过datachange事件获取子应用的数据')
  console.log(v.detail.data)
}

renamedMicroApp.addDataListener(appName, () => {
  console.log('监听来自子应用的数据', data.value)
})

watch(
  () => route.path,
  () => {
    if (route.path.startsWith('/childPath/')) {
      console.log('主应用发送路由变化通知', route.path)
      renamedMicroApp.setData(appName, { path: route.path })
    }
  },
  {
    immediate: true
  }
)
</script>
<style>
.about {
  display: flex;
  align-items: center;
}
</style>
