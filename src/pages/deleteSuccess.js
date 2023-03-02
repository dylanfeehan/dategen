import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

// TODO: if this is an upload, and the user just uplaoded a date, it would be nice if they could go to / see the date they just uplaoded :)
const DeleteSuccess = () => {
    return (
        <div className='centered'>
            <h1 style={{ paddingTop: '2rem' }}>Delete Successful!</h1>
            <div style={{ display: 'grid' }}>
                <Link to="/" style={{ paddingTop: '1rem' }}>
                    <Button variant="dark" >Return Home</Button>
                </Link>
            </div>
        </div>
    )
}
export default DeleteSuccess;