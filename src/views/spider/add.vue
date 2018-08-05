<template>
<div class="app-container">
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="基础配置" name="SpiderBasic">
      <el-form :model="form" :rules="rules" ref="SpiderBasic">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="Name">
          <el-input v-model.trim="form.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="仅域名" :label-width="formLabelWidth">
          <el-switch v-model="form.AllowedDomain"></el-switch>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="form.SpiderType" placeholder="爬虫类别">
            <el-option label="列表-详情" value="1"></el-option>
            <el-option label="详情" value="2"></el-option>
            <el-option label="链接" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select v-model.trim="form.Tags" multiple filterable allow-create default-first-option placeholder="标签">
          </el-select>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="爬虫链接" name="StartUrl">
      <el-dialog title="添加" :visible.sync="dialogVisible" width="80%">
        <el-form :model="startUrl" :rules="rules" ref="StartUrl">
          <el-form-item label="爬取链接" :label-width="formLabelWidth" prop="Url">
            <el-input v-model.trim="startUrl.Url" auto-complete="off"></el-input>
          </el-form-item>
          <el-collapse accordion>

            <el-collapse-item title="默认设置">
              <template slot="title">默认设置<i class="header-icon el-icon-info"></i></template>
              <el-form-item label="请求方式" :label-width="formLabelWidth">

                <el-radio v-model="startUrl.RequestMethod" label="GET">GET</el-radio>
                <el-radio v-model="startUrl.RequestMethod" label="POST">POST</el-radio>
              </el-form-item>
              <el-form-item label="请求编码" :label-width="formLabelWidth">
                <el-input v-model.trim="startUrl.RequestEncoding" auto-complete="off"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                请求参数<i class="header-icon el-icon-info"></i>
              </template>
              <el-input type="textarea" :rows="2" placeholder="请输入请求参数" v-model="startUrl.RequestParams">
              </el-input>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                字段设置<i class="header-icon el-icon-info"></i>
              </template>
              <el-form-item label="标题" :label-width="formLabelWidth">
                <el-input v-model.trim="fieldsParams.Title"></el-input>
              </el-form-item>
              <el-form-item label="正文" :label-width="formLabelWidth">
                <el-input v-model.trim="fieldsParams.Content"></el-input>
              </el-form-item>
              <el-form-item label="时间" :label-width="formLabelWidth">
                <el-input v-model.trim="fieldsParams.Time"></el-input>
              </el-form-item>
              <el-form-item label="其他字段" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" placeholder="请输入其他字段:{key:value}" v-model="startUrl.OtherFields">
                </el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item v-if="form.SpiderType==3">
              <template slot="title">
                规则设置
                <i class="header-icon el-icon-info"></i>
              </template>
              <el-form-item label="规则1" :label-width="formLabelWidth">
                <el-input v-model.trim="form.Url"></el-input>
              </el-form-item>
              <el-form-item label="规则2" :label-width="formLabelWidth">
                <el-input v-model.trim="form.Url"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item v-if="form.SpiderType==1">
              <template slot="title">
                列表设置
                <i class="header-icon el-icon-info"></i>
              </template>
              <el-form-item label="列表项" :label-width="formLabelWidth">
                <el-input v-model.trim="fieldsParams.ListXpath"></el-input>
              </el-form-item>
              <el-form-item label="详情链接" :label-width="formLabelWidth">
                <el-input v-model.trim="fieldsParams.DetailXpath"></el-input>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item v-if="form.SpiderType==1">
              <template slot="title">
                分页设置
                <i class="header-icon el-icon-info"></i>
              </template>
              <el-form-item label="总页码" :label-width="formLabelWidth">
                <el-input v-model.trim="fieldsParams.TotalPageXpathOrNum"></el-input>
              </el-form-item>
              <el-form-item label="当前页" :label-width="formLabelWidth">
                <el-input v-model.trim="fieldsParams.CurrentPageXpath"></el-input>
              </el-form-item>
              <el-form-item label="分页参数名称" :label-width="formLabelWidth">
                <el-input v-model.trim="fieldsParams.PageParamName"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitStartUrl()">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="urlData" border style="width: 100%">
        <el-table-column prop="Url" label="链接" width="150">
        </el-table-column>
        <el-table-column prop="RequestMethod" label="方式" width="150">
        </el-table-column>
        <el-table-column prop="RequestEncoding" label="编码" width="150">
        </el-table-column>
        <el-table-column label="操作" :render-header="renderHeader" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">
              查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="高级配置" name="SpiderAdv">
      <el-form :model="form" :rules="rules" ref="SpiderAdv">

        <el-form-item label="登录?" :label-width="formLabelWidth">
          <el-switch v-model="form.IsLogin"></el-switch>
        </el-form-item>
        <el-form-item v-if="form.IsLogin" label="登录地址" :label-width="formLabelWidth">
          <el-input v-model.trim="form.LoginUrl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.IsLogin" label="登录参数" autosize type="textarea" :label-width="formLabelWidth">
          <el-input v-model.trim="form.LoginArgs" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复爬取?" :label-width="formLabelWidth">
          <el-switch v-model="form.IsDuplicate"></el-switch>
        </el-form-item>
        <el-form-item label="调度?" :label-width="formLabelWidth">
          <el-switch v-model="form.IsScheduled"></el-switch>
        </el-form-item>
        <el-form-item v-if="form.IsScheduled" label="Cron表达式" :label-width="formLabelWidth">
          <el-input v-model.trim="form.CronExpression" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="框架配置" name="SpiderScrapy">
      <el-form :model="form" :rules="rules" ref="SpiderScrapy">
        <el-form-item label="CONCURRENT_REQUESTS" prop="CONCURRENT_REQUESTS">
          <el-input v-model.trim="form.CONCURRENT_REQUESTS"></el-input>
        </el-form-item>
        <el-form-item label="DOWNLOAD_DELAY" prop="DOWNLOAD_DELAY">
          <el-input v-model.trim="form.DOWNLOAD_DELAY"></el-input>
        </el-form-item>
        <el-form-item label="COOKIES_ENABLED" prop="COOKIES_ENABLED">
          <el-input v-model.trim="form.COOKIES_ENABLED"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

  <div slot="footer" class="dialog-footer" v-if="activeName!='StartUrl'">
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
  data() {
    return {
      activeName: 'SpiderBasic',
      search_key: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      textarea: '',
      form: {
        SpiderType: '2',
        Tags: []
      },
      startUrl: {
        Url: '',
        RequestMethod: 'GET',
        RequestEncoding: 'utf-8',
      },
      fieldsParams: {

      },
      urlData: [],
      dialogVisible: false,

      rules: {
        Name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
          // {
          //   min: 3,
          //   max: 5,
          //   message: '长度在 3 到 5 个字符',
          //   trigger: 'blur'
          // }
        ],
        Url: [{
          required: true,
          message: '请输入爬取链接',
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
  },
  methods: {
    handleClick() {
      var qs = require('qs');
      var a = qs.parse('price[gte]=10&price[lte]=100&a[like]=b&sort=desc(last_modified),asc(email)')
      console.log(qs.stringify(a))
      console.log(a)
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
    submit() {
      this.$refs[this.activeName].validate((valid) => {
        if (valid) {

          this.urlData.push({
            ...this.form
          })
          spiderDispatch('AddSpider', { ...this.form,
              Tags: this.form.Tags.join(';')
            },
            (result) => {
              if (result.succeed) {
                this.$refs[this.activeName].resetFields();
                this.activeName = 'StartUrl'
                this.startUrl.SpiderId = result.data
              }
            });

          // this.$store.dispatch('AddSpider', { ...this.form,
          //   Tags: this.form.Tags.join(';')
          // }).then(() => {
          //   const result = this.$store.state.spider.addSpiderResult
          //   Message({
          //     message: result.message,
          //     type: result.messageType,
          //     duration: 5 * 1000
          //   })
          //   if (result.succeed) {
          //     this.$refs[this.activeName].resetFields();
          //     this.activeName = 'StartUrl'
          //     this.startUrl.SpiderId = result.data
          //   }

          // }).catch((e) => {
          //   console.log(e)
          //   Message({
          //     message: e,
          //     type: 'error',
          //     duration: 5 * 1000
          //   })
          // })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitStartUrl() {
      this.$refs[this.activeName].validate((valid) => {
        if (valid) {
          let otherFields = this.startUrl.OtherFields
          if (otherFields) {
            otherFields = JSON.parse(this.startUrl.OtherFields)
          }
          const fields = { ...otherFields,
            ...this.fieldsParams
          }
          const postdata = {
            ...this.startUrl,
            RequestParams: JSON.stringify(this.startUrl.RequestParams),
            FieldsParams: JSON.stringify(fields)
          }
          delete postdata.OtherFields
          if (!postdata.SpiderId) {
            Message({
              message: '非法操作,请先添加爬虫基本信息。',
              type: 'error',
              duration: 5 * 1000
            })
            return
          }
          this.$store.dispatch('AddSpiderStartUrls', postdata).then(() => {
            const result = this.$store.state.spider.addSpiderStartUrlsResult
            Message({
              message: result.message,
              type: result.messageType,
              duration: 5 * 1000
            })
            if (result.succeed)
              this.dialogVisible = false
          }).catch((e) => {
            console.log(e)
            Message({
              message: e,
              type: 'error',
              duration: 5 * 1000
            })
          })

        }
      });
    },
    search() {
      console.log(this.search_key)
    },
  },
}
</script>
