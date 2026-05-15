import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function FinalScreen() {
    const opacity = useRef(
        new Animated.Value(0)
    ).current;

    useEffect(() => {
        opacity.setValue(0);

        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 2200,
                useNativeDriver: true,
            }),

            Animated.delay(2200),

            Animated.timing(opacity, {
                toValue: 0,
                duration: 3200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[
                    styles.text,
                    {
                        opacity,
                    },
                ]}
            >
                see you next time...
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
        letterSpacing: 1.5,
        fontWeight: '300',
    },
});
