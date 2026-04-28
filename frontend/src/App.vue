<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
/* Styles globaux (accessibles dans toute l'app) */
:root {
  --rouge-noel: #C41E3A;
  --vert-sapin: #165B33;
  --vert-sombre: #0a2e1a;
  --or: #D4AF37;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--vert-sombre);
  color: white;
}

/* On s'assure que le conteneur de l'app prend toute la place */
#app {
  width: 100%;
}
</style>
