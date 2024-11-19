<template>
  <main>
    <div>
      <label>
        Fecha
      </label>
      <input v-model="date" type="text">
    </div>
    <div><button @click="serch">Buscar</button></div>

    <div v-for="(item, index) in sales" :key="index">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Consecutivo</th>
            <th>Subtotal</th>
            <th>IVA</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ item.date }}</td>
            <td>{{ item.customer }}</td>
            <td>{{ item.consecutive }}</td>
            <td>{{ item.subtotal }}</td>
            <td>{{ item.iva }}</td>
            <td>{{ item.subtotal + item.iva }}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>% IVA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, pIndex) in item.saleproduct_set" :key="pIndex">
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.iva }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

const date = ref('');
const sales = ref([]);

const serch = () => {
  const { data, error, onFetchResponse, onFetchError } = useFetch(`http://localhost:8000/api/sale/sale/?date=${date.value}`, { updateDataOnError: true }).get().json()
  onFetchResponse((response) => {
    console.log('success .... ', response.status);
    console.log('success .2.. ', response);
    console.log('success .3.. ', data.value);
    console.log(response.data);
    sales.value = data.value;
  })

  onFetchError((er) => {
    console.error('er .... ', er);
    console.error('error .... ', error);
    console.error('data .... ', data);
  })
}

</script>