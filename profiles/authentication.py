from django.contrib.auth.backends import BaseBackend, ModelBackend
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User


class EmailAuthBackend(object):
    def authenticate(self, request,  username=None, password=None):
        print('ok')
        try:
            user = User.objects.get(email=username)
            if user.check_password(password):
                return user
            return None
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        print('ok2')
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
