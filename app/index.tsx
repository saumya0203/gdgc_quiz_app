import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/signup');
    }, 8000); // 8 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.content}>
        {/* GDGC Logo Image */}
        <Image
          source={require('../assets/images/img_logo.png')} // 🔹 Replace with your logo URL
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>GDGC NITJ</Text>
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
  logoImage: {
    width: 150,   // adjust as per your logo
    height: 150,  // adjust as per your logo
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
});
