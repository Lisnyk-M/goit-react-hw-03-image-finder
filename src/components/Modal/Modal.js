import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
    componentDidMount () {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        console.log(e);
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div className={styles.Overlay}>
                <div className={styles.Modal} onClick={this.props.onClick}>{this.props.children}</div>
            </div>
        )
    }
}

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal;