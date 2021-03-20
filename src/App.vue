<template>
  <div>
    <div class="layout-header">
      <h1 class="header-title" @click="gotoHome">睡神工具箱</h1>
      <a-dropdown>
        <a-avatar class="header-avatar" size="large"><UserOutlined /></a-avatar>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1"><SettingOutlined />配置中心</a-menu-item>
            <a-menu-item key="2"><QuestionCircleOutlined />文档中心</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="layout-main">
      <div class="main-content"><router-view></router-view></div>
    </div>
    <div class="layout-footer">识别工具箱 ©2020 Created by chenjianhui.cjh</div>
  </div>
</template>

<script>
import { UserOutlined, SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
export default {
  name: "App",
  components: {
    UserOutlined,
    SettingOutlined,
    QuestionCircleOutlined
  },
  setup() {
    const router = useRouter()
    const handleMenuClick = ({ key }) => {
      switch(key) {
        case '1':
          router.push({ name: 'setting' })
          break;
        case '2':
          window.open('https://yuque.antfin-inc.com/dx8dhw/newbie/wbw8cn', 'ev_tools_doc')
          // router.push({ name: 'docs' })
          break
      }
    }
    const gotoHome = () => {
      router.push({ name: 'home' })
    }
    return {
      gotoHome,
      handleMenuClick
    }
  }
};
</script>
<style scoped>
html,
body {
  *overflow: hidden;
  margin: 0 auto;
  background: #f0f2f5;
}

.layout-header,
.layout-main,
.layout-footer {
  width: 100%;
  position: absolute;
}

.layout-header {
  height: 64px;
  top: 0;
  line-height: 64px;
  background: #001529;
}

.layout-main {
  top: 64px;
  bottom: 50px;
  height: auto;
  background: #f0f2f5;
  overflow-y: auto;
}

.layout-main .main-content {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}

.layout-footer {
  height: 50px;
  bottom: 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
  line-height: 40px;
  background: rgb(240, 242, 245);
  font-family: cursive;
}

.header-title {
  color: white;
  font-size: 20px;
  font-family: cursive;
  margin-left: 30px;
  display: inline;
  cursor: pointer;
}
.header-avatar {
  background-color: #87d068;
  display: inline;
  float: right;
  margin-right: 30px;
  margin-top: 12px;
  cursor: pointer;
}
</style>