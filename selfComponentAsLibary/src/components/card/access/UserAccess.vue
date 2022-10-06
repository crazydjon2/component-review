<template>
  <v-container fluid class="access pa-0">
      <div
        class="access--row"
      >
        <v-col cols="8">
          <v-autocomplete
            v-model="access.editors"
            :items="users"
            outlined
            dense
            chips
            small-chips
            label="Редактирование"
            item-text="data.login"
            item-value="objectId"
            multiple
          >
            <template v-slot:append-outer>
              <v-btn icon class="pb-3" @click="openModal('editors')">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="8">
          <v-autocomplete
            v-model="access.readers"
            :items="users"
            outlined
            dense
            chips
            small-chips
            label="Просмотр"
            item-text="data.login"
            item-value="objectId"
            multiple
          >
            <template v-slot:append-outer>
              <v-btn icon class="pb-3" @click="openModal('readers')">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="8">
          <v-autocomplete
            v-model="access.removers"
            :items="users"
            outlined
            dense
            chips
            small-chips
            label="Удаление"
            item-text="data.login"
            item-value="objectId"
            multiple
          >
            <template v-slot:append-outer>
              <v-btn icon class="pb-3" @click="openModal('removers')">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
          </v-autocomplete>
        </v-col>
        <div class="mt-auto access--btn px-3">
          <v-btn color="primary" :disabled="canISave && loading" @click="saveAccess">
            Сохранить
          </v-btn>
        </div>

        <UserModal
          v-model="access"
          :dialog="dialogUser"
          :mode="mode"
          @modalClose="dialogUser = false"
        />
    </div>
  </v-container>
</template>

<script src="./UserAccess.ts"/>
<style src="./UserAccess.css"/>