import React, {
    useEffect,
    useRef,
    useState
} from 'react';

import {
    Animated,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import AsyncStorage
    from '@react-native-async-storage/async-storage';

import { playDoorSound }
    from '../utils/playDoorSound';

export default function FirstLaunchScreen({
                                              onContinue,
                                          }) {


    const [showAbout, setShowAbout] =
        useState(false);

    const [showTuning, setShowTuning] =
        useState(false);



    const iconFade =
        useRef(
            new Animated.Value(0)
        ).current;

    const textFade =
        useRef(
            new Animated.Value(0)
        ).current;

    useEffect(() => {

        Animated.sequence([

            // ICON FADE IN

            Animated.timing(
                iconFade,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ),

            // HOLD

            Animated.delay(1400),

            // ICON FADE OUT

            Animated.timing(
                iconFade,
                {
                    toValue: 0,
                    duration: 2500,
                    useNativeDriver: true,
                }
            ),

            // TEXT FADE IN

            Animated.timing(
                textFade,
                {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                }
            ),

        ]).start();

    }, []);

    const handleContinue = async () => {

        try {

            await AsyncStorage.setItem(
                'hasSeenIntro',
                'true'
            );

            onContinue();

        } catch (error) {

            console.log(
                'Error saving intro state:',
                error
            );

        }
    };

    return (

        <View style={styles.container}>

            {/* OPENING IMAGE */}

            <Animated.Image
                source={require('../assets/Images/ChatGPT Image 27 трав. 2026 р., 14_46_49.png')}
                style={[
                    styles.backgroundImage,
                    {
                        opacity: iconFade,
                    }
                ]}
                resizeMode="cover"
            />

            {/* TEXT BLOCK */}

            <Animated.View
                style={{
                    opacity: textFade,
                    alignItems: 'center',
                }}
            >

                <Text style={styles.introText}>
                    Respecting copyright holders,
                    Midnight Choice recommends publicly available media
                    through official and authorized sources whenever possible.
                </Text>

                <TouchableOpacity
                    //onPress={handleContinue}

                    onPress={async () => {

                        await playDoorSound();

                        setTimeout(() => {

                            handleContinue();

                        }, 400);

                    }}

                >

                    <Text style={styles.continueText}>
                       push to continue...
                    </Text>


                    <TouchableOpacity
                        onPress={() =>
                            setShowTuning(true)
                        }
                    >

                        <Text style={styles.tuningText}>
                           Tuning
                        </Text>

                    </TouchableOpacity>

                </TouchableOpacity>

            </Animated.View>

            {showTuning && (

                <View style={styles.tuningOverlay}>

                    <TouchableOpacity>

                        <Text style={styles.tuningOption}>
                            Sound: On
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity>

                        <Text style={styles.tuningOption}>
                            Reset Intro
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {

                            setShowTuning(false);

                            setTimeout(() => {

                                setShowAbout(true);

                            }, 300);

                        }}
                    >

                        <Text style={styles.tuningOption}>
                            About
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            setShowTuning(false)
                        }
                    >

                        <Text style={styles.tuningClose}>
                            Close
                        </Text>

                    </TouchableOpacity>

                </View>

            )}



            {showAbout && (

                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.aboutOverlay}
                    onPress={() =>
                        setShowAbout(false)
                    }
                >

                    <Animated.Text
                        style={styles.aboutText}
                    >
                        Midnight Choice is a nocturnal
                        recommendation experience
                        built around atmosphere,
                        reflection,
                        and emotional discovery.

                        {'\n\n'}

                        Through questions,
                        music,
                        trailers,
                        and cinematic fragments,
                        the experience explores solitude,
                        wonder,
                        memory,
                        night,
                        movement,
                        and transcendence through ordinary life.

                        {'\n\n'}

                        Some passages are meant
                        to appear briefly,
                        and disappear quietly.

                        {'\n\n'}

                        <Text style={styles.aboutSignature}>
                            crafted without AI
                        </Text>

                    </Animated.Text>

                </TouchableOpacity>

            )}

        </View>
    );
}

const styles = StyleSheet.create({

    aboutSignature: {
        color: '#666',
        fontSize: 12,
        marginTop: 36,
        fontFamily: 'sans serif',
        letterSpacing: 2,
        opacity: 0.25,
    },



    aboutOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 36,
    },

    aboutText: {
        color: '#bbb',
        fontSize: 16,
        lineHeight: 32,
        textAlign: 'center',
        fontFamily: 'serif',
        opacity: 0.82,
        letterSpacing: 1,
    },

    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },

    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    introText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        opacity: 0.8,
        lineHeight: 34,
        marginBottom: 60,
        letterSpacing: 1,
        fontFamily: 'serif',
    },

    continueText: {
        color: '#999',
        fontSize: 16,
        letterSpacing: 2,
        opacity: 0.75,
        fontFamily: 'serif',

    },


    tuningText: {
        color: '#777',
        fontSize: 12,
        opacity: 0.48,
        marginTop: 22,
        letterSpacing: 3,
        fontFamily: 'serif',
    },

    tuningOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.82)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 140,
    },

    tuningOption: {
        color: '#999',
        fontSize: 15,
        marginBottom: 20,
        letterSpacing: 2,
        fontFamily: 'serif',
        opacity: 0.82,
    },

    tuningClose: {
        color: '#666',
        fontSize: 12,
        marginTop: 18,
        letterSpacing: 2,
        fontFamily: 'serif',
        opacity: 0.55,
    },

});
