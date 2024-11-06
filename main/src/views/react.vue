<template>
  <div class="react">
    <micro-app name='react' url='http://localhost:8888/' :data='data'>
      <!-- destroy inline -->
    </micro-app>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const data = ref({ from: '来自基座的初始化数据' })
</script>

<style></style>
