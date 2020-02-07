import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css'

/**
    What to do:
    <li> zoom on hover option</li>
 */

const Image = ({ src, width, height, border, children }) => (
    <div className={styles.parent} style={{
        width: width,
        height: height
    }}>
        <div
            className={`${styles.image} ${(border === 'shadow' ? styles.shadow : '')}`}
            style={{ background: `url('${src}')`, }
        }>
            {children}
        </div>
    </div>
);


Image.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    height: PropTypes.number,
    border: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element
    ])
}

Image.defaultProps = {
    width: '100%',
    height: 150
}

export default Image;