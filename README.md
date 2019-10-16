# Student Management Portal

Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.

## Local Installation

#### Make sure you have MySQL already installed

1. `git clone https://github.com/nicoraven/d3hiring-dev-assessment.git`
2. `cd` into the directory and run `npm install`
3. create a `.env` file in the working directory and include your database credentials as DB_USER and DB_PASS
4. run `npm run db:migrate` to create database and tables
5. run  `npm run dev` to start locally in development mode

### Pending

* Error handling
* Unit testing
* Refactoring code structure/design for modularity