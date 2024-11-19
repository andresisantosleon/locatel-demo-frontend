<template>
  <div>
    <input 
      type="text" 
      v-model="Product.product" 
      @input="onInputEdited" 
      placeholder="Ingrese ID de producto" 
    />
    <input 
      type="number" 
      v-model="Product.quantity" 
      @input="onInputEdited" 
      placeholder="Ingrese cantidad" 
    />
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['input-edited'])
const Product = ref({product: '',quantity: ''})

const onInputEdited = () => {
  if (Product.value.product === '' || Product.value.quantity === '') return
  emit('input-edited', Product.value)
}
</script>

<style scoped>
</style>
