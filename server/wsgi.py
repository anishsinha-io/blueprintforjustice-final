import os
import argparse
from app import create_app

server = create_app()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="setup options")
    parser.add_argument("--development")
    args = parser.parse_args()
    if args.development:
        os.environ["FLASK_ENV"] = "development"
    server.run(port=8888)
