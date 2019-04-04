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
          @click="newHall=true">新增排片</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 93.3333%; font-size:18px; margin: auto">
        <el-table-column
          prop="_id"
          label="排片编号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="name"
          label="电影名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="time"
          label="播放时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="创建时间"
          width="230">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
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
</div>
</template>
<script>
import headTop from '@/components/headtop'

export default {
  data() {
    return {
      search: false,
      filter: ['1'],
      filterForm: {
        message: '',
        role: '',
        department: ''
      }
    } 
  },
  components: {
    headTop
  }
}

</script>
