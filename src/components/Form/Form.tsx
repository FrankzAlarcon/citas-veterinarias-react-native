import React, { FC, useEffect, useState } from 'react'
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, ScrollView, View, Alert } from 'react-native'
import InputField from './InputField'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { formatDate, generateId } from '../../helpers'
import { Patient } from '../../interfaces'

interface FormProps {
  modalVisible: boolean
  patients: Patient[]
  patient: Patient | null
  handleModalVisible: (value: boolean) => void
  setPatients: (value: Patient[]) => void
  setPatient: (value: Patient | null) => void
  savePatientsInStorage: (patients: Patient[]) => void
}

const Form: FC<FormProps> = ({
  modalVisible,
  patients,
  patient: patientToEdit,
  handleModalVisible,
  setPatients,
  setPatient: setPatientToEdit,
  savePatientsInStorage
}) => {
  const [id, setId] = useState('')
  const [patient, setPatient] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState(new Date())
  const [symptoms, setSymptoms] = useState('')

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showSelectedDate, setShowSelectedDate] = useState(false)

  useEffect(() => {
    if (patientToEdit) {
      setId(patientToEdit.id)
      setPatient(patientToEdit.patient)
      setOwner(patientToEdit.owner)
      setEmail(patientToEdit.email)
      setPhone(patientToEdit.phone)
      setDate(patientToEdit.date)
      setSymptoms(patientToEdit.symptoms)
      setShowSelectedDate(true)
    } else {
      setId('')
      setPatient('')
      setOwner('')
      setEmail('')
      setPhone('')
      setDate(new Date())
      setSymptoms('')
      setShowSelectedDate(false)
    }
  }, [patientToEdit])

  const handleShowDatePicker = () => {
    setShowDatePicker(!showDatePicker)
  }

  const handleSelectDate = (date: Date) => {
    setShowSelectedDate(true)
    setShowDatePicker(false)
    setDate(date)
  }

  const handleAppointment = () => {
    // Validation
    if ([patient, owner, email, phone, symptoms].includes('')) {
      Alert.alert(
        'Oops, Ha ocurrido un error', // encabezado,
        'Todos los campos son obligatorios' // mensaje,
      )
      return
    }

    // Edit or new
    if (id) {
      // Edit
      const newPatient: Patient = {
        id,
        patient,
        owner,
        email,
        phone,
        date,
        symptoms
      }
      const updatedPatients = patients.map(pat => pat.id === id ? newPatient : pat)
      setPatients(updatedPatients)
      savePatientsInStorage(updatedPatients)
    } else {
      // New
      const newPatient: Patient = {
        id: generateId(),
        patient,
        owner,
        email,
        phone,
        date,
        symptoms
      }
      const newPatients = [...patients, newPatient]
      setPatients(newPatients)
      savePatientsInStorage(newPatients)
    }

    handleCancel()
  }

  const handleCancel = () => {
    handleModalVisible(false)
    setShowDatePicker(false)
    setShowSelectedDate(false)
    setId('')
    setPatient('')
    setOwner('')
    setEmail('')
    setPhone('')
    setDate(new Date())
    setSymptoms('')
    setPatientToEdit(null)
  }

  return (
    <Modal
      animationType='slide'
      visible={modalVisible}
    >
      <SafeAreaView
        style={styles.container}
      >
        <ScrollView>
          <Text
            style={styles.title}
          >
            {patientToEdit ? 'Editar' : 'Nueva'} <Text style={styles.titleBold}>Cita</Text>
          </Text>
          <Pressable
            onLongPress={handleCancel}
            style={styles.btnCloseContainer}
          >
            <Text
              style={styles.btnClose}
            >
              X Cancelar
            </Text>
          </Pressable>
          <InputField
            label='Nombre Paciente'
            placeholder='Nombre Paciente'
            value={patient}
            onChangeText={setPatient}
          />
          <InputField
            label='Nombre Propietario'
            placeholder='Nombre Propietario'
            value={owner}
            onChangeText={setOwner}
          />
          <InputField
            label='Email Propietario'
            placeholder='Email Propietario'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            label='Teléfono Propietario'
            placeholder='Teléfono Propietario'
            keyboardType='phone-pad'
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
          <View style={styles.field}>
            <Text style={styles.inputDateTitle}>Fecha Alta</Text>
            <Pressable
              onPress={handleShowDatePicker}
            >
              <Text style={[styles.inputDate, { color: showSelectedDate ? '#000' : '#888' }]}>{showSelectedDate ? formatDate(date) : 'Seleccionar Fecha...'}</Text>
            </Pressable>
            {
              showDatePicker && (
                <DateTimePicker
                  isVisible
                  mode='datetime'
                  date={date}
                  onConfirm={handleSelectDate}
                  onCancel={handleShowDatePicker}
                  is24Hour
                  display='spinner'
                />
              )
            }
          </View>
          <InputField
            label='Síntomas Paciente'
            placeholder='Síntomas Paciente'
            multiline
            numberOfLines={4}
            value={symptoms}
            onChangeText={setSymptoms}
            style={{
              height: 100
            }}
          />
          <Pressable
            style={styles.btnNewAppointment}
            onPress={handleAppointment}
          >
            <Text
              style={styles.btnNewAppointmentText}
            >
              {patientToEdit ? 'Guardar Cambios' : 'Agregar Paciente'}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6d28d9',
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
    backgroundColor: '#5827a4',
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
  field: {
    marginHorizontal: 30
  },
  inputDateTitle: {
    color: '#fff',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputDate: {
    backgroundColor: '#fff',
    color: '#888',
    padding: 15,
    borderRadius: 10
  },
  btnNewAppointment: {
    marginVertical: 30,
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10
  },
  btnNewAppointmentText: {
    color: '#6d28d9',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
})

export default Form
