from django.urls import path, include
from . import views  # '.' matlab 'isi folder se views.py'
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'documents', views.DocumentViewSet, basename='document')
router.register(r'shared-files', views.SharedFileViewSet, basename='sharedfile')
router.register(r'chat-history', views.ChatHistoryViewSet, basename='chathistory')

urlpatterns = [
    # Jab URL khaali ho (''), tab 'views.home_page' function chalao
    path('', views.home_page, name='home'),
    path('register/', views.register, name='register'),
    path('verify-otp/', views.verify_otp, name='verify-otp'),
    path('resend-otp/', views.resend_otp, name='resend-otp'),
    path('password-reset-request/', views.password_reset_request, name='password-reset-request'),
    path('password-reset-verify/', views.password_reset_verify, name='password-reset-verify'),
    path('password-reset-confirm/', views.password_reset_confirm, name='password-reset-confirm'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/google/', views.google_login, name='google_login'),
    path('logout/', views.logout, name='logout'),
    path('', include(router.urls)),
]