<template>
	<div>
		<h1>物品列表</h1>
		<el-table :data="items">
			<el-table-column prop="_id" label="ID" width="230"></el-table-column>
			<el-table-column prop="name" label="物品名称"></el-table-column>
			<el-table-column prop="icon" label="物品图标">
				<template slot-scope="scope">
					<img :src="scope.row.icon" alt="" style="height: 3rem">
				</template>
			</el-table-column>
			<el-table-column
			fixed="right"
			label="操作"
			width="180">
				<template slot-scope="scope">
					<el-button
					type="primary"
					size="mini"
					@click="$router.push(`/equipments/edit/${scope.row._id}`)">编辑
					</el-button>
					<el-button
					type="danger"
					size="mini"
					@click="remove(scope.row)">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
    export default {
        name: "EquipmentList",
        data() {
            return {
                items: []
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('rest/equipments')
                this.items = res.data
            },
            async remove(row) {
                this.$confirm(`是否确定要删除 ${row.name} 继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$http.delete(`rest/equipments/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetch()
                }).catch(() => {
                })
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style scoped>

</style>