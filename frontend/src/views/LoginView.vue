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