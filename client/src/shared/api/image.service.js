/* eslint-disable default-case */
import { initializeApp } from "firebase/app";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqYQlbabWjS76AGY8-nWN2LC57hJ-xoGw",
  authDomain: "burnished-block-355309.firebaseapp.com",
  projectId: "burnished-block-355309",
  storageBucket: "burnished-block-355309.appspot.com",
  messagingSenderId: "449659812818",
  appId: "1:449659812818:web:f548fbe76d05a52097a60b",
  measurementId: "G-EHQM93VVF8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (image, image_name, image_type) => {
  const imagesRef = ref(storage, "photos/" + image_name);

  const metadata = {
    contentType: image_type
  };

  const task = uploadBytesResumable(imagesRef, image, metadata);

  const linkPromise = new Promise((resolve, reject) => {
    task.on("state-changed", () => {}, err => reject(err), async () => {
      const link = await getDownloadURL(task.snapshot.ref);
      resolve(link);
    });
  });

  return await linkPromise;
}

export default { uploadImage };
