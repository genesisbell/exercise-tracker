import React, {useState, useEffect} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

function CreateExercise(){

    const [isCreated, setCreated] = useState(false)
    const [startDate, setDate] = useState(new Date());
    const [exercise, setExercise] = useState({
        username: "",
        description: "",
        duration: 0,
        users: []
    });

    useEffect(() =>{
        
        axios.get("http://localhost:5000/users/")
        .then(res => {
            console.log(res.data)
            console.log(res.data[0].username)
            if(res.data.length > 0){
                exercise.users = res.data.map(user => user.username);
                if(exercise.username === ""){
                    exercise.username = res.data[0].username;
                }
            }
        });
    });

    function handleChange(event){
        const {name, value} = event.target;
        setExercise(prevValue => {
            return{
                ...prevValue,
                [name]: value
            }
        });
        setCreated(false);
    }

    function handleDate(date){
        setDate(date);
    }

    function handleSubmit(event){
        event.preventDefault();
        exercise.date = startDate;
        console.log(exercise)

        axios.post("http://localhost:5000/exercises/add", exercise)
        .then(res => console.log(res.data));

        setExercise({
            username: "",
            description: "",
            duration: 0,
            users: [""]
        });

        setDate(new Date());

        setCreated(true);
    }


    return(
        <div>
            <h3>Create new Exercise Log</h3>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Username: </label>
                    <select name="username" required className="form-control"  value={exercise.username} onFocus={handleChange} onChange={handleChange}>                        
                        {
                            exercise.users.map((user, index) =>(
                                <option key={index} value={user}>{user}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <input name="description" type="text" required className="form-control" value={exercise.description} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input name="duration" type="text" className="form-control" value={exercise.duration} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>Date: </label>
                    <div>
                       <DatePicker selected={startDate} name="date" onChange={handleDate}/>
                    </div>
                </div>

                <div>
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                </div>
                {
                    isCreated && <p>Exercise created!</p>
                }
            </form>
        </div>
    );
}

export default CreateExercise;