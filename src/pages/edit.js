import React from 'react';
import { useLocation } from 'react-router-dom';
import APIService from '../api/APIService';
import DateForm from '../components/dateform';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    const location = useLocation();
    const cardObj = location.state.data;
    const navigate = useNavigate();

    return (
        <div>
            <DateForm data={cardObj} handleSubmit={(formData) => {
                APIService.UpdateDate(formData);
                navigate('/editSuccess', {
                    state: {
                        data: formData,
                    }
                });
            }} action={"Edit"}></DateForm>
        </div>
    );
}
export default Edit;