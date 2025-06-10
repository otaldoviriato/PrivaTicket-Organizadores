//@ts-nocheck
import { useAuth } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    const loadLocalEvents = async () => {
        const stored = await AsyncStorage.getItem('eventList');
        if (stored) {
            setEvents(JSON.parse(stored));
        }
    };

    const fetchRemoteEvents = async () => {
        try {
            const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
            const token = await getToken();
            const res = await fetch(`${baseUrl}api/v1/listar-eventos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setEvents(data.events);
            await AsyncStorage.setItem('eventList', JSON.stringify(data.events));
        } catch (err) {
            console.error('Erro ao buscar eventos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLocalEvents().then(fetchRemoteEvents);
    }, []);

    return (
        <EventContext.Provider value={{ events, loading }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEventContext = () => useContext(EventContext);
