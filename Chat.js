

import React from "react"
import firebase from "./firebase"


export default class Chat extends React.Component{
        constructor(){
            super()
            this.state={
                userslist:[],
                allemails:[],
                alluids:[],
                chat_user:{},
                chats:[],
                

            }
        }
       
       

        
         
        chat=(user)=>{


            this.setState({
                chat_user:user
            })
            var merging = this.merge_uid(this.state.alluids.slice(0,1),this.state.chat_user.uid)
            this.get_messages(merging)
            
        }
        get_messages=(uid)=>{
            firebase.database().ref("/").child(`chats/${uid}`).on("child_added",(message)=>{
                this.state.chats.push(message.val())

                this.setState({
                    chats:this.state.chats,
                    message:""
                })
            })
        }

        merge_uid=(uid1,uid2)=>{
           if(uid1<uid2){
               return uid1+uid2
           }
           else
               return uid2+uid1
        }
        sendmessage=()=>{

            var merging = this.merge_uid(this.state.alluids.slice(0,1),this.state.chat_user.uid)
         
           firebase.database().ref("/").child(`chats/${merging}`).push({

               message:this.state.message,
               email:this.state.allemails.slice(0,1),
               getuid:this.state.alluids.slice(0,1)
           })
           this.state.chats.push(this.state.message)
        }


         componentDidMount=()=>{
            var list = []
            var getemails = []
            var getuids = []
            
            firebase.database().ref("/").child(`users/`).on("child_added",(users)=>{
                
                 list.push(users.val())
                 getemails.push(users.val().email)
                 getuids.push(users.val().uid)

                 this.setState({userslist:list})
                 this.setState({allemails:getemails})
                 this.setState({alluids:getuids})
                
                 
                
             })
            
         }

    render(){ 
        let current_user = this.state.allemails.slice(0,1)
       
        return(
            <div>
               <h1>Welcome! {current_user}</h1>

                
                 <div style={{display:"flex"}}>
                     <div style={{backgroundColor:"lightblue"}}>
                     <h3>Chat Users</h3>
                     <ul>
                     {this.state.userslist.map((v,i)=>{
                         return <li key={i}>{v.email}<button onClick={()=>this.chat(v)}>Chat</button></li>
                     })}
                     </ul>
                     </div>
                     <div style={{backgroundColor:"yellow",width:"500px"}}>
                         <h2>Chats</h2>
      
                         {Object.keys(this.state.chat_user).length ?
                         <div>
                         <h3>{this.state.chat_user.email}</h3>

                         <ul>
                             {this.state.chats.map((v,i)=>{
                                 return <li key={i} style={{color:v.uid===this.state.alluids.slice(0,1)?"blue":"red"}}>{v.message}</li>
                             })}
                         </ul>
                         <input type="text" value={this.state.message} onChange={(e)=>this.setState({message:e.target.value})} placeholder="enter your message"/>
                         <button onClick={this.sendmessage}>Send</button>
                         </div>
                         :
                         <h4>No users</h4>
                         }
                     </div>

                </div>

            </div>
        )
    }
}
