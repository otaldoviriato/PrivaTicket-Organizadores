//@ts-nocheck
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useEventContext } from '../(context)/EventContext';

const EventList = () => {
    const { events, loading } = useEventContext();
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        if (!Array.isArray(events)) return;
        const filteredEvents = events.filter(event =>
            event.name.toLowerCase().includes(search.toLowerCase())
        );
        setFiltered(filteredEvents);
    }, [search, events]);

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`px-4`}>
                <Text style={tw`text-2xl font-bold mt-4 mb-2`}>👋 Bem-vindo!</Text>
                <Text style={tw`text-sm text-gray-600 mb-4`}>Confira os eventos disponíveis abaixo:</Text>

                <View style={tw`flex-row items-center border border-gray-300 rounded px-3 py-2 mb-4`}>
                    <Text style={tw`mr-2 text-gray-500`}>🔍</Text>
                    <TextInput
                        style={tw`flex-1 text-base`}
                        placeholder="Buscar eventos..."
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor="#888"
                    />
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#000" style={tw`mt-10`} />
                ) : (
                    <FlatList
                        data={filtered}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={tw`pb-10`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={tw`bg-gray-100 rounded-lg mb-4 overflow-hidden`}
                                onPress={
                                    () => router.navigate({
                                        pathname: '/detalhes-do-evento',
                                        params: { eventString: JSON.stringify(item) }
                                    })}
                            >
                                {item.thumbnail && (
                                    <Image
                                        source={{ uri: item.thumbnail }}
                                        style={tw`w-full h-40`}
                                        resizeMode="cover"
                                    />
                                )}
                                <View style={tw`p-4`}>
                                    <Text style={tw`text-lg font-semibold mb-1`}>{item.name}</Text>
                                    <Text style={tw`text-gray-500`}>{item.date}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default EventList;
