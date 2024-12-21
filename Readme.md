
# Project Setup

This project consists of two main parts: the **frontend** and the **backend**. The backend is built using Python and requires a virtual environment to manage dependencies. The frontend is built using React.

## **Backend Setup** (Python)

### 1. **Set Up Virtual Environment**

Navigate to the **backend** directory:

```bash
cd backend
```

Create a virtual environment in the backend directory:

```bash
python3 -m venv venv
```

Activate the virtual environment:

- For **Linux/macOS**:

  ```bash
  source venv/bin/activate
  ```

- For **Windows**:

  ```bash
  venv\Scripts\activate
  ```

### 2. **Install Dependencies**

Install the required Python dependencies from `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 3. **Run Database Migrations**

If your project uses Django, run the following commands to create the necessary database tables:

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. **Generate API Key for X and Grok**

You may need to generate API keys for external services like **X (formerly Twitter)** and **Grok**. Follow these steps:

#### For **X** (formerly Twitter):
1. Go to the [Twitter Developer Portal](https://developer.twitter.com/) and log in.
2. Create a new project and obtain the API keys from the "Keys and tokens" section.
3. Add the API keys (API key, API secret, Access token, Access token secret) to your environment variables or settings in the backend.

#### For **Grok**:
1. Sign up on [Grok](https://www.grok.ai/) if you haven't already.
2. Go to the developer console to generate an API key.
3. Add the Grok API key to your environment variables or settings in the backend.

Make sure that these keys are properly set in your backend, either in `settings.py` or `.env` files.

### 5. **Run the Backend Server**

To start the backend server, use the following command:

```bash
python manage.py runserver
```

This will run the backend API on `http://127.0.0.1:8000/`.

---

## **Frontend Setup** (React)

### 1. **Install Dependencies**

Navigate to the **frontend** directory:

```bash
cd frontend
```

Install the necessary dependencies:

```bash
npm install
```

### 2. **Configure API URL in the Frontend**

In the frontend React app, make sure the API URL points to your local backend server (`http://127.0.0.1:8000/`). You can set this in a `.env` file:

Create a `.env` file in the root of the **frontend** folder with the following content:

```bash
REACT_APP_API_URL=http://127.0.0.1:8000/api/generate-script
```

### 3. **Run the Frontend Server**

Start the frontend development server using the following command:

```bash
npm start
```

This will run the frontend React application at `http://localhost:5173`.

---

## **Features Implemented**

### 1. **Generate Video Scripts**
   Users can input a prompt and upload files. The backend processes these inputs and generates a script, which is then displayed in the frontend.

### 2. **Save and Retrieve Scripts**
   - Scripts are saved with a unique identifier (`pdf_name`), allowing users to retrieve them later.

### 3. **Multi-Language Script Generation**
   Users can select the desired language for the generated script. This feature utilizes the backend to process language selection.

### 4. **Export Options**
   - Users can download generated scripts as `.txt` or `.pdf` files.

---

## **Running the Project Locally**

Follow these steps to run the entire project locally:

1. **Set up the backend** as described above (create virtual environment, install dependencies, run migrations, and start the server).
2. **Set up the frontend** by navigating to the **frontend** folder, installing dependencies, and running the development server.
3. The **frontend** will be accessible at `http://localhost:5173`, and the **backend** API will be accessible at `http://127.0.0.1:8000`.

---

## **Bonus Features**

1. **Multi-Language Support**: Users can generate scripts in different languages by selecting the desired language option before generating the script.
   
2. **Export Options**: Users can export the generated script as either a `.txt` or `.pdf` file for offline access or printing.

---

## **Contributing**

Feel free to fork the repository and submit pull requests. Contributions to the project are always welcome!

---

