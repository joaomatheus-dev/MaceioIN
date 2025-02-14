from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import FuncionarioViewSet

router = DefaultRouter()
router.register(r"funcionarios", FuncionarioViewSet)

urlpatterns = [
    path("/set-csrf-token", views.set_csrf_token, name="set_csrf_token"),
    path("/login", views.login_view, name="login"),
    path("/logout", views.logout_view, name="logout"),
    path("/user", views.user, name="user"),
    path("/register", views.register, name="register"),
    path("/", include(router.urls)),
]
