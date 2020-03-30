
A website that allows registered user to create stories and make them visible to everyone.
<div style="display:flex;">
<img width="200" alt="Zrzut ekranu 2020-03-19 o 20 25 57" src="https://user-images.githubusercontent.com/44299056/77107205-9fc1d700-6a20-11ea-97c3-8d8ebbed405d.png">
<img width="400" alt="Zrzut ekranu 2020-03-19 o 20 25 57" src="https://user-images.githubusercontent.com/44299056/77106855-114d5580-6a20-11ea-99a7-1f545924b3f0.png">
 </div>

### Documentation
Frontend:
 https://mateusz800.github.io/stories/

### Running project
1. Clonning project ```git clone https://github.com/mateusz800/blog```
2. ``` cd ``` into project folder
4. Creating virtual environment ```virtualenv venv```
5. Activating venv ```source venv/bin/activate```
6. Installing dependencies ``` pip install -r requirements.txt ```
7. Changing settings.py (email server credentials)
3. Migrating the database ```python manage.py migrate```
4. Starting server ```python manage.py runserver```

The application will run on ```127.0.0.1:80000```


Steps that you have to follow if you want to edit frontend
1. cd frontend
2. yarn install
3. npm run dev
