import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reduces/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribeUserPosts from './components/screens/SubscribesUserPosts'

export const UserContext=createContext()

const Routing =()=>{
    const history=useHistory()
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        //console.log(typeof(user),user)
        if(user){
            dispatch({type:"USER",payload:user})
        }else{
            history.push('/signin')
        }
    },[])
    return(
        <Switch>
        <Route exact path="/">
        <Home/>
    </Route>
    <Route path="/signin">
        <Signin/>
    </Route>
    <Route exact path="/profile">
        <Profile/>
    </Route>
    <Route path="/signup">
        <Signup/>
    </Route>
    <Route path="/createPost">
        <CreatePost/>
    </Route>
    <Route path="/profile/:userid">
        <UserProfile/>
    </Route>
    <Route path="/myFollowingPost">
        <SubscribeUserPosts/>
    </Route>
    </Switch>
    )
}

function App() {
   const [state,dispatch]=useReducer(reducer,initialState) 
  return (
      <UserContext.Provider value={{state,dispatch}}>
   <BrowserRouter> 
      <NavBar/>
     <Routing/>
   </BrowserRouter>
   </UserContext.Provider>
  );
}

export default App;