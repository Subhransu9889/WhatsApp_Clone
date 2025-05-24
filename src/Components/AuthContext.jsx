import { onAuthStateChanged } from 'firebase/auth';
import React, { Children, useContext, useEffect, useState } from 'react'
import { auth, db } from '../../firebase';
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

//hook
export function useAuth(){
    //3
    return useContext(AuthContext);
}

function AuthWrapper({ children }) {
    const [userData, setUserData] = useState(null);


    useEffect(() => {
      //check if you are loged in before 
      const unsubscribe =  onAuthStateChanged(auth, async (currentUser) => {
        if(currentUser){
          const docRef = doc(db, 'Users', currentUser?.uid);
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
            await SetLastseen(currentUser);
            const {name, profile_pic, id, email, lastseen, status} = docSnap.data();
            console.log(docSnap.data());

		        setUserData({
			        name,
			        profile_pic,
			        id : id || currentUser.uid,
              email, 
              lastseen, 
              status : status? status : "",
		        });
          }
        }
      });
      return () => {
        unsubscribe();
      }
    }, []);

    const SetLastseen = async(currentUser) => {
      const date = new Date();
      const timeStamp = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      await updateDoc(doc(db, "Users", currentUser.uid), {
        lastseen: timeStamp,
      })
    }

    const UpdateStatus = async (newStatus) => {
      if (!userData || !userData.id) {
        console.error("User data is not available");
        return;
      }
      await updateDoc(doc(db, 'Users', userData.id), {
        status : newStatus,
      })
    }

  return (
    <AuthContext.Provider value={{setUserData, userData, UpdateStatus}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper