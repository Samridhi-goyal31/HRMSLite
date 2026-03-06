# HRMSLite
HRMS System
for Frontend Setup:
step 1: npm create vite@latest . --template react  
Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript
│
◇  Use Vite 8 beta (Experimental)?:
│  Yes
│
◇  Install with npm and start now?
│  Yes
STEP 2: npm i axios @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom

### BACKEND SETUP

The backend is a Django REST framework application located in the `backend/` folder. Follow these steps to get it running locally:

1. **Create a Python environment** (recommended to use `venv` or `virtualenv`):
   ```bash
   cd backend
   python -m venv venv          # create virtual environment
   source venv/bin/activate     # macOS/Linux
   # or `venv\Scripts\activate` on Windows
   ```

2. **Install dependencies**:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   - Copy `.env.example` (if provided) or create a new `.env` file in `backend/` and set values for `DATABASE_URL`, `SECRET_KEY`, etc.
   - Example:
     ```env
     SECRET_KEY=Test@123
     DEBUG=True
     DJANGO_SECRET=Test@123
     DB_NAME=hrms_db
     DB_USER=YOUR_USER
     DB_PASSWORD=PASSWORD
     DB_HOST=127.0.0.1
     DB_PORT=3306    
     ```

4. **Apply database migrations**:
   ```bash
   python manage.py migrate
   ```

5. **(Optional) Create a superuser**:
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server**:
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://localhost:8000/`.

7. **Running tests**:
   ```bash
   python manage.py test
   ```

These instructions assume you are in the `backend/` directory. Adjust paths accordingly if running commands from the workspace root.

---

