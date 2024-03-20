import { openDB } from 'idb';

const initdb = async () =>
  openDB('mte', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('mte')) {
        console.log('mte database already exists');
        return;
      }
      db.createObjectStore('mte', { keyPath: 'id', autoIncrement: true });
      console.log('mte database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
