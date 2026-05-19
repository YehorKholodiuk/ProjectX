import mediaDatabase from '../data/mediaDatabase.json';

const calculateDistance = (
    profile = {},
    tags = {}
) => {

    let distance = 0;

    Object.keys(profile).forEach(
        (key) => {

            const profileValue =
                profile[key] || 0;

            const tagValue =
                tags[key] || 0;

            distance +=
                Math.abs(
                    profileValue -
                    tagValue
                ) +
                (Math.random() * 0.3);
        }
    );

    return distance;
};


const findBestMatch = (
    items,
    emotionalProfile
) => {

    const scoredItems = items.map(
        (item) => ({
            item,
            distance:
                calculateDistance(
                    emotionalProfile,
                    item.tags
                ),
        })
    );

    scoredItems.sort(
        (a, b) =>
            a.distance - b.distance
    );

    const topMatches =
        scoredItems.slice(0, 5);

    const randomIndex =
        Math.floor(
            Math.random() *
            topMatches.length
        );

    return topMatches[
        randomIndex
        ].item;
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
