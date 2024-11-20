<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="mb-4">
      <label for="customer" class="block text-gray-700 text-sm font-bold mb-2">
        Cliente
      </label>
      <div>
      <select id="customer" v-model="productsData.customer" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option v-for="customer in customers" :key="customer.id" :value="customer.id">
          {{ customer.first_name }} {{ customer.last_name }} {{ customer.document_type }}-{{ customer.document_number }}
        </option>
      </select>
      </div>
    </div>
    <div class="mb-4">
      <label for="date" class="block text-gray-700 text-sm font-bold mb-2">
        Fecha
      </label>
      <div>
        <input id="date" v-model="productsData.date" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ingrese la fecha">
      </div>
    </div>
    <div class="mb-4">
      <label for="consecutive" class="block text-gray-700 text-sm font-bold mb-2">
        Consecutivo
      </label>
      <div>
        <input id="consecutive" v-model="productsData.consecutive" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ingrese el consecutivo">
      </div>
    </div>
    <div class="mb-4">
      <ProductInput v-for="(product, index) in products" :key="index" @input-edited="onInputEdited" />
      <button @click="() => (products.push(1))" class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Agregar producto</button>
    </div>
    <div>
      <button @click="createSale" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Crear</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductInput from '../components/ProductInput.vue'
import { useFetch } from '@vueuse/core'

const products = ref([1]);
const productsData = ref({ consecutive: '', date: '', customer: '', products: [] });

const customers = ref([]);

onMounted(() => {
  const { data, error, onFetchResponse, onFetchError } = useFetch('http://localhost:8000/api/customer/customer/', { updateDataOnError: true }).get().json()
  onFetchResponse((response) => {
    customers.value = data.value;
  })

  onFetchError((er) => {
    alert('Error al cargar los clientes');
  })
})

const onInputEdited = (product) => {
  productsData.value.products = productsData.value.products.filter(p => p.product !== product.product);
  productsData.value.products.push(product);
}

const createSale = () => {
  const { data, error, onFetchResponse, onFetchError } = useFetch('http://localhost:8000/api/sale/sale/', { updateDataOnError: true }).post(productsData.value).json()
  onFetchResponse((response) => {
    alert('Venta creada con exito');
    for (const [key, value] of Object.entries(productsData.value)) {
      productsData.value[key] = typeof value === 'string' ? '' : [];
      products.value = [];
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