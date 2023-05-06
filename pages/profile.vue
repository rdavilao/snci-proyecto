<template>    
    <a-profile></a-profile>
</template>
  
<script>
import { usePublicationStore } from '~~/stores/publication';
import { useUserStore } from '~~/stores/user';

export default {
    setup() {
        const publicationStore = usePublicationStore()
        const userStore = useUserStore()
        definePageMeta({
            middleware: 'autenticado', // poner en todas las páginas que requieran autenticación
        })
        return { publicationStore }
    }
}
</script>