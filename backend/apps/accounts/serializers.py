from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "full_name", "role", "is_active", "date_joined"]
        read_only_fields = ["id", "date_joined"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["email", "full_name", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
        )
        user.full_name = validated_data.get("full_name", "")
        user.role = "editor"
        user.save()
        return user


class LoginSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["user_id"] = user.pk
        token["role"] = user.role
        return token