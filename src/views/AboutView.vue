<template>
  <fieldset>
    <div>
      <label>
        Correo electrónico
      </label>
      <div>
        <input v-model="customerData.email" type="email" value="">
      </div>
    </div>

    <div>
      <label>
        Nombre(s)
      </label>
      <div>
        <input v-model="customerData.first_name" type="text" value="">
      </div>
    </div>

    <div>
      <label>
        Apellido(s)
      </label>
      <div>
        <input v-model="customerData.last_name" type="text" value="">
      </div>
    </div>

    <div>
      <label>
        Tipo de documento
      </label>
      <div>
        <select v-model="customerData.document_type">
          <option value="" selected="">--------</option>
          <option value="CC">C.C. Cédula de ciudadanía</option>
          <option value="NIT">NIT</option>
        </select>
      </div>
    </div>

    <div>
      <label>
        Número documento
      </label>
      <div>
        <input v-model="customerData.document_number" type="text" value="">
      </div>
    </div>

    <div>
      <button @click="createCustomer">Crear</button>
    </div>
  </fieldset>

  {{ customerData }}
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

const customerData = ref({
  email: '',
  first_name: '',
  last_name: '',
  document_type: '',
  document_number: ''
})


// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// const createCustomer = async () => {
//   await axios.get('http://localhost:8000/api/customer/customer/'
//   ).then(function (response) {
//     console.log(response);
//   })
//     .catch(function (error) {
//       console.log(error);
//     });

// }

const createCustomer = () => {
  const {data,error,onFetchResponse, onFetchError } = useFetch('http://localhost:8000/api/customer/customer/',{updateDataOnError: true}).post(customerData.value).json()
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

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
