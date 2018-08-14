<template>
<div>
  <el-form :model="spiderModel" :rules="rules" ref="SpiderAdv">
    <el-form-item label="登录?" :label-width="formLabelWidth">
      <el-switch v-model="spiderModel.isLogin"></el-switch>
    </el-form-item>
    <el-form-item v-if="spiderModel.isLogin" label="登录地址" prop="loginUrl" :label-width="formLabelWidth">
      <el-input v-model.trim="spiderModel.loginUrl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="spiderModel.isLogin" label="登录参数" prop="loginArgs" autosize type="textarea" :label-width="formLabelWidth">
      <el-input v-model.trim="spiderModel.loginArgs" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="重复爬取?" :label-width="formLabelWidth">
      <el-switch v-model="spiderModel.isDuplicate"></el-switch>
    </el-form-item>
    <el-form-item label="调度?" :label-width="formLabelWidth">
      <el-switch v-model="spiderModel.isScheduled"></el-switch>
    </el-form-item>
    <el-form-item v-if="spiderModel.isScheduled" prop="cronExpression" label="Cron表达式" :label-width="formLabelWidth">
      <el-input v-model.trim="spiderModel.cronExpression" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </div>
</div>
</template>

<script>
import {
  Message
} from 'element-ui'
import {
  spiderDispatch
} from '@/utils/request'

export default {
  name: 'SpiderAdv',
  props: {
    spiderId: Number,
  },
  watch: {
    spiderId: function () {
      console.log('watch', this.spiderId)
      this.init()
    }
  },
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      spiderModel: {},
      rules: {
        loginUrl: [{
          required: true,
          message: '请输入登录地址',
          trigger: 'blur'
        }],
        loginArgs: [{
          required: true,
          message: '请输入登录参数',
          trigger: 'blur'
        }],
        cronExpression: [{
          required: true,
          message: '请输入cron表达式',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    init() {
      if (this.spiderId) {
        console.log('id', this.spiderId)
        spiderDispatch('GetSpider', {
            id: this.spiderId
          },
          (result) => {
            if (result.succeed) {
              this.spiderModel = { ...result.data
              }
            }
          });
      }
    },
    submit() {
      this.$refs['SpiderAdv'].validate((valid) => {
        if (valid) {
          const action = this.spiderId ? 'UpdateSpider' : 'AddSpider'
          spiderDispatch(action, this.spiderModel,
            (result) => {});
        } else {
          return false;
        }
      });
    },
  },
  created() {
    console.log('init', this.spiderId)
    this.init()
  },
}
</script>
