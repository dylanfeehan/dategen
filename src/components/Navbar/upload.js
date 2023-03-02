import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import APIService from '../../api/APIService';
import DateForm from '../dateform';

function Upload() {

  const navigate = useNavigate();

  return (
    <div>
      <DateForm handleSubmit={(formData) => {

        APIService.UploadDate(formData);
        navigate('/uploadSuccess', {
          state: {
            data: formData,
          }
        });
      }
      } action={"Upload"}></DateForm>
    </div>
  )
}
export default Upload;
