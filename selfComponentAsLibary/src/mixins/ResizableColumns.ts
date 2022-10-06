import Vue from 'vue'
import Component from 'vue-class-component'
import ResizableText from '@/components/ResizableText/ResizableText.vue'
import makeColumnsResizable from '@/utils/resizableColumns.utils'

@Component({
  components: { ResizableText }
})
export default class ResizableColumns extends Vue {
  updated () {
    this.$nextTick(() => {
      makeColumnsResizable()
    })
  }
}
