<template>
<div>
  <a href="https://doc.scrapy.org/en/latest/topics/settings.html" target="_blank">
  Scrapy设置参考</a>
  <el-form :model="spiderSettingsModel" ref="SpiderScrapy">
    <el-form-item label="启用COOKIES" prop="COOKIES_ENABLED">
      <el-switch v-model="spiderSettingsModel.COOKIES_ENABLED"></el-switch>
    </el-form-item>
    <el-form-item label="启用ROBOTS" prop="ROBOTSTXT_OBEY">
      <el-switch v-model="spiderSettingsModel.ROBOTSTXT_OBEY"></el-switch>
    </el-form-item>
    <el-form-item label="其他配置" prop="otherSettings">
      <el-input type="textarea" :rows="2" placeholder="请输入其他配置:{key:value}" v-model="spiderSettingsModel.otherSettings">
      </el-input>
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
  name: 'SpiderScrapy',
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
      spiderSettingsModel: {},
      spiderModel: {}
    }
  },
  methods: {
    init() {
      if (this.spiderId) {
        spiderDispatch('GetSpider', {
            id: this.spiderId
          },
          (result) => {
            if (result.succeed) {
              this.spiderModel = result.data
              if (this.spiderModel.scrapySettings) {
                console.log('scrapySettings not null', this.spiderModel.scrapySettings, !!JSON.parse(this.spiderModel.scrapySettings))
                this.spiderSettingsModel = JSON.parse(this.spiderModel.scrapySettings) || {}
              }
            }
          });
      }
    },
    submit() {
      this.$refs['SpiderScrapy'].validate((valid) => {
        if (valid) {
          const action = this.spiderId ? 'UpdateSpider' : 'AddSpider'
          const d = { ...this.spiderModel,
            ScrapySettings: JSON.stringify(this.spiderSettingsModel)
          }
          console.log('ppp', JSON.stringify(this.spiderSettingsModel))
          spiderDispatch(action, { ...this.spiderModel,
              scrapySettings: JSON.stringify(this.spiderSettingsModel)
            },
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
