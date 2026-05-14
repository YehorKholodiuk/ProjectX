import mediaDatabase from '../data/mediaDatabase.json';

const calculateDistance = (profile, tags) => {
    let distance = 0;

    Object.keys(profile).forEach((key) => {
        distance += Math.abs(profile[key] - tags[key]);
    });

    return distance;
};

const findBestMatch = (items, emotionalProfile) => {
    return items.reduce((bestMatch, currentItem) => {
        const currentDistance = calculateDistance(
            emotionalProfile,
            currentItem.tags
        );

        if (!bestMatch) {
            return {
                item: currentItem,
                distance: currentDistance,
            };
        }

        if (currentDistance < bestMatch.distance) {
            return {
                item: currentItem,
                distance: currentDistance,
            };
        }

        return bestMatch;
    }, null).item;
};

export const getRecommendations = (emotionalProfile) => {
    const bestFilm = findBestMatch(
        mediaDatabase.films,
        emotionalProfile
    );

    const bestMusic = findBestMatch(
        mediaDatabase.music,
        emotionalProfile
    );

    const bestBook = findBestMatch(
        mediaDatabase.books,
        emotionalProfile
    );
    return {
        film: bestFilm,
        music: bestMusic,
        book: bestBook,
    };
};

