<template>
  <v-list
    id="listDrawer"
    dense
    class="pb-0 pt-0"
  >
    <!-- назад к меню -->
    <v-list-group
      v-show="tab"
      color="primary"
      class="noIcon"
      no-action
      @click="back()"
    >
      <template #prependIcon>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon
              class="material-icons-outlined"
              v-on="on"
            >
              arrow_back
            </v-icon>
          </template>
          {{ $t('pages.home.title') }}
        </v-tooltip>
      </template>
      <template
        v-slot:activator
        @click="back()"
      >
        <v-list-item-content @click="back()">
          <v-list-item-title>Меню</v-list-item-title>
        </v-list-item-content>
      </template>
    </v-list-group>
    <!-- назад к табам -->
    <v-list-group
      v-show="!tab"
      color="primary"
      class="noIcon"
      no-action
      @click="backTab()"
    >
      <template #prependIcon>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon
              class="material-icons-outlined"
              v-on="on"
            >
              arrow_forward
            </v-icon>
          </template>
          {{ $t('pages.home.title') }}
        </v-tooltip>
      </template>
      <template
        v-slot:activator
        @click="backTab()"
      >
        <v-list-item-content @click="backTab()">
          <v-list-item-title>Назад</v-list-item-title>
        </v-list-item-content>
      </template>
    </v-list-group>
    <!-- список табов карточки activeTab $store.getters.getFlagForModel link.key -->
    <v-list-item-group v-model="activeTab">
      <template v-for="(link) in tabsDrawe">
        <v-list-item
          v-if="link.name !== 'relation'"
          v-show="tab(link.name)"
          :key="link.key"
          :prepend-icon="link.icon"
          color="primary"
          :class="[link.children ? '' : 'noIcon']"
          :value="link.key"
          @click="setKey(link.key); clearMenu()"
        >
          <v-list-item-icon>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="material-icons-outlined"
                  v-on="on"
                >
                  {{ link.icon }}
                </v-icon>
              </template>
              {{ $t(`app.tabs.${link.name}`) }}
            </v-tooltip>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t(`app.tabs.${link.name}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-else>
          <DrawerView v-show="tab(link.name)" v-if="!linksLoading" :key="link.key" :links="links" mode="object" :tabs="true" />
          <div v-else v-show="tab(link.name)" :key="link.key" class="drawer__link v-list-group__header v-list-item v-list-item--link theme--light">
            <v-tooltip right class="drawer-item__icon">
              <template v-slot:activator="{ on }">
                <v-progress-circular
                  color="primary"
                  indeterminate
                  size="20"
                  v-on="on"
                />
              </template>
              Связи
            </v-tooltip>

            <div class="ml-4 drawer__text">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-list-item-title v-on="on" v-text="'Связи'" class="drawer__link-title" />
                </template>
                Связи
              </v-tooltip>
            </div>
          </div>
        </template>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script src="./Tabs.ts" />
<style src="./Tabs.css"/>
