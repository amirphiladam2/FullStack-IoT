from flask import Blueprint, request, jsonify
from . import db
from .models import SensorData

main = Blueprint("main", __name__)


@main.route("/health", methods=["GET"])
def health():
    """Simple health check endpoint for frontend connectivity tests."""
    return jsonify({"status": "ok"}), 200


@main.route("/update", methods=["POST"])
def update_data():
    data = request.get_json()

    temp = data.get("temp")
    hum = data.get("hum")

    if temp is None or hum is None:
        return jsonify({"error": "Invalid payload — 'temp' and 'hum' are required"}), 400

    entry = SensorData(temperature=temp, humidity=hum)
    db.session.add(entry)
    db.session.commit()

    return jsonify({"message": "Data stored successfully"}), 200


@main.route("/latest", methods=["GET"])
def get_latest():
    latest = SensorData.query.order_by(SensorData.timestamp.desc()).first()

    if not latest:
        return jsonify({"error": "No data available"}), 404

    return jsonify({
        "temperature": latest.temperature,
        "humidity": latest.humidity,
        "timestamp": latest.timestamp.isoformat(),
    })


@main.route("/data", methods=["GET"])
def get_all():
    limit = request.args.get("limit", 50, type=int)
    entries = SensorData.query.order_by(SensorData.timestamp.asc()).limit(limit).all()

    return jsonify([
        {
            "temperature": e.temperature,
            "humidity": e.humidity,
            "timestamp": e.timestamp.isoformat(),
        }
        for e in entries
    ])