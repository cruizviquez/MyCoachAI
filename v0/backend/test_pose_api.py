import requests

API_URL = "http://localhost:8000/api/v1/pose/analyze/image"

# Path to a sample image file (replace with your own test image)
image_path = "sample_person.jpg"

# Exercise type to analyze (e.g., 'squat', 'pushup')
exercise_type = "squat"

def main():
    with open(image_path, "rb") as img_file:
        files = {"file": (image_path, img_file, "image/jpeg")}
        data = {"exercise_type": exercise_type}
        response = requests.post(API_URL, files=files, data=data)
        print("Status:", response.status_code)
        print("Response:", response.json())

if __name__ == "__main__":
    main()
