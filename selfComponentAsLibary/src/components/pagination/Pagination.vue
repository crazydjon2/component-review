<template>
  <div class="d-flex mt-5 py-2 iterator-footer align-center pr-6 pl-6">
    <div class="d-flex align-center">
      <span class="grey--text d-inline-block text-truncate">Объектов на странице</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            text
            color="primary"
            class="ml-2"
            v-bind="attrs"
            v-on="on"
          >
            {{ EPagination.itemsPerPage }}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(number, index) in itemsPerPageItems"
            :key="index"
            @click="updateItemsPerPage(number)"
          >
            <v-list-item-title>{{ number }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="text-right ml-auto">
      <v-container class="max-width">
        <v-pagination
          ref="pagination"
          v-model="EPagination.page"
          :length="totalCount"
          total-visible="5"
          circle
          class="iterator-pagination"
        ></v-pagination>
      </v-container>
    </div>
  </div>
</template>

<script src="./Pagination.ts"/>
<style scope src="./Pagination.css"/>
