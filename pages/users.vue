<template>
  <v-card>
    <v-card-title
      font-size="10">
      Documentos que podrían interesarte
    </v-card-title>
    <v-card-text>
    <v-carousel 
      hide-delimiters
      height="200"
      elevation="20">
      <v-carousel-item
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
      ></v-carousel-item>
  </v-carousel>
    </v-card-text>
</v-card>
</template>

<script>
export default {
  setup(){
    definePageMeta({
      middleware: 'autenticado', // poner en todas las páginas que requieran autenticación
    })
  },
}
</script>

<style scoped></style>
