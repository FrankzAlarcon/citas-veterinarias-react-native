import React, { FC } from 'react'
import { Patient } from '../interfaces'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { formatDate } from '../helpers'

interface PatientCardProps {
  patient: Patient
  handleNewAppointment: (value: boolean) => void
  patientToEdit: (id: string) => void
  handleDeletePatient: (id: string) => void
  setModalPatient: (value: boolean) => void
  setPatient: (value: Patient | null) => void
}

const PatientCard: FC<PatientCardProps> = ({
  patient,
  handleNewAppointment,
  patientToEdit,
  handleDeletePatient,
  setModalPatient,
  setPatient
}) => {
  const handleEdit = () => {
    patientToEdit(patient?.id)
    handleNewAppointment(true)
  }

  console.log({
    patient,
    handleNewAppointment,
    patientToEdit,
    handleDeletePatient,
    setModalPatient,
    setPatient,
    formatDate,
    handleEdit
  })

  return (
    <Pressable
      onLongPress={() => {
        setModalPatient(true)
        setPatient(patient)
      }}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.patientText}>{patient?.patient}</Text>
        <Text style={styles.dateText}>{formatDate(new Date(patient?.date))}</Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.button, styles.btnEdit]}
            onPress={handleEdit}
          >
            <Text style={styles.btnText}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.btnDelete]}
            onPress={() => handleDeletePatient(patient?.id)}
          >
            <Text style={styles.btnText}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: '#94a3d8',
    borderBottomWidth: 1
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 5
  },
  patientText: {
    color: '#6d28d9',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  dateText: {
    color: '#374151'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  btnEdit: {
    backgroundColor: '#f59e0b'
  },
  btnDelete: {
    backgroundColor: '#ef4444'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase'
  }
})

export default PatientCard
