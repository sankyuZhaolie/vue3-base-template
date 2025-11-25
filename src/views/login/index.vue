<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {useUserStore} from "@/store/modules/user.js";
import {ElMessage, ElNotification} from "element-plus";

const route = useRoute()

// 登录过期提示
if (route.query.expired) {
  ElMessage.warning('登录已过期，请重新登录')
}

let $router = useRouter();
let loading = ref(false);

let loginForm = reactive({'username': 'zhaolie@etsankyu.com', 'password': 'zlhiaeo1989ZL@@@@@'})
let userStore = useUserStore()

// ✅ 表单引用与规则
const loginFormRef = ref()
const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change']}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 8, message: '密码长度不少于8位', trigger: 'blur'}
  ]
}

const login = async () => {
  // ✅ 校验表单
  await loginFormRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      const success = await userStore.userLogin(loginForm)

      if (success) {
        await $router.push("/")
        ElNotification.success({
          title: '登录成功',
          message: `欢迎回来，${localStorage.getItem("username") || '用户'}`
        })
      } else {
        ElNotification.error({
          title: '登录失败',
          message: '账号或密码错误，请重试'
        })
      }
    } catch (error) {
      ElNotification.error({
        title: '请求异常',
        message: error?.message || '网络错误，请稍后再试'
      })
    } finally {
      loading.value = false
    }
  })
}

</script>

<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>

      <el-col :span="12" :xs="24">
        <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
          <!-- logo + 标题容器 -->
          <div class="login-header">
            <img src="@/assets/images/sankyu-png-MID.png" alt="SANKYU Logo" class="login-logo"/>
            <div class="login-titles">
              <h1 class="login-title">山九乐企开票管理平台</h1>
              <h2 class="login-subtitle">Welcome to SANKYU Leqi Invoice System</h2>
            </div>
          </div>

          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="loginForm.username" clearable></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                placeholder="请输入密码"
                :prefix-icon="Lock"
                type="password"
                show-password
                clearable
                v-model="loginForm.password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button :loading=loading class="login-btn" type="primary" size="large" @click="login">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/bg.jpg") center center / cover no-repeat;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  user-select: none;
  cursor: default;
}

.login-form {
  width: 60%; /* 大屏占屏幕宽度 40% */
  max-width: 600px; /* 最大宽度 */
  min-width: 500px; /* 最小宽度 */
  padding: 50px 40px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  margin-left: 60%;
}

/* 小屏自适应 */
@media (max-width: 768px) {
  .login-form {
    width: 90%;
    padding: 40px 20px;
  }
}

.login-header {
  display: flex;
  flex-direction: row; // 水平排列
  align-items: center; // 垂直居中
  justify-content: center; // 水平居中整个容器
  gap: 20px; // logo 与文字间距
  margin-bottom: 40px;

  .login-logo {
    width: 80px; // 可根据实际 Logo 调整
    height: 80px;
  }

  .login-titles {
    text-align: left; // 水平排列时文字靠左

    .login-title {
      font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      font-size: 32px;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 5px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    .login-subtitle {
      font-size: 16px;
      font-weight: 400;
      color: #7f8c8d;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }
}


.el-input {
  height: 45px;
  font-size: 15px;
}

.el-form-item {
  margin-bottom: 25px;
}

.login-btn {
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; // 更现代
  width: 100%;
  height: 45px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  color: white;
  margin-top: 15px;
  background: linear-gradient(90deg, #409eff, #66b1ff);
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #66b1ff, #409eff);
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(64, 158, 255, 0.4);
  }
}


</style>
