<template>
  <div class="p-4 flex space-x-4">
    <div class="w-full">
      <label for="product" class="block mb-2">ID de producto</label>
      <select 
        id="product"
        v-model="Product.product" 
        @change="onInputEdited" 
        class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Seleccione un producto</option>
        <option v-for="product in products" :key="product.id" :value="product.id">
          {{ product.name }}
        </option>
      </select>
    </div>
    <div class="w-full">
      <label for="quantity" class="block mb-2">Cantidad</label>
      <input 
        id="quantity"
        type="number" 
        v-model="Product.quantity" 
        @input="onInputEdited" 
        placeholder="Ingrese cantidad" 
        class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'

const products = ref([]);

onMounted(() => {
  const { data, error, onFetchResponse, onFetchError } = useFetch('http://localhost:8000/api/sale/product/', { updateDataOnError: true }).get().json()
  onFetchResponse((response) => {
    products.value = data.value;
  })

  onFetchError((er) => {
    alert('Error al cargar los productos');
  })
})

const emit = defineEmits(['input-edited'])
const Product = ref({product: '',quantity: ''})

const onInputEdited = () => {
  if (Product.value.product === '' || Product.value.quantity === '') return
  emit('input-edited', Product.value)
}
</script>

<style scoped>
</style>
