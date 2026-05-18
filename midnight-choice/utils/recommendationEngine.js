import mediaDatabase from '../data/mediaDatabase.json';

const calculateDistance = (profile = {}, tags = {}) => {
    let distance = 0;

    Object.keys(profile || {}).forEach((key) => {
        const profileValue = profile[key] || 0;
        const tagValue = tags[key] || 0;

        distance += Math.abs(profileValue - tagValue);
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
    console.log('EMOTIONAL PROFILE:', emotionalProfile);

    const bestFilm = findBestMatch(
        mediaDatabase.films,
        emotionalProfile
    );

    const bestMusic = findBestMatch(
        mediaDatabase.music,
        emotionalProfile
    );

    return {
        film: bestFilm,
        music: bestMusic,
    };
};
