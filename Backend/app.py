from app import create_app
from flask import Flask, jsonify
import traceback

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5001)


@app.errorhandler(Exception)
def handle_exception(e):
    """Return JSON instead of default HTML error page."""
    error_trace = traceback.format_exc()  # Get full error traceback
    print(error_trace)  # Print to terminal

    response = {
        "error": str(e),
        # Include traceback in API response (for debugging)
        "traceback": error_trace
    }
    return jsonify(response), 500  # Return 500 status code