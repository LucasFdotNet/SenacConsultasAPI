import { SafeAreaView, Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { ReactNode, useState } from "react";


const { width } = Dimensions.get('window');

interface HeaderRootProps {
    children?: ReactNode,
    title: string,
    bgColor: string,
    secondaryColor: string
}



export function HeaderRoot({ title, bgColor, secondaryColor, children }: HeaderRootProps) {

    const nativation = useNavigation();

    return (
        <SafeAreaView style={{...styles.header, backgroundColor: bgColor }} >

            <View style={styles.leftSide}>
                <Pressable onPress={() => nativation.goBack()} style={{...styles.arrowBack, backgroundColor: secondaryColor}}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </Pressable>
                
            </View>
            <View style={styles.center}>
                <Text style={styles.headerTitle}>
                    {title}
                </Text>
            </View>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderEndEndRadius: 20,
        borderBottomLeftRadius: 20,
        overflow: "hidden",
        position: "relative"
    },
    leftSide: {
        position: "absolute",
        bottom: 10,
        left: 20,
        zIndex: 100
    },
    arrowBack: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    headerTitle: {
        fontWeight: "500",
        fontSize: 16,
        color: "#fff",
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        height: 60,
    }
})

