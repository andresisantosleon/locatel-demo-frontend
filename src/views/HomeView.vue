<template>
  <main>
    <div>
      <label>
        Cliente
      </label>
      <div>
        <input v-model="productsData.customer" type="number" value="">
      </div>
    </div>
    <div>
      <label>
        Fecha
      </label>
      <div>
        <input v-model="productsData.date" type="text" value="">
      </div>
    </div>
    <div>
      <label>
        Consecutivo
      </label>
      <div>
        <input v-model="productsData.consecutive" type="text" value="">
      </div>
    </div>
    <div>
      <ProductInput v-for="(product, index) in products" :key="index" @input-edited="onInputEdited" />
      <button @click="() => (products.push(1))">Agregar producto</button>
    </div>
    <div>
      <button @click="createSale">Crear</button>
    </div>
  </main>
  {{ productsData }}
</template>

<script setup>
import { ref } from 'vue'
import ProductInput from '../components/ProductInput.vue'
import { useFetch } from '@vueuse/core'

const products = ref([1]);
const productsData = ref({ consecutive: '', date: '', customer: '', products: [] });

const onInputEdited = (product) => {
  productsData.value.products.push(product);
}

const createSale = () => {
  const { data, error, onFetchResponse, onFetchError } = useFetch('http://localhost:8000/api/sale/sale/', { updateDataOnError: true }).post(productsData.value).json()
  onFetchResponse((response) => {
    console.log('success .... ', response.status);
    console.log(response.data);
  })

  onFetchError((er) => {
    console.error('er .... ', er);
    console.error('error .... ', error);
    console.error('data .... ', data);
  })
}
</script>