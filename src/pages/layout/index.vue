<template>
	<div class="manage_page fillcontain">
		<el-row style="height:100%; ">
	  		<el-col :span="4"  style="height: 100%; background-color: #d05a6e;">
				<el-menu
					background-color="#d05a6e"
					text-color="#fff"
					:default-active="defaultActive"
					style="min-height: 100%; width: 16.66667%; position: fixed;"
					theme="dark"
					router>
					<el-menu-item index="home"><i class="el-icon-menu"></i>影院总览</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>销售统计</template>
						<el-menu-item index="audience">销售统计</el-menu-item>
						<el-menu-item index="tag">销售渠道</el-menu-item>
						<el-menu-item index="channel">影院销量</el-menu-item>
						<!-- <el-menu-item index="national">全国统计</el-menu-item> -->
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>影片管理</template>
						<el-menu-item index="hall">影厅管理</el-menu-item>
						<el-menu-item index="manage">排片管理</el-menu-item>
						<!-- <el-menu-item index="salestatic">销售统计</el-menu-item> -->
					</el-submenu>
					<!-- <el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>线上营销</template>
						<el-menu-item index="onactive">活动管理</el-menu-item>
						<el-menu-item index="message">短信营销</el-menu-item>
						<el-menu-item index="wechat">微信营销</el-menu-item>
						<el-menu-item index="onout">活动支出</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>线下营销</template>
						<el-menu-item index="offactive">活动管理</el-menu-item>
						<el-menu-item index="offout">活动支出</el-menu-item>
					</el-submenu> -->
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;">
				<el-scrollbar>
					<keep-alive>
							<router-view></router-view>
					</keep-alive>
				</el-scrollbar>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	computed: {
		defaultActive: function () {
			return this.$route.path.replace('/', '')
		}
	}
}
</script>

<style>
.el-submenu .el-menu-item{
	min-width: unset;
}
</style>
