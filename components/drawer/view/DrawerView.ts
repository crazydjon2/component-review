import { INavLink } from '@/App/types'
import { CHANGE_DRAWER, DISABLE_DEFAULT_OPEN_SUBLINKS, INACTIVE_ALL, INACTIVE_ALL_SUBLINKS, OPEN_SECOND_LEVEL_SUBLINKS, TOGGLE_LINK, TOGGLE_SUBLINK, TOOGLE_EMPTY_RELATIONS } from '@/store/modules/Drawer/const.Drawer'
import { SET_KEYTABS } from '@/store/modules/Drawer/Tabs/const.DrawerTab'
import { findParent } from '@/utils/drawer.utils'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import DrawerView from './DrawerView.vue'
import { mdiFolderMultiple } from '@mdi/js'

@Component({
  name: 'DrawerView',
  components: { DrawerView }
})
export default class Drawer extends Vue {
  @Prop(Array) links!: any[]
  @Prop({ type: Boolean, default: false }) isFilter?: boolean
  @Prop({ type: Number, default: 0 }) deepLevel!: number
  @Prop({ type: String, default: 'menu' }) mode?: string
  @Prop({ type: Boolean, default: false }) tabs?: boolean

  FolderMultiple = mdiFolderMultiple

  get linksCheck() {
    return this.links
  }

  get isRealtionTab() {
    return this.$route.query.tab === 'relations'
  }

  get isEmptyRelationsShow() {
    return this.$store.getters.getEmptyRelationsShow
  }

  get isObjectPage() {
    return this.$route.name === 'object.id'
  }

  @Watch('EPagination', { deep: true })
  onLinksUpdate(value: any) {
    setTimeout(() => {
      this.$forceUpdate()
    }, 100)
  }

  showEmptyRelations: boolean = true

  @Watch('showEmptyRelations')
  onEmptyRelationsChange(value: boolean) {
    this.$store.commit(TOOGLE_EMPTY_RELATIONS, value)
  }

  setRoute (link: INavLink): any {
    // Выключить логику открытия всех детей до второго уровня
    this.$store.commit(DISABLE_DEFAULT_OPEN_SUBLINKS)

    if (this.mode === 'object') {
      const cardTabs = this.$store.getters.getCardTabs
      const tabsCount = (cardTabs.length === 4) ? 2 : 1
      this.$store.dispatch(SET_KEYTABS, tabsCount)
      if (link.name === 'Связи') {
        // this.$router.push(this.$route.path + `?tab=relations&relationsId=*`)
        this.$router.replace({ query: { ...this.$route.query, 'tab': 'relations', 'relationsId' : '*' } }).catch(err => {/**/})
        if (link.node) {
          this.$store.commit(INACTIVE_ALL_SUBLINKS)
        } else {
          this.$store.commit(OPEN_SECOND_LEVEL_SUBLINKS)
        }
        return
      }
      // else if (link.active) {
      //   const parentLink = findParent(this.$store.state.Drawer.subLinks ,link)
      //   if (parentLink && parentLink.objectId) {
      //     this.$router.push(this.$route.path + `?tab=relations&types=${parentLink.objectId}`)
      //   } else {
      //     this.$router.push(this.$route.path + `?tab=relations&types=*`)
      //   }
      // }
      else if (link.order) {
        // this.$router.push(this.$route.path + `?tab=relations&relationsId=${link.objectId}`)
        this.$router.replace({ query: { ...this.$route.query, 'tab': 'relations', 'relationsId' : link.order } }).catch(err => {/**/})
      }

      this.$store.dispatch(TOGGLE_SUBLINK, link)
      return
    }

    this.$store.dispatch(TOGGLE_LINK, link)

    if ((link.name !== 'Клиенты')) {
      if (link.path) {
        this.$router.push(link.path)
      } else if (link.objectId) {
        this.$router.push(`/objects/resultSearch/${link.objectId}`)
      }
    }
  }

  resolveIcon(link: any):string {
    if (link.name === 'Связи') {
      return 'account_tree'
    }
    if ((link.filters || this.isFilter) && !link.icon) {
      if (link.active) {
        return 'fas fa-folder-open'
      }
      return 'fas fa-folder'
    }
    return link.icon
  }

  isFaIcons (str:string):boolean {
    if (str.includes('fas fa-')) {
      return true
    } else {
      return false
    }
  }

  // по абсолютно непонятным причинам это это делает работы дерева папок корректным
  updateLinkActive(link: INavLink) {
    this.$nextTick(() => {
      this.$forceUpdate()
    })
  }

  getLinkChild(link: INavLink) {
    if (link && link.children) {
      const childrens: INavLink[] = [...link.children]  //Если что то JSON.parse(JSON.stringify(link.children))
      return childrens
    }
    return []
  }
}
