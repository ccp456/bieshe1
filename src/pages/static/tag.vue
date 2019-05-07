<template>
<div>
  <headTop></headTop>
  <div id="view">
    <el-card>
      <div slot="header"  class="clearfix">
        <span style="line-height:40px">销售渠道</span>
        <div style="float: right">
          <span>选择地区</span>
          <el-select v-model="area" @change="clear('city')">
            <el-option :key="1" :value="'华南'" :label="'华南'"></el-option>
            <el-option :key="2" :value="'华中'" :label="'华中'"></el-option>
            <el-option :key="3" :value="'华东'" :label="'华东'"></el-option>
            <el-option :key="4" :value="'华东'" :label="'华东'"></el-option>
            <el-option :key="5" :value="'华北'" :label="'华北'"></el-option>
            <el-option :key="6" :value="'西南'" :label="'西南'"></el-option>
            <el-option :key="7" :value="'东北'" :label="'东北'"></el-option>
          </el-select>
          <el-cascader
            @change="clear('area')"
            change-on-select
            size="large"
            :options="options"
            class="province"
            v-model="chartfilter">
          </el-cascader>
          <el-button @click="filter()">筛选</el-button>
        </div>
      </div>
      <div style="height: 300px">
        <el-row>
          <el-col :span="18">
            <chart
              :options="movie"
              ref="chart1"
              style="width: 100%; height:400px"></chart>
          </el-col>
          <el-col :span="6">
            <chart
              :options="bussi"
              ref="chart1"
              style="width: 100%; height:400px"></chart>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width:100%">
          <el-table-column
            prop="_id"
            label="电影"
            width="330"></el-table-column>
          <el-table-column
            prop="paipian"
            label="排片量"></el-table-column>
          <el-table-column
            prop="sum"
            label="总销量"></el-table-column>
          <el-table-column
            prop="offline"
            label="线下销量"></el-table-column>
          <el-table-column
            prop="active"
            label="活动销量"></el-table-column>
          <el-table-column
            prop="alipay"
            label="支付宝销量"></el-table-column>
          <el-table-column
            prop="maoyan"
            label="猫眼电影销量"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                @click="showChart(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</div>
</template>
<script>
import {status} from '@/api/status'
import echarts from 'echarts'
import headTop from '@/components/headtop'
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'

export default {
  data() {
    return {
      bussi: {
        title: {
          text: '销售渠道',
          x: 'right',
          y: 'top'
        },
        legend: {
          data: ['淘票票', '猫眼电影', '活动', '线下'],
          orient: 'vertical',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
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
            data: [
              {value: 0, name: '淘票票'},
              {value: 0, name: '猫眼电影'},
              {value: 0, name: '活动'},
              {value: 0, name: '线下'}
            ]
          }
        ]
      }
      ,
      movie:{
        title: {
          text: '所有地区统计图',
          x: 'left',
          y: 'top'
        },
        tooltip : {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['淘票票', '猫眼电影', '活动', '线下']
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '淘票票',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '猫眼电影',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '活动',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '线下',
            type: 'bar',
            stack: '总量',
            data: []
          },
        ]
      },
      tableData: [],
      area: '',
      chartfilter: [],
      options: provinceAndCityData,
      params:{area: 'all'}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    showChart(data) {},
    getData() {
      this.tableData = []
      status.getMovie(this.params).then(res => {
        const data = res.data
        data.forEach(item => {
          item.sum = item.alipay + item.maoyan + item.offline + item.active
        })
        this.tableData = data
        let pie = this.bussi.series[0].data
        data.forEach(item => {
          if (item._id.length >= 10) this.movie.xAxis.data.push(item._id.substr(0,10) + '...')
          else this.movie.xAxis.data.push(item._id)
          this.movie.series[0].data.push(item.alipay)
          this.movie.series[1].data.push(item.maoyan)
          this.movie.series[2].data.push(item.active)
          this.movie.series[3].data.push(item.offline)
          pie[0].value += item.alipay
          pie[1].value += item.maoyan
          pie[2].value += item.active
          pie[3].value += item.offline
        })
        console.log(pie)
      })
    },
    getParams() {
      if (this.area) {
        this.params = {}
        this.params.area = this.area
      } else {
        this.params = {}
        let p = CodeToText[this.chartfilter[0]]
        let c = CodeToText[this.chartfilter[1]]
        if (c === '市辖区') c = CodeToText[this.chartfilter[0]]
        let t = CodeToText[this.chartfilter[2]]
        if (p) this.params.province = p
        if (c) this.params.city = c
        if (t) this.params.town = t
      }
      console.log(this.params)
    },
    clear(data) {
      if (data === 'city') this.chartfilter = []
      if (data === 'area') this.area = ''
    },
    filter() {
      this.getParams()
      this.getData()
      // console.log(this.chartfilter)
    }
  },
  components: {
    headTop
  }
}

</script>
