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
