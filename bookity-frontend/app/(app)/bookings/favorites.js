import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { useRouter } from 'expo-router';        

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function Faborites(){
    const router = useRouter(); // ✅ Create router object


    return(
        <ScrollView>
            
        </ScrollView>
        
)}