import React, {useState} from "react";
import axios from "axios";

function CreateUser(){

    const [isCreated, setCreated] = useState(false)

    const [user, setUsername] = useState({
        username: ""
    });

    function handleChange(event){
        const newUsername = event.target.value;
        setUsername({username: newUsername});
        setCreated(false);
    }

    function handleSubmit(event){
        event.preventDefault()
        setUsername({username: ""});

        axios.post("http://localhost:5000/users/add", user)
        .then(res => console.log(res.data));
        
        setCreated(true)

        
    }

    return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" required className="form-control" value={user.username} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary"/>
                </div>
                {
                    isCreated && <p>User Created!</p> 
                }
            </form>
        </div>
    );
}

export default CreateUser;