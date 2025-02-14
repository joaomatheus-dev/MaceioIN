from django.db import models


class Funcionario(models.Model):
    nome = models.CharField(max_length=100)
    setor = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.nome
