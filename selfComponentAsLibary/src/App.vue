<template>
  <v-app class="JournalComponent">
    <v-layout
      align-space-between
      class="favorites"
      column
      fill-height
    >
      <FavoritesTable
        v-if="!card"
        :sendSnackBar="sendSnackBar"
        :userId="userId"
        :filters="filters"
        :isAccess="isAccess"
        :isAdmin="isAdmin"
        :search-trigger="searchTrigger"
        @favDClick="$emit('favDClick', $event)"
        @clear-filters="clearFilters"
      >
        <template v-slot:filterSlot>
          <slot name="filter"></slot>
        </template>
      </FavoritesTable>
      <Card
        v-else 
        :tab="tab"
        :favId="favId"
        :sendSnackBar="sendSnackBar"
        :userId="userId"
        :card-search-trigger="cardSearchTrigger"
        :card-filters="cardFilters"
        @itemDClick="$emit('itemDClick', $event)"
        @clear-filters="clearFilters"
      >
        <template v-slot:auditSlot>
          <slot name="audit"></slot>
        </template>
        <template v-slot:filter>
          <slot name="filter"></slot>
        </template>
      </Card>
    </v-layout>
  </v-app>
</template>

<script src="./App.ts"/>
<style src="./App.css"/>
