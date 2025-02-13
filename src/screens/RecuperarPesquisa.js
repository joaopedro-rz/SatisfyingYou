import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { initializeFirestore, collection, addDoc, query, onSnapshot} from 'firebase/firestore';
import { db } from '../config/firebase';

const [listaPesquisas, setListaPesquisa] = useState();
const pesquisaColletion = collection(db, "pesquisas")

const itemPesquisas = ({item}) => {
    return(
        <TouchableOpacity>
                <Text>Id: {item.id} Nome: {item.nome} Data: {item.data} Imagem: {item.imagem} </Text>
        </TouchableOpacity>
    )
}

useEffect( () => { 

    const q = query(pesquisaColletion)

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const pesquisas = []
        snapshot.forEach( (doc) => {
            pesquisas.push({
                id: doc.id,
                ...doc.data()
            })
        })

        setListaPesquisa(pesquisas)
    })
}, [])


return((
    <View>
        <FlatList data={listaPesquisas} renderItem={itemPesquisa} keyExtractor={pesquisas => pesquisas.id} />
    </View>
))
