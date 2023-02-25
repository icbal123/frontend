import { auth, db, storage } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getMacAddress } from "react-native-device-info";
import "react-native-get-random-values";
import { v4 } from "uuid";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

/* User
uuid: String,
p_info: {
    first_name: String,
    last_name: String,
    linkedin: String,
    github: String,
    phone: String,
    website: String,
},
experience: Array[{
    type: enum (Work, Volunteer, Internship, CCA),
    title: String,
    company: String,g
    from: DateTime,
    to: DateTime,
    description: Array[String],
    skills: Array[String],
}],
education: Array[{
    country: String,
    institution: String,
    from: DateTime,
    to: DateTime,
    gpa: float,
    relevant_coursework: Array[String],
}],
skills: Array[{
    category: String, (?, things like web, AI, spoken languages, etc)
    name: String,
    proficiency: float,
}],
interests: Array[String],
resume: (URL to a pdf?),
photoURL: String

*/

const createUser = async ({ email, password }) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uuid = v4();
    await updateProfile(auth.currentUser, {
      photoURL: "profile_pictures/default.png",
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      post: auth.currentUser.uid,
      email,
      p_info: {},
      experience: [],
      education: [],
      skills: [],
      interests: [],
      resume: null,
      broadcast: false,
      photoURL: "profile_pictures/default.png",
      uuid,
    });
    await loginUser({ email, password });
    return userCredentials.user.uid;
  } catch (e) {
    throw e;
  }
};

const userBroadcasting = async (broadcast) => {
  try {
    await updateDoc(doc(db, "users", auth.currentUser.uid), { broadcast });
  } catch (e) {
    throw e;
  }
};

const updateUser = async ({
  p_info,
  experience,
  education,
  skills,
  interests,
  resume,
}) => {
  let obj = {};
  if (p_info) obj.p_info = p_info;
  if (experience) obj.experience = experience;
  if (education) obj.education = education;
  if (skills) obj.skills = skills;
  if (interests) obj.interests = interests;
  if (resume) obj.resume = resume;

  if (!obj) return;
  try {
    await updateDoc(doc(db, "users", auth.currentUser.uid), obj);
  } catch (e) {
    throw e;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e) {
    throw e;
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    throw e;
  }
};

const setUserProfilePic = async ({ image }) => {
  const metadata = {
    contentType: "image/png",
  };
  const photoURL = `profile_pictures/${new Date().getTime()}-media.png`;
  const storageRef = ref(storage, photoURL);
  try {
    await uploadBytes(storageRef, image, metadata);
    await updateDoc(doc(db, "users", auth.currentUser.uid), { photoURL });
    await updateProfile(auth.currentUser, {
      photoURL,
    });
  } catch (e) {
    throw e;
  }
};

const getUserInfoByPost = async ({ post }) => {
  let queriedUserData = [];
  const q = query(collection(db, "users"), where("post", "==", post));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      queriedUserData.push(data);
    });
  } catch (e) {
    throw e;
  } finally {
    return queriedUserData;
  }
};
const getUserInfoByUUID = async (uuid) => {
  let queriedUserData = [];
  const q = query(collection(db, "users"), where("uuid", "==", uuid));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      queriedUserData.push(data);
    });
  } catch (e) {
    throw e;
  } finally {
    return queriedUserData;
  }
};

const getAllUserInfo = async () => {
  let queriedUserData = [];
  const q = query(collection(db, "users"));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      queriedUserData.push(data);
    });
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    return queriedUserData;
  }
};

const getCurrentUserInfo = async () => {
  let queriedUserData = [];
  const q = query(
    collection(db, "users"),
    where("post", "==", auth.currentUser.uid)
  );
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      queriedUserData.push(data);
    });
  } catch (e) {
    throw e;
  } finally {
    return queriedUserData;
  }
};

const getAllBroadcastingAndCloseUsers = async (profiles) => {
  let queriedUserData = [];
  const q = query(collection(db, "users"), where("broadcast", "==", true));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      queriedUserData.push(data);
    });
  } catch (e) {
    throw e;
  } finally {
    return queriedUserData;
  }
};

export {
  createUser,
  updateUser,
  loginUser,
  logoutUser,
  setUserProfilePic,
  getUserInfoByPost as getUserInfo,
  getUserInfoByUUID,
  getAllUserInfo,
  getCurrentUserInfo,
  userBroadcasting,
  getAllBroadcastingAndCloseUsers,
};
