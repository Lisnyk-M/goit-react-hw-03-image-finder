import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
    componentDidUpdate = () => {

    }

    render() {
        const { images, onClick } = this.props;

        return (
            <ul id="ImageGallery" className={styles.ImageGallery}>
                {images.map(image => (
                    <ImageGalleryItem key={uuidv4()} imagePath={image.webformatURL} onClick={onClick} id={image.id} />
                ))}
            </ul>
        )
    }
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        id: PropTypes.number.isRequired
    }))
}

export default ImageGallery;