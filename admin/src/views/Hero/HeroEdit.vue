<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}英雄</h1>
		<el-form label-width="80px" @submit.native.prevent="save">
			<el-tabs value="basic" type="border-card">
				<el-tab-pane label="基础信息" name="basic">
					<!-- 基础信息 -->
					<el-form-item label="名称" style="margin-top: .5rem">
						<el-input v-model="model.name"></el-input>
					</el-form-item>
					<el-form-item label="简称">
						<el-input v-model="model.nickName"></el-input>
					</el-form-item>
					<el-form-item label="头像">
						<el-upload
						class="avatar-uploader"
						:action="$http.defaults.baseURL + '/upload'"
						:show-file-list="false"
						:on-success="afterUpload">
							<img v-if="model.avatar" :src="model.avatar" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="类型">
						<el-select v-model="model.categories" multiple>
							<el-option
							v-for="item in categoryOptions"
							:key="item._id"
							:label="item.name"
							:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<!-- 分数 -->
					<el-form-item label="难度">
						<el-rate
						style="margin-top: .7rem;"
						v-model="model.scores.difficult"
						allow-half>
						</el-rate>
					</el-form-item>
					<el-form-item label="技能">
						<el-rate
						style="margin-top: .7rem;"
						v-model="model.scores.skill"
						allow-half>
						</el-rate>
					</el-form-item>
					<el-form-item label="爆发">
						<el-rate
						style="margin-top: .7rem;"
						v-model="model.scores.burst"
						allow-half>
						</el-rate>
					</el-form-item>
					<el-form-item label="生存">
						<el-rate
						style="margin-top: .7rem;"
						v-model="model.scores.survive"
						allow-half>
						</el-rate>
					</el-form-item>
					<el-form-item label="推线">
						<el-rate
						style="margin-top: .7rem;"
						v-model="model.scores.push"
						allow-half>
						</el-rate>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="英雄技能" name="skill">
					<el-form-item>
						<el-button
						type="text" style="font-size: 1.2rem"
						@click="model.skills.push({})">
							<i class="el-icon-plus"></i> 添加技能
						</el-button>
					</el-form-item>
					<el-row type="flex" style="flex-wrap: wrap">
						<el-col
						:md="11"
						v-for="(item,index) in model.skills" :key="index"
						style="border-top: 1px solid rgba(169,169,169,.3)">
							<el-form-item
							label="名称"
							style="margin-top: 1.5rem">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="图标">
								<el-upload
								class="avatar-uploader"
								:action="$http.defaults.baseURL + '/upload'"
								:show-file-list="false"
								:on-success="res => $set(item, 'icon', res.url)">
									<img v-if="item.icon" :src="item.icon" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="描述">
								<el-input type="textarea" v-model="item.description"></el-input>
							</el-form-item>
							<el-form-item label="小提示">
								<el-input type="textarea" v-model="item.tips"></el-input>
								<el-button
								size="small" type="danger"
								@click="skillRemove(index)">删除
								</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="英雄出装" name="equipment">
					<!-- 出装 -->
					<el-form-item label="出门装" style="margin-top: .5rem">
						<el-select v-model="model.openingEquipments" multiple>
							<el-option
							v-for="item in equipmentOptions"
							:key="item._id"
							:label="item.name"
							:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="核心装备">
						<el-select v-model="model.coreEquipments" multiple>
							<el-option
							v-for="item in equipmentOptions"
							:key="item._id"
							:label="item.name"
							:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="后期神装">
						<el-select v-model="model.finalEquipments" multiple>
							<el-option
							v-for="item in equipmentOptions"
							:key="item._id"
							:label="item.name"
							:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="英雄攻略" name="strategy">
					<!-- 攻略 -->
					<el-form-item label="使用技巧" style="margin-top: .5rem">
						<el-input type="textarea" v-model="model.useTips"></el-input>
					</el-form-item>
					<el-form-item label="团战思路">
						<el-input type="textarea" v-model="model.battleTips"></el-input>
					</el-form-item>
					<el-form-item label="英雄搭配">
						<el-select v-model="model.partners" multiple>
							<el-option
							v-for="item in heroOptions"
							:key="item._id"
							:label="item.name"
							:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="英雄克制">
						<el-select v-model="model.counters" multiple>
							<el-option
							v-for="item in heroOptions"
							:key="item._id"
							:label="item.name"
							:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-tab-pane>
			</el-tabs>

			<el-form-item>
				<el-button
				type="primary" native-type="submit"
				style="margin-top: 1rem">保存
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
    export default {
        name: "HeroEdit",
        props: {
            id: {}
        },
        data() {
            return {
                model: {
                    name: '',
                    avatar: '',
                    scores: {},
                    // skills: [],
                },
                categoryOptions: [],
                equipmentOptions: [],
                heroOptions: [],
            }
        },
        methods: {
            skillRemove(index) {
                this.$confirm('是否确认删除该技能?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.model.skills.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                })
            },
            afterUpload(res) {
                // this.$set(this.model, 'avatar', res.url)
                this.model.avatar = res.url
            },
            async save() {
                if (this.id) {
                    await this.$http.put(`rest/heros/${this.id}`, this.model)
                } else {
                    await this.$http.post('rest/heros', this.model)
                }
                this.$router.push('/heros/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            async fetch() {
                const res = await this.$http.get(`rest/heros/${this.id}`)
                this.model = Object.assign({}, this.model, res.data)
            },
            async fetchCategoryOptions() {
                const res = await this.$http.get('rest/categories')
                this.categoryOptions = res.data
            },
            async fetchEquipmentOptions() {
                const res = await this.$http.get('rest/equipments')
                this.equipmentOptions = res.data
            },
            async fetchHeroOptions() {
                const res = await this.$http.get('rest/heros')
                this.heroOptions = res.data
            },
        },
        created() {
            this.id && this.fetch()
            this.fetchEquipmentOptions()
            this.fetchCategoryOptions()
            this.fetchHeroOptions()
        }
    }
</script>

<style lang="less" scoped>
	/deep/ .avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	/deep/ .avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 5rem;
		height: 5rem;
		line-height: 5rem;
		text-align: center;
	}

	.avatar {
		width: 5rem;
		height: 5rem;
		display: block;
	}
</style>