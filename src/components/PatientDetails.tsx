import React, { FC } from 'react'
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Patient } from '../interfaces'
import { formatDate } from '../helpers'

interface PatientDetailsProps {
  showModal: boolean
  setModalPatient: (value: boolean) => void
  patient: Patient | null
  setPatient: (value: Patient | null) => void
}

const PatientDetails: FC<PatientDetailsProps> = ({
  showModal,
  setModalPatient,
  patient,
  setPatient
}) => {
  const handleHideModal = () => {
    setPatient(null)
    setModalPatient(false)
  }
  return (
    <Modal visible={showModal} animationType='fade'>
      <SafeAreaView
        style={styles.container}
      >
        <Text
          style={styles.title}
        >
          Información <Text style={styles.titleBold}>Paciente</Text>
        </Text>
        <Pressable
          onPress={handleHideModal}
          style={styles.btnCloseContainer}
        >
          <Text style={styles.btnClose}>X Cerrar</Text>
        </Pressable>
        <View
          style={styles.content}
        >
          <View style={styles.field}>
            <Text style={styles.label}>Paciente:</Text>
            <Text style={styles.value}>{patient?.patient}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Propietario:</Text>
            <Text style={styles.value}>{patient?.owner}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{patient?.email}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{patient?.phone}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Fecha del alta:</Text>
            <Text style={styles.value}>{formatDate(patient?.date!!)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Síntomas:</Text>
            <Text style={styles.value}>{patient?.symptoms}</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f59e0b',
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 30,
    color: '#fff'
  },
  titleBold: {
    fontWeight: '900'
  },
  btnCloseContainer: {
    backgroundColor: '#e06900',
    marginVertical: 20,
    marginHorizontal: 30,
    borderRadius: 10
  },
  btnClose: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    padding: 15,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.62,
    elevation: 5
  },
  field: {
    marginBottom: 10
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12
  },
  value: {
    fontWeight: '700',
    fontSize: 18,
    color: '#334155'
  }
})

export default PatientDetails
