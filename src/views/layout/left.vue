<template>
  <div class="left-wrap">
    <div
      :class="{ item: true, item_active: menu.path === route.path }"
      v-for="menu in menuList"
      :key="menu.text"
      @click="routerPush(menu)"
    >
      {{ menu.text }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const menuList: { text: string; path: string }[] = [
  {
    text: '主系统-关于',
    path: '/about'
  },
  {
    text: 'vue3--1号-子系统-路由one',
    path: '/childPath/one'
  },
  {
    text: 'vue3--1号-子系统-路由two',
    path: '/childPath/two'
  }
]
const routerPush = ({ path }: { text: string; path: string }) => {
  router.push({ path })
}
</script>
<style scoped lang="less">
.left-wrap {
  .item {
    height: 32px;
    line-height: 32px;
    padding-left: 16px;
    cursor: pointer;
    &.item_active {
      color: #0050ff;
    }
  }
}
</style>
