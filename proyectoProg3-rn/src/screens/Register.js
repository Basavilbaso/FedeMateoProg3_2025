import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { TextInput } from "react-native";
import { auth, db } from "../firebase/config";
import { FontAwesome } from '@expo/vector-icons'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            register: false,
            error: ""
        }
    }

    registrarUsuario(email, username, password) {
        if ((email !== "" && username !== "" && password !== "") && email.includes("@") && username.length >= 3 && password.length >= 6) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    db.collection("users")
                        .add({
                            owner: email,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            username: username
                        })
                        .then(() => {
                            auth.signOut()
                                .then(() => {
                                    this.setState({ register: true })
                                    this.props.navigation.navigate("Login")
                                })
                        })
                        .catch(() => this.setState({ error: "Fallo en el registro" }))
                })
        } else {
            if (email === "" || username === "" || password === "") {
                this.setState({ error: "Todos los campos son obligatorios" })
            } else if (!email.includes("@")) {
                this.setState({ error: "Formato de email incorrecto" })
            } else if (username.length < 3) {
                this.setState({ error: "El nobre de usuario debe tener al menos tres caracteres " })
            } else if (password.length < 6) {
                this.setState({ error: "La contraseña debe tener al menos 6 caracteres" })
            }
        }
    }

    render() {
        return (
            <View style={styles.registrar}>
                <Text style={styles.h1}>Formulario de registro</Text>
                <TextInput style={styles.field} keyboardType="email-address" placeholder="email" onChangeText={text => this.setState({email: text})} value={this.state.email} />
                <TextInput style={styles.field} keyboardType="default" placeholder="Ingrese su nombre de usuario" onChangeText={text => this.setState({username: text})} value={this.state.username} />
                <TextInput style={styles.field} keyboardType="default" secureTextEntry={true} placeholder="password" onChangeText={text => this.setState({password: text})} value={this.state.password} />
                {this.state.error !== "" && (<Text style={styles.error}>{this.state.error}</Text>)}
                <TouchableOpacity style={styles.button} onPress={() => this.registrarUsuario(this.state.email, this.state.username, this.state.password)}>
                    <FontAwesome name="user-plus" size={15} color="#fff" />
                    <Text style={styles.text}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Register;
 
const styles = StyleSheet.create({
    registrar: {
        flex: 1,                       
        justifyContent: 'center',     
        paddingHorizontal: 10,
    },
    h1: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 8,
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
        marginLeft: 8                
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
    error: {
        color: "red",
        marginVertical: 10
    }

})
