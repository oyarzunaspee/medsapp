import { StyleSheet, Animated, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Schedule from "./components/Schedule";
import ConfirmButton from "./components/ConfirmButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Confetti } from 'react-native-fast-confetti';
import AnimatedColorView from 'react-native-animated-colors';
import '../global.css';

const Home = () => {
    const [schedule, setSchedule] = useState(false)
    const [scheduleTime, setScheduleTime] = useState(0)
    const [progressColor, setProgressColor] = useState("")
    const [remainingHours, setRemainingHours] = useState(0)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [alarm, setAlarm] = useState(false);
    const [party, setParty] = useState(false);
    const [takeNow, setTakeNow] = useState(false);

    const [theme, setTheme] = useState(0);


    const [time, setTime] = useState(true);


    const datetime = new Date(new Date - new Date().getTimezoneOffset())
    const hour = datetime.getHours()

    useEffect(() => {
        const toggle = setInterval(() => {
            setTime(datetime.toLocaleString('en-US', { hour: 'numeric', hour12: true }))
        }, 1000);

        return () => clearInterval(toggle);
    });

    useEffect(() => {
        AsyncStorage.getItem("schedule", (err, scheduleResult) => {
            if (scheduleResult) {
                const today = new Date(new Date - new Date().getTimezoneOffset())
                const difference = today.getHours() < Number(scheduleResult) ? Number(scheduleResult) - today.getHours() : (24 - today.getHours()) + Number(scheduleResult)
                const percentage = (100 * difference) / 24
                setScheduleTime(percentage)
                setRemainingHours(difference)
                const colorDifference = difference < 2 ? "#F52A64" : (difference > 2 && difference < 5 ? "#FFD500" : "#42A186")


                AsyncStorage.getItem("confirmed", (error, confirmedResult) => {

                    if (confirmedResult) {


                        const state = JSON.parse(confirmedResult).state
                        const date = new Date(Date.parse(JSON.parse(confirmedResult).date))

                        const sameDay = date.getDate() == today.getDate()
                        if (sameDay && hour >= scheduleResult) {
                            setProgressColor(colorDifference)
                            setIsConfirmed(true)
                            setParty(true)

                        } else if (!sameDay && hour > scheduleResult) {
                            setProgressColor("#F52A64")
                            setAlarm(true)
                        } else if (!sameDay && hour <= scheduleResult) {
                            setProgressColor(colorDifference)
                            setIsConfirmed(true)
                            setParty(true)
                        } else if (hour == scheduleResult) {
                            setTakeNow(true)
                            setProgressColor("#F52A64")
                        } else {

                        }
                    } else {
                        
                        setAlarm(today.getHours() > scheduleResult && true)
                        setProgressColor(colorDifference)
                    }
                })
            } else {
                setSchedule(true)
            }
        })
    }, [])

    const [activeIndex, setindex] = useState(0);
    return (
        <>
            <AnimatedColorView
                colors={alarm ? ["#ff8a9f"] : []}
                loop={true}
                duration={200}
                className="flex-1 items-center relative">
                {schedule &&
                    <Schedule setSchedule={setSchedule} />
                }
                {!schedule &&
                    <>
                        {party &&
                            <Confetti cannonsPositions={[0]} fallDuration={800} count={1000} blastDuration={300} />
                        }

                        <View className="mt-[20rem]">
                            <Text className={`text-[5rem] 
                            ${alarm ? "text-red-300" : "text-gray-600"}
                            `}>
                                {time}
                            </Text>
                        </View>

                        <ConfirmButton alarm={alarm} progressColor={progressColor} isConfirmed={isConfirmed} />

                        <View className="absolute bottom-10">
                            <Text className="font-bold">
                                in {remainingHours} hours
                            </Text>
                        </View>

                        <View className="absolute bottom-[-149px]">

                            <AnimatedCircularProgress
                                arcSweepAngle={180}
                                size={300}
                                rotation={-90}
                                width={15}
                                backgroundWidth={22}
                                fill={scheduleTime}
                                tintColor={progressColor}
                                lineCap="butt"
                                // onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="#3C3C4F"
                            />

                        </View>
                    </>
                }
            </AnimatedColorView>
        </>
    )
}

export default Home