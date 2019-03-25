<template>
<el-menu background-color="#8e354a" text-color="#fff" active-text-color="#ffd04b" :default-active="activeIndex" class="headtop" mode="horizontal" @select="handleSelect">
  <el-menu-item>admin</el-menu-item>
  <el-menu-item disabled >消息中心</el-menu-item>
</el-menu>
</template>

<script>

</script>
<style>
.el-menu--horizontal>.el-menu-item {
  float: right
}
.headtop .el-menu-item{
  font-size: 20px;
}
</style>

