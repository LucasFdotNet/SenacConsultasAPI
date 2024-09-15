import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { doctorList } from "../data/doctorList";
import { DoctorModel } from "../components/DoctorModel";


export function ExamScreen () {
    return(
        <View style={styles.container}>
            <Header.Root title="Exames" bgColor="#2ac3ff" secondaryColor="#2fd9fa" >
                <Header.Icon iconName="body" bottom={-120} color="#2fd9fa" right={-20} size={200} />
            </Header.Root>

            <View style={{gap: 10, marginTop: 20, paddingHorizontal: 20}}>
                <Text style={{marginBottom: 15}}>Selecione alguns de nossos medicos disponiveis</Text>
                
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, paddingHorizontal: 20}}>

                    {
                        doctorList.map(({doctorName, doctorRole, doctorDescription}: any) => {
                            return (

                                <DoctorModel.Root
                                    key={doctorName}
                                    doctorInformation={{
                                        doctorName,
                                        doctorRole,
                                        doctorDescription
                                    }}
                                >
                                    <DoctorModel.Title>{doctorName}</DoctorModel.Title>
                                    <DoctorModel.Description>{doctorRole}</DoctorModel.Description>
                                </DoctorModel.Root>
        
                            )
                        })
                    }

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
})