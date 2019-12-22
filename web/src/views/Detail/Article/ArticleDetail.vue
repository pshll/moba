<template>
	<div class="page-article" v-if="model">
		<div class="d-flex px-2 py-3 ai-center">
			<div class="iconfont icon-back"></div>
			<strong class="flex-1 text-ellipsis text-blue pl-1 pt-1">{{model.title}}</strong>
			<div class="text-grey fs-xs">
				2019-12-18
			</div>
		</div>
		<div v-html="model.body" class="px-3 fs-lg article-body border-top"></div>
		<div class="border-top">
			<div class="my-3 d-flex ai-center">
				<i class="iconfont icon-menu pl-2"></i>
				<strong class="text-blue pl-1">相关资讯</strong>
			</div>
			<div>
				<router-link
				tag="div" :to="`/articles/${item._id}`"
				class="py-2 pl-3 text-ellipsis"
				v-for="item in model.related" :key="item._id">
					{{item.title}}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "ArticleDetail",
        props: {
            id: {required: true}
        },
        data() {
            return {
                model: null
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`/articles/${this.id}`)
                this.model = res.data
            }
        },
        watch: {
            id() {
                this.fetch()
            }
        },
        created() {
            this.fetch();
        }
    }
</script>

<style lang="scss" scoped>
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
</style>