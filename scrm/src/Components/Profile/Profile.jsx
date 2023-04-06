import React from 'react'
import './profile.css'
import Avatar from '@mui/material/Avatar'
import profile1 from '../../Assets/jonathan.png'
import Link from '@mui/material/Link'

const Profile = () => {
  return (
    <div className='profile'>
        <Avatar alt="Jonathan Reinink" 
                sx={{width: 45, height: 45}} src={profile1}/>
        
        <div className="profile-details">
            <Link className="profile-name" 
                href="#"
                component="button"
                underline="hover"
                onClick={() => {console.info("Im a button")}}>
                    Jonathan Reinink</Link>
            <p className="date">Aug 23</p>
        </div>
    </div>
  )
}

export default Profile