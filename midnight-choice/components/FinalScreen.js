import React, {
    useEffect,
    useRef,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity
} from 'react-native';

import useEmotionStore
    from '../store/useEmotionStore';

import { Audio }
    from 'expo-av';

export default function FinalScreen({
                                        onFinish,
                                    }) {

    const restartFade =
        useRef(
            new Animated.Value(0)
        ).current;


    const playWooshSound = async () => {

        try {

            const { sound } =
                await Audio.Sound.createAsync(
                    require(
                        '../assets/sounds/mixkit-air-woosh-1489.wav'
                    )
                );

            await sound.playAsync();

        } catch (error) {

            console.log(
                'Error playing woosh:',
                error
            );

        }
    };

    const fadeAnim =
        useRef(
            new Animated.Value(0)
        ).current;

    const resetProfile =
        useEmotionStore(
            (state) =>
                state.resetProfile
        );

    useEffect(() => {

        setTimeout(() => {

            playWooshSound();

        }, 3400);

        Animated.sequence([

            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 2200,
                    useNativeDriver: true,
                }
            ),

            Animated.delay(1200),

            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true,
                }
            ),

        ]).start(() => {

            setTimeout(() => {

                resetProfile();


                setTimeout(() => {

                    Animated.timing(
                        restartFade,
                        {
                            toValue: 1,
                            duration: 2200,
                            useNativeDriver: true,
                        }
                    ).start();

                }, 1200);





            }, 100);

        });

    }, []);
    return (

        <View style={styles.container}>

            <Animated.Text
                style={[
                    styles.text,
                    {
                        opacity: fadeAnim,
                    },
                ]}
            >
                see you later...
            </Animated.Text>

            <Animated.View
                style={{
                    opacity: restartFade,
                    position: 'absolute',
                    bottom: 120,
                }}
            >

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onFinish}
                >

                    <Text style={styles.restartText}>
                        restart the passage...
                    </Text>

                </TouchableOpacity>

            </Animated.View>

        </View>



    );
}

const styles = StyleSheet.create({

    restartText: {
        color: '#777',
        fontSize: 14,
        letterSpacing: 3,
        fontFamily: 'serif',
        opacity: 0.72,
    },

    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: '#777',
        fontSize: 26,
        letterSpacing: 1.2,

        fontWeight: '400',
        fontFamily: 'serif',
    },

});
