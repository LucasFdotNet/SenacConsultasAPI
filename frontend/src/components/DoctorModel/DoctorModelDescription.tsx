import { ReactNode } from "react";
import { Text } from "react-native";

interface DoctorModelDescriptionProps {
    children?: ReactNode
}

export function DoctorModelDescription({ children }: DoctorModelDescriptionProps) {

    return(
        <Text>
            {children}
        </Text>
    )

}