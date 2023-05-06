<template>
    <v-text-field v-model="message" label="message" required></v-text-field>
    <v-btn :disabled="message == ''" @click="sendFirebase(pubId)">ENVIAR</v-btn>
</template>

<script>
export default {
    props: {
        pubId: String
    }
}
</script>

<script setup>
import { collection, addDoc } from "firebase/firestore";
import { getFireSt } from "~~/services/fireinit";
import { getCurrentUser } from '../services/fireinit.js';

const message = ref("")
async function sendFirebase(pubId) {
    try {
        let db = getFireSt();
        const user = await getCurrentUser()
        const docRef = await addDoc(collection(db, "publications", pubId, "chat"), {
            sender: user.uid,
            message: message.value,
            date: new Date().getTime(),
        });

        message.value = ""
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

</script>
