import {View, Text, StyleSheet} from "react-native"

export default function Index(){
    return (
        <View style = {Style.contaniner}>
            <Text style = {Style.text}>Hello world!</Text>
        </View>
    )
}

const Style = StyleSheet.create({
    contaniner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111"
    },
    text: {
        color: "red",
        fontSize: 30,
    }
})