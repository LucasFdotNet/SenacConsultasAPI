import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "../components/context/AuthContext";

export function MyAccountScreen () {

    const { deslogar, nome } = useAuth();

    return (
        <View style={{marginTop: 100}}>
            <View style={{alignItems: "center", gap: 10, marginBottom: 20}}>
                <View style={styles.userContainer}>
                    <Ionicons name="person-outline" size={100} />
                </View>
                <Text>{nome}</Text>
            </View>

            <Pressable onPress={deslogar} style={{flexDirection: "row", alignItems: "center", gap: 13, paddingLeft: 13, backgroundColor: "#ebebeb", paddingVertical: 20}}>
                <Ionicons name="log-out-outline" size={40} color={"red"} />
                <Text style={{ color: "red", fontWeight: 700 }} >Sair</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        height: 200,
        width: 200,
        backgroundColor: "#ccc",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",

    },
})