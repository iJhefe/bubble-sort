import Vue from 'vue'
import bubbleSort from './bubblesort'
import store from "@/plugins/store";

Vue.prototype.$bubbleSort = {
    default: bubbleSort.defaultMethod
}

Vue.prototype.$store = store