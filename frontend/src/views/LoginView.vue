<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        email: email.value,
        password: password.value
        })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/calendar');
    } else {
        errorMessage.value = data.message || 'Identifiants incorrects';
    }
    } catch (error) {
    errorMessage.value = "Le serveur ne répond pas. Veuillez réessayer plus tard.";
    }
};
</script>

<template>
    <main class="login-container">
        <div class="login-card">
            <h1>Connexion</h1>
            <p class="subtitle">Entrez vos accès pour ouvrir vos cadeaux</p>

            <form @submit.prevent="handleLogin" class="login-form">
                <div class="input-group">
                    <label for="email">Email</label>
                    <input 
                        v-model="email" 
                        type="email" 
                        id="email" 
                        placeholder="michel@noel.com" 
                        required 
                    />
                </div>

                <div class="input-group">
                    <label for="password">Mot de passe</label>
                    <input 
                        v-model="password" 
                        type="password" 
                        id="password" 
                        placeholder="••••••••" 
                        required 
                    />
                </div>

                <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

                <button type="submit" class="btn-submit">Se connecter</button>
            </form>

            <router-link to="/" class="back-link">← Retour à l'accueil</router-link>
        </div>
    </main>
</template>

<style scoped>

.login-container {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #0a2e1a 0%, #165b33 100%);
    padding: 1rem;
}

.login-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2.5rem;
    border-radius: 20px;
    border: 1px solid rgba(212, 175, 55, 0.3);
    width: 100%;
    max-width: 450px;
    text-align: center;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

h1 {
    font-family: 'Mountains of Christmas', cursive;
    color: #d4af37;
    font-size: 3rem;
    margin-bottom: 0.5rem;
}

.subtitle {
    color: #ccc;
    margin-bottom: 2rem;
    font-size: 0.9rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.input-group {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

label {
    color: #d4af37;
    font-weight: bold;
    font-size: 0.9rem;
}

input {
    padding: 0.8rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: white;
    outline: none;
    transition: border-color 0.3s;
}

input:focus {
    border-color: #d4af37;
}

.error-msg {
    color: #ff4d4d;
    font-size: 0.85rem;
    background: rgba(255, 77, 77, 0.1);
    padding: 0.5rem;
    border-radius: 5px;
}

.btn-submit {
    background-color: #c41e3a;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 50px;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: transform 0.2s, background-color 0.3s;
}

.btn-submit:hover {
    background-color: #a31830;
    transform: translateY(-2px);
}

.back-link {
    display: block;
    margin-top: 2rem;
    color: #d4af37;
    text-decoration: none;
    font-size: 0.9rem;
}

@media (min-width: 1024px) {
    .login-card {
        max-width: 550px;
        padding: 4rem;
    }
}
</style>