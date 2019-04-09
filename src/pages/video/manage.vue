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
                <el-input placeholder="登录账号/员工姓名/手机号" v-model="filter.message">
                  <template slot="prepend">员工信息</template>
                </el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="filter.department" placeholder="员工所在部门">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="filter.role" placeholder="员工角色">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
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
        <span>排片列表</span>
        <el-button
          style="float: right; padding: 7px 8px;"
          type="primary"
          @click="newMovie=true">新增排片</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 93.3333%; font-size:18px; margin: auto">
        <el-table-column
          prop="mname"
          label="电影名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="hall"
          label="影厅"
          width="250">
        </el-table-column>
        <el-table-column
          prop="ptime"
          label="播放时间"
          width="420">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
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
        <el-select v-model="video.hall" placeholder="请选择">
          <el-option
            v-for="item in halls"
            :key="item._id"
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
    width="30%"
    :visible="del">
    <span style="">是否删除该场次？</span>
    <div class="dia">
      <span style="text-align:right">
        <el-button type="danger" @click="Dele">确定</el-button>
        <el-button @click="del=false">取消</el-button>
      </span>
    </div>
    </el-dialog>
</div>
</template>
<script>
import headTop from '@/components/headtop'
import {manageApi} from '@/api/video'

export default {
  data() {
    return {
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
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      loading:false,
      newMovie: false ,
      search: false,
      filter: ['1'],
      filterForm: {
        message: '',
        role: '',
        department: ''
      },
      video: {
        name: '',
        time: '',
        hall: ''
      },
      halls: [],
      mname: [],
      tableData: [],
      del_id: '',
      del: false,
    } 
  },
  created() {
    this.getmovie()
    manageApi.getHall().then(response => {
      let hall = response.data
      hall.forEach((item, idx) => {
        this.halls.push(item)
      })
    }),
    manageApi.mname().then(response => {
      let mname = response.data
      mname.forEach((item, idx) => {
        this.mname.push(item)
      })
      console.log(this.mname)
    })
  },
  methods: {
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
      manageApi.getmovie().then(response => {
        let m = response.data
        m.forEach( item => {
          let dt = new Date(item.ptime)
          let y = dt.getFullYear()
          let m = (dt.getMonth()+1<10?'0'+(dt.getMonth()+1):dt.getMonth()+1)
          let d = dt.getDate()
          let h = dt.getHours()
          let min = dt.getSeconds()
          item.ptime = y + '年' + m + '月' + d + '日' + h + '点' + min + '分'
          this.tableData.push(item) 
        })
      })
    },
    Delete(index, rows) {
      this.del_id = rows[index]._id
      this.del = true
    },
    postNewvideo(){
      let nm = this.video
      manageApi.postMovie(nm).then(response => {
        this.newMovie = false
        this.tableData = []
        this.loading = true
      }).then(setTimeout(() => {
        this.getmovie(),
        this.loading=false
      },1000))
    },
    querySearch(queryString, cb) {
      var mname = this.mname;
      var results = queryString ? mname.filter(this.createFilter(queryString)) : mname;
      // 调用 callback 返回建议列表的数据
      cb(results);
    }
  },
  components: {
    headTop
  }
}

</script>
