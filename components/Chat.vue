<template>
    <v-container>
        <v-list>
            <v-list-item v-for="message in  messages " :key="message.id" :class="align_item(message.sender)">
                <p class=" display-name">
                    {{ users[message.sender].firstName }}
                    {{ users[message.sender].lastName }}
                </p>

                <p>
                    {{ message.message }}
                </p>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { getFireSt, getCurrentUser } from "~~/services/fireinit";
export default {
    props: {
        messagesId: String
    },
    setup(props) {
        const db = getFireSt()
        const messages = reactive([])
        const users = reactive({})
        let actual_user = null

        onMounted(async () => {
            actual_user = await getCurrentUser()
        })

        const chats = query(collection(db, "publications", props.messagesId, "chat"), orderBy("date", "desc"));
        const unsubscribe_chat = onSnapshot(chats, (querySnapshot) => {
            messages.splice(0, messages.length)
            querySnapshot.forEach((document) => {
                messages.push(document.data());
            });
        });

        const q_users = query(collection(db, "users"));
        const unsubscribe_users = onSnapshot(q_users, (querySnapshot) => {
            //users.splice(0, users.length)
            querySnapshot.forEach((document) => {
                users[document.id] = document.data();
            });
        });

        const align_item = (id) => {
            return actual_user.uid === id ? "d-flex justify-end chat-sended-message" : "d-flex chat-recieved-message"
        }

        return { messages, users, actual_user, align_item }
    }
}
</script>

<style>
.chat-sended-message {
    max-width: 75%;
    margin: 0 0 0 25%;
}

.chat-recieved-message {
    max-width: 75%;
}

.display-name {
    font-size: 15px;
    color: gray;
}
</style>