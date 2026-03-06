from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Employee
from .serializers import EmployeeSerializer
from hrms.utils import api_response

# Create your views here.
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.filter(is_deleted=False)
    serializer_class = EmployeeSerializer


    def create(self, request):

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            employee = serializer.save()

            return api_response(
                True,
                "Employee added successfully",
                self.get_serializer(employee).data,
                status.HTTP_201_CREATED
            )

        # Extract first validation error
        error_message = ""

        for field, errors in serializer.errors.items():
            error_message = errors[0]
            break

        return api_response(
            False,
            error_message,
            None,
            status.HTTP_400_BAD_REQUEST
        )
    
    def list(self, request, *args, **kwargs):

        employees = Employee.objects.filter(is_deleted=False)

        serializer = self.get_serializer(employees, many=True)

        return api_response(
            True,
            "Employee list fetched successfully",
            serializer.data
        )
    
    def destroy(self, request, pk=None):

        try:

            employee = Employee.objects.get(pk=pk, is_deleted=False)

            employee.is_deleted = True
            employee.save()

            return api_response(
                True,
                "Employee deleted successfully",
                None,
                status.HTTP_200_OK
            )

        except Employee.DoesNotExist:

            return api_response(
                False,
                "Employee not found",
                None,
                status.HTTP_404_NOT_FOUND
            )