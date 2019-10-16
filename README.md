# Student Management Portal

Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.

## Hosted API

A hosted copy of the API can be found at: [18.139.84.153:3000/api/](18.139.84.153:3000/api/)

## Local Installation

#### Make sure you have MySQL already installed

1. Clone this repo.
```
git clone https://github.com/nicoraven/d3hiring-dev-assessment.git
```
2. `cd` into the directory and install dependencies.
```
npm install
```
3. create an `.env` file in the working directory and include your database credentials if necessary.
```
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="root" 
DB_PASS="password"
```
4. Create the database and tables.
```
npm run db:migrate
```
5. Start server locally in development mode.
```
npm run dev
```

## Pending

* Unit testing
* Refactoring code structure/design for modularity