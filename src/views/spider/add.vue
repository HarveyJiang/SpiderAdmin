<template>
<div class="app-container">
  <el-tabs type="card" value="SpiderBasic">
    <el-tab-pane label="基础配置" name="SpiderBasic">
      <SpiderBasic :spiderId="spiderId" />
    </el-tab-pane>
    <el-tab-pane label="爬虫链接" name="StartUrl">
      <SpiderUrl :spiderId="spiderId" :spiderType="spiderType" />
    </el-tab-pane>
    <el-tab-pane label="高级配置" name="SpiderAdv">
      <SpiderAdv :spiderId="spiderId" />
    </el-tab-pane>
    <el-tab-pane label="框架配置" name="SpiderScrapy">
      <SpiderScrapy :spiderId="spiderId" />
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import {
  Message
} from 'element-ui'
import {
  spiderDispatch
} from '@/utils/request'
import SpiderBasic from './components/spiderBasic'
import SpiderAdv from './components/spiderAdv'
import SpiderScrapy from './components/spiderScrapy'
import SpiderUrl from './components/spiderUrl'

export default {
  name: 'SpiderAdd',
  components: {
    SpiderBasic,
    SpiderAdv,
    SpiderScrapy,
    SpiderUrl
  },
  // 接受父组件的值
  props: {
    spiderId: Number,
    spiderType: Number
  },
  data() {
    return {

    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  }

}
</script>
