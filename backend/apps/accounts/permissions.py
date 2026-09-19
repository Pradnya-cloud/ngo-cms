from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdmin(BasePermission):
    """Full access only for role='admin'."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == "admin")


class IsAdminOrReadOnly(BasePermission):
    """Anyone can read public content; only Admin can create/edit/delete."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.role == "admin")


class CanCreateOrAdminOnly(BasePermission):
    """Anyone can create (POST); only Admin can read, update, or delete."""

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return bool(request.user and request.user.is_authenticated and request.user.role == "admin")