<template>
<div>
  <headTop></headTop>
  <div id="view">
    <el-card>
      <div slot="header"  class="clearfix">
        <span style="line-height:40px">销售渠道</span>
        <div style="float: right">
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
          <el-col :span="6"></el-col>
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
            prop="offline"
            label="线下销量"></el-table-column>
          <el-table-column
            prop="active"
            label="活动销量"></el-table-column>
          <el-table-column
            prop="alipay"
            label="支付宝销量"></el-table-column>
          <el-table-column
            prop="active"
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
      movie:{
        title: {
          text: '所有地区统计图',
          x: 'left',
          y: 'top'
        },
        legend: {
          data: {}
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'bar'
        }]
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
        this.tableData = data
        let x = []
        data.forEach(item => {
          if (item._id.length >= 10) x.push(item._id.substr(0,10) + '...')
          else x.push(item._id)
        })
        this.movie.xAxis.data = x
        console.log(this.movie.xAxis.data)
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
