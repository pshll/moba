<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}广告位</h1>
		<el-form label-width="80px" @submit.native.prevent="save">
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			<el-form-item label="广告">
				<el-form-item>
					<el-button
					type="text" size="mini" style="font-size: 1.2rem"
					@click="model.items.push({})">
						<i class="el-icon-plus"></i>
					</el-button>
				</el-form-item>
				<el-row type="flex" style="flex-wrap: wrap">
					<el-col
					:md="24"
					v-for="(item,index) in model.items" :key="index"
					style="border-top: 1px solid rgba(169,169,169,.3)">
						<el-form-item
						label="跳转链接"
						style="margin-top: 1.5rem">
							<el-input v-model="item.url"></el-input>
						</el-form-item>
						<el-form-item label="图片" style="margin: 1.5rem 0">
							<el-upload
							class="avatar-uploader"
							:action="$http.defaults.baseURL + '/upload'"
							:show-file-list="false"
							:on-success="res => $set(item, 'image', res.url)">
								<img v-if="item.image" :src="item.image" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<el-button
							size="small" type="danger"
							@click="adRemove(index)">删除
							</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
    export default {
        name: "AdEdit",
        props: {
            id: {}
        },
        data() {
            return {
                model: {
                    items: []
                },
            }
        },
        methods: {
            adRemove(index) {
                this.$confirm('是否确认删除该广告?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.model.items.splice(index, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    })
                })
            },
            async save() {
                if (this.id) {
                    await this.$http.put(`rest/ads/${this.id}`, this.model)
                } else {
                    await this.$http.post('rest/ads', this.model)
                }
                this.$router.push('/ads/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            async fetch() {
                const res = await this.$http.get(`rest/ads/${this.id}`)
                this.model = Object.assign({}, this.model, res.data);
            },
        },
        created() {
            this.id && this.fetch()
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
		min-width: 5rem;
		max-width: 48rem;
		min-height: 5rem;
		display: block;
	}
</style>