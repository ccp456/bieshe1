<template>
<div class="frame">
  <headTop></headTop>
  <div id="view">
    <el-card>
      <div slot="header"  class="clearfix">
        <span>影厅列表</span>
        <el-button
          style="float: right; padding: 7px 8px;"
          type="primary"
          @click="newHall=true">新增影厅</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 93.3333%; font-size:18px; margin: auto">
        <el-table-column
          prop="_id"
          label="影厅编号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名字"
          width="250">
        </el-table-column>
        <el-table-column
          prop="seat"
          label="座位"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建时间"
          width="230">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              @click="newHall=true"
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
    width="30%"
    :visible="del">
    <span style="">是否删除该ID为{{del_id}}的影厅？</span>
    <div class="dia">
      <span style="text-align:right">
        <el-button type="danger" @click="Dele">确定</el-button>
        <el-button @click="del=false">取消</el-button>
      </span>
    </div>
    </el-dialog>
  <el-dialog
    title="新增影厅"
    :visible.sync="newHall">
    <el-form :model="hall">
      <el-form-item label="影厅名称">
        <el-input v-model="hall.name"></el-input>
      </el-form-item>
      <el-form-item label="影厅座位">
        <el-input v-model="hall.seat"></el-input>
      </el-form-item>
      <el-button type="success"
        @click.native.prevent="postNewHall">保存数据</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import headTop from '@/components/headtop'
import { hallApi } from '@/api/video'

export default {
  data() {
    return {
      loading: false,
      del: false,
      del_id: '',
      newHall: false,
      tableData: [],
      hall: {
        name: '',
        seat: ''
      }
    }
  },
  created() {
    this.gethall()
  },
  methods: {
    Dele() {
      let Id = this.del_id
      hallApi.postDel({Id: Id}).then( response => {
        this.$message('删除成功')
        this.del = false
      }).catch(err => {
        this.$message('失败')
      })
      .then(
        this.tableData=[],
        this.loading=true)
      .then(setTimeout(() => {
        this.gethall(),
        this.loading=false
      },1000))
    },
    gethall() {
      hallApi.getHall().then( response => {
        let hall = response.data
        hall.forEach( item => {
          let dt = new Date(item.createtime)
          let y = dt.getFullYear()
          let m = (dt.getMonth()+1<10?'0'+(dt.getMonth()+1):dt.getMonth()+1)-1
          let d = dt.getDate()
          item.createtime = y + '年' + m + '月' + d + '日'
          this.tableData.push(item)
        })
      })
    },
    Delete(index, rows) {
      this.del_id = rows[index]._id
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
      })
    }
  },
  components: {
    headTop
  }
}

</script>
