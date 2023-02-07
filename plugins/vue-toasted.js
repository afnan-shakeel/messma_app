// register the plugin on vue
import Vue from 'vue'
import Toasted from 'vue-toasted';

// or you can use it with require
// var Toasted = require('vue-toasted').default

// Vue.use(Toasted)
let Options = {
    duration:3000,
    position: 'top-center'
}
// // you can also pass options, check options reference below
Vue.use(Toasted, Options)
;