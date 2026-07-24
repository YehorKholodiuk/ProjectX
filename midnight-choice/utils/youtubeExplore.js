
const BASE_URL =
    'https://www.youtube.com/results?search_query=';

export const getYoutubeSearchUrl = (
    query
) => {

    if (!query) {
        return null;
    }

    return `${BASE_URL}${encodeURIComponent(query)}`;

};
