import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import APIService from '../../api/APIService';
import DateForm from '../dateform';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

import firebase_app from '../../assets/firebase_app';

function Upload() {
  const [user, setUser] = useState(null);
  const [jwt, setToken] = useState(null);
  const auth = getAuth(firebase_app);


  const navigate = useNavigate();
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Acquired auth");
      console.log("display name: " + user.displayName);
      setUser(user);

      user.getIdToken(false).then((jwt) => setToken(jwt));
    }
  })

  return (
    <div>
      {jwt ? (
        <DateForm handleSubmit={(postSpecs) => {

          APIService.UploadPost(postSpecs, jwt);

          navigate('/homepage');
        }
        } action={"Upload"}></DateForm>
      ) : (<p>Awaiting auth</p>)}

    </div>
  )
}
export default Upload;
