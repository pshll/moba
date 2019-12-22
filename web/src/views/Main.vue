<template>
	<div>
		<div class="topbar bg-black py-3 px-3 text-white d-flex ai-center jc-between">
			<img src="../assets/img/dota2.home.logo.png" height="25" alt="">
			<button type="button" class="btn bg-primary">立即下载</button>
		</div>
		<div class="bg-primary py-2 pb-1">
			<div class="nav nav-inverse jc-around pb-1">
				<div class="nav-item active">
					<router-link class="nav-link" tag="div" to="/">首页</router-link>
				</div>
				<div class="nav-item">
					<router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
				</div>
				<div class="nav-item">
					<router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
				</div>
			</div>
		</div>

		<router-view></router-view>
	</div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style lang="scss" scoped>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>