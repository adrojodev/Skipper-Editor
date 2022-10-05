import { initializeApp } from "firebase/app";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbDLF09yn8kxHXfnULe7fraIwXMdMEx4M",
  authDomain: "humankind-637da.firebaseapp.com",
  databaseURL: "https://humankind-637da-default-rtdb.firebaseio.com",
  projectId: "humankind-637da",
  storageBucket: "humankind-637da.appspot.com",
  messagingSenderId: "707375406570",
  appId: "1:707375406570:web:7ddbf35bca0f36d1f62693",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function uploadImages(inputComponent) {
  const image = inputComponent.files[0];
  const path = sRef(storage, `images/${uuidv4()}`);

  uploadBytes(path, image).then((snapshot) => {
    getDownloadURL(path).then((url) => {
      inputComponent.parentNode.parentNode.parentNode.getElementsByTagName(
        "textarea"
      )[0].value += ` \n\n${String(url)};`;
    });
  });
}
