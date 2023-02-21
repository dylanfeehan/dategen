import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

// TODO: if this is an upload, and the user just uplaoded a date, it would be nice if they could go to / see the date they just uplaoded :)
const UploadSuccess = () => {
  const location = useLocation();
  const action = location.state.action;
  const editedData = location.state.data;
  return (
    <div className='centered'>
      <h1 style={{ paddingTop: '2rem' }}>{action} Successful!</h1>
      <div style={{ display: 'grid' }}>
        <Link to="/" style={{ paddingTop: '1rem' }}>
          <Button variant="dark" >Return Home</Button>
        </Link>

        {(action === 'Edit') ? (
          <Link to="/dates/dateSpecs" state={{ data: editedData }} style={{ paddingTop: '1rem' }}>
            <Button variant="dark">View Updated Date</Button>
          </Link>) 
          : (action === 'Upload') ? (
          <Link to="/upload" style={{ paddingTop: '1rem' }}>
            <Button variant="dark">Upload Another</Button>
          </Link>)
          : null 
          }
      </div>
    </div>

  )
}

export default UploadSuccess;