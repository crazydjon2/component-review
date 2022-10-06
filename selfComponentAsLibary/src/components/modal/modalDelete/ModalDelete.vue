<template>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="450"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="green darken-1 mr-auto"
            text
            @click="closeModal(false)"
          >
            Отмена
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="closeModal(true)"
            class="ml-auto"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script src="./ModalDelete.ts"/>