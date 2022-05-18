import axios from "axios";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { currentProfileI, latestReposI } from "../types/types";
import axiosInstance from "./API/fetchProfiles";
import ProfileItem from "./ProfileItem";
import ProfileSearch from "./ProfileSearch";

interface GithubProfileProps {}

const GithubProfile: FC<GithubProfileProps> = () => {
    const [user, setUser] = useState<string>('yzk-jssc');
    const [currentProfile, setСurrentProfile] =
        useState<Partial<currentProfileI>>(); //выбрать из объекта фетча в другой объект
    const [latestRepos, setLatestRepos] = useState<latestReposI[]>([]);
    

    const fetchProfile = async () => {
        try {
            await axiosInstance
                .get(`/users/${user}`)
                .then((res) => res.data)
                .then((profileInfo) => {
                    
                    setUser(profileInfo.login);
                    setСurrentProfile({
                        id: profileInfo.id,
                        login: user ,
                        name: profileInfo.name,
                        location: profileInfo.location,
                        publicRepositories: profileInfo.public_repos,
                        avatar_url: profileInfo.avatar_url,
                    });
                });
        } catch (error) {
            console.log('Error upload user')

        }
        
        
    };

    const fetchRepos =async () => {
        try {
            await axiosInstance.get(`/users/${user}/repos`)
            .then(data=>data.data)
            .then(repos=>repos.slice(0,3))
            .then(repos=> {
                let reposArray:latestReposI[] = []
                
                for(let i=0;i<repos.length;i++){
                    
                    reposArray.push({
                        name:repos[i].name,
                        id:repos[i].id,
                        rep_url:repos[i].html_url,
                    })

                }
                setLatestRepos(reposArray);
                
            });
            
            //фетчим репы гиперссылкой через а с названием
        } catch (error) {
            console.log('Error upload repositories')            
        }
        
        
    }

    useEffect(() => { 
        fetchProfile();
        fetchRepos()
        
    }, []);

    const handleSumbitUser= (e:ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault()
        fetchProfile();
        fetchRepos()
        
    }

    return (
        <div className="github__profile">
            <h1 className="profile__title">github profiles</h1>
            <ProfileSearch
                handleSubmitForm={handleSumbitUser}
                handleChange={setUser}
            />
            
            {currentProfile !== undefined && latestRepos.length>1 && (
                <ProfileItem
                    login={`${currentProfile.login}`}
                    name={currentProfile.name}
                    location={currentProfile?.location}
                    publicRepositories={Number(currentProfile.publicRepositories)}
                    avatar_url={currentProfile.avatar_url}
                    repos={latestRepos}
                />
            )}


        </div>
    );
};

export default GithubProfile;
