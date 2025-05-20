import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Schedule = props => {
    const [number, setNumber] = useState('');
    const [PM, setPM] = useState(false);

    const handleInputChange = (text) => {
        const cleanedText = text.replace(/[^0-12]/g, '');
        setNumber(cleanedText);
    };

    const setSchedule = () => {
        const value = PM ? number + 12 : number
        AsyncStorage.setItem("schedule", value, (error) => {
            props.setSchedule(false)
        })
    }

    return (
        <>
            <View className="flex">
                <View className="flex items-center">

                <Text>Set schedule</Text>
                </View>
                <View className="flex-row gap-5 items-center w-[50%]">
                    <View className="basis-1/2">
                <TextInput
                    className="border rounded-xl text-gray-600 mt-5 text-[4rem]"
                    autoFocus={true}
                    onChangeText={handleInputChange}
                    value={number}
                    keyboardType="numeric"
                    maxLength={2}
                    textAlign="center"
                    
                    />
                    </View>
                    <View className="basis-1/2">
                    <TouchableOpacity
                    onPress={() => setPM(!PM)}
                    >
                        <Text className="text-[4rem] underline text-gray-600">
                            {PM ? "PM" : "AM"}
                        </Text>
                    </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity 
                className="bg-slate-700 p-5 rounded mt-10 flex items-center"
                onPress={setSchedule}
                >
                    <Text className="text-white text-xl">
                        CONFIRM
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Schedule;