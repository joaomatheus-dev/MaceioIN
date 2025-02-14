<template>
  <div class="login">
    <h1 class= "set-blue">Login</h1>
    <form @submit.prevent="login">
      <div>
        <label class="set-orange" for="email">Email:</label>
        <input
          v-model="email"
          id="email"
          type="text"
          required
          @input="resetError"
        />
      </div>
      <div>
        <label  class="set-orange" for="password">Senha:</label>
        <input
          v-model="password"
          id="password"
          type="password"
          required
          @input="resetError"
        />
      </div>
      <button class = "login-btn" type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { useAuthStore } from '../store/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      await this.authStore.login(this.email, this.password, this.$router);
      if (!this.authStore.isAuthenticated) {
        this.error = 'Login failed. Please check your credentials.';
      }
    },
    resetError() {
      this.error = '';
    },
  },
};
</script>

<style scoped>

.set-blue{
color : #14467c
}

.set-orange{
color : #f58428
}

.login-btn{
  color: white;
  background-color: #14467c;
  box-shadow: 0 8px 10px rgba(0, 0, 255, 0.7)
}

.login-btn:hover {
  background-color: #f58428;
  color: white;
  box-shadow: 0 8px 10px rgba(0, 0, 255, 0.7)
}

</style>