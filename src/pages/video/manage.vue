<template>
<div>
  <headTop></headTop>
  <div class="view">
    <el-card>
      <div :slot="header">
      </div>
    </el-card>
    <el-card>
      
    </el-card>
  </div>
</div>
</template>
<script>
import headTop from '@/components/headtop'

export default {
  components: {
    headTop
  }
}

</script>
