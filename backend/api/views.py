from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Project, Document, SharedFile, ChatHistory
from .serializers import ProjectSerializer, DocumentSerializer, SharedFileSerializer, ChatHistorySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import status
import zipfile
import os
from django.conf import settings

@api_view(['GET']) 
def home_page(request):
    data = {
        "message": "Hello, Lala! Ye React ke liye Django API se aa raha hai."
    }
    return Response(data)

from django.contrib.auth.models import User
from django.core.cache import cache
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.utils.crypto import get_random_string
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name')

    if not email or not password or not name:
        return Response({'error': 'Please provide all fields'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=email, email=email, password=password, first_name=name, is_active=False)

    otp = get_random_string(length=6, allowed_chars='1234567890')
    cache.set(email, otp, timeout=600)

    subject = 'Your OTP for AlphaGen'
    from_email = 'shubham.mct265@gmail.com'
    to = [email]

    text_content = f'Your OTP is: {otp}'
    html_content = render_to_string('api/otp_email.html', {'otp': otp})

    msg = EmailMultiAlternatives(subject, text_content, from_email, to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()

    return Response({'message': 'OTP sent to your email. Please verify.'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if not email or not otp:
        return Response({'error': 'Please provide both email and OTP'}, status=status.HTTP_400_BAD_REQUEST)

    cached_otp = cache.get(email)

    if not cached_otp:
        return Response({'error': 'OTP expired or invalid'}, status=status.HTTP_400_BAD_REQUEST)

    if otp != cached_otp:
        return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user.is_active = True
    user.save()
    cache.delete(email)

    return Response({'message': 'Account verified successfully. You can now login.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def resend_otp(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if user.is_active:
        return Response({'message': 'This account is already active.'}, status=status.HTTP_400_BAD_REQUEST)

    otp = get_random_string(length=6, allowed_chars='1234567890')
    cache.set(email, otp, timeout=600)

    subject = 'Your New OTP for AlphaGen'
    from_email = 'shubham.mct265@gmail.com'
    to = [email]

    text_content = f'Your new OTP is: {otp}'
    html_content = render_to_string('api/otp_email.html', {'otp': otp})

    msg = EmailMultiAlternatives(subject, text_content, from_email, to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()

    return Response({'message': 'A new OTP has been sent to your email.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    access_token = request.data.get('access_token')
    if not access_token:
        return Response({'error': 'Access token not provided'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        idinfo = id_token.verify_oauth2_token(access_token, requests.Request())
        email = idinfo['email']
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email,
                'first_name': first_name,
                'last_name': last_name,
                'is_active': True
            }
        )

        if created:
            user.set_unusable_password()
            user.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

    except ValueError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    otp = get_random_string(length=6, allowed_chars='1234567890')
    cache.set(f'password_reset_{email}', otp, timeout=600)

    subject = 'Your Password Reset OTP for AlphaGen'
    from_email = 'shubham.mct265@gmail.com'
    to = [email]

    text_content = f'Your password reset OTP is: {otp}'
    html_content = render_to_string('api/otp_email.html', {'otp': otp, 'title': 'Password Reset OTP'})

    msg = EmailMultiAlternatives(subject, text_content, from_email, to)
    msg.attach_alternative(html_content, "text/html")
    msg.send()

    return Response({'message': 'A password reset OTP has been sent to your email.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_verify(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if not email or not otp:
        return Response({'error': 'Please provide both email and OTP'}, status=status.HTTP_400_BAD_REQUEST)

    cached_otp = cache.get(f'password_reset_{email}')

    if not cached_otp:
        return Response({'error': 'OTP expired or invalid'}, status=status.HTTP_400_BAD_REQUEST)

    if otp != cached_otp:
        return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

    token = get_random_string(length=32)
    cache.set(f'password_reset_token_{email}', token, timeout=600)
    cache.delete(f'password_reset_{email}')

    return Response({'message': 'OTP verified successfully.', 'token': token}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    email = request.data.get('email')
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    if not email or not token or not new_password:
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

    reset_token = cache.get(f'password_reset_token_{email}')

    if not reset_token or token != reset_token:
        return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user.set_password(new_password)
    user.save()
    cache.delete(f'password_reset_token_{email}')

    return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def upload_document(self, request, pk=None):
        project = self.get_object()
        files = request.FILES.getlist('file')

        if not files:
            return Response({'error': 'No files provided'}, status=status.HTTP_400_BAD_REQUEST)

        for f in files:
            file_content = f.read()
            content_type = f.content_type
            
            document = Document(
                project=project,
                user=request.user,
                name=f.name,
                file_content=file_content,
                content_type=content_type
            )
            document.save()
        
        return Response({'message': 'Documents uploaded successfully'}, status=status.HTTP_201_CREATED)


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Document.objects.filter(user=self.request.user)
        project_id = self.request.query_params.get('project', None)
        if project_id is not None:
            queryset = queryset.filter(project__id=project_id)
        return queryset

    def perform_create(self, serializer):
        # This will be handled by the upload_document action in ProjectViewSet
        project_id = self.request.data.get('project')
        project = Project.objects.get(id=project_id, user=self.request.user)
        serializer.save(user=self.request.user, project=project)

class SharedFileViewSet(viewsets.ModelViewSet):
    serializer_class = SharedFileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SharedFile.objects.filter(user=self.request.user)

class ChatHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = ChatHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ChatHistory.objects.filter(file__user=self.request.user)