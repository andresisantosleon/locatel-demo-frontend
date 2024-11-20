<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Fecha
      </label>
      <input v-model="date" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    <div class="mb-6">
      <button @click="serch" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Buscar
      </button>
    </div>

    <div v-for="(item, index) in sales" :key="index" class="mb-8 bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fecha</th>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cliente</th>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Consecutivo</th>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subtotal</th>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">IVA</th>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.date }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.customer }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.consecutive }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.subtotal }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.iva }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ item.subtotal + item.iva }}</td>
          </tr>
        </tbody>
      </table>
      <table class="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Código</th>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cantidad</th>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Precio</th>
            <th class="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">% IVA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, pIndex) in item.saleproduct_set" :key="pIndex">
            <td class="py-2 px-4 border-b border-gray-200">{{ product.code }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.name }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.quantity }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.price }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.iva }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

const date = ref('');
const sales = ref([]);

const serch = () => {
  const { data, error, onFetchResponse, onFetchError } = useFetch(`http://localhost:8000/api/sale/sale/?date=${date.value}`, { updateDataOnError: true }).get().json()
  onFetchResponse((response) => {
    sales.value = data.value;
  })

  onFetchError((er) => {
    alert('Error al buscar las ventas: ' + er)
  })
}

</script>