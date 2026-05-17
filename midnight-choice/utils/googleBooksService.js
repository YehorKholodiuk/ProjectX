import emotionalDictionary from '../data/emotionalDictionary';

const API_KEY =
    'AIzaSyCaOc15XyfWJg7sTbbcQIfJ1ImyEq2z9Yo';

const GOOGLE_BOOKS_API =
    `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}`;

const getDominantDimensions = (
    emotionalProfile
) => {
    return Object.entries(emotionalProfile)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([key]) => key);
};

const buildSemanticQuery = (
    emotionalProfile
) => {
    const dominantDimensions =
        getDominantDimensions(emotionalProfile);

    let semanticTokens = [];

    dominantDimensions.forEach((dimension) => {
        const tokens =
            emotionalDictionary[dimension];

        semanticTokens.push(...tokens);
    });

    semanticTokens = semanticTokens.slice(0, 5);

    return `${semanticTokens.join(
        ' '
    )} fiction novel`;
};

export const fetchBookRecommendation =
    async (emotionalProfile) => {
        try {
            const query = buildSemanticQuery(
                emotionalProfile
            );

            console.log(
                'FINAL QUERY:',
                query
            );

            const response = await fetch(
                `${GOOGLE_BOOKS_API}&q=${encodeURIComponent(
                    query
                )}&maxResults=10`
            );

            const data =
                await response.json();

            console.log(
                'GOOGLE BOOKS RESPONSE:',
                JSON.stringify(data, null, 2)
            );

            if (
                !data.items ||
                data.items.length === 0
            ) {
                return null;
            }

            const filteredBooks =
                data.items.filter((item) => {
                    const info =
                        item.volumeInfo;

                    return (
                        info.title &&
                        info.authors &&
                        (
                            info.previewLink ||
                            info.infoLink
                        )
                    );
                });

            if (
                filteredBooks.length === 0
            ) {
                return null;
            }

            const selectedBook =
                filteredBooks[
                    Math.floor(
                        Math.random() *
                        filteredBooks.length
                    )
                    ];

            return {
                title:
                selectedBook.volumeInfo.title,

                author:
                    selectedBook.volumeInfo.authors.join(
                        ', '
                    ),

                previewLink:
                    selectedBook.volumeInfo
                        .previewLink ||
                    selectedBook.volumeInfo
                        .infoLink,

                description:
                    selectedBook.volumeInfo
                        .description || '',
            };
        } catch (error) {
            console.log(
                'Google Books Error:',
                error
            );

            return null;
        }
    };
