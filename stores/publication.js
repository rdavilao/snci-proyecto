import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  setDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { defineStore } from 'pinia'
import { getFireSt, getStor } from '~/services/fireinit'

const db = getFireSt()
const colRef = 'publications'
const storage = getStor()

export const usePublicationStore = defineStore('publication', {
  state: () => ({
    publication: null,
    comments: [],
    likes: null,
  }),
  actions: {
    async addPublication({
      author,
      university,
      degree,
      subject,
      topic,
      description,
      title,
      document,
    }) {
      var docName = document.name
      const docRef = await addDoc(collection(db, colRef), {
        author,
        university,
        degree,
        subject,
        topic,
        description,
        title,
        docName: docName,
        likes: 0,
        created_at: serverTimestamp(),
      })
      const storageRef = ref(
        storage,
        author + '/doc/' + docRef.id + '/' + docName
      )
      uploadBytes(storageRef, document).then(() => {})
    },
    async addLike({ id, actualUser, likesRef }) {
      const docRef = doc(db, colRef, id)
      if (!likesRef) {
        var likesArray = []
        likesArray.push(actualUser)
        await updateDoc(docRef, {
          likes: increment(1),
          likesRef: likesArray,
        })
      } else {
        if (likesRef.includes(actualUser)) {
          likesRef.pop(actualUser)
          await updateDoc(docRef, {
            likes: increment(-1),
            likesRef: likesRef,
          })
        } else {
          likesRef.push(actualUser)
          await updateDoc(docRef, {
            likes: increment(1),
            likesRef: likesRef,
          })
        }
      }
    },
    async downloadDocument({ authorId, documentId, documentName }) {
      const fileRef = ref(
        storage,
        authorId + '/doc/' + documentId + '/' + documentName
      )
      const url = await getDownloadURL(fileRef)
      const link = document.createElement('a')
      link.href = url
      link.download = documentName
      link.click()
    },
  },
})
