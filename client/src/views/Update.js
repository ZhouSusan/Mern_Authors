import React, { useEffect, useState} from 'react';
import axios from 'axios'
import { useHistory, Link ,  useParams} from 'react-router-dom';


const Update = (props) => {

    const {id} = useParams();
    const [name, setName] = useState("");

    const [errors, setErrors] = useState([])
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8000/api/authors/' + id)
            .then(res => {
                setName(res.data.name);
            })
    }, []);

    const updateAuthor = e => {
        e.preventDefault();
        //Send a post request to our API to create a Book
        axios.put('http://localhost:8000/api/authors/' + id, {
            name
        })
            .then(res=>{
                console.log(res)
                history.push('/');
            }) 
            .catch(err=>{
                console.log(err);
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
            <Link to="/">Home</Link>
            <h3>Edit this author: </h3>
            <form onSubmit={updateAuthor}>
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

export default Update;