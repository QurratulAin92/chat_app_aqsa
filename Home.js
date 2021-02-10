import React from "react"
import firebase from "./firebase"






 export default class Home extends React.Component{
    constructor(){
        super()
        this.state={
            name:"",
            email:"",
            password:"",
      
            
        }

    }
    
    
    login=()=>{
      
            // const name = this.state.name
            const email = this.state.email
            const password = this.state.password
            const name = this.state.name

            // console.log(this.props)
        
         firebase.auth().createUserWithEmailAndPassword(email, password)
    
        .then((result)=>{  

           let create_user = {
               username : name,
               uid : result.user.uid,
               email : result.user.email

           }
       
          firebase.database().ref("/").child(`users/${result.user.uid}`).set(create_user);
           this.props.history.push("/chat") 
        })
          .catch((error)=> {
             const errorCode = error.code;
             const errorMessage = error.message;
             alert(errorMessage)
           })
        
    }

  


    render(){
   
        return(

           
            <div>

                  <input placeholder="enter name" onChange={(e)=>this.setState({name:e.target.value})}/>
               <br/>
               <input placeholder="enter email" onChange={(e)=>this.setState({email:e.target.value})}/>
               <br/>
               <input placeholder="enter password" type="password" onChange={(e)=>this.setState({password:e.target.value})}/>
            
            <button onClick={this.login}>Login</button>
            </div>

          

        )
        
    }

   
}