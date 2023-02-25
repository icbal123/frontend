import { auth, db, storage } from "./firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

/* User
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
    company: String,
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
    await updateProfile(userCredentials.user, {
      email,
      photoURL: "profile_pictures/default.png",
    });
    await setDoc(doc(db, "User", userCredentials.user.uid), {
      email,
      p_info: {},
      experience: [],
      education: [],
      skills: [],
      interests: [],
      resume: null,
      photoURL: "",
    });
    return userCredentials.user.uid;
  } catch (error) {
    console.error(error);
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
    await updateProfile(auth.currentUser, obj);
  } catch (e) {
    console.error(e);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch (e) {
    console.error(e);
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.error(e);
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
    await updateProfile(auth.currentUser, {
      photoURL,
    });
  } catch (e) {
    console.error(e);
  }
};

const getUserInfo = async ({ uid }) => {
  let queriedUserData = [];
  const q = query(collection(db, "User"), where("uid", "==", uid));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.timestamp = new Date(data.timestamp.seconds * 1000);
      queriedUserData.push({ ...data, post_id: doc.id });
    });
  } catch (e) {
    console.error(e);
  } finally {
    return queriedUserData;
  }
};

const getAllUserInfo = async () => {
  let queriedUserData = [];
  const q = query(collection(db, "User"));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.timestamp = new Date(data.timestamp.seconds * 1000);
      queriedUserData.push({ ...data, post_id: doc.id });
    });
  } catch (e) {
    console.error(e);
  } finally {
    return queriedUserData;
  }
};

const getCurrentUserInfo = async () => {
  let queriedUserData = [];
  const q = query(
    collection(db, "User"),
    where("uid", "==", auth.currentUser.uid)
  );
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.timestamp = new Date(data.timestamp.seconds * 1000);
      queriedUserData.push({ ...data, post_id: doc.id });
    });
  } catch (e) {
    console.error(e);
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
  getUserInfo,
  getAllUserInfo,
  getCurrentUserInfo,
};
