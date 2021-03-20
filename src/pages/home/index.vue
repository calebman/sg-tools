<template>
  <div style="padding: 16px">
    <a-row :gutter="16">
      <a-col :span="6"
             v-for="(tool, i) in tools"
             :key="i">
        <a-card @click="intoToolPage(tool)"
                hoverable>
          <template #title>
            <a-card-meta :title="tool.title">
              <template #avatar>
                <ToolOutlined />
              </template>
              <template #description>
                <span style="font-size: 14px">{{ tool.desc }}</span>
              </template>
            </a-card-meta>
          </template>
          <template #extra>
            <a-tooltip title="查看文档">
              <QuestionCircleOutlined class="doc-action"
                                      @click.stop="intoToolDoc(tool)" />
            </a-tooltip>
          </template>
          <img :src="tool.img" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ToolOutlined, QuestionCircleOutlined } from "@ant-design/icons-vue";
import evDiffSvg from '../../assets/ev-diff.svg'
import excelDropSvg from '../../assets/excel-drop.svg'
export default {
  components: {
    ToolOutlined,
    QuestionCircleOutlined
  },
  data () {
    return {
      tools: [
        {
          title: 'Excel行删除工具',
          desc: '快速批量删除需要Excel文件待删除的行',
          routerName: 'excel-drop',
          img: excelDropSvg
        }
      ]
    }
  },
  methods: {
    intoToolPage (item) {
      this.$router.push({ name: item.routerName })
    },
    intoToolDoc (item) {
      switch (item.routerName) {
        // case 'ev-tool':
        //   window.open('https://yuque.antfin-inc.com/dx8dhw/newbie/wbw8cn#05b2b699', 'ev_tools_doc')
        //   break
        // case 'ev-report':
        //   window.open('https://yuque.antfin-inc.com/dx8dhw/newbie/wbw8cn#fce03544', 'ev_tools_doc')
        //   break
      }
    }
  }
};
</script>
<style  scoped>
.doc-action:hover {
  color: rgb(255, 77, 79);
}
</style>