<a href="https://poolsight.herokuapp.com/"><img src="./react-app/public/poolsight-logo-wide.png"/></a>

Inspired by – and created for – my father, **<a href="https://poolsight.herokuapp.com/">poolsight</a>** is a client-management platform for business owners in the pool service industry

<br>

## Table of Contents

- [Languages and Technologies](#Languages-and-Technologies)
- [Features](#Features)
- [Custom Components/Functionality](#Custom-Components/Functionality)
  - [Modal Component](#Modal-Component)
  - [Toggle Functionality](#Toggle-Functionality)
- [Usage](#Usage)

<br>

## Languages and Technologies

[(Back to top)](#table-of-contents)

poolsight was proudly built using custom frontend components, including toggle and modal components

<h5>Fontend</h5>
<a href="#"><img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black" /></a>
<a href="https://reactjs.org/"><img alt="React" src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black" /></a>
<a href="https://redux.js.org/"><img alt="Redux" src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=Redux&logoColor=white" /></a>
<a href="#"><img alt="CSS" src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white" /></a>
<a href="https://tailwindcss.com/"><img alt="Tailwind-CSS" src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=Tailwind-CSS&logoColor=white" /></a>
<h5>Backend</h5>
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

## Features

[(Back to top)](#table-of-contents)

As a poolsight user, you will be able to:

- Add clients to your account, including relevant pool details
- Easily access relevant client information in a single client profile page
- Create new repairs and keep track of all related tasks
- Mark tasks complete as you progress through each repair
- View your routes organized by service day, including any pending tasks, in your Dashboard
- Search for your clients, client pools, as well as repairs

#### Dashboard/Client View:

<img src="./react-app/src/assets/main-readme-gif.gif" style="border-radius: 10px"/>

#### Search clients, client pools, repairs:

<img src="./react-app/src/assets/search-feature.gif" style="border-radius: 10px"/>

<br>

## Custom Components/Functionality

Instead of using an external component library, poolsight uses custom components/functionality for increased flexibility

#### Modal component:

```javascript
export default function Modal(props) {
  useEffect(() => {
    //helper function to close modal
    const closeModal = () => {
      props.setShowModal(false);
    };

    //listen outside for clicks to close modal
    document.addEventListener("click", closeModal);

    //prevent modal from closing when user clicks inside modal elements
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    //cleanup func: remove event listeners
    return () => document.removeEventListener("click", closeModal);
  }, []);

  return (
    props.showModal && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="mt-20 mx-auto max-w-xl shadow-lg">
          <div className="modal animate-scale-in-center bg-ghost flex flex-col justify-center rounded-lg px-6 py-4 w-full">
            {props.children}
          </div>
        </div>
      </div>
    )
  );
}
```

<img src="./react-app/src/assets/modal-sample.gif" style="border-radius: 10px"/>

#### Toggle functionality:

```javascript
//handle change in showTable state and listen for clicks to close tbale
useEffect(() => {
  if (!showTable) return;

  const closeTable = () => {
    setShowTable(false);
  };

  //listen for click to close table
  document.addEventListener("click", closeTable);

  //stop propagation at the table level
  const table = document.querySelector("table") || null;
  if (table) {
    table.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  //remove listener so that card can be reopened after
  return () => {
    document.removeEventListener("click", closeTable);
  };
}, [showTable]);
```

<img src="./react-app/src/assets/toggle-sample.gif" style="border-radius: 10px"/>

<br>

## Usage

[(Back to top)](#table-of-contents)

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/memg92/poolsight.git
   ```

2. Install dependencies

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

---

_IMPORTANT!_
If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
You can do this by running:

```bash
pipenv lock -r > requirements.txt
```

_ALSO IMPORTANT!_
psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

---
