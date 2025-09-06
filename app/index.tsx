import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/signup');
    }, 9000); // 9 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.content}>
        {/* GDGC Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <View style={styles.logoShapeContainer}>
              <View style={[styles.logoShape, { backgroundColor: '#4285F4', transform: [{ rotate: '45deg' }] }]} />
              <View style={[styles.logoShape, { backgroundColor: '#EA4335', transform: [{ rotate: '135deg' }], marginLeft: -8 }]} />
            </View>
            <View style={styles.logoShapeContainer}>
              <View style={[styles.logoShape, { backgroundColor: '#34A853', transform: [{ rotate: '-45deg' }] }]} />
              <View style={[styles.logoShape, { backgroundColor: '#FBBC04', transform: [{ rotate: '45deg' }], marginLeft: -8 }]} />
            </View>
          </View>
          <Text style={styles.logoText}>GDGC NITJ</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  logoShapeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoShape: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
});