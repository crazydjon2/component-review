<template>
    <v-row justify="center">
			<v-dialog
				v-model="dialog"
				persistent
				max-width="700"
			>
				<v-card>
                    <div class="d-flex mb-2 pa-4 align-center user-modal__header">
                        <span>Выберите элемент</span>
                        <v-btn icon class="ml-auto" @click="$emit('modalClose'); search = ''">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </div>
                    <v-text-field
                        v-model="search"
                        label="Поиск"
                        outlined
                        hide-details
                        clearable
                        append-icon="search"
                        class="px-4"
                    ></v-text-field>
                    <v-list class="px-2 user-modal__list">
                        <v-list-item dense  v-for="user in usersToShow" :key="user.objectId">
                            <v-list-item-title>{{ user.data.login }}</v-list-item-title>
                            <v-btn 
                                v-if="!checkInclude(user)"
                                icon
                                @click="addUser(user)"
                            >
                                <v-icon color="primary">add</v-icon>
                            </v-btn>
                            <v-btn
                                v-else
                                icon
                                @click="addUser(user)"
                            >
                                <v-icon color="error">close</v-icon>
                            </v-btn>
                        </v-list-item>
                    </v-list>

					<Pagination
                        v-model="pagination"
                        :totalCount="totalCount"
                    />
				</v-card>
			</v-dialog>
  </v-row>
</template>

<script src="./UserModal.ts"/>
<style src="./UserModal.css"/>