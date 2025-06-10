import { useSignIn, useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Lock, User } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { useWarmUpBrowser } from '../(hooks)/useWarmUpBrowser ';

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  useWarmUpBrowser();

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { startSSOFlow } = useSSO();

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onGoogleSignInPress = async () => {
    try {
      const { createdSessionId } = await startSSOFlow({
        strategy: 'oauth_google',
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error('SSO error', err);
    }
  };

  return (
    <View style={tw`flex-1 justify-center bg-white px-8`}>
      <Text style={tw`text-3xl font-bold mb-8 text-center text-gray-900`}>PrivaTicket</Text>

      <View style={tw`mb-5`}>
        <View style={tw`flex-row items-center border border-gray-300 rounded-md px-3 py-2`}>
          <User size={20} color="#6b7280" />
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            onChangeText={setEmailAddress}
            style={tw`flex-1 ml-3 text-base text-gray-800`}
            keyboardType="email-address"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <View style={tw`mb-6`}>
        <View style={tw`flex-row items-center border border-gray-300 rounded-md px-3 py-2`}>
          <Lock size={20} color="#6b7280" />
          <TextInput
            value={password}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={tw`flex-1 ml-3 text-base text-gray-800`}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={onSignInPress}
        style={tw`bg-blue-600 rounded-md py-3 mb-5 shadow-md`}
      >
        <Text style={tw`text-white text-center font-semibold text-lg`}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onGoogleSignInPress}
        style={tw`flex-row justify-center items-center border border-gray-300 rounded-md py-3 mb-8`}
      >
        <Image source={require('../../assets/icons/1.png')} style={tw`w-6 h-6`} />
        <Text style={tw`text-blue-500 text-sm font-medium ml-2`}>Sign in with Google</Text>
      </TouchableOpacity>

      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-gray-600`}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text style={tw`text-blue-600 font-semibold ml-1`}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
