import React, { ChangeEvent, FC } from 'react'

interface ProfileSearchProps {
    handleSubmitForm:(e:ChangeEvent<HTMLFormElement>)=>void
    handleChange:Function
}
 
const ProfileSearch: FC<ProfileSearchProps> = ({handleSubmitForm,handleChange}) => {

    return ( 
        <form action="" onSubmit={handleSubmitForm} className='profile__serach'>
            <input className='user__search' onChange={(e)=>handleChange(e.target.value)}/>
            <button className='user__button'>Search</button>
        </form>
    );
}
 
export default ProfileSearch;