<template>
	<div>
		<swiper :options="swiperOption">
			<swiper-slide>
				<img src="../../assets/img/dota2.home.logo.png">
			</swiper-slide>
			<swiper-slide>
				<img src="../../assets/img/dota2.home.logo.png">
			</swiper-slide>
			<swiper-slide>
				<img src="../../assets/img/dota2.home.logo.png">
			</swiper-slide>
			<div
			class="swiper-pagination pagination-home text-right"
			slot="pagination"></div>
		</swiper>
		<!--	END of swiper	-->

		<div class="nav-icons bg-white mt-2 text-center pt-3 text-dark-1">
			<div class="d-flex flex-warp">
				<div
				class="nav-item mb-3"
				v-for="i in 10" :key="i">
					<i class="sprite sprite-news"></i>
					<div class="py-2">新闻</div>
				</div>
			</div>
			<div class="bg-light py-2 fs-lg d-flex ai-center jc-center">
				<i class="sprite sprite-arrow mr-1"></i>
				<span>收起</span>
			</div>
		</div>
		<!--	END of nav icon	-->

		<list-card icon="news" title="官方新闻" :categories="newsCats">
			<template #items="{category}">
				<router-link
				tag="div" :to="`/articles/${item._id}`"
				class="py-2 fs-xs d-flex"
				v-for="(item,index) in category.newsList" :key="index">
					<span class="text-info">{{item.categoryName}}</span>
					<span class="px-2">|</span>
					<span class="flex-1 text-dark text-ellipsis mr-2">{{item.title}}</span>
					<span>{{item.createdAt | date}}</span>
				</router-link>
			</template>
		</list-card>

		<list-card icon="card-hero" title="英雄列表" :categories="heroCats">
			<template #items="{category}">
				<div class="d-flex flex-warp jc-around" style="margin: 0 -0.5rem">
					<router-link
					tag="div" :to="`/heroes/${item._id}`"
					style="width: 20%;box-sizing: border-box;"
					class="p-2 text-center fs-xs" v-for="(item,index) in category.heroList" :key="index">
						<img :src="item.avatar" alt="" style="width: 4.385rem;height: 4.385rem;border-radius: .3rem">
						<div>{{item.name}}</div>
					</router-link>
				</div>
			</template>
		</list-card>


	</div>
</template>

<script>
    import ListCard from "../../components/ListCard";

    import dayjs from "dayjs"

    export default {
        name: "Home",
        filters: {
            date(value){
                return dayjs(value).format('MM/DD')
            }
        },
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.pagination-home',
                        clickable: true,
                    },
                    loop: true,
                },
                newsCats: [],
                heroCats: [],
            };
        },
        components: {
            ListCard,
        },
        methods: {
            async fetchNewsCats() {
                const res = await this.$http.get('/news/list')
                this.newsCats = res.data
            },
            async fetchHeroCats() {
                const res = await this.$http.get('/heroes/list')
                this.heroCats = res.data
            }
        },
        created() {
            this.fetchNewsCats();
            this.fetchHeroCats();
        }
    }
</script>

<style lang="scss" scoped>
	@import "../../assets/css/variables";

	.pagination-home {
		::v-deep .swiper-pagination-bullet {
			opacity: 1;
			border-radius: .1538rem;
			background: map_get($colors, 'white');

			&.swiper-pagination-bullet-active {
				background: map_get($colors, 'info');
			}
		}
	}

	.nav-icons {
		border-top: 1px solid $border-color;
		border-bottom: 1px solid $border-color;

		.nav-item {
			width: 25%;
			border-left: 1px solid $border-color;
			box-sizing: border-box;

			&:nth-child(4n+1) {
				border-left: none;
			}
		}
	}
</style>