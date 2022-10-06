<template>
    <v-row justify="center">
			<v-dialog
				v-model="dialog"
				persistent
				max-width="450"
			>
				<v-card>
					<v-card-title class="text-h5 border-left">
						Изменить наименование
					</v-card-title>
					<v-text-field
						label="Название подборки"
						v-model="favoriteName"
						class="px-6"
					></v-text-field>
					<v-card-actions>
						<v-btn
							color="green darken-1 mr-auto"
							text
							@click="closeModal(false)"
						>
							Отмена
						</v-btn>
						<v-btn
							color="primary darken-1"
							text
							@click="closeModal(true)"
							class="ml-auto"
						>
							Сохранить
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
  </v-row>
</template>

<script src="./ModalEdit.ts"/>