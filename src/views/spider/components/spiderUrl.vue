<template>
<div>
  <el-table :data="models" border style="width: 100%">
    <el-table-column prop="url" label="链接" width="150">
    </el-table-column>
    <el-table-column prop="requestMethod" label="方式" width="150">
    </el-table-column>
    <el-table-column prop="requestEncoding" label="编码" width="150">
    </el-table-column>
    <el-table-column label="操作" :render-header="renderHeader" width="100">
      <template slot-scope="scope">
        <el-button @click="handleView(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text"><i class="el-icon-delete" title="删除" @click="handleDelete(scope.row)"></i></el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog append-to-body title="添加" :visible.sync="dialogVisible" width="80%">
    <UrlConfig :startUrlId="startUrlId" :spiderType="spiderType" :spiderId="spiderId" @refreshData="refreshData" />
  </el-dialog>
</div>
</template>

<script>
import {
  Message,MessageBox
} from 'element-ui'
import {
  spiderDispatch
} from '@/utils/request'

import UrlConfig from './urlConfig'

export default {
  name: 'SpiderUrl',
  components: {
    UrlConfig
  },
  props: {
    spiderId: Number,
    spiderType: Number
  },

  watch: {
    spiderId: function () {
      this.init()
    }
  },
  data() {
    return {
      models: [{}],
      fieldsParams: {},
      startUrlId: null,
      dialogVisible: false,
      formLabelWidth: '120px',
    }
  },
  methods: {
    init() {
      if (this.spiderId) {
        spiderDispatch('GetStartUrlsBySpiderId', {
            spiderId: this.spiderId
          },
          (result) => {
            if (result.succeed) {
              this.models = result.data
            }
          });
      }
    },
    refreshData(refresh) {
      // 子组件urlConfig添加成功后，隐藏弹出框，并刷新数据
      this.dialogVisible = false
      if (refresh) {
        this.init()
      }

    },
    handleView(row) {
      this.startUrlId = row.id
      console.log('startUrlId' + this.startUrlId, this.spiderType)
      this.dialogVisible = true
    },
    handleDelete(row) {
      MessageBox.confirm('确定删除:' + row.url, '警告', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        spiderDispatch('DeleteStartUrl', {
          id: row.id
        }, (result) => {
          if (result.succeed) {
            this.init()
          }
        })
      }).catch(() => {
        return false
      });
    },
    renderHeader(createElement, {
      column
    }) {
      return createElement(
        'span', [
          createElement('span', {}, '操作'),
          createElement('el-button', {
            attrs: {
              type: 'text'
            },
            on: {
              click: () => {
                this.dialogVisible = true
              }
            }
          }, ['新增'])
        ]
      );
    },
  },
  created() {
    console.log('init', this.spiderId, this.spiderType)
    this.init()
  }

}
</script>
