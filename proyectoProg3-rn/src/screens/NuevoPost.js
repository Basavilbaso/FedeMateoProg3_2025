import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { TextInput } from "react-native";
import { auth, db } from "../firebase/config";
import { FontAwesome } from '@expo/vector-icons'

class NuevoPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            post: "",
            error: ""
        }
    }

    onSubmit(){
        db.collection("posts").add({
            owner: auth.currentUser.email,
            post: this.state.post,
            createdAt: Date.now(),
            likes: []
        })
        .then(() => {
            this.setState({ post: "", error: "" }); 
            this.props.navigation.navigate("Home");
        })
        .catch(error => {
            this.setState({ error: "Fallo en el posteo" });
        });
    }
    
    render() {
        return (
            <View style={styles.posteo}>
                <Text style={styles.h1}>Subir posteo</Text>
                <TextInput style={styles.field} keyboardType="default" placeholder="Crear posteo" onChangeText={text => this.setState({post: text})} value={this.state.post}/>
                <TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}>
                    <FontAwesome name="send" size={18} color="#fff" />
                    <Text style={styles.text}> Subir posteo</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default NuevoPost;


const styles = StyleSheet.create({
    posteo: {
        flex: 1,                       
        justifyContent: 'center',     
        paddingHorizontal: 10,
    },
    h1:{
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#28a745",
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
    },
    field: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10
    },

})