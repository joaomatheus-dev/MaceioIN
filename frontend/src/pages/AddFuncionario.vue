<template>
  <div>
    <h2>Adicionar Funcionário</h2>
    <form @submit.prevent="submitForm">
      <label for="nome">Nome:</label>
      <input type="text" v-model="funcionario.nome" required>
      <label for="setor">Setor:</label>
      <input type="text" v-model="funcionario.setor" required>
      <label for="email">Email:</label>
      <input type="email" v-model="funcionario.email" required>
      <button type="submit">Adicionar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      funcionario: {
        nome: '',
        setor: '',
        email: ''
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('http://localhost:8000/api/funcionarios/', this.funcionario)
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
}

label {
  margin-top: 10px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>