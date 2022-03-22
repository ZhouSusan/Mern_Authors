import React, { useState } from 'react';
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom';
import styles from './styles.module.css';


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
            <h3 className={styles.colorText}>Add a new Author</h3>
            <form onSubmit={handleSubmit}>
                <p>
                    <label className={styles.input}>Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                    {
                        errors.map((error) => {
                            return <div className={styles.errorMsg}>{error}</div>
                        })
                    }
                </p>
                <Link to="/">Cancel</Link>
                <button className={styles.btn} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AuthorForm;