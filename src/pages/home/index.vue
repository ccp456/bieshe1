<template>
<div style="height: 100%; overflow: auto;">
  <headTop></headTop>
  <div class="view">
    <div class="news card">
      <el-tabs v-model="news" @tab-click="newsClick">
        <el-tab-pane label="最新公告" name="new">
          <a class="news-title" href="#">【漏洞预警】Jenkins Script Security Plugin Sandbox再次被绕过漏洞</a>
        </el-tab-pane>
        <el-tab-pane label="升级" name="update">
          <a class="news-title" href="#">【升级】3月26日新BGP高防系统升级通知 </a>
        </el-tab-pane>
        <el-tab-pane label="安全" name="save">
          <a class="news-title" href="#">【漏洞预警】Apache Solr < 7.0 反序列化远程代码执行漏洞</a>
        </el-tab-pane>
        <el-tab-pane label="其他" name="other">
          <a class="news-title" href="#">【其它】关于深化增值税改革有关政策的通知</a>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="newmovie card">
      <div></div>
    </div>
    <div class="audience card">2</div>
    <div class="chart card">3</div>
  </div>
</div>
</template>
<script>
import headTop from '@/components/headtop'

export default {
  data() {
    return {
      news: 'new'
    }
  },
  components: {
    headTop
  },
  methods: {
    newsClick(tab, event) {
      console.log(tab, event)
    }
  }
}

</script>
<style>
@import url('./css/main.css');
</style>

