import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const AuthorsList = (props) => {

    const { removeFromDom } = props;

    const deleteProduct = (authorId) => {
        axios.delete('http://localhost:8000/api/authors/' + authorId)
            .then(res => {
                removeFromDom(authorId)
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <hr></hr>
            <h1>Favorite Authors: </h1>
            <Link to="/new">Add an author</Link>
            <p>We have quotes by:</p>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Actions available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.authors.map((author, i) => {
                            return (
                                <tr key={i}>
                                    <td>{author.name}</td>
                                        <td><a href={`/authors/${author._id}`} key={author._id}>Edit</a>
                                        <button onClick={(e)=>{deleteProduct(author._id)}}>
                                            Delete
                                        </button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AuthorsList;