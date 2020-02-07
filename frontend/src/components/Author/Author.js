import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar'
import styles from './styles.module.css'

/**
Use an author component always as a credentials to work what that person have done
**/
const Author = ({ name, image, color }) => (
    <div className={styles.author}>
        { image && <Avatar image={image} size={40}/>}
        <h5 style={{color:color}}>{name}</h5>
    </div>
);


Author.propTypes = {
    /**
   Use to display name of the author
   */
    name: PropTypes.string.isRequired,
    /**
     Use it when you want to show avatar next to the name
     */
    image: PropTypes.string,
    /**
        Color of the text
     */
    color: PropTypes.string,
}

Author.defaultProps = {
    color: 'black'
}


export default Author;