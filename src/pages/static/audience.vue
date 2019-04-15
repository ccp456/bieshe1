<template>
<div>
  <headTop></headTop>
  <div id="static">
    <el-card>
      <div slot="header"  class="clearfix">
        <span>概况</span>
      </div>
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
    </el-card>
  </div>
</div>
</template>
<script>
import headTop from '@/components/headtop'
import echarts from 'echarts'
import {status} from '@/api/status'

export default {
  data() {
    return {
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
            {value:Math.round(Math.random()*100), name:'小飞象'},
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
            {value:35, name:'小飞象'},
            {value:30, name:'祈祷落幕时'},
            {value:234, name:'我的宠物是大象'},
            {value:15, name:'调音师'},
            {value:14, name:'虫林大作战'},
            {value:18, name:'反贪风暴4'},
            {value:148, name:'比悲伤更悲伤的故事'},
            {value:148, name:'最佳男友进化论'},
            {value:154, name:'欲念游戏'},
            {value:54, name:'雷霆沙赞！'},
            {value:18, name:'老师·好'},
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
            {value:Math.round(Math.random()*100), name:'小飞象'},
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
            {value:Math.round(Math.random()*100), name:'小飞象'},
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
            {value:Math.round(Math.random()*100), name:'小飞象'},
            {value:3110, name:'祈祷落幕时'},
            {value:234, name:'我的宠物是大象'},
            {value:155, name:'调音师'},
            {value:144, name:'虫林大作战'},
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
      sell: {
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
              Math.round(Math.random()*100),
              6,
              34,
              7,
              Math.round(Math.random()*100),
              67,
              11,
              54,
              Math.round(Math.random()*100),
              Math.round(Math.random()*100),
              Math.round(Math.random()*100),
              11 
            ],
            [ 
              '华东',
              Math.round(Math.random()*100),
              85,
              21,
              12,
              Math.round(Math.random()*100),
              67,
              11,
              54,
              Math.round(Math.random()*100),
              Math.round(Math.random()*100),
              Math.round(Math.random()*100),
              11 
            ],
            [ 
              '华南',
              Math.round(Math.random()*100),
              64,
              23,
              1,
              Math.round(Math.random()*100),
              23,
              11,
              54,
              Math.round(Math.random()*100),
              Math.round(Math.random()*100),
              Math.round(Math.random()*100),
              11 
            ],
            [ 
              '华北',
              Math.round(Math.random()*100),
              2,
              7,
              9,
              Math.round(Math.random()*100),
              67,
              11,
              54,
              Math.round(Math.random()*100),
              Math.round(Math.random()*100),
              Math.round(Math.random()*100),
              11 
            ],
            [ 
              '东北',
              Math.round(Math.random()*100),
              44,
              16,
              34,
              Math.round(Math.random()*100),
              34,
              11,
              54,
              14,
              Math.round(Math.random()*100),
              Math.round(Math.random()*100),
              11 
            ],
            [ 
              '西南',
              Math.round(Math.random()*100),
              44,
              16,
              34,
              Math.round(Math.random()*100),
              14,
              11,
              44,
              14,
              24,
              13,
              11 
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
      status.postSell({area: this.area}).then(res => {
        console.log(res)
      })
    }
  },
  components: {
    headTop
  }
}

</script>
