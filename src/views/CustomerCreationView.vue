<template>
  <form @submit.prevent="createCustomer" class="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50">
    <fieldset>
      <div class="mb-4">
        <label for="email" class="block mb-2 font-bold">Correo electrónico</label>
        <input v-model="customerData.email" type="email" id="email" required class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <label for="first_name" class="block mb-2 font-bold">Nombre(s)</label>
        <input v-model="customerData.first_name" type="text" id="first_name" required class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <label for="last_name" class="block mb-2 font-bold">Apellido(s)</label>
        <input v-model="customerData.last_name" type="text" id="last_name" required class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <label for="address" class="block mb-2 font-bold">Dirección</label>
        <input v-model="customerData.address" type="text" id="address" required class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <label for="last_name" class="block mb-2 font-bold">Telefono</label>
        <input v-model="customerData.phone" type="text" id="phone" required class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <label for="document_type" class="block mb-2 font-bold">Tipo de documento</label>
        <select v-model="customerData.document_type" id="document_type" required class="w-full p-2 border border-gray-300 rounded">
          <option value="" disabled selected>--------</option>
          <option value="CC">C.C. Cédula de ciudadanía</option>
          <option value="NIT">NIT</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="document_number" class="block mb-2 font-bold">Número documento</label>
        <input v-model="customerData.document_number" type="number" id="document_number" required class="w-full p-2 border border-gray-300 rounded">
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

const customerData = ref({
  email: '',
  first_name: '',
  last_name: '',
  document_type: '',
  document_number: '',
  phone: '',
  address: ''
})

const createCustomer = () => {
  const {data,error,onFetchResponse, onFetchError } = useFetch('http://localhost:8000/api/customer/customer/',{updateDataOnError: true}).post(customerData.value).json()
  onFetchResponse((response) => {
    alert('Cliente creado con éxito');
    for (const [key, value] of Object.entries(customerData.value)) {
      customerData.value[key] = '';
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

