<template>
  <main>
    <ProductInput v-for="(product, index) in products" :key="index" @input-edited="onInputEdited" />
    <button @click="()=>(products.push(1))">Agregar producto</button>
  </main>
  {{ productsData }}
</template>

<script setup>
import { ref } from 'vue'
import ProductInput from '../components/ProductInput.vue'

const products = ref([1]);
const productsData = ref([]);

const onInputEdited = (product) => {
  productsData.value.push(product);
}
</script>