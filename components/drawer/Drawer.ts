import { CHANGE_DRAWER, GET_LINKS, INACTIVE_ALL, SET_LINKS, SET_MENU_OPEN, TOGGLE_LINK } from '@/store/modules/Drawer/const.Drawer'
import { Component, Vue, Watch } from 'vue-property-decorator'
import roleMenu from '../../../../menu.role.json'

import { MyStorage } from '@/utils/users.utils'

import Tabs from '@/components/global/core/drawer/tabs/Tabs.vue'
import FavoriteTab from './favoriteTab/FavoriteTab.vue'
import DrawerView from './view/DrawerView.vue'

import { INavLink } from '@/App/types'
import { CHANGE_TABS } from '@/store/modules/Drawer/Tabs/const.DrawerTab'

const role = roleMenu

@Component({
    components: { Tabs, DrawerView, FavoriteTab }
})
export default class Drawer extends Vue {
    // Application name
    systemName: string = process.env.VUE_APP_NAME || 'NoNameApp'

    fixed = true
    menu: any = {}

    search: string = ''

    item:any = 0

    otherLinks: INavLink[] = []

    isMobileMenu: boolean = false // флаг просмотра меню мобильного формата

    fabTab: boolean = false

    // @Watch('$store.getters.isAuthenticated')
    setMenu () {
        this.setRoleMenu(MyStorage.getItem('privilege-current'))
    }
/*
    @Watch('$store.getters.isAdmin')
    setAdminUrl (value: boolean) {
        if (value) this.setMenu(this.logIn, roleMenu) // adminMenu
    }
    */
    cloneMenu:any = {}

    setRoleMenu (value:any) {
        this.cloneMenu = Object.assign({}, role)
        const roleM = this.parsMenu(this.cloneMenu.value.links,value)
        setTimeout(() => {
            this.otherLinks = roleM
            // this.$store.dispatch(GET_LINKS, this.otherLinks)
            // this.$store.commit(SET_LINKS, roleM)
        }, 300)
    }

    get isAdmin (): boolean {
        return this.$store.getters.isAdmin || false
    }

    get logIn (): boolean {
        return this.$store.getters.isAuthenticated
    }

    get searchLinks() {
      return this.$store.getters['getDrawerLinks']
    }

    get isObjectPage() : boolean {
        return this.$route.name === 'object.id'
    }

    get isFavoritePage() : boolean {
        if (this.$route.name === 'favorite.id') {
            this.fabTab = true
        }
        return this.$route.name === 'favorite.id'
    }

    created () {
        this.setMenu()
    }

    beforeDestroy () {
      if (typeof window === 'undefined') {
        return
      }

      window.removeEventListener('resize', this.onResize)
    }

    mounted () {
      this.onResize()

      window.addEventListener('resize', this.onResize)
    }

    setRoute (name: string): any {
        this.$router.push(name)
        this.$store.dispatch(CHANGE_DRAWER, false)
        this.$store.commit(INACTIVE_ALL)
    }

    get mini (): boolean {
        return this.$store.getters.getDrawerState
    }

    get menuOpen() {
        return this.$store.getters.getMenuOpen
    }

    get tab (): boolean {
        return this.$store.getters.getDrawerTabs
    }

    get drawer (): boolean {
        // return true
        if (!this.$vuetify.breakpoint.mdAndDown) {
            return true
        }
        return this.$store.getters.getDrawerState
    }

    set drawer (val: boolean) {
        if (this.$vuetify.breakpoint.mdAndDown) {
            this.$store.dispatch(CHANGE_DRAWER, val)
        }
    }

    onResize () {
      this.isMobileMenu = window.innerWidth < 1264
    }

    toggleMenu (): void {
        this.$store.dispatch(CHANGE_DRAWER, !this.mini)
    }

    hideDrawer(event: any) {
      if (this.isObjectPage) {
        return
      }
      if (this.isMobileMenu && !this.isObjectPage && this.menuOpen && event.target === document.querySelector('.v-overlay__scrim')) {
        this.$store.commit(SET_MENU_OPEN, false)
      }
    }

    /**
     *
     * @param menu
     */
    parsMenu (menu:any,privilege:any):any {
        const _newMenu = []
        for (const item of menu) {
            if (item.privilege.length>0) {
                const flag = true //this.findPriv(item.privilege,privilege)
                if (flag) {
                    if (item.roots) {
                      item.children = this.parsChild(item, privilege)
                      this.parsMenu(item.roots, privilege)
                    }
                    _newMenu.push(item)
                }
            }
        }
        return _newMenu
    }

    parsChild (elem:any, privilege?:any) {
        const root:any = []
        for (const item of elem.roots) {
            if (item.privilege) {
                const flag = true // this.findPriv(item.privilege,privilege)
                if (flag) {
                    root.push(item)
                }
            }
        }
        return root
    }

    findPriv (arr:any, privilege:any) {
        let flag = false
        for (const item of arr) {
            flag = privilege.includes(item)
            if (flag) {
              return flag
            }
        }
        return flag
    }

    backTab () {
        this.$store.dispatch(CHANGE_TABS, true)
      }
}
