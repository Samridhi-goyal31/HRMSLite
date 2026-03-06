from rest_framework import serializers
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id','employee','date','status']

    def validate(self, data):
        # unique constraint handled in DB; but nice to check here
        if Attendance.objects.filter(employee=data['employee'], date=data['date']).exists():
            raise serializers.ValidationError("Attendance for this employee on this date already exists.")
        return data