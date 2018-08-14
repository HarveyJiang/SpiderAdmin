<template>
<div class="app-container">
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-input placeholder="名称" v-model="search_key"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary">
        <router-link to="/spider/add">新增</router-link>
      </el-button>
    </el-form-item>
  </el-form>
  <el-table :data="spiderData" border style="width: 100%">
    <el-table-column prop="name" label="名称" width="150">
    </el-table-column>
    <el-table-column :formatter="formatterSpiderType" prop="spiderType" label="类型" width="120" :filters="spiderTypes" :filter-method="filterTag">
    </el-table-column>
    <el-table-column :formatter="formatterSpiderStatus" prop="status" label="状态" width="120" :filters="spiderStatus" :filter-method="filterTag">
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text">启动</el-button>
        <i class="el-icon-view" @click="handleView(scope.row)" title="查看"></i>
        <i class="el-icon-edit" title="编辑"></i>
        <i class="el-icon-delete" title="删除" @click="handleDelete(scope.row)"></i>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="this.totalCount>0" :page-size="this.pageSize" @current-change="handleCurrentChange" layout="prev, pager, next" :total="this.totalCount" />
  <el-dialog title="查看 | 编辑" :visible.sync="dialogVisible" width="80%">
    <SpiderAdd :spiderId="spiderId" :spiderType="spiderType" />
  </el-dialog>

</div>
</template>

<script>
import {
  spiderDispatch
} from '@/utils/request'
import {
  MessageBox,
  Dialog
} from 'element-ui'
import {
  spiderTypes,
  spiderStatus
} from '@/utils/config';
import SpiderAdd from './add'

export default {
  components: {
    SpiderAdd
  },
  methods: {
    formatterSpiderType(row, column) {
      return spiderTypes[row.spiderType];
    },
    formatterSpiderStatus(row, column) {
      return spiderStatus[row.status];
    },
    // filterTag(value, row) {
    //   return row.spiderType === value;
    // },
     filterTag(value, row, column) {
        const property = column['property'];
        console.log('property',property)
        return row[property] === value;
      },
    init(params) {
      spiderDispatch('GetSpiders', params, (result) => {
        this.spiderData = result.data
        this.totalCount = result.count
      })
    },
    handleView(row) {
      this.spiderId = row.id
      this.spiderType = row.spiderType
      console.log('spiderId' + this.spiderId, this.spiderType)
      this.dialogVisible = true
    },
    handleDelete(row) {
      MessageBox.confirm('确定删除:' + row.name, '警告', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        spiderDispatch('DeleteSpider', {
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
    handleCurrentChange(val) {
      const p = {
        offset: (val - 1) * this.pageSize,
        limit: this.pageSize,
        fields: this.search_field,
        key: this.search_key
      }
      this.init(p)
    },
    handleClick(row) {
      console.log(row)
    },
    search() {
      const p = {
        fields: this.search_field,
        key: this.search_key
      }
      this.init(p)
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      dialogVisible: false,
      search_field: 'Name',
      search_key: '',
      formLabelWidth: '120px',
      totalCount: 0,
      pageSize: 10,
      spiderId: 0,
      spiderType: 0,
      spiderData: [],
      spiderStatus: spiderStatus.map((v, i, arr) => {
        return {
          "text": v,
          "value": i
        }
      }),
      spiderTypes: spiderTypes.map((v, i, arr) => {
        return {
          "text": v,
          "value": i
        }
      }),
    }
  }
}
</script>
