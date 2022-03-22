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
        axios.put('http://localhost:8000/api/authors/' + id, {
            name
        })
            .then(res=>{
                console.log(res)
                history.push('/');
            }) 
            .catch(err=>{
                console.log(err);
                const errorResponse = err.response.data.errors; 
                const errorArr = []; 
                for (const key of Object.keys(errorResponse)) { 
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })            
    }

    return (
        <div>
            <Link to="/">Home</Link>
            <h3 style={{color: "purple", marginBottom: 5}}>Edit this author: </h3>
            <form onSubmit={updateAuthor}>
                <p>
                    <label style={{marginRight: 15}}>Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                    {
                        errors.map((error) => {
                            return <div style={{color: "red"}}>{error}</div>
                        })
                    }
                </p>
                <Link to="/">Cancel</Link>
                <button style={{marginLeft: 15}} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Update;