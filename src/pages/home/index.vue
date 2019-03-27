<template>
<div style="height: 100%; overflow: auto;">
  <headTop></headTop>
  <div class="view">
    <div class="news card">
      <el-tabs v-model="news">
        <el-tab-pane label="影评" name="new">
          <a class="news-title" href="#">【漏洞预警】Jenkins Script Security Plugin Sandbox再次被绕过漏洞</a>
          <a class="news-title" href="#">【漏洞预警】Jenkins Script Security Plugin Sandbox再次被绕过漏洞</a>
          <a class="news-title" href="#">【漏洞预警】Jenkins Script Security Plugin Sandbox再次被绕过漏洞</a>
          <a class="news-title" href="#">【漏洞预警】Jenkins Script Security Plugin Sandbox再次被绕过漏洞</a>
          <a class="more" href="#">更多</a>
        </el-tab-pane>
        <el-tab-pane label="国内电影" name="update">
          <a class="news-title" href="#">【升级】3月26日新BGP高防系统升级通知 </a>
        </el-tab-pane>
        <el-tab-pane label="国外电影" name="save">
          <a class="news-title" href="#">【漏洞预警】Apache Solr < 7.0 反序列化远程代码执行漏洞</a>
        </el-tab-pane>
        <el-tab-pane label="其他" name="other">
          <a class="news-title" href="#">【其它】关于深化增值税改革有关政策的通知</a>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="newmovie card">
      <el-tabs v-model="newmovie">
        <el-tab-pane label="新电影" name="newmovie">
        </el-tab-pane>
        <el-tab-pane label="当日票房" name="piaofang">
        </el-tab-pane>
        <el-tab-pane label="当日排片" name="paipian">
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="audience card">
      <div class="inline" style="width:50%; height:100%; overflow:hidden">
        <div class="card-title">当日数据</div>
        <div class="inline item"><span>3</span>新增场次</div>
        <div class="inline item"><span>3</span>新观众</div>
        <div class="inline item"><span>3</span>售出票数</div>
      </div>
      <div class="inline" style="width:49%; height:100%; overflow:hidden">
        <div class="card-title">总数据</div>
        <div class="inline item"><span>3</span>总场次</div>
        <div class="inline item"><span>3</span>总观众</div>
        <div class="inline item"><span>3</span>总出票数</div>
      </div>
    </div>
    <div class="chart card">3</div>
  </div>
</div>
</template>
<script>
import headTop from '@/components/headtop'
import '@/api/home'

export default {
  data() {
    return {
      newmovie: 'newmovie',
      news: 'new'
    }
  },
  components: {
    headTop
  },
  methods: {
  },
  beforecreated: {
    craw() {
      crawApi.getReview().then(response => {
        console.log(response)
      }).catch(error => {
        console.error
      })
    }
  }
}

</script>
<style>
@import url('./css/main.css');
</style>

