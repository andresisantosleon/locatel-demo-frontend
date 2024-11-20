<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-gray-800 text-white">
    <div class="wrapper mx-auto p-4">
      <nav class="flex space-x-4">
        <RouterLink to="/customer-creation" class="hover:text-gray-400">Crear cliente</RouterLink>
        <RouterLink to="/product-creation" class="hover:text-gray-400">Crear producto</RouterLink>
        <RouterLink to="/" class="hover:text-gray-400">Nueva venta</RouterLink>
        <RouterLink to="/view-sales" class="hover:text-gray-400">Ver ventas</RouterLink>
      </nav>
    </div>
  </header>
  <main class="p-4">
    <RouterView />
  </main>
</template>


