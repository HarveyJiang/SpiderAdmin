<template>
<div>
  <el-form :model="spiderModel" :rules="rules" ref="SpiderBasic">
    <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
      <el-input v-model.trim="spiderModel.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="仅域名" :label-width="formLabelWidth">
      <el-switch v-model="spiderModel.allowedDomain"></el-switch>
    </el-form-item>
    <el-form-item label="类别" :label-width="formLabelWidth">
      <el-select v-model.number="spiderModel.spiderType" placeholder="爬虫类别">
        <el-option v-for="( item, index ) in spiderTypes" :key="index" :label="item" :value="index+1">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标签" :label-width="formLabelWidth">
      <el-select v-model.trim="spiderModel.tags" multiple filterable allow-create default-first-option placeholder="标签">
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="this.dialogFormVisible = false">取 消</el-button>
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

import {
  spiderTypes
} from '@/utils/config';

export default {
  name: 'SpiderBasic',
  props: {
    spiderId: Number,
  },

  watch: {
    spiderId: function () {
      this.init()
    }
  },
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      spiderModel: {
        spiderType: 3,
        tags: []
      },
      spiderTypes: spiderTypes,
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }]
      }
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
              const tags = result.data.tags ? result.data.tags.split(';') : []
              this.spiderModel = { ...result.data,
                tags
              }
            }
          });
      }
    },
    submit() {
      this.$refs['SpiderBasic'].validate((valid) => {
        if (valid) {
          const action = this.spiderId ? 'UpdateSpider' : 'AddSpider'
          spiderDispatch(action, { ...this.spiderModel,
              tags: this.spiderModel.tags.join(';')
            },
            (result) => {
              if (result.succeed) {
                this.$refs['SpiderBasic'].resetFields();
              }
            });
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
  mounted: function () {
    console.log(spiderTypes)
  }

}
</script>
