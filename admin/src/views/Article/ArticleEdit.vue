<template>
	<div>
		<h1>{{id ? '编辑' : '新建'}}文章</h1>
		<el-form label-width="80px" @submit.native.prevent="save">
			<el-form-item label="所属分类" style="margin-top: 30px">
				<el-select v-model="model.categories" multiple>
					<el-option
					v-for="item in categoryOptions"
					:key="item._id"
					:label="item.name"
					:value="item._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标题">
				<el-input v-model="model.title"></el-input>
			</el-form-item>
			<el-form-item label="内容">
				<vue-editor
				v-model="model.body"
				useCustomImageHandler
				@image-added="handleImageAdded"></vue-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
    import {VueEditor} from "vue2-editor"

    export default {
        name: "ArticleEdit",
        props: {
            id: {}
        },
        components: {
            VueEditor
        },
        data() {
            return {
                model: {},
                categoryOptions: [],
            }
        },
        methods: {
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                // An example of using FormData
                // NOTE: Your key could be different such as:
                // formData.append('file', file)

                let formData = new FormData();
                formData.append("file", file);

                const res = await this.$http.post('upload', formData);
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
                /*axios({
                    url: "https://fakeapi.yoursite.com/images",
                    method: "POST",
                    data: formData
                }).then(result => {
                        let url = result.data.url; // Get url from response
                        Editor.insertEmbed(cursorLocation, "image", url);
                        resetUploader();
                    })*/
            },
            async save() {
                if (this.id) {
                    await this.$http.put(`rest/articles/${this.id}`, this.model)
                } else {
                    await this.$http.post('rest/articles', this.model)
                }
                this.$router.push('/articles/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            async fetch() {
                const res = await this.$http.get(`rest/articles/${this.id}`)
                this.model = res.data
            },
            async fetchCategoryOptions() {
                const res = await this.$http.get(`rest/categories`)
                this.categoryOptions = res.data
            }
        },
        created() {
            this.fetchCategoryOptions()
            this.id && this.fetch()
        }
    }
</script>

<style scoped>

</style>