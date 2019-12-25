<template>
	<div class="card bg-white p-3 mt-2">
		<div class="card-header d-flex ai-center pb-3">
			<i class="iconfont" :class="`icon-${icon}`"></i>
			<div class="fs-xl flex-1 px-1 title">{{title}}</div>

			<i class="iconfont icon-menu1" v-if="!plain"></i>
		</div>
		<div class="card-body pt-3">
			<slot></slot>
		</div>
	</div>
</template>

<script>
    export default {
        name: "Card",
        props: {
            title: {type: String, required: true,},
            icon: {type: String, required: true,},
            plain: {type: Boolean},
        }
    }
</script>

<style lang="scss" scoped>
	@import '../assets/css/variables.scss';

	.card {
		border-bottom: 1px solid $border-color;

		.card-header {
			border-bottom: 1px solid $border-color;

			.title {
				font-weight: bold;
			}
		}
	}
</style>