@echo off
call backend\venv\Scripts\activate
python backend/manage.py runserver
