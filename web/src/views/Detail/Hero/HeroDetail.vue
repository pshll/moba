<template>
	<div class="page-hero" v-if="model">
		<div class="topbar bg-black py-3 px-3 text-white d-flex ai-center jc-between">
			<img src="../../../assets/img/dota2.home.logo.png" height="25" alt="">
			<router-link to="/" tag="div">更多英雄 &gt;</router-link>
		</div>
		<h1>{{model.name}}</h1>
	</div>
</template>

<script>
    export default {
        name: "HeroDetail",
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