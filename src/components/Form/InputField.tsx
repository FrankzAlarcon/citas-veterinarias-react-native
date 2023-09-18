import React, { FC } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface InputFieldProps extends TextInputProps{
  label: string
  placeholder: string
  placeholderTextColor?: string
  value: string
}

const InputField: FC<InputFieldProps> = ({
  label,
  placeholder,
  placeholderTextColor = '#888',
  value,
  style = {},
  ...restOfProps
}) => {
  return (
    <View style={styles.inputField}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        {...restOfProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    marginTop: 10,
    marginHorizontal: 30
  },
  label: {
    color: '#fff',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10
  }
})

export default InputField
