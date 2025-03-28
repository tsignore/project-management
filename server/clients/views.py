from django.http import JsonResponse
from .models import CLIENTS

def get_clients(request):
    clients_data = [{'id': client.id, 'name': client.name, 'email': client.email, 'phone': client.phone} for client in CLIENTS]
    return JsonResponse(clients_data, safe=False)

def get_client(request, client_id):
    client = next((client for client in CLIENTS if client.id == client_id), None)
    if client:
        return JsonResponse({'id': client.id, 'name': client.name, 'email': client.email, 'phone': client.phone})
    else:
        return JsonResponse({'error': 'Client not found'}, status=404)
