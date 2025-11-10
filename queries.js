// ================================
// Week 1 MongoDB Assignment: Queries
// ================================

const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://127.0.0.1:27017"; // local MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("plp_bookstore"); // database name
    const collection = db.collection("books"); // collection name

    // ========================
    // Task 2: Basic CRUD Operations
    // ========================

    // 1️⃣ Find all books in a specific genre
    const dystopianBooks = await collection.find({ genre: "Dystopian" }).toArray();
    console.log("\nBooks in Dystopian genre:", dystopianBooks);

    // 2️⃣ Find books published after a certain year
    const recentBooks = await collection.find({ published_year: { $gt: 2000 } }).toArray();
    console.log("\nBooks published after 2000:", recentBooks);

    // 3️⃣ Find books by a specific author
    const orwellBooks = await collection.find({ author: "George Orwell" }).toArray();
    console.log("\nBooks by George Orwell:", orwellBooks);

    // 4️⃣ Update the price of a specific book
    await collection.updateOne({ title: "1984" }, { $set: { price: 20 } });
    console.log("\nUpdated price of '1984'");

    // 5️⃣ Delete a book by its title
    await collection.deleteOne({ title: "Moby Dick" });
    console.log("\nDeleted 'Moby Dick'");

    // ========================
    // Task 3: Advanced Queries
    // ========================

    // Books in stock and published after 2010
    const inStockRecent = await collection.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log("\nBooks in stock and published after 2010:", inStockRecent);

    // Projection: return only title, author, and price
    const projectedBooks = await collection.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
    console.log("\nProjected books (title, author, price):", projectedBooks);

    // Sorting by price
    const sortedAsc = await collection.find().sort({ price: 1 }).toArray();
    const sortedDesc = await collection.find().sort({ price: -1 }).toArray();
    console.log("\nBooks sorted by price ascending:", sortedAsc);
    console.log("\nBooks sorted by price descending:", sortedDesc);

    // Pagination (5 books per page)
    const page = 1;
    const pageSize = 5;
    const paginated = await collection.find().skip((page - 1) * pageSize).limit(pageSize).toArray();
    console.log("\nPaginated books (page 1):", paginated);

    // ========================
    // Task 4: Aggregation Pipeline
    // ========================

    // 1️⃣ Average price of books by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("\nAverage price by genre:", avgPriceByGenre);

    // 2️⃣ Author with the most books
    const mostBooksAuthor = await collection.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("\nAuthor with most books:", mostBooksAuthor);

    // 3️⃣ Group books by publication decade
    const booksByDecade = await collection.aggregate([
      {
        $group: {
          _id: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("\nBooks grouped by decade:", booksByDecade);

    // ========================
    // Task 5: Indexing
    // ========================

    // Create index on title
    await collection.createIndex({ title: 1 });
    // Create compound index on author and published_year
    await collection.createIndex({ author: 1, published_year: -1 });
    console.log("\nIndexes created on title and author+published_year");

    // Explain query performance
    const explainResult = await collection.find({ author: "George Orwell" }).explain("executionStats");
    console.log("\nExplain output for query on George Orwell:", explainResult);

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log("\nConnection closed");
  }
}

run();
