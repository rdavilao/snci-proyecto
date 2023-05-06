<template>
    <v-card class="profile-card">
        <v-avatar color="grey" size="200" rounded="1">
            <v-img cover :src="user.photoUrl"></v-img>
        </v-avatar>
        <v-divider class="mt-2"></v-divider>
        <v-row class="mt-2">
            <v-col cols="6">
                <v-row>
                    <v-col cols="12">
                        <h2 class="text-center">{{ user.firstName }} {{ user.lastname }}</h2>
                    </v-col>
                    <v-col cols="12">
                        <p class="text-center" style="color: #586069;">{{ user.email }}</p>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-row>
                    <v-col cols="12">
                    </v-col>
                    <v-col cols="12">
                        <p class="text-center"><v-badge color="blue" :content="user.usefulLikes" style="font-size: 30px;">
                                <v-icon>mdi-thumb-up</v-icon>
                            </v-badge></p>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
    setup() {
        const userStore = useUserStore()
        const { user } = storeToRefs(userStore)

        return {
            userStore,
            user,
        }
    }
}
</script>

<style scoped>
.profile-card {
    max-width: 600px;
    margin: auto;
    padding: 32px;
    text-align: center;
    margin-bottom: 24px;
}
</style>