<template>
<div>
  <headTop></headTop>
  <div id="view">
    <el-card class="filter" style="margin-bottom:30px">
      <div slot="header" class="clearfix">
        <span>筛选查询</span>
        <el-button
          class="caret"
          type="text"
          icon="el-icon-caret-bottom"
          @click="search=!search"
          ></el-button>
      </div>
      <el-collapse-transition>
        <div v-show="search">
          <el-form :inline="true" :model="filter">
            <el-form-item>
              <el-input v-model="filter.movie" placeholder="电影名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-cascader
                change-on-select
                size="large"  
                :options="options"
                class="province"
                v-model="filter.area">
              </el-cascader>
              <el-date-picker
                v-model="filter.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-transition>
    </el-card>
    <el-card>
      <div slot="header"  class="clearfix">
        <span>排片列表
          <span style="margin-left:50px">
            <el-button
              type="text"
              size="small"
              @click="change('all')"
              >全部排片</el-button>
            <el-button
              type="text"
              size="small"
              @click="change('等待上映')"
              >等待上映</el-button>
            <el-button
              type="text"
              size="small"
              @click="change('已结束')"
              >等待导入</el-button>
            <el-button
              type="text"
              size="small"
              @click="change('已完成')"
              >已完成</el-button>
          </span>
        </span>
        <el-button
          style="float: right; padding: 7px 8px;"
          type="primary"
          @click="newMovie=true">新增排片</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 93.3333%; font-size:15px; margin: auto">
        <el-table-column
          prop="mname"
          label="电影名称">
        </el-table-column>
        <el-table-column
          prop="cinema"
          label="影院">
        </el-table-column>
        <el-table-column
          prop="hall"
          label="影厅">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              @click="changeStatus">
              {{scope.row.status}}
            </el-button> -->
            <span v-if="scope.row.status==='已完成'">
              已完成
            </span>
            <span style="color: green"
              v-else-if="scope.row.status==='已结束'">
              已结束
            </span>
            <el-select
              v-else
              v-model="scope.row.status"
              @change="changeStatus(scope.row)">
              <el-option
                v-for="item in sOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="ptime"
          label="播放时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==='已结束'"
              type="text"
              @click="importData(scope.row)">
              导入数据
            </el-button>
            <el-button
              v-if="scope.row.status!=='已结束' && scope.row.status!=='已完成'"
              @click="newMovie=true"
              type="text"
              size="small">
              编辑
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
    title="新增排片"
    :visible.sync="newMovie">
    <el-form :model="video">
      <el-form-item label="电影名称">
        <el-autocomplete
          class="inline-input"
          v-model="video.name"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="video.time"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="影厅">
        <el-select
          filterable
          v-model="video.cinema"
          @change="postHall()"
          placeholder="请选择">
          <el-option
            v-for="item in cinemas"
            :key="item.id"
            :label="item.cinema"
            :value="item.cinema">
          </el-option>
        </el-select>
        <el-select v-model="video.hall" placeholder="请选择">
          <el-option
            v-for="item in halls"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="success"
        @click.native.prevent="postNewvideo">保存数据</el-button>
    </el-form>
  </el-dialog>
  <el-dialog
    width="50%"
    :visible="del"
    >
    <span style="">是否删除该场次？</span>
    <div class="dia">
      <span style="text-align:right">
        <el-button type="danger" @click="Dele">确定</el-button>
        <el-button @click="del=false">取消</el-button>
      </span>
    </div>
  </el-dialog>
  <el-dialog
    width="30%"
    :visible="importDia"
    title="导入数据">
    <div>
      <input type="file" ref="file" accept=".json"/>
      <el-button type="text" @click="getFile">提交</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import headTop from '@/components/headtop'
import {manageApi, hallApi} from '@/api/video'
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'

