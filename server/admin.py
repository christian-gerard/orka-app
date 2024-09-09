from django.contrib import admin
from server.models.User import User
from server.models.Account import Account

admin.site.register(User)
admin.site.register(Account)