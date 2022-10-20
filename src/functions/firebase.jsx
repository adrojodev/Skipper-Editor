import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
} from "firebase/auth";
import { getDatabase, push, ref, set, update } from "firebase/database";
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

const database = getDatabase();
const storage = getStorage();
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export function login() {
  signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const email = user.email;
    const domain = email.substring(email.lastIndexOf("@") + 1);
    if (domain == "humankind.art") {
      window.location.replace("/");
    } else {
      signOut(auth).then(() => {
        deleteUser(result.user).then(() => {
          alert("You need to be part of Humankind team to use this app");
          window.location.reload();
        });
      });
    }
    // The signed-in user info.
  });
}

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
      if (
        inputComponent.parentNode.parentNode.parentNode.getElementsByTagName(
          "textarea"
        )[0].value == "" ||
        inputComponent.parentNode.parentNode.parentNode.getElementsByTagName(
          "textarea"
        )[0].value == " "
      ) {
        inputComponent.parentNode.parentNode.parentNode.getElementsByTagName(
          "textarea"
        )[0].value += `${String(url)}`;
      } else {
        inputComponent.parentNode.parentNode.parentNode.getElementsByTagName(
          "textarea"
        )[0].value += `\n\n${String(url)}`;
      }
    });
  });
}

export async function saveNewCommandOnDatabase(
  name,
  description,
  commands,
  responses
) {
  const elementPath = ref(database, `/interactions/`);

  push(elementPath, {
    name: name,
    description: description,
    commands: commands,
    responses: responses,
  }).then((snapshot) => {
    update(ref(database, `/interactions/${snapshot.key}`), {
      key: snapshot.key,
    });
    window.location.reload();
  });
}

export function changeInteractionOfDatabase(
  elementID,
  name,
  description,
  commands,
  responses
) {
  set(ref(database, `interactions/${elementID}`), {
    commands: commands,
    responses: responses,
    name: name,
    description: description,
    key: elementID,
  }).then(() => {
    window.location.reload();
  });
}
