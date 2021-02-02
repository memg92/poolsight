## <a href="https://poolsight.herokuapp.com/"><img src="./react-app/public/poolsight-logo-wide.jpg" style="border-radius: 10px" /></a>

<br>

**<a href="https://poolsight.herokuapp.com/">poolsight</a>** is a client-management platform for business owners in the pool service industry

<br>

### Languages and Technologies

---

<h5>Font End</h5>
<a href="#"><img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black" /></a>
<a href="https://reactjs.org/"><img alt="React" src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black" /></a>
<a href="https://redux.js.org/"><img alt="Redux" src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=Redux&logoColor=white" /></a>
<a href="#"><img alt="CSS" src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white" /></a>
<a href="https://tailwindcss.com/"><img alt="Tailwind-CSS" src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=Tailwind-CSS&logoColor=white" /></a>
<h5>Back End</h5>
<a href="#"><img alt="Python" src="https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=Python&logoColor=white" /></a>
<a href="https://flask.palletsprojects.com/en/1.1.x/"><img alt="Flask" src="https://img.shields.io/badge/-Flask-000000?style=flat-square&logo=Flask&logoColor=white" /></a>
<a href="https://www.postgresql.org/"><img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=PostgreSQL&logoColor=white" /></a>
<h5>Deployment and Package Management</h5>
<a href="https://heroku.com/"><img alt="Heroku" src="https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=Heroku&logoColor=white" /></a>
<a href="https://docker.com/"><img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" /></a>
<a href="#"><img alt="git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" /></a>
<a href="https://www.npmjs.com/"><img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" /></a>

<br>
<br>

### Features

---

As a poolsight user, you will be able to:

- Add clients to your account, including relevant pool details
- Easily access relevant client information in a single client profile page
- Create new repairs and keep track of all related tasks
- Mark tasks complete as you progress through each repair
- View your routes organized by service day, including any pending tasks, in your Dashboard
- Search for your clients, client pools, as well as repairs

### Dashboard/Client View:

<img src="./react-app/src/assets/main-readme-gif.gif" style="border-radius: 10px"/>

<!-- #### Bonus Features

- Role-based accounts (owner vs technician)
- Map and report visualization
- Reminders -->

<br>
<br>

### Database Schema

---

<img src="./database_schema.png"/>

### Routes

---

#### Backend Routes

##### Users API

| HTTP Verb | Route                     | Function                             |
| :-------- | :------------------------ | :----------------------------------- |
| GET       | `/api/users/`             | user authentication                  |
| POST      | `/api/users/login`        | user log in                          |
| GET       | `/api/users/logout`       | user log out                         |
| POST      | `/api/users/signup`       | user signup / log in                 |
| GET       | `/api/users/unauthorized` | Returns unauthorized when auth fails |

##### Clients API

| HTTP Verb | Route                      | Function                                  |
| :-------- | :------------------------- | :---------------------------------------- |
| GET       | `/api/clients/<user_id>`   | Get all clients for an authenticated user |
| GET       | `/api/clients/<client_id>` | Get a specific client                     |
| POST      | `/api/clients/`            | Create a client                           |
| PUT       | `/api/clients/<client_id>` | Edit a client's information               |
| DELETE    | `/api/clients/<client_id>` | Delete a specific client                  |

##### Repair API

| HTTP Verb | Route                     | Function                                        |
| :-------- | :------------------------ | :---------------------------------------------- |
| GET       | `/api/repair/<user_id>`   | Get all repair events for an authenticated user |
| GET       | `/api/repair/<client_id>` | Get all repair events for a specific client     |
| POST      | `/api/repair/`            | Create a repair event                           |
| PUT       | `/api/repair/<repair_id>` | Edit a repair event's information               |
| DELETE    | `/api/repair/<repair_id>` | Delete a specific repair event                  |

##### Task API

| HTTP Verb | Route                   | Function                            |
| :-------- | :---------------------- | :---------------------------------- |
| GET       | `/api/task/<repair_id>` | Get all tasks for a specific repair |
| POST      | `/api/task/<repair_id>` | Create a task for a repair          |
| PUT       | `/api/task/<task_id>`   | Edit a task's information           |
| DELETE    | `/api/task/<task_id>`   | Delete a specific task              |

##### Equipment API

| HTTP Verb | Route                           | Function                                |
| :-------- | :------------------------------ | :-------------------------------------- |
| GET       | `/api/equipment/<client_id>`    | Get all equipment for a specific client |
| POST      | `/api/equipment/<client_id>`    | Create equipment for a client           |
| PUT       | `/api/equipment/<equipment_id>` | Edit client equipment information       |
| DELETE    | `/api/equipment/<equipment_id>` | Delete a specific equipment event       |

#### Frontend Routes

| Route                              | Description                                              |
| :--------------------------------- | :------------------------------------------------------- |
| `/` Home/Splash (logged out users) | Splash/home page for visitors that are not authenticated |
| `/` Dashboard (logged in users)    | Dashboard for authenticated users                        |
| `/login`                           | Login form                                               |
| `/signup`                          | Signup form                                              |
| `/clients/:clientId`               | Client profile page                                      |
| `/repair/:repairId`                | Renders repair details of a specific repair event        |
| `/repair/create`                   | Create a repair event for a specific client              |
| `/task/create`                     | Create a task event for a specific client                |

### Component List

---

- Navbar
- Home/Dashboard
- Login form
- Signup form
- Client cards
- Client summary
- Repair cards
- Task cards
