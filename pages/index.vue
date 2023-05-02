<template>  
  <recommendations></recommendations>
  <create-doc @addPub="publicationStore.addPublication"></create-doc>
  <feed @likePub="publicationStore.addLike" @downloadDoc="publicationStore.downloadDocument"></feed>
</template>

<script>
import { usePublicationStore } from '~~/stores/publication';

export default {
  setup(){
    const publicationStore = usePublicationStore()
    definePageMeta({
      middleware: 'autenticado', // poner en todas las páginas que requieran autenticación
    })
    return { publicationStore }
  },
}
</script>

<style scoped></style>