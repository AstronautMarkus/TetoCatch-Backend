from flask import Blueprint, request, jsonify
from .services.youtube_service import get_youtube_info

bp = Blueprint('routes', __name__)

@bp.route('/youtube', methods=['POST'])
def youtube():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400
    response = get_youtube_info(url)
    return jsonify(response)