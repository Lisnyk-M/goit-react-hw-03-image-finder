import React, { Component } from 'react';
import Notification from './Notification/Notification';
import articlesApi from '../services/articlesApi';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import ReactSpinnerLoader from './ReactSpinnerLoader/ReactSpinnerLoader';
import '../common.css';
import styles from './App.module.css';

export default class App extends Component {
    state = {
        articles: [],
        loading: false,
        error: null,
        searchQuery: '',
        page: 1,
        showModal: false,
        modalImagePath: '',
        didFounded: false,
    };

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevState.searchQuery;
        const nextQuery = this.state.searchQuery;

        console.log('Текущая прокрутка сверху: ' + window.pageYOffset);
        if (prevQuery !== nextQuery) {
            this.fetchArticles();
        }
    }

    fetchArticles = (gridGapImage = 16, perPage = 12) => {
        this.setState({ showModal: true });
        this.setState({ loading: true });
        const { searchQuery, page, articles } = this.state;

        articlesApi.fetchArticlesWithQuery(searchQuery, page, perPage)
            .then(articles => this.setState(prevState => ({
                articles: [...prevState.articles, ...articles],
                page: prevState.page + 1
            })))
            .catch(error => {
                this.setState({ error });
            })
            .finally(() => {
                this.setState({ loading: false })
                this.setState({ showModal: false, didFounded: true });
                if (articles.length > 0) {
                    let scrollHeight = Math.max(
                        document.body.scrollHeight, document.documentElement.scrollHeight,
                        document.body.offsetHeight, document.documentElement.offsetHeight,
                        document.body.clientHeight, document.documentElement.clientHeight
                    );

                    const ul = document.querySelector('#ImageGallery')
                    const li = ul.lastElementChild;
                    const boxLi = li.getBoundingClientRect();
                    const boxUl = ul.getBoundingClientRect();

                    const searchBarHeight = document.querySelector('#SearchBar').offsetHeight;

                    const countLiInRow = Math.round((boxUl.right - boxUl.left) / (boxLi.right - boxLi.left));
                    const countLast12LiColumn = perPage / countLiInRow;
                    const liOffset = ((boxLi.bottom - boxLi.top) + gridGapImage) *
                        countLast12LiColumn + searchBarHeight + gridGapImage * 3.4;

                    window.scrollTo({
                        top: scrollHeight - liOffset,
                        behavior: 'smooth',
                    });
                }
            });
    }

    handleSearchFormSubmit = query => {
        this.setState({ searchQuery: query, page: 1, articles: [] })
    }

    toggleModal = () => {
        this.setState(state => ({ showModal: !state.showModal }));
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    showModal = (e) => {
        const { articles } = this.state;
        const filtered = articles.findIndex(el => {
            return el.id.toString() === e.target.dataset.id;
        });
        this.setState({ showModal: true, modalImagePath: articles[filtered].largeImageURL });
    }

    render() {      
        const { articles, loading, showModal, didFounded } = this.state;

        return (
            <div className={styles.App}> 
                <SearchBar onSubmit={this.handleSearchFormSubmit} />
                <ImageGallery images={articles} onClick={this.showModal} />
                {didFounded && articles.length === 0 && <Notification message="Not found"/>}
                {!loading && articles.length > 1 &&
                    <div className={styles.ButtonWrap}>
                        <Button name="Load more" onClick={this.fetchArticles} />
                    </div>}
                <div>
                    {showModal && <Modal onClose={this.toggleModal} onClick={this.closeModal}>
                        {!loading && <img src={this.state.modalImagePath} alt=""></img>}
                        <ReactSpinnerLoader />
                    </Modal>}
                </div>
            </div>
        )
    }
}