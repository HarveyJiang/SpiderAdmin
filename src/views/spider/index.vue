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
    <el-table-column prop="Name" label="名称" width="150">
    </el-table-column>
    <el-table-column prop="SpiderType" label="类型" width="120">
    </el-table-column>
    <el-table-column prop="Status" label="状态" width="120">
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">启动</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="0" />
  </el-pagination>
</div>
</template>

<script>
export default {
  methods: {
    init() {
      console.log('init...');
    },
    handleClick(row) {
      console.log(row)
    },
    submit() {
      this.$refs[this.activeName].validate((valid) => {
        if (valid) {
          alert('submit!' + this.activeName);
          this.dialogFormVisible = false
          this.$refs[this.activeName].resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    search() {
      console.log(this.search_key)
    },
  },
  // watch: {
  //   form: function (val) {
  //     this.form = { ...this.from,Name:this.form.Domain}
  //   }
  // },

  // computed: {
  //     form() {
  // 　　　　return { ...this.from,Name:this.form.Domain}
  // 　　}
  // },
  mounted() {
    this.init();
  },
  data() {
    return {
      activeName: 'SpiderBasic',
      search_key: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        Domain: '',
        Tags: [1, 2, 3]
      },
      tableData: [],
      rules: {
        Name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        Domain: [{
          required: true,
          message: '请输入域名',
          trigger: 'blur'
        }],
        date1: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        date2: [{
          type: 'date',
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }],
        type: [{
          type: 'array',
          required: true,
          message: '请至少选择一个活动性质',
          trigger: 'change'
        }],
        resource: [{
          required: true,
          message: '请选择活动资源',
          trigger: 'change'
        }],
        desc: [{
          required: true,
          message: '请填写活动形式',
          trigger: 'blur'
        }]
      }
    }
  }
}
</script>
