<template>
<div class="frame">
  <headTop></headTop>
  <div id="view">
    <el-card>
      <div slot="header"  class="clearfix">
        <span>影院列表</span>
        <el-button
          style="float: right; padding: 7px 8px;"
          type="primary"
          @click="newCinema=true">新增影院</el-button>
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
              @click="cHall(scope.$index, tableData)"
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
</div>
</template>
<script>
import headTop from '@/components/headtop'
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import { hallApi } from '@/api/video'

export default {
  data() {
    return {
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
      hall_id: ''
    }
  },
  created() {
    this.getCinema()
  },
  methods: {
    cHall(index, rows) {
      this.hall_id = {id: rows[index].id}
      this.postHall()
    },
    postHall() {
      hallApi.postHall(this.hall_id).then(response => {
        this.hall = ctx
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
      console.log(data)
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
      hallApi.getCinema().then( response => {
        console.log(response.data)
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
        this.tableData=[],
        this.loading=true)
      .then(setTimeout(() => {
        this.getCinema(),
        this.loading=false
      },1000))
    },
    Delete(index, rows) {
      this.del_id = rows[index].id
      this.del = true
    },
    postNewHall() {
      let nhall = this.hall
      hallApi.postNewHall(nhall).then( response => {
        let hall = response.data
        let dt = new Date(hall.createtime)
        let y = dt.getFullYear()
        let m = (dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1) - 1
        let d = dt.getDate()
        hall.createtime = y + '年' + m + '月' + d + '日'
        this.tableData.push(hall)
      }).then( this.newHall = false)
    }
  },
  components: {
    headTop
  }
}

</script>
