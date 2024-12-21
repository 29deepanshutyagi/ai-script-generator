import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from PyPDF2 import PdfReader
from decouple import config


class ScriptGenerateView(APIView):
    def post(self, request):
        prompt = request.data.get('prompt', '')
        files = request.FILES.getlist('files')
        links = request.data.get('links', [])
        
        # Retrieve API key and endpoint from environment variables
        XAI_API_KEY = config("XAI_API_KEY")
        XAI_BASE_URL = "https://api.x.ai/v1/chat/completions"

        # Validate input
        if not prompt and not files and not links:
            return Response(
                {"error": "At least one of 'prompt', 'files', or 'links' is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Extract text from uploaded files (for PDFs)
        extracted_text = ""
        for file in files:
            if file.name.endswith('.pdf'):
                try:
                    reader = PdfReader(file)
                    extracted_text += ''.join([page.extract_text() for page in reader.pages])
                except Exception as e:
                    return Response(
                        {"error": f"Failed to extract text from {file.name}. Error: {str(e)}"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )

        # Combine user prompt with extracted text
        enhanced_prompt = f"{prompt}\n{extracted_text}".strip()

        # Prepare API request payload
        payload = {
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": enhanced_prompt}
            ],
            "model": "grok-beta",
            "stream": False,
            "temperature": 0.7
        }

        # Make API call to X.AI
        try:
            response = requests.post(
                XAI_BASE_URL,
                headers={
                    "Authorization": f"Bearer {XAI_API_KEY}",
                    "Content-Type": "application/json",
                },
                json=payload,
            )
            
            if response.status_code == 200:
                print(response.json())
                return Response(response.json(), status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": response.text}, status=response.status_code
                )
        except Exception as e:
            return Response(
                {"error": f"An error occurred while calling the X.AI API: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
