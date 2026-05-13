import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [stage, setStage] = useState('intro');

  const titleFade = useRef(new Animated.Value(0)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

  const handleBegin = () => {
    setStage('transition');

    setTimeout(() => {
      setStage('question1');
    }, 2500);
  };

  if (stage === 'transition') {
    return (
        <View style={styles.blackScreen}>
          <StatusBar style="light" />
        </View>
    );
  }

  if (stage === 'question1') {
    return (
        <ImageBackground
            source={require('./assets/Images/moonroad.jpg')}
            style={styles.questionContainer}
            resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.questionText}>
              Would you rather keep moving
              {'\n'}
              or finally stop somewhere?
            </Text>

            <View style={styles.answers}>
              <Text style={styles.answer}>
                Keep moving
              </Text>

              <Text style={styles.answer}>
                Stop somewhere
              </Text>
            </View>
          </View>

          <StatusBar style="light" />
        </ImageBackground>
    );
  }

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
              onPress={handleBegin}
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

  questionContainer: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  title: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 40,
    fontWeight: '300',
    letterSpacing: 1,
  },

  beginText: {
    color: '#888',
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: '300',
  },

  questionText: {
    color: '#fff',
    fontSize: 26,
    lineHeight: 40,
    textAlign: 'center',
    fontWeight: '300',
    marginBottom: 80,
  },

  answers: {
    gap: 25,
  },

  answer: {
    color: '#bbb',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1,
  },
});
