<template>
  <form @submit.prevent="createProduct" class="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50">
    <fieldset>
      <div class="mb-4">
        <label for="code" class="block mb-2 font-bold">Codigo</label>
        <input v-model="productData.code" type="code" id="code" required class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <label for="name" class="block mb-2 font-bold">Nombre</label>
        <input v-model="productData.name" type="text" id="name" required class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <label for="price" class="block mb-2 font-bold">Precio</label>
        <input v-model="productData.price" type="number" id="price" required class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <label for="iva" class="block mb-2 font-bold">% IVA (opcional)</label>
        <input v-model="productData.iva" type="number" id="phone" class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <button type="submit" class="inline-block px-6 py-3 border-none rounded bg-blue-500 text-white text-lg cursor-pointer hover:bg-blue-700">Crear</button>
      </div>
    </fieldset>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

const productData = ref({
  code: '',
  name: '',
  price: '',
  iva: '',
})

const createProduct = () => {
  const productDataClean = { ...productData.value }
  if (!productDataClean.iva) {
    delete productDataClean.iva
  }

  const {data,error,onFetchResponse, onFetchError } = useFetch('http://localhost:8000/api/sale/product/',{updateDataOnError: true}).post(productDataClean).json()
  onFetchResponse((response) => {
    alert('Producto creado con éxito');
    for (const [key, value] of Object.entries(productData.value)) {
      productData.value[key] = '';
    }
  })

  onFetchError((er) => {
    let message = '';
    for (const [key, value] of Object.entries(data.value)) {
      message += `${key}: ${value[0]}\n`;
    }
    alert(message);
  })
}

</script>

