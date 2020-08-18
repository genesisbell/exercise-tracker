import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

function CreateExercise(){

    const [startDate, setDate] = useState(new Date());

    const [inputText, setInputText] = useState({
        username: "",
        description: "",
        duration: 0,
        users: ["test user", "another test user"]
    });

    function handleChange(event){
        const {name, value} = event.target;
        setInputText(prevValue => {
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
        inputText.date = startDate;
        console.log(inputText);
        // if(inputText.username==="" || inputText.username === inputText.users[0]){
        //     console.log("Seleccione un usuario")
        // }else{
        //     console.log(inputText)
        // }

        event.preventDefault();
    }


    return(
        <div>
            <h3>Create new Exercise Log</h3>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Username: </label>
                    <select name="username" required className="form-control" value={inputText.username} onChange={handleChange}>                        
                        {
                            inputText.users.map((user, index) =>(
                                <option key={index} value={user}>{user}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <input name="description" type="text" required className="form-control" value={inputText.description} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input name="duration" type="text" className="form-control" value={inputText.duration} onChange={handleChange}/>
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
            </form>
        </div>
    );
}

export default CreateExercise;