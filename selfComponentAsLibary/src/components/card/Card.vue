<template>
  <div class="card">
    <ItemList
      v-if="tab === 'list'"
      :favId="favId"
      :sendSnackBar="sendSnackBar"
      :filters="cardFilters"
      :search-trigger="cardSearchTrigger"
      :userId="userId"
      @itemDClick="$emit('itemDClick', $event)"
      @clear-filters="clearFilters"
    >
      <template v-slot:filter>
        <slot name="filter"></slot>
      </template>
    </ItemList>
    <UserAccess v-else-if="tab === 'access'" :favId="favId" :sendSnackBar="sendSnackBar" :userId="userId"/>
    <div v-else>
        <slot name="auditSlot"></slot>
    </div>
  </div>
</template>

<script src="./Card.ts"/>
<style src="./Card.css"/>
