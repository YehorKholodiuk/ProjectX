import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    ScrollView,
    StyleSheet,
} from 'react-native';

import useEmotionStore
    from '../store/useEmotionStore';

import { getRecommendations }
    from '../utils/recommendationEngine';

export default function ResultsScreen() {

    const emotionalProfile =
        useEmotionStore(
            (state) => state.scores
        );
    console.log(emotionalProfile);

    const resetScores =
        useEmotionStore(
            (state) => state.resetScores
        );

    const recommendations =
        getRecommendations(
            emotionalProfile
        );

    const {
        film,
        music,
    } = recommendations;

    const openLink = async (url) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.log(
                'Error opening URL:',
                error
            );
        }
    };

    return (
        <ScrollView
            contentContainerStyle={
                styles.resultsContainer
            }
        >
            <Text style={styles.resultsTitle}>
                Your Midnight Choice
            </Text>

            {/* MUSIC */}

            {music && (
                <View style={styles.mediaBlock}>
                    <Text style={styles.mediaLabel}>
                        Music
                    </Text>

                    <Text style={styles.mediaTitle}>
                        {music.title}
                    </Text>

                    <Text style={styles.mediaSubtitle}>
                        {music.artist}
                    </Text>

                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() =>
                            openLink(
                                music.youtubeUrl
                            )
                        }
                    >
                        <Text style={styles.linkText}>
                            Listen on YouTube
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* FILM */}

            {film && (
                <View style={styles.mediaBlock}>
                    <Text style={styles.mediaLabel}>
                        Film
                    </Text>

                    <Text style={styles.mediaTitle}>
                        {film.title}
                    </Text>

                    <Text style={styles.mediaSubtitle}>
                        {film.year}
                    </Text>

                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() =>
                            openLink(
                                film.trailerUrl
                            )
                        }
                    >
                        <Text style={styles.linkText}>
                            Watch Trailer
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* RESET */}

            <TouchableOpacity
                style={styles.restartButton}
                onPress={() => {
                    resetScores();
                }}
            >
                <Text style={styles.restartText}>
                    Start Again
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    resultsContainer: {
        flexGrow: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingHorizontal: 35,
        paddingVertical: 60,
    },

    resultsTitle: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 60,
        letterSpacing: 1,
        fontWeight: '300',
    },

    mediaBlock: {
        marginBottom: 55,
    },

    mediaLabel: {
        color: '#666',
        fontSize: 13,
        letterSpacing: 4,
        marginBottom: 14,
        textAlign: 'center',
    },

    mediaTitle: {
        color: '#fff',
        fontSize: 24,
        lineHeight: 34,
        textAlign: 'center',
        fontWeight: '300',
        letterSpacing: 0.5,
    },

    mediaSubtitle: {
        color: '#888',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        letterSpacing: 1,
        fontWeight: '300',
    },

    linkButton: {
        marginTop: 20,
        alignItems: 'center',
    },

    linkText: {
        color: '#999',
        fontSize: 15,
        letterSpacing: 1.2,
        textDecorationLine: 'underline',
        fontWeight: '300',
    },

    restartButton: {
        marginTop: 40,
        alignItems: 'center',
    },

    restartText: {
        color: '#777',
        fontSize: 14,
        letterSpacing: 2,
    },
});
