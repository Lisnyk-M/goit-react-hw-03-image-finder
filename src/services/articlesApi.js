import axios from 'axios';

const fetchArticlesWithQuery = (searchQuery, page = 1, perPage = 12) => {
    const baseURL = 'https://pixabay.com/api/?&key=17921001-34fc34d57ac8e12c6e45b531b&q=';

    return axios
        .get(baseURL + searchQuery + `&page=${page}&per_page=${perPage}`)
        .then(response => response.data.hits);        
}

export default {
    fetchArticlesWithQuery,
}