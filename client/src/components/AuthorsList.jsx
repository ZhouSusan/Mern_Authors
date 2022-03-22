import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styles from './styles.module.css';


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
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <hr></hr>
            <h1>Favorite Authors: </h1>
            <Link to="/new">Add an author</Link>
            <p className={styles.colorText}>We have quotes by:</p>
            <div className={styles.tableHeaders}>
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th><span style={{marginLeft: 40}}>Author</span></th>
                            <th>Actions available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.authors.map((author, i) => {
                                return (
                                    <tr key={i}>
                                        <td><span className={styles.colorText}>{author.name}</span></td>
                                            <td><Link className={styles.editButton} to={`/authors/${author._id}`} key={author._id}>Edit</Link>
                                            <button className={styles.deletebtn} onClick={(e)=>{deleteProduct(author._id)}}>
                                                Delete
                                            </button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AuthorsList;