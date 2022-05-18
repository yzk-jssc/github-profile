import React from "react";
import { currentProfileI } from "../types/types";


const ProfileItem = (props:currentProfileI) => {

    const {login,name,location,publicRepositories,avatar_url,repos} = props
    
    return (
        <div className="profile__item">
            <div className="profile__person">
                <div className="person__avatar">
                    <img alt="Avatar" src={avatar_url} className="person__avatar_img" />
                </div>
                <div className="person__info">
                    username - {login}
                    <br />
                    name - {name||'not found'}
                    <br />
                    location - {location ||'not found'}
                    <br />
                    Repositories count - {publicRepositories}
                </div>
            </div>
            <div className="profile_latest_repos">
                <div className="repos__title">Latest repositories:</div>
                {repos?.map(elem=>
                    <div key={elem.id} className="repos__item">
                        <a className="repos__link" href={elem.rep_url}>{elem.name}</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileItem;
