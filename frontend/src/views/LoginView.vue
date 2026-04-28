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