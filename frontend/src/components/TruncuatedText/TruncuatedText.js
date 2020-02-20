import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

const TruncuatedText = ({ lines, text }) => (
    <p className={styles.truncuated}
        style={{
            WebkitLineClamp: lines
        }}
        
    >
       <span dangerouslySetInnerHTML={{ __html: text }}></span>
    </p>
)

TruncuatedText.propTypes = {
    lines: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}

export default TruncuatedText;