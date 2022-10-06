<template>
  <v-navigation-drawer
    :value="true"
    :mini-variant="mini"
    :hide-overlay="true"
    :stateless="true"
    app
    fixed
    disable-resize-watcher
    class="app-drawer"
    v-click-outside="hideDrawer"
  >
    <!-- Инпут для поиска по папкам -->
    <!-- <v-sheet class="pa-4 primary">
      <v-text-field
        v-model="search"
        label="Поиск по папкам"
        dark
        flat
        dense
        solo-inverted
        hide-details
        clearable
      ></v-text-field>
    </v-sheet> -->

    <div class="drawer__wrapper">
      <!-- <v-toolbar
        v-if="this.$vuetify.breakpoint.mdAndDown"
        text
      >
        <v-toolbar-title>{{ systemName }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            text
            icon
            class="mr-0"
            @click="drawer = !drawer"
          >
            <v-icon
              class="material-icons-outlined"
              text
              v-text="'clear'"
            />
          </v-btn>
        </v-toolbar-items>
      </v-toolbar> -->

      <FavoriteTab v-show="isFavoritePage" :showTab="fabTab" @back="fabTab = false"/>

      <template v-if="!fabTab">

        <Tabs v-show="tab" />

        <v-list
          v-show="!tab"
          id="listDrawer"
          dense
          class="pt-0"
        >

          <!-- Back btn for Favorite Item -->
          <v-list-group
            v-show="isFavoritePage"
            color="primary"
            class="noIcon"
            no-action
            @click="fabTab = true"
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
              @click="fabTab = true"
            >
              <v-list-item-content @click="fabTab = true">
                <v-list-item-title>Назад</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-group>


          <v-list-group
            v-show="!tab && isObjectPage"
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
          <!-- main -->
          <v-list-group
            :class="'/' === $route.path ? 'v-list__tile--active' : ''"
            class="noIcon"
            :value="'/' === $route.path"
            @click="setRoute('/')"
          >
            <template #prependIcon>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <icon-fa
                    style="font-size: 19px;"
                    v-on="on"
                    :icon="['fas', 'home']"
                    class="mr-0 theme--light v-icon">
                  </icon-fa>
                </template>
                {{ $t('pages.home.title') }}
              </v-tooltip>
            </template>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ $t('pages.home.title') }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-group>
          <!-- Search document links -->
          <DrawerView v-if="searchLinks.length" :links="searchLinks" :isFilter="true" />

          <!-- Other links -->
          <!-- <DrawerView v-if="otherLinks.length" :links="otherLinks" /> -->
        </v-list>
      </template>

      <!-- <v-btn
        v-if="!isObjectPage"
        icon
        tile
        :block="true"
        class="toggle-menu-btn"
        @click.stop="toggleMenu"
      >
        <v-icon style="font-size:20px">
          {{ mini ? 'fas fa-chevron-right' : 'fas fa-chevron-left' }}
        </v-icon>
      </v-btn> -->
    </div>
  </v-navigation-drawer>
</template>

<script src="./Drawer.ts"/>
<style src="./Drawer.css"/>
