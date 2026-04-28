<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <main class="home-container">
    <header class="hero">
      <h1>Osez Noël</h1>
      <div class="snowflake-divider">❄ ❄ ❄</div>
    </header>

    <section class="description">
      <div class="card">
        <h2>Comment ça marche ?</h2>
        <p>
          Découvrez chaque jour une nouvelle surprise en attendant le 25 décembre. 
          Un calendrier magique conçu pour vous faire patienter avec le sourire !
        </p>
      </div>

      <div class="card">
        <h2>Comment créer le vôtre ?</h2>
        <p>
          C'est simple : créez un compte, connectez-vous et accédez instantanément 
          à votre grille personnalisée. <strong>Attention :</strong> interdiction de tricher, 
          les cases ne s'ouvrent qu'au bon moment !
        </p>
      </div>
    </section>

    <footer class="actions">
      <button @click="goToRegister" class="btn btn-primary">S'inscrire</button>
      <button @click="goToLogin" class="btn btn-secondary">Connexion</button>
    </footer>
  </main>
</template>

<style scoped>

.home-container {
  min-height: 100vh;
  width: 100vw; 
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #0a2e1a 0%, #165b33 100%);
  background-attachment: fixed; 
}

.hero h1 {
  font-size: 3rem;
  font-family: 'Mountains of Christmas', cursive;
  color: #d4af37;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
}

.snowflake-divider {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.description {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  backdrop-filter: blur(5px);
}

.card h2 {
  color: #d4af37;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.actions {
  margin-top: auto;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}

.btn {
  padding: 1rem;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary { background-color: #c41e3a; color: white; }
.btn-secondary { border: 2px solid #d4af37; color: #d4af37; background: transparent; }


@media (min-width: 1024px) { 
  .home-container {
    padding: 4rem 0; 
  }

  .hero {
    width: 100%; 
    text-align: center;
  }

  .hero h1 {
    font-size: 10rem; 
    width: 100%;
    margin: 0 auto;
  }

  .description {
    flex-direction: row;
    justify-content: center;
    max-width: 100%; 
    width: 95%;      
    gap: 5rem;
    padding: auto;
  }

  .card {
    transition: transform 0.3s ease;
    flex: 1;
    max-width: 600px;
  }

  .card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    margin-top: 6rem;
  }
  
  .btn {
    width: 800px; 
  }
}
</style>
