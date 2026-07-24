import mediaDatabase from '../data/mediaDatabase.json';

const calculateDistance = (
    profile = {},
    tags = {}
) => {

    let distance = 0;

    Object.keys(profile).forEach((key) => {

        const profileValue = profile[key] || 0;
        const tagValue = tags[key] || 0;

        distance +=
            Math.abs(profileValue - tagValue) +
            (Math.random() * 0.3);

    });

    return distance;
};

const findBestMatch = (
    items,
    emotionalProfile
) => {

    const scoredItems = items.map((item) => ({
        item,
        distance: calculateDistance(
            emotionalProfile,
            item.tags
        ),
    }));

    scoredItems.sort(
        (a, b) => a.distance - b.distance
    );

    const topMatches = scoredItems.slice(0, 5);

    const selected =
        topMatches[
            Math.floor(
                Math.random() * topMatches.length
            )
            ];

    return {
        item: selected.item,
        distance: selected.distance,
    };
};

const buildExploreQuery = (
    item,
    type
) => {

    if (!item) {
        return null;
    }

    if (type === 'music') {
        return `${item.artist} ${item.title}`;
    }

    if (type === 'film') {
        return `${item.title} trailer`;
    }

    return item.title;
};

export const getRecommendations = (
    emotionalProfile
) => {

    console.log(
        'EMOTIONAL PROFILE:',
        emotionalProfile
    );

    const bestFilm =
        findBestMatch(
            mediaDatabase.films,
            emotionalProfile
        );

    const bestMusic =
        findBestMatch(
            mediaDatabase.music,
            emotionalProfile
        );

    return {

        film: bestFilm.item,

        music: bestMusic.item,

        metadata: {

            filmDistance:
            bestFilm.distance,

            musicDistance:
            bestMusic.distance,

            explore: {

                musicQuery:
                    buildExploreQuery(
                        bestMusic.item,
                        'music'
                    ),

                filmQuery:
                    buildExploreQuery(
                        bestFilm.item,
                        'film'
                    )

            }

        }

    };

};
