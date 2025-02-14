import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import AddFuncionario from './pages/AddFuncionario.vue';
import EditFuncionario from './pages/EditFuncionario.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/add-funcionario',
    name: 'AddFuncionario',
    component: AddFuncionario,
  },
  {
    path: '/edit-funcionario/:id',
    name: 'EditFuncionario',
    component: EditFuncionario,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
