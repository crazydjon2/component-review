import { INavLink } from '@/App/types'
import { INACTIVE_ALL_SUBLINKS, SET_LINKS, SET_SUBLINKS, TOGGLE_LINK } from '@/store/modules/Drawer/const.Drawer'
import { CHANGE_TABS, SET_KEYTABS } from '@/store/modules/Drawer/Tabs/const.DrawerTab'

import { Component, Vue, Watch } from 'vue-property-decorator'

import DrawerView from '../view/DrawerView.vue'
import { isAccess } from '@/utils/role.utils'

@Component({
  components: { DrawerView }
})
export default class DrawerTabs extends Vue {
  back () {
    this.$store.dispatch(CHANGE_TABS, false)
  }

  backTab () {
    this.$store.dispatch(CHANGE_TABS, true)
  }

  get tabsDrawe () {
    return this.$store.getters.getCardTabs
  }


  get links() {
    return this.$store.getters['getDrawerSubLinks']
  }


  tab (name:string): boolean {
    return this.$store.getters.getDrawerTabs && this.visibleTabs(name)
  }

  get flag (): boolean {
    return this.$store.getters.getFlagTabs
  }

  get keyTabs () {
    return this.$store.getters.getKeyTabs
  }

  get linksLoading() {
    return this.$store.getters.getLoadingRelationTab
  }

	activeTab:number = this.$store.getters.getFlagForModel // getFlagForModel getKeyTabs

	// @Watch('keyTabs')
	// changeTabsCard (value: number) {
  //   this.activeTab = value === 0 ? 0 : value - 1
	// }

  @Watch('$route.query.tab', { immediate: true })
  async changeTabsDrawer (value: string) {
    switch (value) {
      case undefined:
        this.activeTab = 0
        break
      case null:
        this.activeTab = 0
        break
      case(''):
        this.activeTab = 0
        break
      case('files'):
        this.activeTab = 1
        break
      case('relations'):
        this.activeTab = 2
        break
      case('audit'):
        this.activeTab = 3
        break
    }
  }

  checkTabActive(link: any) {
    const tab = this.$route.query.tab

    switch (tab) {
      case '':
        return link.name === 'details'
      case null:
        return link.name === 'details'
      case undefined:
        return link.name === 'details'
      case 'relations':
        return false
      case 'audit':
        return link.name === 'audit'
      case 'files':
        return link.name === 'files'
      default:
        return false
    }
  }

  setKey (i:number) {
    // this.activeTab = i
    this.$store.dispatch(SET_KEYTABS, i)

    switch (i) {
      case 0:
        if (this.$route.query.versionId) {
          this.$router.push({path: this.$route.path, query: {fromType: this.$route.query.fromType, versionId: this.$route.query.versionId}})
        } else {
          this.$router.push({path: this.$route.path, query: {fromType: this.$route.query.fromType}})
        }
        break
      case 1:
        this.$router.push({ path: this.$route.path, query: {...this.$route.query, tab: 'files' } })
        break
      case 2:
        this.$router.push({ path: this.$route.path, query: {...this.$route.query, tab: 'relations' } })
        break
      case 3:
        this.$router.push({ path: this.$route.path, query: {...this.$route.query, tab: 'audit' } })
        break
  }
  }

  clearMenu() {
    this.$store.commit(INACTIVE_ALL_SUBLINKS)
  }

  visibleTabs (name:string):boolean {
    let flag:boolean = false
    switch (name) {
      case 'details':
        flag = isAccess('AttributesTab', 'BaseLayout', this.$store.getters.getMatrix)
        break;
      case 'files':
        flag = isAccess('FilesTab', 'BaseLayout', this.$store.getters.getMatrix)
        break
      case 'relation':
        flag = isAccess('RelationsTab', 'BaseLayout', this.$store.getters.getMatrix)
        break
      case 'audit':
        flag = isAccess('HistoryTab', 'BaseLayout', this.$store.getters.getMatrix)
        break
      default:
        flag = false
        break
    }
    return flag
  }
}
