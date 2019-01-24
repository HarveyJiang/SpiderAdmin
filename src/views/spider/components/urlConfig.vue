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
      <el-collapse-item v-if="spiderType==0">
        <template slot="title">
          列表设置
          <i class="header-icon el-icon-info"></i>
        </template>
        <el-form-item label="列表项" :label-width="formLabelWidth">
          <el-input v-model.trim="startUrlModel.listInfo.listXpath"></el-input>
        </el-form-item>
        <el-form-item label="详情链接" :label-width="formLabelWidth">
          <el-input v-model.trim="startUrlModel.listInfo.detailXpath"></el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          属性提取设置<i class="header-icon el-icon-info"></i>
        </template>
        <el-form-item v-if="spiderType==0" label="列表项目属性" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="列表项目属性:{key:value}" v-model="startUrlModel.listFields">
          </el-input>
        </el-form-item>
        <el-form-item label="详情页属性" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="列表项目属性:{key:value}" v-model="startUrlModel.detailFields">
          </el-input>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item v-if="spiderType==2">
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

      <el-collapse-item v-if="spiderType==0">
        <template slot="title">
          分页设置
          <i class="header-icon el-icon-info"></i>
        </template>
        <el-form-item label="下一页" :label-width="formLabelWidth">
          <el-input v-model.trim="startUrlModel.pageInfo.nextPageXpath"></el-input>
        </el-form-item>
        <el-form-item label="最大爬取页码" :label-width="formLabelWidth">
          <el-input v-model.trim="startUrlModel.pageInfo.maxPageCount"></el-input>
        </el-form-item>
        <el-form-item label="分页参数名称" :label-width="formLabelWidth">
          <el-input v-model.trim="startUrlModel.pageInfo.pageParamName"></el-input>
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
      // fieldsParams: {},
      formLabelWidth: '120px',
      startUrlModel: {
        url: '',
        requestMethod: 'GET',
        requestEncoding: 'utf-8',
        requestParams: '{}',
        pageInfo: {},
        listInfo: {},
        listFields: '',
        detailFields: '',
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
              // this.fieldsInfo = JSON.parse(result.data.fieldsInfo || '{}')
              this.startUrlModel.pageInfo = JSON.parse(this.startUrlModel.pageInfo || '{}')
              this.startUrlModel.listInfo = JSON.parse(this.startUrlModel.listInfo || '{}')
              // this.pageInfo = JSON.parse(result.data.pageInfo || '{}')
              // this.listInfo = JSON.parse(result.data.listInfo || '{}')
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

          try {
            JSON.parse(this.startUrlModel.requestParams || '{}')
          } catch (error) {
            Message({
              message: 'requestParams json格式错误。',
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          let listFields = {}
          try {
            listFields = JSON.parse(this.startUrlModel.listFields || '{}')
          } catch (error) {
            Message({
              message: 'listFields json格式错误。',
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          const postdata = {
            ...this.startUrlModel,
            spiderId: this.spiderId,
            pageInfo: JSON.stringify(this.startUrlModel.pageInfo || '{}'),
            listInfo: JSON.stringify(this.startUrlModel.listInfo || '{}'),
            // listFields: JSON.stringify(this.startUrlModel.listFields || '{}'),
            // detailFields: JSON.stringify(this.startUrlModel.detailFields || '{}'),
          }
          // delete postdata.otherFields
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
