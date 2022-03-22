import React, {useEffect, useState} from 'react';
import AuthorsList from '../components/AuthorsList';
import axios from 'axios';

const Main = (props) => {
    const [authors, setAuthors] = useState([]);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(()=>{
        axios.get('http://localhost:8000/api/authors')
            .then(res=>{
                setAuthors(res.data);
                console.log(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[]);

    const removeFromDom = authorId => {
        setAuthors(authors.filter(author => author._id !== authorId));
    }
    
    return (
        <div>
            {
                loaded && <AuthorsList authors={authors} setAuthors={setAuthors} removeFromDom={removeFromDom}/>
            }
        </div>
    )
}

export default Main;