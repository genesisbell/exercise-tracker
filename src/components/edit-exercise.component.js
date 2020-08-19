import React, {useState, useEffect} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useParams } from "react-router-dom";

function EditExercise(props){
    const [startDate, setDate] = useState(new Date());

    const [exercise, setExercise] = useState({
        username: "",
        description: "",
        duration: 0,
        users: ["Select User"]
    });

    const {id} = useParams();
    

    useEffect(() =>{
        axios.get("http://localhost:5000/exercises/" + id)
        .then(res => {
            console.log(res.data)
            setExercise({
                id: res.data._id,
                username: res.data.username,
                description: res.data.description,
                duration: res.data.duration,
                users: [res.data.username]
            });

            setDate(new Date(res.data.date))
        });
        axios.get("http://localhost:5000/users/")
        .then(res => {
        });
    }, []);

    function handleChange(event){
        const {name, value} = event.target;
        setExercise(prevValue => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }

    

    function handleDate(date){
        setDate(date);
    }

    function handleSubmit(event){
        event.preventDefault();
        exercise.date = startDate;

        axios.post("http://localhost:5000/exercises/update/" + id, exercise)
        .then(res => console.log(res.data));

        window.location = "/";
    }


    return( 
        <div>
            <h3>Edit Exercise Log</h3>
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
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}

export default EditExercise;