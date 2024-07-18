# BlogLite 
### Blog Lite Application - Application Development II Project
#### BlogLite
BlogLite application is a multi-user web-app that allows users to uplad and manage their blogs, follow other users, like posts and get daily reminders and monthly reports to check their blog statistics

#### Project file stucture:
1. backend - Folder containing backend implementation
    1. application - Folder containing main application logic implementation
        1. api.py - API implemntation
        2. config.py - Initialize config variables for application
        3. controllers.py - Controllers implement the main business logic of the application
        4. database.py - Initialize database SQLAlchemy object
        5. models.py - Declare the database schema for project
        6. security.py - Initialize Flask-Security object
        7. tasks.py - Implementation of backend and scheduled jobs
        8. utils.py - Some utilies used for generating and sending reports
        9. workers.py - Initialize Celery Context
        10. validation.py - Declare customized class for BusinessValidationError to be used in  app
        7. __init__.py - For python package
    2. db_directory - Contains database for application
        1. testdb.sqlite3
    3. migrations - Folder generated after running flask migrate commands
    4. static - Static files for app
        1. blog_images - Folder for storiing uploaded images for blogs
        2. figures - Folder for storing figures generated for summary page
        2. reports - Folder for storing system generated reports reports
        3. zip_folder -  Folder for storing uploaded zip files
        4. blog_daily_report_template.html, blog_template.html,daily_email_template.html,monthly_email_template.html,blog_monthly_report_template.html, eport_csv_email_template.html - Email and report HTML Jinja templates
    5. test_data - Some sample test data
    6. local_beat.sh - Run celery beat
    7. local_workers.sh - Run celery workers
    8. local_run.sh - Starting server 
    9. local_gunicorn.sh - Start HTTP server
    10. local_setup.sh - Set up environment
    11. requirements.txt - Libraries required for executing the application
    12. main.py - File to be executed to start the application

2. frontend - Folder containing frontend implementation
    1. src folder contains-
        1. components - BlogDisplayComponent,FollowersDisplayComponent,HeaderComponent,LoginComponent,RegisterComponent
        2. router - index.js: Routing paths mapping to views
        3. store - index.js: Vuex store setup
        4. views - BlogsView.vue, FollowersView.vue, HomeView.vue, SearchView.vue, ConnectionsView.vue, FollowingView.vue, ProfileView.vue
        5. App.vue - Main App
        6. main.js


#### Steps to run application
1. Open terminal and go to backend folder
2. Execute ./local_setup.sh if using application for the first time.
3. Execute following commands on different terminals-
    redis-server
    ~/go/bin/MailHog
    sh local_beat.sh
    sh local_workers.sh
3. Execute ./local_gunicorn.sh to start backend server
4. Open terminal and go to frontend folder
5. Execute npm run serve
6. Open the link http://127.0.0.1:8080/ in browser to access Kanban Application
7. Enter login details - (username - Ajay, password - abcd1234)

