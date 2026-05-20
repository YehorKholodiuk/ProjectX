import React, {
    useEffect,
    useRef,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Animated,
} from 'react-native';

export default function FinalScreen({
                                        onFinish,
                                    }) {

    const fadeAnim =
        useRef(
            new Animated.Value(1)
        ).current;

    useEffect(() => {

        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 4000,
                useNativeDriver: true,
            }
        ).start(() => {

            onFinish();

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
                See you later...
            </Animated.Text>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: '#666',
        fontSize: 22,
        letterSpacing: 2,
        fontStyle: 'italic',
        fontWeight: '300',
    },

});
