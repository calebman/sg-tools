<template>
  <a-card title="批量excel行删除工具">
    <a-upload-dragger v-model:fileList="fileList"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain, .out"
                      :customRequest="customRequest"
                      :multiple="true">
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">点击或者拖拽文件集到此处操作</p>
      <p class="ant-upload-hint">
        仅支持excel、out、txt类型的文件
      </p>
    </a-upload-dragger>
    <a-page-header style="border: 1px solid rgb(235, 237, 240);margin-top: 16px;"
                   title="逻辑筛选代码">
      <template #extra>
        <a-button type="primary"
                  @click="resetFilter">恢复默认逻辑</a-button>
      </template>
      <a-textarea v-model:value="filterCode"
                  @blur="saveFilterCode"
                  :autoSize="{ minRows: 8, maxRows: 8 }" />
    </a-page-header>
  </a-card>
</template>

<script>
import { InboxOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { saveAs } from 'file-saver'
import XLSX from 'xlsx'
const FILTER_CODE_STORAGE_KEY = 'SgTools.ExcelDrop.FilterCode'
export default {
  data () {
    return {
      fileList: [],
      defaultFilterCode: `function(item){ 
        return !/^d+(.d+)?$/.test(item[0]) && (item[0] < 8 || item[0] > 7304)
}`,
      filterCode: ""
    }
  },
  components: {
    InboxOutlined
  },
  methods: {
    customRequest ({ file, onSuccess, onError }) {
      this.handleFile(file).then(() => {
        message.success(`${file.name} 处理完成.`)
        file.status = 'done'
        onSuccess(null, file)
      }).catch(msg => {
        message.error(`${file.name} 处理失败, ${msg}`)
        file.status = 'error'
        onError(null, file)
      })
    },
    handleFile (file) {
      // 分发处理
      const suffix = file.name.substr(file.name.lastIndexOf('.') + 1)
      const suffixHandlerMap = {
        excelHandler: ['xlsx', 'xls', 'xlsm'],
        txtHandler: ['txt', 'out']
      }
      const keys = Object.keys(suffixHandlerMap)
      return new Promise((resolve, reject) => {
        for (let i = 0; i < keys.length; i++) {
          const suffixs = suffixHandlerMap[keys[i]]
          if (suffixs.includes(suffix)) {
            const fileReader = new FileReader()
            fileReader.onload = event => {
              const { result } = event.target
              try {
                this[keys[i]](result, file.name)
                resolve()
              } catch (e) {
                console.error(e)
                reject('文件处理错误')
              }
            };
            fileReader.readAsBinaryString(file)
            return
          }
        }
        reject('文件类型不适配')
      })
    },
    excelHandler (fileBinary, fileName) {
      const workbook = XLSX.read(fileBinary, { type: 'binary' })
      let data = []
      // 只处理第一页
      const sheetNames = Object.keys(workbook.Sheets)
      if (sheetNames.length > 0) {
        const sheetName = sheetNames[0]
        if (workbook.Sheets.hasOwnProperty(sheetName)) {
          data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
          // 筛选
          data = this.processData(data)
          // 导出
          const wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data);
          XLSX.utils.book_append_sheet(wb, ws, sheetName);
          XLSX.writeFile(wb, 'processed_' + fileName);
        }
      }
    },
    txtHandler (text, fileName) {
      let data = text.split('\n').map(line => line.split(' '))
      // 筛选
      data = this.processData(data)
      // 导出
      const exportTxt = data.map(words => words.join(' ')).join('\n')
      var blob = new Blob([exportTxt], { type: "text/plain;charset=utf-8" })
      saveAs(blob, 'processed_' + fileName);
    },
    processData (data = []) {
      const filterFunc = eval(`let SgToolsExcelDropFilterFunc = null;SgToolsExcelDropFilterFunc = ${this.filterCode}`)
      return data.filter(item => {
        if (Array.isArray(item)) {
          return filterFunc(item)
        } else if (Object.prototype.toString.call(item) === '[object Object]') {
          return filterFunc(Object.keys(item).map(k => item[k]))
        } else {
          return filterFunc([item])
        }
      })
    },
    saveFilterCode (e) {
      localStorage.setItem(FILTER_CODE_STORAGE_KEY, e.target.value)
    },
    resetFilter () {
      this.filterCode = this.defaultFilterCode
    }
  },
  created () {
    this.filterCode = localStorage.getItem(FILTER_CODE_STORAGE_KEY) || this.defaultFilterCode
  }
}
</script>

<style>
</style>