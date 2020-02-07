import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

const Avatar = ({ image, size }) => (
    <div
        className={styles.avatar}
        style={{
            background: `url('${image}')`,
            height:size,
            width:size
        }}
    />

)

Avatar.propTypes = {
    image: PropTypes.string.isRequired,
    size: PropTypes.number,
}

Avatar.defaultProps = {
    size: 50
}

export default Avatar;

