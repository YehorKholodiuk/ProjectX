import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Animated,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import useEmotionStore from '../store/useEmotionStore';

import { getRecommendations } from '../utils/recommendationEngine';

import {
    fetchBookRecommendation,
} from '../utils/googleBooksService';

export default function ResultsScreen({
                                          onFinish,
                                      }) {
    const emotionalProfile = useEmotionStore(
        (state) => state.emotionalProfile
    );

    const recommendations = getRecommendations(
        emotionalProfile
    );

    const [book, setBook] = useState(null);

    const fadeAnim = useRef(
        new Animated.Value(0)
    ).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
        }).start();

        const loadBook = async () => {
            const result =
                await fetchBookRecommendation(
                    emotionalProfile
                );

            console.log(result);

            setBook(result);
        };

        loadBook();

        const timer = setTimeout(() => {
            onFinish();
        }, 9000);

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

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            Linking.openURL(
                                recommendations.music.youtubeUrl
                            )
                        }
                    >
                        <>
                            <Text style={styles.title}>
                                {recommendations.music.title}
                            </Text>

                            <Text style={styles.subtitle}>
                                {recommendations.music.artist}
                            </Text>

                            <Text style={styles.link}>
                                Listen on YouTube
                            </Text>
                        </>
                    </TouchableOpacity>
                </View>







                <View style={styles.section}>
                    <Text style={styles.label}>
                        BOOK
                    </Text>

                    {book ? (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                Linking.openURL(
                                    book.previewLink
                                )
                            }
                        >
                            <>
                                <Text style={styles.title}>
                                    {book.title}
                                </Text>

                                <Text style={styles.subtitle}>
                                    {book.author}
                                </Text>

                                <Text style={styles.link}>
                                    Preview / View
                                </Text>
                            </>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.subtitle}>
                            Searching through the
                            night...
                        </Text>
                    )}
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

    link: {
        color: '#999',
        fontSize: 15,
        marginTop: 18,
        textAlign: 'center',
        letterSpacing: 1.2,
        textDecorationLine: 'underline',
        fontWeight: '300',
    },
});
