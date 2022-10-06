<template>
  <v-list class="drawer__container py-0" :class="deepLevel !== 0 ? 'px-0' : '' ">
    <div
      v-for="(link, index) in links"
      :key="link.name + index"
      :prepend-icon="link.icon"
      :class="
        [
          link.children && link.children.length ? '' : 'noIcon',
          link.name === 'Связи' ?  'disabled' : '' ,
          link.name === 'Связи' ?
            (isRealtionTab ? 'v-list-item--active primary--text v-list-group--active' : '') :
            link.active ? 'v-list-item--active primary--text v-list-group--active' : '',
        ]"
      :value="links.name === 'Связи' ? true : link.active"
      @click.stop="link.disabled ? {} : setRoute(link); updateLinkActive(link)"
      class="drawer-view"
    >
      <div v-if="tabs ? isEmptyRelationsShow ? true : link.count || link.name === 'Связи' : true" class="drawer__link v-list-group__header v-list-item v-list-item--link theme--light">
        <v-tooltip right class="drawer-item__icon">
          <template v-slot:activator="{ on }">
            <v-icon
              v-if="!isFaIcons(resolveIcon(link))"
              style=""
              :style="{ 'padding-left': `${deepLevel * 12}px !important` }"
              class="mr-0 iconSize"
              v-on="on"
            >
              {{ resolveIcon(link) === 'FolderMultiple' ? FolderMultiple : resolveIcon(link) }}
            </v-icon>
            <div
              v-else
              :style="{ 'padding-left': `${deepLevel * 12}px !important` }"
            >
              <icon-fa
                v-on="on"
                :icon="['fas', resolveIcon(link).replace('fas fa-','')]"
                class="mr-0 iconSize theme--light v-icon">
              </icon-fa>
            </div>
          </template>
          {{ link.name }}
        </v-tooltip>

        <div class="ml-4 drawer__text">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-list-item-title v-on="on" v-text="link.name" class="drawer__link-title" />
            </template>
            {{ link.name }}
          </v-tooltip>
        </div>

        <!-- Скрыть\показать пустые связи -->
        <v-switch
          v-if="link.name === 'Связи'"
          v-model="showEmptyRelations"
          hide-details
          @click.native.stop
          class="mb-2"
        />

        <!-- Количество связей -->
        <span
          v-if="isObjectPage && tabs"
          class="drawer__count"
          :class="link.children && !link.children.length && 'mr-7'"
        >
          {{ link.count ? link.count : 0 }}
        </span>

        <v-icon
          v-if="link.children && link.children.length"
          class="ml-auto"
          :class="link.name === 'Связи' ? (link.node ? 'active' : '') : link.defaultOpen || link.open ? 'active' : ''"
        >
          keyboard_arrow_down
        </v-icon>
      </div>

      <v-expand-transition> 
        <DrawerView
          v-show="link.defaultOpen || link.open"
          :links="getLinkChild(link)"
          :deepLevel="deepLevel + 1"
          :isFilter="link.filters || isFilter"
          :tabs="tabs"
          transition="scroll-y-transition"
          :mode="mode"
        />
      </v-expand-transition>
    </div>
  </v-list>
</template>

<script src="./DrawerView.ts"/>
<style src="./DrawerView.css"/>
