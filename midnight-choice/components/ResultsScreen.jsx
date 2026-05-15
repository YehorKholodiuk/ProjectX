import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Linking,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import useEmotionStore from '../store/useEmotionStore';
import { getRecommendations } from '../utils/recommendationEngine';

export default function ResultsScreen({ onFinish }) {
    const emotionalProfile = useEmotionStore(
        (state) => state.emotionalProfile
    );

    const recommendations = getRecommendations(
        emotionalProfile
    );

    const fadeAnim = useRef(
        new Animated.Value(0)
    ).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            onFinish();
        }, 7000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    width: '100%',
                }}
            >
                <View style={styles.section}>
                    <Text style={styles.label}>
                        FILM
                    </Text>

                    <Text style={styles.title}>
                        {recommendations.film.title}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>
                        MUSIC
                    </Text>

                    <Text style={styles.title}>
                        {recommendations.music.title}
                    </Text>

                    <Text style={styles.subtitle}>
                        {recommendations.music.artist}
                    </Text>
                </View>



                <View style={styles.section}>
                    <Text style={styles.label}>
                        CONTINUE
                    </Text>

                    <Text
                        style={styles.title}
                        onPress={() =>
                            Linking.openURL(
                                'https://openlibrary.org/'
                            )
                        }
                    >
                        Find a book for tonight
                    </Text>

                    <Text style={styles.subtitle}>
                        Open Library
                    </Text>
                </View>


            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingHorizontal: 35,
    },

    section: {
        marginBottom: 70,
    },

    label: {
        color: '#666',
        fontSize: 13,
        letterSpacing: 4,
        marginBottom: 14,
        textAlign: 'center',
    },

    title: {
        color: '#fff',
        fontSize: 26,
        lineHeight: 38,
        textAlign: 'center',
        fontWeight: '300',
        letterSpacing: 0.5,
    },

    subtitle: {
        color: '#888',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        letterSpacing: 1,
        fontWeight: '300',
    },


});
