<template>
<div>
  <headTop></headTop>
  <div id="static">
    <el-card>
      <div slot="header"  class="clearfix">
        <span>概况</span>
      </div>
      <div v-if="be">
        <chart :options="sell" ref="chart1" style="width: 100%; height:400px"></chart>
        <el-row>
          <el-col :span="4">
            <chart :options="huadong" ref="chart1" style="width: 100%; height:300px"></chart>
          </el-col>
          <el-col :span="4">
            <chart :options="huazhong" ref="chart1" style="width: 100%; height:300px"></chart>
          </el-col>
          <el-col :span="4">
            <chart :options="dongbei" ref="chart1" style="width: 100%; height:300px"></chart>
          </el-col>
          <el-col :span="4">
            <chart :options="huanan" ref="chart1" style="width: 100%; height:300px"></chart>
          </el-col>
          <el-col :span="4">
            <chart :options="xinan" ref="chart1" style="width: 100%; height:300px"></chart>
          </el-col>
          <el-col :span="4">
            <chart :options="huabei" ref="chart1" style="width: 100%; height:300px"></chart>
          </el-col>
        </el-row>
      </div>
      <div v-else>无数据</div>
    </el-card>
  </div>
</div>
</template>
<script>
import headTop from '@/components/headtop'
import echarts from 'echarts'
import axios from 'axios'
import {status} from '@/api/status'

export default {
  data() {
    return {
      times: 0,
      be: false,
      area: '所有',
      huadong: {
        title: {text: '华东', x: 'center', y: 'bottom'},
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [{
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:Math.round(Math.random()*1000), name:'小飞象'},
            {value:310, name:'祈祷落幕时'},
            {value:234, name:'我的宠物是大象'},
            {value:135, name:'调音师'},
            {value:14, name:'虫林大作战'},
            {value:1548, name:'反贪风暴4'},
            {value:148, name:'比悲伤更悲伤的故事'},
            {value:148, name:'最佳男友进化论'},
            {value:154, name:'欲念游戏'},
            {value:154, name:'雷霆沙赞！'},
            {value:548, name:'老师·好'},
            {value:158, name:'在乎你'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      dongbei: {
        title: {text: '东北', x: 'center', y: 'bottom'},
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [{
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000),
            Math.round(Math.random()*1000)
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      xinan: {
        title: {text: '西南', x: 'center', y: 'bottom'},
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [{
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:Math.round(Math.random()*1000), name:'小飞象'},
            {value:30, name:'祈祷落幕时'},
            {value:24, name:'我的宠物是大象'},
            {value:135, name:'调音师'},
            {value:14, name:'虫林大作战'},
            {value:118, name:'反贪风暴4'},
            {value:8, name:'比悲伤更悲伤的故事'},
            {value:48, name:'最佳男友进化论'},
            {value:54, name:'欲念游戏'},
            {value:14, name:'雷霆沙赞！'},
            {value:55, name:'老师·好'},
            {value:58, name:'在乎你'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      huabei: {
        title: {text: '华北', x: 'center', y: 'bottom'},
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [{
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:Math.round(Math.random()*1000), name:'小飞象'},
            {value:510, name:'祈祷落幕时'},
            {value:234, name:'我的宠物是大象'},
            {value:135, name:'调音师'},
            {value:114, name:'虫林大作战'},
            {value:584, name:'反贪风暴4'},
            {value:148, name:'比悲伤更悲伤的故事'},
            {value:148, name:'最佳男友进化论'},
            {value:254, name:'欲念游戏'},
            {value:114, name:'雷霆沙赞！'},
            {value:548, name:'老师·好'},
            {value:158, name:'在乎你'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      huanan: {
        title: {text: '华南', x: 'center', y: 'bottom'},
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [{
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:55, name:'小飞象'},
            {value:70, name:'祈祷落幕时'},
            {value:24, name:'我的宠物是大象'},
            {value:135, name:'调音师'},
            {value:14, name:'虫林大作战'},
            {value:84, name:'反贪风暴4'},
            {value:18, name:'比悲伤更悲伤的故事'},
            {value:148, name:'最佳男友进化论'},
            {value:154, name:'欲念游戏'},
            {value:144, name:'雷霆沙赞！'},
            {value:78, name:'老师·好'},
            {value:158, name:'在乎你'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      huazhong: {
        title: {text: '华中', x: 'center', y: 'bottom'},
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [{
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:Math.round(Math.random()*1000), name:'小飞象'},
            {value:Math.round(Math.random()*1000), name:'祈祷落幕时'},
            {value:Math.round(Math.random()*1000), name:'我的宠物是大象'},
            {value:Math.round(Math.random()*1000), name:'调音师'},
            {value:Math.round(Math.random()*1000), name:'虫林大作战'},
            {value:Math.round(Math.random()*1000), name:'反贪风暴4'},
            {value:Math.round(Math.random()*1000), name:'比悲伤更悲伤的故事'},
            {value:Math.round(Math.random()*1000), name:'最佳男友进化论'},
            {value:Math.round(Math.random()*1000), name:'欲念游戏'},
            {value:Math.round(Math.random()*1000), name:'雷霆沙赞！'},
            {value:Math.round(Math.random()*1000), name:'老师·好'},
            {value:Math.round(Math.random()*1000), name:'在乎你'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      sell: {
        times: '100',
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            [ 
              'movie',
              '小飞象',
              '祈祷落幕时',
              '我的宠物是大象',
              '调音师',
              '虫林大作战',
              '反贪风暴4',
              '比悲伤更悲伤的故事',
              '最佳男友进化论',
              '欲念游戏',
              '雷霆沙赞！',
              '老师·好',
              '在乎你' 
            ],
            [ 
              '华中',
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000) 
            ],
            [ 
              '华东',
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000) 
            ],
            [ 
              '华南',
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000) 
            ],
            [ 
              '华北',
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000) 
            ],
            [ 
              '东北',
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000)
            ],
            [ 
              '西南',
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000),
              Math.round(Math.random()*1000) 
            ],
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'},
        ]
      }
    }
  },
  created() {
    this.getSell()
  }
  ,
  methods: {
    getSell() {
      status.postSell().then(res => {
        console.log(res)
        if (res.data) this.be = true
      })
    }
  },
  components: {
    headTop
  }
}

</script>
