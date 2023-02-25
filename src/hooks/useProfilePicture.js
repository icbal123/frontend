import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../utils/firebase";

const useProfilePicture = (photoURL) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    console.log("k",auth.currentUser);
    const getImage = async () => {
      const currentUser = auth.currentUser;
      const photoRef = ref(
        storage,
        photoURL === undefined ? currentUser.photoURL : photoURL
      );
      const fetchedUrl = await getDownloadURL(photoRef);
      setProfilePictureUrl(fetchedUrl);
    };
    getImage();
  }, [photoURL]);

  return profilePictureUrl;
};

export default useProfilePicture;
