<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin">
    <!-- email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input
        ref="emailInputRef"
        v-model="myFrom.email"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        ref="passwordInputRef"
        v-model="myFrom.password"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input
        v-model="myFrom.rememberMe"
        type="checkbox"
        id="remember"
        name="remember"
        class="text-blue-500"
      />
      <label for="remember" class="text-gray-600 ml-2">Recordar Usuario</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvidaste la contraseña?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Ingresar
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Crear Cuenta</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const toast = useToast();
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

// const email = ref('')
const myFrom = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const onLogin = async () => {
  if (myFrom.email === '') {
    return emailInputRef.value?.focus();
  }
  if (myFrom.password.length < 6) {
    return passwordInputRef.value?.focus();
  }
  if (myFrom.rememberMe) {
    localStorage.setItem('email', myFrom.email);
  } else {
    localStorage.removeItem('email');
  }

  const ok = await authStore.login(myFrom.email, myFrom.password);
  if (ok) return;
  toast.error('Usuario o contraseñá no son correctos');
  console.log({ ok });
};

watchEffect(() => {
  const email = localStorage.getItem('email');

  if (email) {
    myFrom.email = email;
    myFrom.rememberMe = true;
  }
});
</script>
