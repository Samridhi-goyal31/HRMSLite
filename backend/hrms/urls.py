from django.urls import path, include

urlpatterns = [
    path('api/v1/', include('employee.urls')),
    path('api/v1/', include('attendance.urls')),
]