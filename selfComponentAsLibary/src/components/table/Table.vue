<template>
    <div class="table">
        <div class="table__header">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                fab
                outlined
                small
                color="primary"
                @click="dialogCreate = true"
              >
                <v-icon color="primary">add</v-icon>
              </v-btn>
            </template>
            <span>Создать</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                id="ResetButton"
                color="grey"
                class="ml-3"
                icon
                elevation="0"
                small
                fab
                outlined
                dark
                v-on="on"
                @click="clearFilters"
              >
                <v-icon>clear_all</v-icon>
              </v-btn>
            </template>
            <span>Сбросить</span>
          </v-tooltip>

          <div class="table__filter">
            <slot name="filterSlot"></slot>
          </div>

        </div>
        <v-data-table
          v-model="selected"
          :items="favoriteList"
          fixed-header
          :no-data-text="$t('app.messages.nodatatext')"
          :no-results-text="$t('app.messages.nodatatext')"
          dense
          :headers="headers"
          :options.sync="EPagination"
          hide-default-footer
          @dblclick:row="onRowDClick"
          @update:sort-by="onSort"
          @update:sort-desc="onDescChange"
          class="row-height-40"
        >
          <template v-slot:item.count="{ index }">
            <span>{{ (index + 1) + ((EPagination.page - 1) * EPagination.itemsPerPage) }}</span>
          </template>

          <template v-slot:item.file="{ item }">
            <v-icon v-if="item.file" class="table__icon">attachment</v-icon>
          </template>

          <template v-slot:item.date="{item}">
            {{formatDate(item.date)}}
          </template>

          <template v-slot:item.type="{ item }">
            {{ $te(`objects.type.${item.type}`) ? $t(`objects.type.${item.type}`) : item.type }}
          </template>


          <template v-slot:item.author="{ item }">
            <v-chip>{{ item.author }}</v-chip>
          </template>

          <template v-slot:item.action="{ item }">
            <v-btn icon class="ml-auto" @click="addFileToEdit(item.objectId)" :disabled="!cantEdit(item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon class="ml-2" @click="openModal(item)" :disabled="!cantDelete(item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>

          <template v-slot:footer>
            <Pagination :totalCount="totalCount" v-model="EPagination" />
          </template>
        </v-data-table>

        <ModalDelete 
          :dialog="dialogDelete"
          :title="'Удалить выбаранную подборку?'"
          @modalClose="deleteFavorite($event)"
        />

        <ModalCreate :dialog="dialogCreate"  @modalClose="onCreateClose($event)"/>

        <ModalEdit
          :dialog="dialogEdit"
          :fileToEdit="fileToEdit"
          @modalClose="onEditClose($event)"
        />
    </div>
</template>

<script src="./Table.ts"/>
<style src="./Table.css"/>
