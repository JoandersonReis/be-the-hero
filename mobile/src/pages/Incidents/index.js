import React, { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native'

import logoImg from "../../assets/logo.png"

import styles from "./styles"

import api from "../../services/api"

function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  function navigateToDetail(incident) {
    navigation.navigate("Detail", {incident: incident})
  }

  async function loadIncidents() {
    if(loading) {
      return
    }

    if(total > 0 && incidents.length === total) {
      return
    }

    setLoading(true)

    const response = await api.get(`incidents?page=${page}`)

    setIncidents([...incidents, ...response.data])
    setTotal(response.headers["x-total-count"])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  function renderItem({item}) {
    return (
      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>{item.name}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{item.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(item.value)}</Text>

        <TouchableOpacity style={styles.detailsButton} onPress={() => {
            navigateToDetail(item)
          }}>
          <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
          <Feather name="arrow-right" size={16} color="#E02041" />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} Casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        style={styles.incidentList}
        data={incidents}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.1}
        keyExtractor = {item => item.id}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Incidents