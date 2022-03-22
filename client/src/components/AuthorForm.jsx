// React and both useState useEffect
import React, { useState } from 'react';
// axios to make api call
import axios from 'axios'
// use History to back to all author page
import { useHistory, Link } from 'react-router-dom';


const AuthorForm = (props) => {

    const [name, setName] = useState("");

    const [errors, setErrors] = useState([])
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        //Send a post request to our API to create a Book
        axios.post('http://localhost:8000/api/authors', {
            name
        })
            .then(res=>{console.log(res)
                history.push('/');
            }) 
            .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })            
    }

    return (
        <div>
            <a href="/">Home</a>
            <h3>Add a new Author</h3>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                    {
                        errors.map((error) => {
                            return <div style={{color: "red"}}>{error}</div>
                        })
                    }
                </p>
                <Link to="/">Cancel</Link>
                <input className="btn" type="submit" value="submit" />
            </form>
        </div>
    );
};

export default AuthorForm;