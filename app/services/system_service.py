import psutil

def get_system_info():
    return {
        'cpu_usage_percent': psutil.cpu_percent(interval=1),
        'cpu_count': psutil.cpu_count(),
        'status': 'success'
    } 