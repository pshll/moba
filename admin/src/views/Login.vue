<template>
	<div class="login-container">
		<el-card header="登录" class="login-card">
			<el-form @submit.native.prevent="login" :model="model" status-icon :rules="rules">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="model.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="model.password"></el-input>
				</el-form-item>
				<el-button
				type="primary" native-type="submit"
				style="width: 100%;font-size: 1.2rem">登录
				</el-button>
			</el-form>
		</el-card>
	</div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            let checkUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            let checkPassWord = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                model: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{validator: checkUserName}],
                    password: [{validator: checkPassWord}],
                },
            }
        },
        methods: {
            async login() {
                /*if (!this.model.username || !this.model.password) {
                    return this.$message({
                        type: 'error',
                        message: '用户名或密码不可为空!'
                    });
                }*/
                const res = await this.$http.post('login', this.model)
                console.log(res.data.token);
                localStorage.token = res.data.token
                this.$router.push('/')
                this.$message({
                    type: 'success',
                    message: '登录成功',
                })
            }
        },
    }
</script>

<style lang="less" scoped>
	.login-container {
		.login-card {
			width: 30rem;
			margin: 6rem auto;
			font-size: 1rem;
		}
	}
</style>