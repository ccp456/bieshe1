<template>
<div style="height: 100%; overflow: auto;">
  <headTop></headTop>
  <div class="view">
    <div class="news card">
      <el-tabs v-model="news">
        <el-tab-pane label="影评" name="new">
          <div class="news-title" v-for="review in reviews" :key="review.title">
            <a :href="review.href">{{ review.title }}</a>
          </div>
          <a class="more" href="#">更多</a>
        </el-tab-pane>
        <el-tab-pane label="国内电影" name="update">
          <a class="news-title" href="#">【升级】3月26日新BGP高防系统升级通知 </a>
        </el-tab-pane>
        <el-tab-pane label="国外电影" name="save">
          <a class="news-title" href="#">【漏洞预警】Apache Solr 7.0 反序列化远程代码执行漏洞</a>
        </el-tab-pane>
        <el-tab-pane label="其他" name="other">
          <a class="news-title" href="#">【其它】关于深化增值税改革有关政策的通知</a>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="newmovie card">
      <el-tabs v-model="newmovie">
        <el-tab-pane label="新电影" name="newmovie">
          <div class="newmovie" v-for="nm in newmovies" :key="nm.title" style="display: flex; border-bottom:1px #ccc solid">
            <img :src="nm.img" style="height:80px; float:left; padding-right:10px">
            <div style="padding-left: 5px">
              <div><span style="text-overflow: ellipsis;">《{{ nm.title }}》</span><span style="font-size: 10px">{{ nm.release }}</span><span style="color: red; float: right; font-size:10px">豆瓣评分：{{ nm.rate }}</span></div>
              <div style="font-size:13px; padding: 5px 10px">
                <div>导演：{{ nm.director }}</div>
                <div>主演：{{ nm.actors }}</div>
                <div>国家：{{ nm.region }}</div>
              </div>
            </div>
          </div>
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
        <div class="inline item"><span>{{nw}}</span>新观众</div>
        <div class="inline item"><span>3</span>售出票数</div>
      </div>
      <div class="inline" style="width:49%; height:100%; overflow:hidden">
        <div class="card-title">总数据</div>
        <div class="inline item"><span>3</span>总场次</div>
        <div class="inline item"><span>{{aw}}</span>总观众</div>
        <div class="inline item"><span>3</span>总出票数</div>
      </div>
    </div>
    <div class="chart card">
      <div class="card-title">数据</div>
      <div style="height:600px">
        <chart  ref="chart1" :options="orgOptions" id="mchart"  :auto-resize="true"></chart>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import headTop from '@/components/headtop'
import echarts from 'echarts'
import {homeApi, crawApi} from '@/api/home'

export default {
  data() {
    return {
      orgOptions: {},
      newmovie: 'newmovie',
      news: 'new',
      reviews: [],
      newmovies: [],
      aw: [],
      nw: []
    }
  },
  components: {
    headTop
  },
  methods: {
  },
  mounted() {
    this.orgOptions = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }]
    }
  },
  created() {
    // this.echart(),
    crawApi.getReview().then(response => {
      // console.log(response)
      this.reviews = response.data
    }).catch(error => {
      console.error
    }),
    crawApi.getNewmovie().then(response => {
      // console.log(response)
      this.newmovies = response.data
    }).catch(error => {
      console.error
    })
    homeApi.getWatch().then(response => {
      // console.log(response.data)
      this.aw = response.data.aw
      this.nw = response.data.nw
    }).catch(error => {
      console.error
    })
  }
}
</script>
<style>
@import url('./css/main.css');
</style>

