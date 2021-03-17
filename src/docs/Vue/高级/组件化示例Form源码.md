// kInput
<template>
  <input :value="value" @input="onInput" v-bind="$attrs">
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', e.target.value)
        }
    }
}
</script>

// kFormItem
<template>
  <div>
     <label v-if="label">{{ label }}</label>
     <slot></slot>
     <div v-if="errorMsg !== ''">
         {{ errorMsg }}
     </div>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
   inject: ['form'],
   props: {
       label: {
           type: String,
           default: ''
       },
       prop: String
   },
   data() {
       return {
           errorMsg: ''
       }
   },
   methods: {
       validate() {
          const rules = this.form.rules[this.prop]
          const value = this.form.model[this.prop]

          const desc = {
              [this.prop]: rules
          }
          const schema = new Schema(desc)
          return schema.validate({
              [this.prop]: value
          }, error => {
              if (error) {
                  this.errorMsg = error[0].message
              } else {
                  this.errorMsg = ''
              }
          })

       }
   }
}
</script>

// kForm
<template>
  <div>
      <slot></slot>
  </div>
</template>

<script>
export default {
   provide(){
       return {
           form: this
       }
   },
   props: {
       model: {
           type: Object,
           required: true
       },
       rules: Object
   },
   methods: {
       validate(cb) {
           const tasks = this.$children.filter(item => item.prop)
           .map(item => item.validate())
           Promise.all(tasks)
           .then(() => cb(true))
           .catch(() => cb(false))
       }
   }
}
</script>


// 组件index
<template>
   <div>
       <KForm :model="model" :rules="rules" ref="myform">
            <KFormItem label="'用户: '" prop="username">
                <KIndex v-model="model.username" />
            </KFormItem>
            <KFormItem label="'密码: '" prop="password">
                <KIndex v-model="model.password" type="password" />
            </KFormItem>
            <KFormItem>
                <button @click="submit">Submit</button>
            </KFormItem>
       </KForm>
   </div>
</template>

<script>
import KIndex from './kIndex.vue'
import KFormItem from './kFormItem'
import KForm from './kForm'

export default {
   components: {
      KIndex,
      KFormItem,
      KForm
   },
   data() {
       return {
           model: {
               username: 'Lee',
               password: ''
           },
           rules: {
               username: [{
                   required: true,
                   message: '用户名必填'
               }],
               password: [{
                   required: true,
                   message: '密码必填'
               }]
           }
       }
       
   },
   methods: {
       submit(){
           this.$refs.myform.validate((valid) => {
               if(valid) {
                   alert('submit!')
               } else {
                   console.log('error');
                   return false
               }
           })
       }
   }
}
</script>
