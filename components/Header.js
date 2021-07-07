import React,{useEffect} from 'react'
import { auth, provider}  from "../firebase"
import styled from "styled-components"
import { useHistory} from "react-router-dom"
import{
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut
} from "../features/user/userSlice"
import {useDispatch,useSelector} from "react-redux"

function Header() {
  const dispatch= useDispatch()
  const history = useHistory()
   const userName = useSelector(selectUserName);
    const UserPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUserLogin(user);
          history.push("/home");
        }
      });
    }, [userName]);


    const signIn =() =>{
           auth.signInWithPopup(provider)
           .then((result)=>{
             let user = result.user
             dispatch(setUserLogin({
               name: user.displayName,
               email: user.email,
               photo: user.photoURL
             }))
              history.push('/')

           })
    }

         const signOut =() =>{
           auth.signOut()
           .then(()=>{
             dispatch(setSignOut());
             history.push("/login")
           })
         }

    return (
        <Nav>
        <Logo src ="/images/logo.svg" />
        {
          !userName ? (
            <LoginContainer>
                <Login onClick={signIn}>Login </Login>
            </LoginContainer>
            ):
          
          <>
               <NavMenu>
           <a>
              <img src="/images/home-icon.svg" /> 
              <spam>HOME</spam>
           </a>

           <a>
              <img src="/images/search-icon.svg" /> 
              <spam>SEARCH</spam>
           </a>
           <a>
              <img src="/images/watchlist-icon.svg" /> 
              <spam>WATCHLIST</spam>
           </a>
           <a>
              <img src="/images/original-icon.svg" /> 
              <spam>ORIGINALS</spam>
           </a>
           <a>
              <img src="/images/movie-icon.svg" /> 
              <spam>MOVIES</spam>
           </a>
           <a>
              <img src="/images/series-icon.svg" /> 
              <spam>SERIES</spam>
           </a>

        </NavMenu>
        <UserImg 
          onClick={signOut}
        src="https://lh3.googleusercontent.com/ogw/ADGmqu9gu6-T-9khBoIKTwKbZIENNe1iNSWK_K5i-s95=s83-c-mo" />


          </>
        }
     
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
  height: 70px;
  background:#090b13;
  display: flex;
  align-items: center;
  padding:0 36px;
  overflow-x:hidden;
`;

const Logo = styled.img`
  width: 80px;

`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
 
`;

const UserImg = styled.img`
  width: 48px;
  height:48px;
  border-radius: 50%;
  cursor:pointer;

`;


const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color : rgba(0,0,0,0.6);
  cursor:pointer;

  &:hover{
    background-color: #f9f9f9;
    color: #000;
    border-color:transparent;
  }
`;

const LoginContainer = styled.div`
flex:1;
display:flex;
justify-content:flex-end;

`;
