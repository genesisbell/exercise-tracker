import React, {useState} from "react";

function CreateUser(){

    const [username, setUsername] = useState("");

    function handleChange(event){
        const newUsername = event.target.value;
        setUsername(newUsername);
    }

    function handleSubmit(event){
        event.preventDefault()
        setUsername("");
        console.log(username)
        
    }

    return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" required className="form-control" value={username} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}

export default CreateUser;