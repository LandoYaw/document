// 1、插件添加
// vue.use() 固定格式install
let Vue

class Store {
  constructor (option) {
    this.vm = new Vue({
      data: {
        state: option.state
      }
    })
    // for getters
    let getters = option.getters || {}
    this.getters = {}
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state)
        }
      })
    })
    // for mutations
    let mutations = option.mutations
    this.mutations = {}
    Object.keys(mutations).forEach(m => {
      this.mutations[m] = payload => {
        mutations[m](this.state, payload)
      }
    })

    // for actions
    let actions = option.actions
    this.actions = {}
    Object.keys(actions).forEach(a => {
      this.actions[a] = payload => {
        actions[a](this, payload)
      }
    })
  }
  get state () {
    return this.vm.state
  }
  commit = (m, payload) => {
    this.mutations[m](payload)
  }
  dispatch = (a, payload) => {
    this.actions[a](payload)
  }
}

const install = (v) => {
  Vue = v
  Vue.mixin({
    beforeCreate () {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}
export default {
  install, Store
}
