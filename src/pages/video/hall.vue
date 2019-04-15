<template>
<div class="frame">
  <headTop></headTop>
  <div id="view">
    <el-card>
      <div slot="header"  class="clearfix">
        <span>影院列表--{{area}}</span>
        <el-button
          style="float: right; padding: 7px 8px;"
          type="primary"
          @click="newCinema=true">新增影院</el-button>
      </div>
      <div style="margin-bottom:20px">
        <el-button
          plain
          @click="changeArea('所有')">所有</el-button>
        <el-button
          plain
          @click="changeArea('华东')">华东</el-button>
        <el-button
          plain
          @click="changeArea('华南')">华南</el-button>
        <el-button
          plain
          @click="changeArea('华中')">华中</el-button>
        <el-button
          plain
          @click="changeArea('东北')">东北</el-button>
        <el-button
          plain
          @click="changeArea('西南')">西南</el-button>
        <el-button
          plain
          @click="changeArea('西北')">西北</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 93.3333%; font-size:18px; margin: auto">
        <el-table-column
          prop="id"
          label="影院编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cinema"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click="hallInfo(scope.$index, tableData)"
              type="text"
              size="small">
              影厅详情
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="Delete(scope.$index, tableData)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <el-dialog
    width="30%"
    :visible="hallEdit">
  </el-dialog>
  <el-dialog
    width="30%"
    :visible="del">
    <span style="font-size:20px;">是否删除该ID为{{del_id}}的影院？</span>
    <div class="dia">
      <span style="text-align:right">
        <el-button type="danger" @click="Dele">确定</el-button>
        <el-button @click="del=false">取消</el-button>
      </span>
    </div>
    </el-dialog>
  <el-dialog
    title="新增影院"
    :visible.sync="newCinema">
    <el-form :model="cinema">
      <el-form-item label="影院名称">
        <el-input v-model="cinema.name"></el-input>
      </el-form-item>
      <el-form-item inline="true" label="影院地址">
        <el-cascader
          size="large"
          :options="options"
          class="province"
          v-model="cinema.province">
        </el-cascader>
        <el-input
          v-model="cinema.address"
          style="width:300px"></el-input>
      </el-form-item>
      <el-button type="success"
        @click.native.prevent="postNewCinema">保存数据</el-button>
    </el-form>
  </el-dialog>
  <!-- 影厅 -->
  <el-dialog title="影厅详情" :visible.sync="hInfo">
    <el-table
      @selection-change="selectChange"
      v-loading="loading"
      :data="hallData">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="影厅">
      </el-table-column>
      <el-table-column
        prop="seat"
        label="座位">
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="delhall()">删除</el-button>
      <el-button type="primary" @click="nhall=true">新增</el-button>
    </div>
    <el-dialog
      width="30%"
      title="新增影厅"
      :visible.sync="nhall"
      append-to-body>
      <el-form :model="hform">
        <el-form-item label="影厅名">
          <el-input v-model="hform.name"></el-input>
        </el-form-item>
        <span>座位</span>
        <el-slider
          :max="500"
          v-model="hform.seat"
          show-input>
        </el-slider>
        <el-button type="primary" @click="postNewHall()">新增</el-button>
      </el-form>
    </el-dialog>
  </el-dialog>
</div>
</template>
<script>
import headTop from '@/components/headtop'
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import { hallApi } from '@/api/video'

export default {
  data() {
    return {
      hform: {},
      nhall: false,
      hallData: [],
      hInfo: false,
      area: '所有',
      hallEdit: false,
      options: regionData,
      loading: false,
      del: false,
      del_id: '',
      newCinema: false,
      tableData: [],
      cinema: {},
      cinemaHall: '',
      hall: [],
      cinema_id: ''
    }
  },
  created() {
    this.getCinema()
  },
  methods: {
    postNewHall() {
      let data = {
        name: this.hform.name,
        seat: this.hform.seat,
        belong: this.cinema_id.id
      }
      hallApi.postNewHall(data).then(res => {
        this.$message('成功')
      }).then(() => {
        this.postHall()
        this.nhall = false
      })
    },
    changeArea(data) {
      this.area = data
      this.getCinema()
    },
    hallInfo(index, rows) {
      this.cinema_id = {id: rows[index].id}
      this.postHall()
    },
    delhall() {
      let hall = this.hallSelect
      this.loading = true
      hallApi.delHall(hall)
      this.$message('删除成功')
      setTimeout(() => {
        this.postHall()
        this.loading = false
      }, 1000)
    },
    selectChange(val) {
      this.hallSelect = val;
      console.log(this.hallSelect)
    },
    postHall() {
      hallApi.postHall(this.cinema_id).then(res => {
        this.hallData = res.data
      }).then(() => {
        this.hInfo = true
      })
    },
    postNewCinema() {
      let cinema = this.cinema
      let p = CodeToText[cinema.province[0]]
      let c = CodeToText[cinema.province[1]]
      if (c === '市辖区') c = CodeToText[cinema.province[0]]
      let t = CodeToText[cinema.province[2]]
      let data = {
        cinema: cinema.name,
        province: p,
        city: c,
        address: p + c + t + cinema.address,
        area: '华东'
      }
      hallApi.postNewCinema(data).then( response => {
        this.$message('成功添加')
        this.tableData=[]
        this.loading=true
      }).then(setTimeout(() => {
        this.getCinema(),
        this.loading=false
      },1000))
    },
    getCinema() {
      let area = this.area
      hallApi.getCinema(area).then( response => {
        this.tableData = response.data
      })
    },
    Dele() {
      let Id = this.del_id
      hallApi.postDel({id: Id}).then( response => {
        this.$message('删除成功')
        this.del = false
      }).catch(err => {
        this.$message('失败')
      })
      .then(
        this.tableData = [],
        this.loading = true)
      .then(setTimeout(() => {
        this.getCinema()
        this.newCinema = false
        this.loading = false
      },1000))
    },
    Delete(index, rows) {
      this.del_id = rows[index].id
      this.del = true
    }
  },
  components: {
    headTop
  }
}
</script>
