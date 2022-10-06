<template>
    <div class="access__table">
        <div class="px-2 py-2 d-flex favorite-toolbar">
          <div class="d-flex align-center">
            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                small
                fab
                :disabled="!selected.length"
                @click="dialogDelete = true"
              >
                <v-icon color="primary">delete</v-icon>
              </v-btn>
            </template>
            <span>Удалить</span>
          </v-tooltip>
            <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                small
                fab
                class="ml-2"
                :disabled="!selected.length"
                @click="downloadFiles"
              >
                <v-icon color="primary">download</v-icon>
              </v-btn>
            </template>
            <span>Скачать</span>
          </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  small
                  fab
                  class="ml-2"
                  @click="copyFullLinkToClipboard"
                >
                  <v-icon color="primary">link</v-icon>
                </v-btn>
              </template>
              <span>Поделиться</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs} ">
                <v-btn
                  v-bind="attrs"
                  color="grey"
                  class="ml-3"
                  icon
                  elevation="0"
                  small
                  dark
                  fab
                  v-on="on"
                  @click="clearFilters"
                >
                  <v-icon>clear_all</v-icon>
                </v-btn>
              </template>
              <span>Сбросить</span>
            </v-tooltip>
          </div>
          <slot name="filter">
          </slot>
        </div>
        <v-data-table
          v-model="selected"
          :items="favoritesItems"
          :headers="headers"
          show-select
          hide-default-footer
          :options.sync="EPagination"
          :no-data-text="$t('app.messages.nodatatext')"
          :no-results-text="$t('app.messages.nodatatext')"
          @dblclick:row="onRowDClick"
          @update:sort-by="onSort"
          @update:sort-desc="onDescChange"
        >
          <template v-slot:item.count="{ index }">
            <span>{{ (index + 1) + ((EPagination.page - 1) * EPagination.itemsPerPage) }}</span>
          </template>

          <template v-slot:item.file="{ item }">
            <v-icon v-if="item.files.length" class="table__icon">attachment</v-icon>
          </template>

          <template v-slot:item.shortTitle="{ item }">
            <resizable-text :text="item.shortTitle " />
          </template>

          <template v-slot:item.type="{ item }">
            <resizable-text :text="$te(`objects.type.${item.type}`) ? String($t(`objects.type.${item.type}`)) : item.type" />
          </template>

          <template v-slot:item.createdBy="{ item }">
            <v-chip v-if="item.createdBy" outlined>{{ item.createdBy }}</v-chip>
          </template>

          <template v-slot:item.date="{item}">
            {{formatDate(item.date)}}
          </template>


          <template v-slot:footer>
            <Pagination :totalCount="totalCount" v-model="EPagination" />
          </template>
        </v-data-table>

        <ModalDelete
          :dialog="dialogDelete"
          :title="'Удалить документы из подборки?'"
          @modalClose="removeObjectsFormFavorite($event)"
        />
    </div>
</template>

<script src="./ItemList.ts"/>
<style src="./ItemList.css"/>
