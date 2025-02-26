from flask import Flask

def create_app():
    app = Flask(__name__)
    
    # Route'ları kaydet
    from app.routes.main_routes import main_bp
    from app.routes.system_routes import system_bp
    
    app.register_blueprint(main_bp)
    app.register_blueprint(system_bp)
    
    # Hata yönetimi
    from flask import jsonify
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Endpoint bulunamadı',
            'status_code': 404
        }), 404
    
    return app 