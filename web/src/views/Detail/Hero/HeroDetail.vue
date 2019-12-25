<template>
	<div class="page-hero" v-if="model">
		<div class="topbar bg-black py-3 px-3 text-white d-flex ai-center jc-between">
			<img src="../../../assets/img/dota2.home.logo.png" height="25" alt="">
			<router-link to="/" tag="div">更多英雄 &gt;</router-link>
		</div>
		<!--	enf of topbar	-->
		<div class="top" :style="{'background-image': `url(${model.banner})`}">
			<div class="info d-flex flex-colunm h-100 jc-end text-white p-3">
				<div class="fs-xs">{{model.nickName}}</div>
				<h2 class="my-2">{{model.name}}</h2>
				<div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
				<div class="d-flex jc-between pt-2">
					<div v-if="model.scores" class="scores">
						<span>难度</span>
						<span class="badge bg-info">{{model.scores.difficult}}</span>
						<span>技能</span>
						<span class="badge bg-blue">{{model.scores.skill}}</span>
						<span>爆发</span>
						<span class="badge bg-danger">{{model.scores.burst}}</span>
						<span>生存</span>
						<span class="badge bg-light-1">{{model.scores.survive}}</span>
					</div>
					<router-link to="/" tag="span" class="text-grey">
						至宝: 0 &gt;
					</router-link>
				</div>
			</div>
		</div>
		<!--	end of top	-->
		<div>
			<div class="px-3 bg-white">
				<div class="nav d-flex jc-around mt-1 py-2 border-bottom">
					<div class="nav-item active">
						<div class="nav-link">英雄初识</div>
					</div>
					<div class="nav-item">
						<div class="nav-link">进阶攻略</div>
					</div>
				</div>
			</div>
			<swiper>
				<swiper-slide>
					<div>
						<div class="p-3 bg-white border-bottom">
							<div class="d-flex ai-center">
								<router-link to="/" tag="button" class="btn btn-lg flex-1">
									<i class="iconfont icon-menu text-info pl-4"></i>
									<span class="ml-1 flex-1 fs-lg">英雄简介</span>
								</router-link>
								<router-link to="/" tag="button" class="btn btn-lg flex-1">
									<i class="iconfont icon-menu text-info"></i>
									<span class="ml-2 flex-1 fs-lg text-center">一图识英雄</span>
								</router-link>
							</div>

							<!--	skills	-->
							<div class="skills bg-white mt-3">
								<div class="d-flex jc-around">
									<img
									class="skill-icon"
									@click="currentSkillIndex = index"
									:class="{active: currentSkillIndex === index}"
									:src="item.icon"
									v-for="(item,index) in model.skills" :key="item.name"
									width="50" height="50">
								</div>
								<div v-if="currentSkill">
									<div class="d-flex pt-4 mb-2">
										<h3 class="m-0">{{currentSkill.name}}</h3>
										<span class="text-grey-1 ml-4">
											(冷却值: {{currentSkill.delay}} 消耗: {{currentSkill.cost}})
										</span>
									</div>
									<p>{{currentSkill.description}}</p>
									<div v-if="currentSkill.tips">
										<div class="border-bottom"></div>
										<p class="text-grey">小提示: {{currentSkill.tips}}</p>
									</div>

								</div>
							</div>
							<!--	end of skills	-->
						</div>

						<!--	equipment	-->
						<card plain icon="menu" title="出装推荐" class="hero-equipments">
							<div class="equipment-title fs-xl">出门装</div>
							<div class="d-flex text-center pt-3 pb-2 border-bottom">
								<div
								class="equipment-info d-flex flex-colunm"
								v-for="item in model.openingEquipments" :key="item.name">
									<img :src="item.icon" class="icon">
									<span class="pt-1 fs-xs">{{item.name}}</span>
								</div>
							</div>
							<div class="equipment-title fs-xl mt-2">核心装备</div>
							<div class="d-flex text-center pt-3 pb-2 border-bottom">
								<div
								class="equipment-info d-flex flex-colunm"
								v-for="item in model.coreEquipments" :key="item.name">
									<img :src="item.icon" class="icon">
									<span class="pt-1 fs-xs">{{item.name}}</span>
								</div>
							</div>
							<div class="equipment-title fs-xl mt-2">后期神装</div>
							<div class="d-flex text-center pt-3 pb-2 border-bottom">
								<div
								class="equipment-info d-flex flex-colunm"
								v-for="item in model.finalEquipments" :key="item.name">
									<img :src="item.icon" class="icon">
									<span class="pt-1 fs-xs">{{item.name}}</span>
								</div>
							</div>
						</card>
						<!--	end of equipment	-->

						<!--	useTips	-->
						<card plain icon="menu" title="使用技巧">
							<p class="m-0">{{model.useTips}}</p>
						</card>
						<card plain icon="menu" title="团战思路">
							<p class="m-0">{{model.battleTips}}</p>
						</card>
						<!--	end of useTips	-->

						<!--	hero-relationship	-->
						<card plain icon="menu" title="英雄关系">
							<div class="fs-xl pb-2">最佳队友</div>
							<div class="d-flex flex-warp border-bottom">
								<div
								v-for="item in model.partners" :key="item._id"
								style="width: 20%;box-sizing: border-box;"
								class="p-2 text-center fs-xs">
									<img
									:src="item.avatar" alt=""
									style="width: 4.385rem;height: 4.385rem;border-radius: .3rem">
									<div>{{item.name}}</div>
								</div>
							</div>

							<div class="fs-xl pb-2 pt-3">被克制</div>
							<div class="d-flex flex-warp">
								<div
								v-for="item in model.counters" :key="item._id"
								style="width: 20%;box-sizing: border-box;"
								class="p-2 text-center fs-xs">
									<img
									:src="item.avatar" alt=""
									style="width: 4.385rem;height: 4.385rem;border-radius: .3rem">
									<div>{{item.name}}</div>
								</div>
							</div>
						</card>
						<!--	end of hero-relationship	-->

					</div>
				</swiper-slide>
				<swiper-slide></swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
    import Card from "../../../components/Card";

    export default {
        name: "HeroDetail",
        props: {
            id: {required: true}
        },
        components: {
            Card
        },
        data() {
            return {
                model: null,
                currentSkillIndex: 0,
            }
        },
        computed: {
            currentSkill() {
                return this.model.skills[this.currentSkillIndex]
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`/heroes/${this.id}`)
                this.model = res.data
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style lang="scss" scoped>
	@import '../../../assets/css/variables';

	.page-article {
		.icon-back {
			font-size: 1.538rem;
		}

		::v-deep .article-body {
			img {
				max-width: 100%;
				height: auto;
			}

			iframe {
				width: 100%;
				height: auto;
			}
		}
	}

	.page-hero {
		.top {
			height: 60vw;
			background: #fff no-repeat top center;
			background-size: auto 100%;

			.info {
				height: 100%;
				box-sizing: border-box;
				background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

				.scores {
					.badge {
						margin: 0 .25rem;
						display: inline-block;
						width: 1rem;
						height: 1rem;
						line-height: 1.1rem;
						border-radius: 50%;
						text-align: center;
						font-size: 0.2rem;
						border: 1px solid rgba(255, 255, 255, .1);
					}
				}
			}
		}

		.skills {
			img.skill-icon {
				width: 4.615rem; // 60px
				height: 4.615rem; // 60px
				border: 3px solid map_get($colors, 'white');
				border-radius: 50%;

				&.active {
					border: 3px solid map_get($colors, 'blue');
				}
			}
		}

		.hero-equipments {
			.equipment-title {
				font-weight: 600;
			}

			.equipment-info {
				box-sizing: border-box;
				width: 17%;
			}

			img.icon {
				width: 3.077rem;
				height: 3.077rem;
				border-radius: 50%;
				margin: 0 auto;
			}
		}

	}
</style>