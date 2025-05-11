import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ✅ ADD THIS
import { Dimensions } from 'react-native';
import { useState } from 'react';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function EditService(){
    const [isSelected, setSelection] = useState(false);
    const router = useRouter(); // ✅ Create router object

    return(
        <View style={{ flex: 1, backgroundColor: '#E3FAEC' }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backArrow}  onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/signup/services/business-info')} style={styles.saveButton}>
                    <Text style={{ fontSize: 16, marginLeft: 5 }}>Save</Text>
                    <Ionicons name="checkmark" size={16} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

                <Text style={styles.header}>My Services</Text>

                <Text style={styles.subheader}>Service Name</Text>
                <TextInput style={styles.textBox} placeholder='Entr name of service...'></TextInput>

                <Text style={styles.subheader}>Service length</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-start' }}>
                    <TextInput style={styles.lengthBox} placeholder='hours'></TextInput>
                    <TextInput style={styles.lengthBox} placeholder='minutes'></TextInput>
                </View>


                <Text style={styles.subheader}>Service Price</Text>
                <TextInput style={styles.textBox} placeholder='Enter price of service...'></TextInput>

                <Text style={styles.subheader}> Days Available  </Text>
                <View style={{ flexDirection: 'column', alignItems: 'left', gap: 3, flex: 1, paddingTop: 5, justifyContent: 'flex-start' }}>
                    <CheckBox
                        title="Sunday" 
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Tuesday"
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Wednesday"
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Thursday"
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Friday"
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                        style={styles.checkbox}
                    />
                    <CheckBox
                        title="Saturday"
                        checked={isSelected}
                        onPress={() => setSelection(!isSelected)}
                        style={styles.checkbox}
                    />
                </View>

                <Text style={styles.subheader}>Service Price</Text>
                <TextInput style={styles.textBox} placeholder='Enter price of service...'></TextInput>
                <Text style={styles.subheader}>Service Description</Text>
                <TextInput style={styles.bigtextBox} multiline={true} placeholder='Enter a detailed description of this service...'></TextInput>
                
            
            </ScrollView>
        </View>
    )}

    const styles = StyleSheet.create({
        backArrow: {
            marginLeft: -5
        }, 
        saveButton: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 10,
            marginVertical: 20,
            width: screenWidth - 300,
            height: 40,
            // marginLeft: 20
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            paddingHorizontal: 10,
            paddingTop: 10,
            height: 50,
        },
        container:{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: '#E3FAEC',
        },
        header: {
            fontSize: 24,
            marginTop: 20,
            marginLeft: 5
        },
        subheader: {
            // fontSize: 18,
            marginTop: 20,
            marginLeft: 5
        },
        lengthBox: {
            width: screenWidth - 300,
            height: 40,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
        },
        textBox: {
            width: screenWidth - 50,
            height: 40,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
        },
        bigtextBox: {
            width: screenWidth - 50,
            height: 80,
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 10,
            marginTop: 10,
            marginBottom: 20,
            textAlignVertical: 'top',
        }
    })