export default {
  data() {
    return {
      fileList: [],
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '下一周',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      importDia: false,
      loading:false,
      newMovie: false ,
      search: false,
      filter: {
        movie: null,
        area: [],
        time: []
      },
      param: {},
      options: provinceAndCityData,
      video: {},
      cinemas: [],
      halls: [],
      mname: [],
      data: [],
      tableData: [],
      del_id: '',
      del: false,
      sOption: [{
        value: '等待上映',
        label: '等待上映'
      },{
        value: '已结束',
        label: '已结束'
      }],
      now: {}
    } 
  },
  created() {
    this.getmovie()
    this.getCinema()
    manageApi.mname().then(response => {
      let mname = response.data
      mname.forEach((item, idx) => {
        this.mname.push(item)
      })
    })
  },
  methods: {
    getFile () {
      const file = this.$refs.file.files[0]
      let reader = new FileReader()
      reader.readAsText(file)
      let res
      let info = this.now
      reader.onload = async function(){
        let json = JSON.parse(this.result)
        let data = {
          info: info,
          data: json
        }
        manageApi.importData(data).then(res => {
          console.log(res.data)
          info.status = '已完成'
          manageApi.changeStatus(info)
          this.importDia = false
        })
      }
    },
    importData(data) {
      this.importDia = true
      this.now = data
    },
    changeStatus(data) {
      if (data.status === '导入数据') {
      } else if (data.status === '已结束'){
        let time = new Date()
        time = time.getTime()
        let ct = new Date(data.time)
        ct = ct.getTime()
        if (ct > time) {
          this.$message('请确认时间')
          data.status = '等待上映'
        } else {
          manageApi.changeStatus(data)
          this.$message('修改成功')
        }
      } else {
          manageApi.changeStatus(data)
          this.$message('修改成功')
      }
    },
    getCinema() {
      hallApi.getCinema('所有').then(res => {
        this.cinemas = res.data
      })
    },
    postHall() {
      let id = {cinema: this.video.cinema}
      hallApi.postHall(id).then(res => {
        this.halls = res.data
      })
    },
    Dele() {
      let Id = this.del_id
      manageApi.postDel({Id: Id}).then( response => {
        this.$message('删除成功')
        this.del = false
      }).catch(err => {
        this.$message('失败')
      })
      .then(
        this.tableData=[],
        this.loading=true)
      .then(setTimeout(() => {
        this.getmovie(),
        this.loading=false
      },1000))
    },
    getmovie() {
      manageApi.getmovie(this.param).then(response => {
        let m = response.data
        m.forEach( item => {
          let now = new Date()
          let dt = new Date(item.ptime)
          let timecheck
          now.getTime() > dt.getTime() ? timecheck = true : timecheck = false
          if (timecheck && item.status !== '已结束' && now.getTime() < dt.getTime() + 120 * 60 * 1000) item.status = '正在播放'
          if (timecheck && item.status === '等待上映') item.status = '已结束' 
          let y = dt.getFullYear()
          let m = (dt.getMonth()+1<10?'0'+(dt.getMonth()+1):dt.getMonth()+1)
          let d = dt.getDate()
          let h = dt.getHours()
          let min = dt.getSeconds()
          item.time = item.ptime
          item.ptime = y + '-' + m + '-' + d + ' ' + h + ':' + min
        })
        this.data = m
        this.tableData = m
      })
    },
    Delete(index, rows) {
      this.del_id = rows[index]._id
      this.del = true
    },
    postNewvideo(){
      let tt = new Date()
      let checktime = tt.getTime() -   24 * 3 * 60 * 60000
      let nm = this.video
      nm.time = nm.time.getTime()
      manageApi.postMovie(nm).then(response => {
        this.newMovie = false
        this.tableData = []
        this.loading = true
      }).then(setTimeout(() => {
        this.getmovie(),
        this.loading=false
      },1000))
      console.log(nm)
    },
    querySearch(queryString, cb) {
      var mname = this.mname;
      var results = queryString ? mname.filter(this.createFilter(queryString)) : mname;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    change(data) {
      const origin = this.data
      if (data === 'all') this.getmovie()
      else {
        this.tableData = []
        origin.forEach(item => {
          if (item.status === data) {
            this.tableData.push(item)
          }
        })
      }
    },
    onSubmit(){
      this.param = {}
      
      if (this.filter.movie) this.param.movie = this.filter.movie
      if (this.filter.area[0]) this.param.province = CodeToText[this.filter.area[0]]
      if (this.filter.area[1]) this.param.city = CodeToText[this.filter.area[1]]
      if (this.filter.time) {
        this.param.star = this.filter.time[0]
        this.param.end = this.filter.time[1]
      }
      if (this.param !== []) this.param.search = 1
      this.getmovie()
    }
  },
  components: {
    headTop
  }
}

</script>
