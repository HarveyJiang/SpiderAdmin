<template>
<div>
  <el-form :model="startUrlModel" :rules="rules" ref="StartUrl">
    <el-form-item label="爬取链接" :label-width="formLabelWidth" prop="url">
      <el-input v-model.trim="startUrlModel.url" auto-complete="off"></el-input>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="默认设置">
        <template slot="title">默认设置<i class="header-icon el-icon-info"></i></template>
        <el-form-item label="请求方式" :label-width="formLabelWidth">

          <el-radio v-model="startUrlModel.requestMethod" label="GET">GET</el-radio>
          <el-radio v-model="startUrlModel.requestMethod" label="POST">POST</el-radio>
        </el-form-item>
        <el-form-item label="请求编码" :label-width="formLabelWidth">
          <el-input v-model.trim="startUrlModel.requestEncoding" auto-complete="off"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          请求参数<i class="header-icon el-icon-info"></i>
        </template>
        <el-input type="textarea" :rows="2" placeholder="请输入请求参数" v-model="startUrlModel.requestParams">
        </el-input>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          字段设置<i class="header-icon el-icon-info"></i>
        </template>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model.trim="fieldsParams.title"></el-input>
        </el-form-item>
        <el-form-item label="正文" :label-width="formLabelWidth">
          <el-input v-model.trim="fieldsParams.content"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-input v-model.trim="fieldsParams.time"></el-input>
        </el-form-item>
        <el-form-item label="其他字段" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入其他字段:{key:value}" v-model="startUrlModel.otherFields">
          </el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item v-if="spiderType==3">
        <template slot="title">
          规则设置
          <i class="header-icon el-icon-info"></i>
        </template>
        <el-form-item label="规则1" :label-width="formLabelWidth">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="规则2" :label-width="formLabelWidth">
          <el-input></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item v-if="spiderType==1">
        <template slot="title">
          列表设置
          <i class="header-icon el-icon-info"></i>
        </template>
        <el-form-item label="列表项" :label-width="formLabelWidth">
          <el-input v-model.trim="fieldsParams.listXpath"></el-input>
        </el-form-item>
        <el-form-item label="详情链接" :label-width="formLabelWidth">
          <el-input v-model.trim="fieldsParams.detailXpath"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item v-if="spiderType==1">
        <template slot="title">
          分页设置
          <i class="header-icon el-icon-info"></i>
        </template>
        <el-form-item label="总页码" :label-width="formLabelWidth">
          <el-input v-model.trim="fieldsParams.totalPageXpathOrNum"></el-input>
        </el-form-item>
        <el-form-item label="当前页" :label-width="formLabelWidth">
          <el-input v-model.trim="fieldsParams.currentPageXpath"></el-input>
        </el-form-item>
        <el-form-item label="分页参数名称" :label-width="formLabelWidth">
          <el-input v-model.trim="fieldsParams.pageParamName"></el-input>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="handlerCancel(false)">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
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

import
jsonEditor
from '@/components/JsonEditor'

export default {
  name: 'UrlConfig',
  components: {
    jsonEditor
  },
  props: {
    spiderId: Number,
    startUrlId: Number,
    spiderType: Number
  },

  watch: {
    startUrlId: function () {
      this.init()
    }
  },
  data() {
    return {
      fieldsParams: {},
      formLabelWidth: '120px',
      startUrlModel: {
        url: '',
        requestMethod: 'GET',
        requestEncoding: 'utf-8',
        otherFields: ''
      },
      rules: {
        url: [{
          required: true,
          message: '请输入链接',
          trigger: 'blur'
        }]
      }

    }
  },
  methods: {
    init() {
      if (this.startUrlId) {
        spiderDispatch('GetStartUrl', {
            id: this.startUrlId
          },
          (result) => {
            if (result.succeed) {
              this.startUrlModel = result.data
            }
          });
      }
    },
    handlerCancel(refresh) {
      this.$emit('refreshData', refresh);
    },
    submit() {
      this.$refs['StartUrl'].validate((valid) => {
        if (valid) {
          let otherFields = this.startUrlModel.otherFields
          if (otherFields) {
            otherFields = JSON.parse(this.startUrlModel.otherFields)
          }
          const fields = { ...otherFields,
            ...this.fieldsParams
          }
          const postdata = {
            ...this.startUrlModel,
            spiderId: this.spiderId,
            requestParams: JSON.stringify(this.startUrlModel.requestParams),
            fieldsParams: JSON.stringify(fields)
          }
          delete postdata.otherFields
          if (!postdata.spiderId) {
            Message({
              message: '非法操作,请先添加爬虫基本信息。',
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          const action = this.startUrlId ? 'UpdateStartUrl' : 'AddSpiderStartUrls'
          spiderDispatch(action, postdata, (result) => {
            if (result.succeed) {
              this.handlerCancel(true)
              if (action == 'AddSpiderStartUrls')
                this.$refs['StartUrl'].resetFields();
            }

          });
        }
      });
    }
  },
  created() {
    console.log('init', this.spiderId, this.spiderType)
    this.init()
  }

}
</script>
