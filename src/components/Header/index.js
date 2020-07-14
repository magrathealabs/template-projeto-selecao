import React, { useContext } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../App";

import { FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { Wrapper } from './styles';

export default function Home() {

  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const {   
    avatar_url, 
    name, 
    bio,
    public_repos,
    total_private_repos,
    html_url,
    followers, 
    following, 
    } = state.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  const handleBackHome = () => {
    history.push('/');
  } 

  return (
    <Wrapper>
      <div className="container">

        <div className='box-btns-back-logout'>
          {history.location.pathname === '/' 
          ? 
            <div></div>
          : 
            <FiArrowLeft onClick={handleBackHome} title='Home'/>
          }
            <FiLogOut onClick={handleLogout} title='Logout'/>
        </div>
        
        <div>

          <div className="content">
            <div className="box-avatar">
              <img src={avatar_url} alt="avatar" />
              <span>{name}</span>
              <span>{bio}</span>
            </div>

            <div className="box-infomations">
              
              <p>{followers} Followers</p>
              <p>{following} Following</p>
              <p>{total_private_repos} Private Repos</p>
              <p>{public_repos} Public Repos</p>
              <a 
                href={html_url} 
                target='_blank'
                rel="noopener noreferrer"
                >Github account
                </a>
    
            </div>


            <div className="box-links">
              
              <Link to='/starred-repositories'>
                Starred repositories
              </Link>

              <Link to='/filtered'>
                Filtered repositories
              </Link>
              
            </div>      
          </div>
 
        </div>
      </div>
    </Wrapper>
  );
}
