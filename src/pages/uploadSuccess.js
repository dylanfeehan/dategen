import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const UploadSuccess = () => {
  return (
    <div className='centered'>
      <h1 style={{ paddingTop: '2rem' }}>Upload Successful!</h1>
      <div style={{display: 'grid'}}>
        <Link to="/" style={{paddingTop:'1rem'}}>
          <Button variant="dark" >Return Home</Button>
        </Link>
        <Link to="/upload" style={{paddingTop: '1rem'}}>
          <Button variant="dark">Upload Another</Button>
        </Link>
      </div>
    </div>

  )
}

export default UploadSuccess;