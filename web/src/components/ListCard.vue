<template>
	<card :icon="icon" :title="title">
		<div class="nav jc-between">
			<div
			class="nav-item" :class="{active: activeIndex === index}"
			v-for="(category,index) in categories" :key="index"
			@click="$refs.list.swiper.slideTo(index)">
				<div class="nav-link">{{category.name}}</div>
			</div>
		</div>
		<swiper
		class="mt-3" ref="list" :options="{autoHeight: true}"
		@slide-change="() => activeIndex = $refs.list.swiper.realIndex">
			<swiper-slide v-for="(category,index) in categories" :key="index">
				<slot name="items" :category="category"></slot>
			</swiper-slide>
		</swiper>
	</card>
</template>

<script>
    import Card from "./Card";

    export default {
        name: "ListCard",
        components: {
            Card
        },
        data() {
            return {
                activeIndex: 0,
            }
        },
        props: {
            icon: {type: String, required: true},
            title: {type: String, required: true},
            categories: {type: Array, required: true},
        },
    }
</script>

<style scoped>

</style>