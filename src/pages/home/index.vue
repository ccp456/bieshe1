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
        <div class="inline item"><span>{{ns}}</span>新增场次</div>
        <div class="inline item"><span>{{nw}}</span>新观众</div>
        <div class="inline item"><span>{{nd}}</span>售出票数</div>
      </div>
      <div class="inline" style="width:49%; height:100%; overflow:hidden">
        <div class="card-title">总数据</div>
        <div class="inline item"><span>{{as}}</span>总场次</div>
        <div class="inline item"><span>{{aw}}</span>总观众</div>
        <div class="inline item"><span>{{ad}}</span>总出票数</div>
      </div>
    </div>
    <div class="chart card">
      <el-row style="padding: 50px">
      </el-row>
      <!-- <div style="display: inline-block; width: 100%">
        <chart style="width: 400px" ref="chart1" :options="orgOptions"></chart>
        <chart  style="width: 300px; float:right"  ref="chart2" :options="coc"></chart>
      </div> -->
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
      coc: {
        title: {text: '近一月每场观众占比'},
        tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data:['女性','男性','空位']
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
            ]
          }
        ]
      },
      orgOptions: {
        title:{text: '五天观众增长'},
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {data:['总观众', '男', '女']},
        xAxis: {type: 'category', boundaryGap : false},
        yAxis: {type: 'value'},
        series: [{
          name: '总观众',
          data: [],
          type: 'line',
          smooth: true
        },
        {
          name: '男',
          data: [],
          type: 'line',
          smooth: true
        },
        {
          name: '女',
          data: [],
          type: 'line',
          smooth: true
        }]
      },
      newmovie: 'newmovie',
      news: 'new',
      reviews: [],
      newmovies: [],
      aw: [],
      nw: [],
      as: [],
      ns: [],
      ad: [],
      nd: []
    }
  },
  components: {
    headTop
  },
  methods: {
  },
  mounted() {},
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
    }),
    homeApi.getWatch().then(response => {
      // console.log(response.data)
      let ad = response.data.audience
      this.aw = ad.aw
      this.nw = ad.nw

      let ss = response.data.session
      this.as = ss.as
      this.ns = ss.ns

      let sd = response.data.sold
      this.nd = sd.nd
      this.ad = sd.ad

      let d5 = response.data.day5
      let d5f = response.data.day5f
      let d5m = response.data.day5m
      let coc = response.data.coc
      console.log(coc);
      

      console.log(this.orgOptions.series)
      d5.forEach( (item, idx) => {
        this.orgOptions.series[0].data.push(item)
      })
      d5f.forEach( (item, idx) => {
        this.orgOptions.series[1].data.push(item)
      })
      d5m.forEach( (item, idx) => {
        this.orgOptions.series[2].data.push(item)
      })
      coc.forEach( (item, idx) => {
        this.coc.series[0].data.push(item)
      })
    }).catch(error => {
      console.error
    })
  }
}
</script>
<style>
@import url('./css/main.css');
</style>

