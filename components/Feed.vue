<template>
    <v-card v-for="pub in publications" class="mb-5" variant="outlined">
        <v-card-title>{{ pub[1] ? pub[1].title : undefined }}</v-card-title>
        <v-card-subtitle> {{ users[pub[1].author] ? users[pub[1].author].firstName : undefined }} {{ users[pub[1].author] ?
            users[pub[1].author].lastName : undefined }} </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
            <v-row>
                <v-col>
                    {{ pub[1].description }}
                </v-col>
                <v-col>
                </v-col>
                <v-col>
                    <v-row>
                        {{ pub[1].university }}
                    </v-row>
                    <v-row>
                        {{ pub[1].degree }}
                    </v-row>
                    <v-row>
                        {{ pub[1].subject }}
                    </v-row>
                    <v-row>
                        {{ pub[1].topic }}
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-row class="mb-1">
            <v-col style="margin-left: 15px; margin-top: 10px; font-size: 10px;">
                {{ pub[1].likes }} &nbsp;usefulness
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-center">
            <v-row>
                <v-col cols="4">
                    <v-btn width="100%" @click="like(pub[0], pub[1].author, pub[1].likesRef ? pub[1].likesRef : null)"
                        :active="isLiked(pub[1].likesRef ? pub[1].likesRef : null)"><v-icon
                            class="mdi mdi-thumb-up"></v-icon>&nbsp; Useful Like</v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn width="100%" @click="downloadDoc(pub[1].author, pub[0], pub[1].docName)"><v-icon
                            class="mdi mdi-cloud-download"></v-icon>&nbsp; Descargar</v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn width="100%" @click="comentarios(pub[0])"><v-icon class="mdi mdi-comment"></v-icon>&nbsp;
                        Comentar</v-btn>
                </v-col>
            </v-row>
        </v-card-actions>

        <div :id=pub[0] style="display: none;">
            <send-button :pubId=pub[0]></send-button>
            <chat :messagesId=pub[0]></chat>
        </div>
    </v-card>
</template>

<script setup>
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { getFireSt, getCurrentUser } from "~~/services/fireinit";

const db = getFireSt()
const colRef = 'publications'

const publications = reactive([])
const users = reactive({})

let actual_user = null

onMounted(async () => {
    actual_user = await getCurrentUser()
})

const q_publications = query(collection(db, colRef), orderBy("created_at", "desc"));
const unsubscribe_pub = onSnapshot(q_publications, (querySnapshot) => {
    publications.splice(0, publications.length)
    querySnapshot.forEach((document) => {
        publications.push([document.id, document.data()]);
    });
})

const q_users = query(collection(db, "users"));
const unsubscribe_users = onSnapshot(q_users, (querySnapshot) => {
    querySnapshot.forEach((document) => {
        users[document.id] = document.data();
    });
});

const isLiked = (likesRef) => {
    if (!likesRef) {
        return false
    }
    if (!likesRef.includes(actual_user.uid)) {
        return false
    }
    if (likesRef.includes(actual_user.uid)) {
        return true
    }
}
</script>

<script>
export default {
    methods: {
        async like(id, authorId, likesRef) {
            const actualUser = await getCurrentUser()
            const data = {
                id,
                authorId,
                actualUser: actualUser.uid,
                likesRef,
            }
            this.$emit('likePub', data)
        },
        downloadDoc(authorId, documentId, documentName) {
            const data = {
                authorId,
                documentId,
                documentName
            }
            this.$emit('downloadDoc', data)
        },
        comentarios(pubId) {
            console.log(pubId)
            //Mostrar y ocultar
            const comentarios = document.getElementById(pubId)
            if (comentarios.style.display == "block") {
                comentarios.style.display = "none"
            }
            else {
                comentarios.style.display = "block"
            }
        }
    }
}
</script>

