import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class FavoriteTab extends Vue {
    @Prop(Boolean) showTab!: boolean

    activeTab: string = ''

    @Watch('$route.query.tab', {immediate: true})
    onTabChange(value: string) {
        setTimeout(() => {
            this.activeTab = value
        }, 100)
    }

    setTab(tab: string) {
        this.$router.replace({path: this.$route.path, query: {tab}})
    }

    back() {
        this.$emit('back')
    }
}
