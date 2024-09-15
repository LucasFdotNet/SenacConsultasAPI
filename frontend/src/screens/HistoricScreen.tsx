import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { List } from "../components/List";
import { useAuth } from "../components/context/AuthContext";

export function HistoricScreen () {

    const { historico } = useAuth();

    return(
        <View style={styles.container}>
            <Header.Root title="Historico de atendimento" bgColor="#fe8e61" secondaryColor="#fea675" >
                <Header.Icon iconName="ticket" bottom={-100} color="#fea675" right={-20} size={200} />
            </Header.Root>

            <View style={{ paddingHorizontal: 20 }}>
                <View style={{marginVertical: 20}}>
                    <Text>Verifique suas historico de consultas</Text>
                </View>

                <View>
                    {
                        historico ? (
                            historico.map((item: any, i: any) => {
                                return(
                                    <List.Root key={i} doctorDescription={item.doctorDescription} doctorName={item.doctorName} doctorRole={item.doctorRole} horario={item.horiario} />
                                )
                            })
                        ) : (
                            <Text>Nao possui nenhum historico</Text>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fefeff',
      
    },
})