import React, {
    useEffect,
    useRef,
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

export default function FirstLaunchScreen({
                                              onContinue,
                                          }) {

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
                    duration: 3000,
                    useNativeDriver: true,
                }
            ),

            // HOLD

            Animated.delay(2000),

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
                    onPress={handleContinue}
                >

                    <Text style={styles.continueText}>
                       push to continue...
                    </Text>

                </TouchableOpacity>

            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({

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

});
