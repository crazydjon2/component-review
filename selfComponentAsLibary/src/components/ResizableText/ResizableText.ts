import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import vuetify from '@/plugins/vuetify'

@Component({
  vuetify
})
export default class ResizableText extends Vue {
  @Prop({ type: [String, Number] }) text!: string | number
  @Prop({ type: Boolean, default: false }) hideTooltip!: boolean
  @Prop({ type: String, default: 'top' }) tooltipAlignment!: string
}
