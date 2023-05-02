import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import APIService from '../api/APIService';
import DateForm from '../components/dateform';
import { useNavigate } from 'react-router-dom';
import PostSpecs from '../assets/PostSpecs';

const Edit = () => {
    const location = useLocation();
    const navigate = useNavigate();

    let postSpecs;
    let jwt;

    try {
        postSpecs = location.state.postSpecs;
        jwt = location.state.jwt;
    }
    catch {
        console.log("error reading from location");
    }

    return (
        <div>
            <DateForm postSpecs={postSpecs} handleSubmit={(editedPostSpecs) => {
                if(editedPostSpecs === null) {
                    console.log("Error, data from form was bad.");
                }
                APIService.UpdatePost(editedPostSpecs, jwt);
                navigate('/editSuccess', {
                    state: {
                        data: editedPostSpecs,
                    },
                });
            }} action={"Edit"}></DateForm>
        </div>
    );
}
export default Edit;