import {
  WriteBatch,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCBQWJLys8LYJTjCFL135wNX7DvJCWUruY',
  appId: '1:190713723946:web:0d8e91e71b8f771b2bd753',
  authDomain: 'supreme-fishstick.firebaseapp.com',
  messagingSenderId: '190713723946',
  projectId: 'supreme-fishstick',
  storageBucket: 'supreme-fishstick.appspot.com',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const COLLECTION_NAME = 'swim-records';
const colRef = collection(db, COLLECTION_NAME);

export const getDocuments = async () => {
  let documents;
  try {
    const snapshot = await getDocs(colRef);
    documents = snapshot.docs.map(docFromCollection => ({
      ...docFromCollection.data(),
      id: docFromCollection.id,
    }));
  } catch (e) {
    console.log((e as Error).message);
  }
  return documents;
};

export const searchDocuments = async (): Promise<unknown> => {
  const q = query(colRef, where('event', '!=', 999)); // 'in' operator.

  let documents;
  try {
    const snapshot = await getDocs(q);
    documents = snapshot.docs.map(docFromCollection => ({
      ...docFromCollection.data(),
      id: docFromCollection.id,
    }));
  } catch (e) {
    console.log((e as Error).message);
  }
  return documents;
};

export const deleteDocuments = async (): Promise<void> => {
  const batch = writeBatch(db);
  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach(docFromCollection => {
    batch.delete(docFromCollection.ref);
  });
  await batch.commit();
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const addDocument = async () => {
  const randomDoc = {
    age: getRandomInt(18),
    convertedTime: getRandomInt(60),
    date: `2023-06-${getRandomInt(30)}`,
    displayName: `Spankowski, ${Math.random().toString()}`,
    event: getRandomInt(72),
    exhibition: false,
    firstName: 'Ruby',
    lastName: 'Spankowski',
    league: 'Tri-County',
    place: 1,
    team: 'Baraboo',
    time: 17.02,
    weekNumber: 2,
  };
  await addDoc(colRef, randomDoc);
};

// export const removeDocument = async (collectionId: string) => {
//   const docRef = doc(db, COLLECTION_NAME, collectionId);
//   await deleteDoc(docRef);
// };

export const FireBase = { app, db };
