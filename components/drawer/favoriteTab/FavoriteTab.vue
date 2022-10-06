<template>
  <v-list id="listDrawer" dense class="pb-0 pt-0" v-if="showTab">
    <v-list-item-group class="noIcon" v-model="activeTab">
      <v-list-item value="">
        <v-list-item-icon>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon class="material-icons-outlined" v-on="on">
                arrow_back
              </v-icon>
            </template>
            Меню
          </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content @click="back">
          <v-list-item-title>Меню</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item value="list">
        <v-list-item-icon>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon class="material-icons-outlined" v-on="on">
                folder
              </v-icon>
            </template>
            Список элементов
          </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content @click="setTab('list')">
          <v-list-item-title>Список элементов</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item value="access">
        <v-list-item-icon>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon class="material-icons-outlined" v-on="on">
                supervised_user_circle
              </v-icon>
            </template>
            Права доступа
          </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content @click="setTab('access')">
          <v-list-item-title>Права доступа</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item value="audit">
        <v-list-item-icon>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon class="material-icons-outlined" v-on="on">
                history
              </v-icon>
            </template>
            История
          </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content @click="setTab('audit')">
          <v-list-item-title>История</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script src="./FavoriteTab.ts"/>
<style src="./FavoriteTab.css"/>