from rest_framework import viewsets, filters,status
from .models import Attendance
from .serializers import AttendanceSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

from hrms.utils import api_response

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['employee__employeeId', 'employee__fullName']

    def create(self, request):

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            attendance = serializer.save()

            return api_response(
                True,
                "Attendance marked successfully",
                self.get_serializer(attendance).data,
                status.HTTP_201_CREATED
            )

        # Extract validation error
        error_message = ""

        for field, errors in serializer.errors.items():
            if field == "non_field_errors":
                error_message = "Attendance already marked for this employee on this date"
            else:
                error_message = errors[0]

            break

        return api_response(
            False,
            error_message,
            None,
            status.HTTP_400_BAD_REQUEST
        )
    
    def list(self, request, *args, **kwargs):

        attendance = Attendance.objects.all()

        serializer = self.get_serializer(attendance, many=True)

        return api_response(
            True,
            "Attendance list fetched successfully",
            serializer.data
        )