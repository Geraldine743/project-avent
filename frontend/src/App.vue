<script setup>
import { ref, onMounted } from 'vue';

// Variables pour stocker nos données
const apiStatus = ref('Recherche de l\'API en cours...');
const calendars = ref([]);

// Cette fonction se lance toute seule au chargement de la page
onMounted(async () => {
  try {
    // 1. On teste si le serveur Node.js répond
    const responseStatus = await fetch('http://127.0.0.1:3000/');
    apiStatus.value = await responseStatus.text();

    // 2. On demande à l'API de lire la base de données MySQL
    const responseDb = await fetch('http://127.0.0.1:3000/api/admin/calendars');
    const dbResult = await responseDb.json();
    
    if (dbResult.success) {
      calendars.value = dbResult.data;
    }
  } catch (error) {
    apiStatus.value = "Erreur de connexion : L'API est-elle bien allumée ?";
    console.error(error);
  }
});
</script>

<template>
  <main class="container">
    <h1>🎄 Le Calendrier de Michel</h1>
    
    <div class="status-box">
      <strong>Statut du Backend :</strong> {{ apiStatus }}
    </div>

    <div class="database-box">
      <h2>Arbres de Noël en base de données :</h2>
      <ul v-if="calendars.length > 0">
        <li v-for="calendar in calendars" :key="calendar.id">
          {{ calendar.title }} (Créé par l'utilisateur ID: {{ calendar.user_id }})
        </li>
      </ul>
      <p v-else>
        Aucun calendrier n'a encore été créé. La base MySQL est vide, mais elle fonctionne !
      </p>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
.status-box {
  padding: 15px;
  background-color: #2c3e50;
  color: #42b983;
  border-radius: 8px;
  margin-bottom: 20px;
}
.database-box {
  padding: 15px;
  border: 2px dashed #ccc;
  border-radius: 8px;
}
</style>
