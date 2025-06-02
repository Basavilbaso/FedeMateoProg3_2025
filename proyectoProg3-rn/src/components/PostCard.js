import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { auth, db } from "../firebase/config";
import { FontAwesome } from '@expo/vector-icons'

class PostCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            likeado: false,
            cantidadLikes: this.props.info.data.likes ? this.props.info.data.likes.length : 0
        }
    }

    componentDidMount() {
        db.collection("users")
            .where("owner", "==", this.props.info.data.owner)
            .onSnapshot((docs) => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    users: users
                });
            });

        if (this.props.info.data.likes) {
            const cantLikes = this.props.info.data.likes.length;
            const likeado = this.props.info.data.likes.includes(auth.currentUser.email);
            this.setState({
                cantidadLikes: cantLikes,
                likeado: likeado
            });
        }
    }

    like() {
        db.collection("posts")
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => this.setState({
                likeado: true,
                cantidadLikes: this.state.cantidadLikes + 1
            }))
    }

    unlike() {
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => this.setState({
                likeado: false,
                cantidadLikes: this.state.cantidadLikes - 1
            }))
    }

    
    render() {

        return (
            <View style={styles.card}>
                <Text style={styles.user}>Post creado por: {this.state.users[0] ? this.state.users[0]?.data.username : ''}</Text>
                <Text style={styles.content}>{this.props.info.data.post}</Text>
                <Text style={styles.user}> Likes: {this.props.info.data.likes ? this.props.info.data.likes.length : 0}</Text>
                {!this.props.likeButton && (
                    this.state.likeado ? (
                        <TouchableOpacity style={styles.unlikeButton} onPress={() => this.unlike()}>
                            <View style={styles.buttonContent}>
                                <FontAwesome name="thumbs-down" size={18} color="white" />
                                <Text style={styles.unlikeText}>Unlike</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.likeButton} onPress={() => this.like()}>
                            <View style={styles.buttonContent}>
                                <FontAwesome name="thumbs-up" size={18} color="white" />
                                <Text style={styles.likeText}>Like</Text>
                            </View>
                        </TouchableOpacity>
                    )
                )}
                {this.props.onDelete && (
                    <TouchableOpacity style={styles.delete} onPress={() => this.props.onDelete(this.props.id)}>
                        <FontAwesome name="trash" size={16} color="#fff" />
                        <Text style={styles.deleteText}> Borrar Post</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }

}



const styles = StyleSheet.create({
    card: {
        backgroundColor: "grey",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        marginHorizontal: 16,
    },    
    user: {
        fontWeight: "600",
        fontSize: 15,
        marginBottom: 4,
    },
    content: {
        fontSize: 14,
        color: "#333",
    },
    likeButton: {
        backgroundColor: '#00BFFF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    unlikeButton: {
        backgroundColor: '#F44336',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    likeText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    unlikeText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    delete: {
        backgroundColor: "#e74c3c",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 6,
    },
    
    deleteText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});

export default PostCard;