//@ts-nocheck
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function Page() {
  const route = useRoute();
  const { eventString } = useLocalSearchParams();
  const event = eventString ? JSON.parse(eventString) : null;
  const router = useRouter();

  return (
    <ScrollView style={tw`flex-1 bg-white`} contentContainerStyle={tw`p-5`}>
      <Image
        source={{ uri: event.thumbnail }}
        style={tw`w-full h-40 rounded mb-4`}
        resizeMode="cover"
      />

      <Text style={tw`text-2xl font-bold mb-2`}>{event.name}</Text>
      <Text style={tw`text-gray-600 mb-2`}>{event.date}</Text>
      <Text style={tw`text-base mb-4`}>{event.description || 'Sem descrição disponível.'}</Text>

      {event.requests?.length > 0 && (
        <View style={tw`mt-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Solicitações:</Text>
          {event.requests.map((req, index) => (
            <TouchableOpacity
              key={index}
              style={tw`bg-gray-100 rounded-lg mb-4 overflow-hidden`}
              onPress={
                () => router.navigate({
                  pathname: '/detalhes-do-pedido/',
                  params: { request_string: JSON.stringify(req), event_id: event._id}
                })}
            >
              <Text style={tw`font-semibold`}>{req.email}</Text>
              <Text>{req.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
