import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import QuestionsScreen from './components/QuestionsScreen';
import WaitScreen from './components/WaitScreen';
import ResultsScreen from './components/ResultsScreen';
import FinalScreen from './components/FinalScreen';

export default function App() {
    const [stage, setStage] = useState('intro');

    const handleBegin = () => {
        setStage('transition');

        setTimeout(() => {
            setStage('questions');
        }, 2200);
    };

    const handleQuestionsComplete = () => {
        setStage('wait');
    };

    const handleWaitComplete = () => {
        setStage('results');
    };

    const handleResultsComplete = () => {
        setStage('final');
    };
    let content;

    if (stage === 'intro') {

        content = (
            <IntroScreen
                onBegin={handleBegin}
            />
        );

    }

    if (stage === 'transition') {
        content = (
            <View style={styles.blackScreen}>
                <StatusBar style="light" />
            </View>
        );
    }

    if (stage === 'questions') {
        content = (
            <QuestionsScreen
                onComplete={handleQuestionsComplete}
            />
        );



    }


    if (stage === 'end') {

        content = (
            <View
                style={styles.blackScreen}
            />
        );

    }



    if (stage === 'wait') {
        content = (
            <WaitScreen
                onFinish={handleWaitComplete}
            />
        );
    }

    if (stage === 'results') {
        content = (
            <ResultsScreen
                onFinish={handleResultsComplete}
            />
        );
    }

    if (stage === 'final') {

        content = (
            <FinalScreen
                onFinish={() => {

                    setStage('end')

                }}
            />
        );
    }

    return (

        <View style={styles.appRoot}>

            {content}

        </View>

    );
}

function IntroScreen({ onBegin }) {
    const titleFade = React.useRef(
        new Animated.Value(0)
    ).current;

    const buttonFade = React.useRef(
        new Animated.Value(0)
    ).current;

    React.useEffect(() => {
        Animated.timing(titleFade, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(buttonFade, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            }).start();
        }, 3500);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[
                    styles.title,
                    {
                        opacity: titleFade,
                    },
                ]}
            >
                You might choose who you are today
            </Animated.Text>

            <Animated.View
                style={{
                    opacity: buttonFade,
                    marginTop: 60,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onBegin}
                >
                    <Text style={styles.beginText}>
                        Begin...
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    blackScreen: {
        flex: 1,
        backgroundColor: '#000',
    },

    title: {
        color: '#f2f2f2',
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 42,
        letterSpacing: 0.8,
        fontWeight: '400',
        fontFamily: 'serif',
    },

    beginText: {
        color: '#888',
        fontSize: 18,
        letterSpacing: 2,
        fontWeight: '300',
        fontFamily: 'serif'
    },

    appRoot: {
        flex: 1,
        backgroundColor: '#000',
    },

});
