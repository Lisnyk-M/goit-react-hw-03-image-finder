import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({name, onClick}) => (
    <button className={styles.Button} onClick={() => onClick()}>{name}</button>
)

Button.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Button;
