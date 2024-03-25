import { openDB } from "idb";

// create a const to contain the db name and version so there's no chance of misspellings
const IDB_NAME = "mte";
const IDB_VERSION = 1;

const initdb = async () =>
  // Create a new database name 'mte'; using version 1
  openDB(IDB_NAME, IDB_VERSION, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("mte")) {
        console.log("mte database already exists");
        return;
      }
      // Create a new object store for the data and give it a key name of 'id' which needs to increment automatically.
      db.createObjectStore(IDB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log("mte database created");
    },
  });

// logic to a method that accepts some content and adds it to the database
//export const putDb = async (content) => console.error("putDb not implemented");
export const putDb = async (content) => {
  console.log("PUT content to the database");
  console.log("content = ");
  console.log(content);
  console.log(content.keyPath);

  // Create a connection to the database
  const mteDb = await openDB(IDB_NAME, IDB_VERSION);

  // Create a transaction for this database and version with readwrite privileges
  const tx = mteDb.transaction(IDB_NAME, "readwrite");

  // Open up object store
  const store = tx.objectStore(IDB_NAME);

  // update the current content with the new content
  const request = await store.put({id: IDB_VERSION, value: content});

  //Get confirmation of the request
  const result = await request;
  console.log("Content updated", result);
  console.log("end of putDb");
  return result;
};

// logic for a method that gets all the content from the database
//export const getDb = async () => console.error("getDb not implemented");
export const getDb = async () => {
  console.log("GET from the database");

  // Create a connection to the database database and version we want to use.
  const mteDb = await openDB(IDB_NAME, IDB_VERSION);

  // Create a new transaction and specify the database and data privileges.
  const tx = mteDb.transaction(IDB_NAME, "readonly");

  // Open up the desired object store.
  const store = tx.objectStore(IDB_NAME);

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;

  console.log("get request");
  console.log(request);
  console.log("result.value", result.value);
  return result?.value;
};

initdb();
