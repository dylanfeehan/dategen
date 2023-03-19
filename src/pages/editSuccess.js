import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

// TODO: if this is an upload, and the user just uplaoded a date, it would be nice if they could go to / see the date they just uplaoded :)
const EditSuccess = () => {
    const location = useLocation();
    const editedData = location.state.data;
    return (
        <div className='centered'>
            <h1 style={{ paddingTop: '2rem' }}>Edit Successful!</h1>
            <div style={{ display: 'grid' }}>
                <Link to="/homepage" style={{ paddingTop: '1rem' }}>
                    <Button variant="dark" >Return Home</Button>
                </Link>
                <Link to="/dates/dateSpecs" state={{ data: editedData }} style={{ paddingTop: '1rem' }}>
                    <Button variant="dark">View Updated Date</Button>
                </Link>
            </div>
        </div>
    );
}

export default EditSuccess;