from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Document(models.Model):
    name = models.CharField(max_length=255)
    file_content = models.BinaryField(null=True)
    content_type = models.CharField(max_length=100, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='documents')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class SharedFile(models.Model):
    file = models.ForeignKey(Document, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    permission = models.CharField(max_length=10, choices=[('view', 'View'), ('edit', 'Edit')], default='view')

    def __str__(self):
        return f'{self.file.name} shared with {self.user.username}'

class ChatHistory(models.Model):
    file = models.ForeignKey(Document, on_delete=models.CASCADE)
    message = models.TextField()
    is_user_message = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Chat for {self.file.name}'