from flask import Blueprint, jsonify
from app.services.system_service import get_system_info

system_bp = Blueprint('system', __name__, url_prefix='/system')

@system_bp.route('/cpu', methods=['GET'])
def cpu_info():
    return jsonify(get_system_info()) 