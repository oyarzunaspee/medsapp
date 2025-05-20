import { Button, View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


const ConfirmButton = props => {

    const confirm = async () => {
        const datetime = new Date(new Date - new Date().getTimezoneOffset())
        AsyncStorage.setItem("confirmed", JSON.stringify({
            state: true,
            date: datetime.toJSON()
        }), (err) => { });

    }

    return (
        <>
            <View
                className="mt-5 w-[60%]"
            >
                <TouchableOpacity
                    className="p-5 rounded-xl flex items-center"
                    style={{ backgroundColor: (!props.isConfirmed ? (props.alarm ? "#8a152a" : props.progressColor) : "#b6b8bf") }}
                    onPress={confirm}
                    disabled={props.isConfirmed}
                    >
                    <Text className={`text-[30px]
                        ${props.isConfirmed ? "text-gray-300" : "text-white"}
                        `}>
                        CONFIRM
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ConfirmButton