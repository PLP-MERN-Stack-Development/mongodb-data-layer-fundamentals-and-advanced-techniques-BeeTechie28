# MongoDB Assignment

## Project Overview
This project demonstrates basic MongoDB operations using Node.js. It includes scripts to insert sample data into a `books` collection and run queries to retrieve information from the database.

## Files in the Repository
- `insert_books.js` — Script to insert sample books into the MongoDB collection.
- `queries.js` — Contains all MongoDB queries for retrieving and manipulating data.
- `README.md` — This file explaining how to run the scripts.
- `screenshot.png` — Screenshot showing the collections and sample data in MongoDB Compass.

## How to Run the Scripts

1. Make sure you have **Node.js** installed on your system.
2. Make sure you have **MongoDB running locally** or have your **MongoDB Atlas connection string** ready.
3. Open a terminal in your project folder.
4. Install the MongoDB Node.js driver if not already installed:

```bash
npm install mongodb

*Run the insert script to add sample data:
node insert_books.js

*Run the queries script to execute all queries:
node queries.js
