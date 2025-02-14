<template>
  <div>
    <h2>Editar Funcionário</h2>
    <form @submit.prevent="submitForm">
      <label for="nome">Nome:</label>
      <input type="text" v-model="funcionario.nome" required>
      <label for="setor">Setor:</label>
      <input type="text" v-model="funcionario.setor" required>
      <label for="email">Email:</label>
      <input type="email" v-model="funcionario.email" required>
      <button type="submit">Salvar</button>
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
  async created() {
    const id = this.$route.params.id
    const response = await axios.get(`http://localhost:8000/api/funcionarios/${id}/`)
    this.funcionario = response.data
  },
  methods: {
    async submitForm() {
      try {
        await axios.put(`http://localhost:8000/api/funcionarios/${this.funcionario.id}/`, this.funcionario)
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