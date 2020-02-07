import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

const TruncuatedText = ({ lines, text }) => (
    <p className={styles.truncuated}
        style={{
            WebkitLineClamp: lines
        }}
    >
        {text}
    </p>
)

TruncuatedText.propTypes = {
    lines: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}

export default TruncuatedText;