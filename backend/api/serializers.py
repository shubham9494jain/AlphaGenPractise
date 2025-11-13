from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Project, Document, SharedFile, ChatHistory

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_active:
            raise serializers.ValidationError(
                {'error': 'Account not verified. Please verify your email first.'}
            )
        return data

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'project', 'user', 'created_at', 'file_content', 'content_type']

class ProjectSerializer(serializers.ModelSerializer):
    documents = DocumentSerializer(many=True, read_only=True) # Add this line

    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('user',)

class SharedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedFile
        fields = '__all__'

class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = '__all__'
        read_only_fields = ('is_user_message', 'created_at')
