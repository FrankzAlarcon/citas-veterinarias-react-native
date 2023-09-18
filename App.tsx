import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native'
import Constants from 'expo-constants'
import { useState, useEffect } from 'react'
import Form from './src/components/Form/Form'
import { Patient } from './src/interfaces'
import PatientCard from './src/components/PatientCard'
import PatientDetails from './src/components/PatientDetails'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App () {
  const [modalVisible, setModalVisible] = useState(false)
  const [patients, setPatients] = useState<Patient[]>([])
  const [patient, setPatient] = useState<Patient | null>(null)
  const [modalPatient, setModalPatient] = useState(false)

  useEffect(() => {
    const getPatients = async () => {
      try {
        const patientsStorage = await AsyncStorage.getItem('patients')
        if (patientsStorage) {
          const data = JSON.parse(patientsStorage)
          setPatients(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getPatients()
  }, [])

  const handleNewAppointment = (value: boolean) => {
    setModalVisible(value)
  }

  const patientToEdit = (id: string) => {
    const pat = patients.find(patient => patient.id === id)
    if (!pat) return
    setPatient(pat)
  }

  const handleDeletePatient = (id: string) => {
    const pat = patients.find(patient => patient.id === id)
    if (!pat) return

    const deletePatient = () => {
      const newPatients = patients.filter(patient => patient.id !== id)
      setPatients(newPatients)
      savePatientsInStorage(newPatients)
    }

    Alert.alert(
      `¿Deseas eliminar a ${pat.patient}?`,
      'Una vez eliminado no se podrá recuperar',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Si, Eliminar', onPress: deletePatient }
      ]
    )
  }

  const savePatientsInStorage = async (patients: Patient[]) => {
    try {
      const jsonPatients = JSON.stringify(patients)
      await AsyncStorage.setItem('patients', jsonPatients)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Administrador de Citas <Text style={styles.titleBold}>Veterinaria</Text>
      </Text>
      <Pressable
        style={styles.btnNewAppointment}
        onPress={() => handleNewAppointment(true)}
      >
        <Text style={styles.btnNewAppointmentText}>Nueva Cita</Text>
      </Pressable>
      {
        patients.length > 0
          ? (
            <FlatList
              style={styles.list}
              data={patients}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <PatientCard
                  patient={item}
                  handleNewAppointment={handleNewAppointment}
                  patientToEdit={patientToEdit}
                  handleDeletePatient={handleDeletePatient}
                  setModalPatient={setModalPatient}
                  setPatient={setPatient}
                />
              )}
            />
            )
          : (
            <Text style={styles.noPatients}>
              No hay citas
            </Text>
            )
      }
      <Form
        patient={patient}
        setPatients={setPatients}
        patients={patients}
        setPatient={setPatient}
        modalVisible={modalVisible}
        handleModalVisible={handleNewAppointment}
        savePatientsInStorage={savePatientsInStorage}
      />
      <PatientDetails
        showModal={modalPatient}
        setModalPatient={setModalPatient}
        patient={patient}
        setPatient={setPatient}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f3f4f6',
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#374151'
  },
  titleBold: {
    fontWeight: '900',
    color: '#6d28d9'
  },
  btnNewAppointment: {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnNewAppointmentText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPatients: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  list: {
    marginTop: 30,
    marginHorizontal: 30
  }
})
