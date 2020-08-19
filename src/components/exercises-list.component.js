import React, {useState, useEffect} from "react";
import axios from "axios";
import Exercise from "./exercise.component"

function ExercisesList(){

    const [exercises, setExercises] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:5000/exercises/")
        .then(res => {
            setExercises(res.data);
        })
        .catch(err => console.log(err));
    }, [])

    function deleteExercise(id){
        axios.delete("http://localhost:5000/exercises/" + id)
        .then(res => console.log(res.data))
        setExercises(exercises.filter(ex => ex._id !== id));
    }

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(currentExercise =>{
                        return(
                            <Exercise exercise={currentExercise} deleteExercise={deleteExercise} key={currentExercise._id}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ExercisesList;