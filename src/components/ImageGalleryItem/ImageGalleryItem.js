import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';


const ImageGalleryItem = ({imagePath, onClick, id}) => (
    <li key={uuidv4()} className={styles.ImageGalleryItem}>
        <img data-id={id} src={imagePath} alt="" className={styles.ImageGalleryItem_image} onClick={onClick}/>
    </li>
)

ImageGalleryItem.propTypes = {
    imagePath: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
}

export default ImageGalleryItem;