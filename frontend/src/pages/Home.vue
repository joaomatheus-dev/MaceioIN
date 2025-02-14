<script>
import { useAuthStore } from '../store/auth.js'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    return {
      authStore, router
    }
  },
  data() {
    return {
      funcionarios: []
    }
  },
  methods: {
    async logout() {
      try {
        await this.authStore.logout(this.$router),
        this.$router.push("/")
      } catch (error) {
        console.error(error)
      }
    },
    async fetchFuncionarios() {
      try {
        const response = await axios.get('http://localhost:8000/api/funcionarios/')
        this.funcionarios = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async deleteFuncionario(id) {
      try {
        await axios.delete(`http://localhost:8000/api/funcionarios/${id}/`)
        this.fetchFuncionarios()
      } catch (error) {
        console.error(error)
      }
    }
  },
  async mounted() {
    await this.authStore.fetchUser()
    await this.fetchFuncionarios()
  }
}
</script>

<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <img src="../images/logo-removebg-preview.png" alt="MaceioIN" class="logo" />
        <div></div>
        <button class="login-btn" v-if="!authStore.isAuthenticated" @click="router.push('/login')">Login</button>
        <button class="logout-btn" v-if="authStore.isAuthenticated" @click="logout">Logout</button>
      </div>
    </header>

    <h1 class="orange-text">Bem-vindo!</h1>
    <div v-if="authStore.isAuthenticated">
    </div>
    <p class="orange-bg">A Secretaria de Fazenda de Maceió é o órgão responsável pela gestão financeira, tributária e contábil do município. Suas principais atividades incluem a arrecadação de impostos municipais, como IPTU e ISS, a fiscalização de obrigações tributárias e a administração dos recursos públicos. O objetivo é garantir a sustentabilidade econômica do município, promovendo o uso eficiente e transparente dos recursos para o desenvolvimento de políticas públicas.<br>

    Além da arrecadação, a Secretaria atua no planejamento e execução do orçamento municipal, controlando despesas e receitas para assegurar o equilíbrio fiscal. Também realiza auditorias e inspeções, garantindo a legalidade e a eficiência na aplicação dos recursos. A contabilidade pública é outra área de destaque, com a elaboração de relatórios e demonstrações contábeis para prestação de contas aos órgãos de controle.<br>

    A Secretaria de Fazenda ainda oferece serviços de atendimento ao contribuinte, como emissão de guias, parcelamento de débitos e orientações fiscais. Com o uso de tecnologias modernas, busca agilizar processos e aumentar a transparência, fortalecendo a relação com os cidadãos e incentivando a conscientização sobre a importância dos tributos para o crescimento de Maceió.</p>

    <div>
      <h2>Funcionários</h2>
      <table>
        <thead class = "thead-color">
          <tr>
            <th>Nome</th>
            <th>Setor</th>
            <th>Email</th>
            <th v-if="authStore.isAuthenticated">Ações</th>
          </tr>
        </thead>
        <tbody class= "tbody-color">
          <tr v-for="funcionario in funcionarios" :key="funcionario.id">
            <td>{{ funcionario.nome }}</td>
            <td>{{ funcionario.setor }}</td>
            <td>{{ funcionario.email }}</td>
            <td v-if="authStore.isAuthenticated">
              <button v-if="authStore.isAuthenticated" @click="router.push(`/edit-funcionario/${funcionario.id}`)">Editar</button>
              <button v-if="authStore.isAuthenticated" @click="deleteFuncionario(funcionario.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class= "btn-add-color" v-if="authStore.isAuthenticated" @click="router.push('/add-funcionario')">Adicionar Funcionário</button>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  padding-top: 100px;
}

.header {
  background-color: #14467c;
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center; 
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  height: auto;
  width: 150px;
}

.login-btn {
  padding: 10px 20px;
  color: white;
  background-color: #14467c;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 255, 0.6); 
}

.login-btn:hover {
  background-color: #f58428;
  color: white;
  box-shadow: 0 8px 10px rgba(0, 0, 255, 0.7)
}

.logout-btn {
  padding: 10px 20px;
  background-color: red; 
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: white;
}

.logout-btn:hover {
  background-color: darkred;
}

h1 {
  text-align: center;
  margin-top: 20px; 
}

p {
  text-align: center;
}

.orange-text{
  color: #f58428;
  text-shadow: 3px 3px 2px #f89880;
}

.orange-bg {
  color: white;
  text-shadow: 1px 1px 2px pink;
  background-color: orange;
  padding: 10px;
  margin: 20px auto;
  width: 80%;
  border-radius: 5px;
}

table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #14467c;
  padding: 8px;
  text-align: left;
}

th {
  background-color:#f58428;
}

.btn-add-color{
  background-color: #14467c;
}

.btn-add-color:hover{
  background-color: #f58428;
}

button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>