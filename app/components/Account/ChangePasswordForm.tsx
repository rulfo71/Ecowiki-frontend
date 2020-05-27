import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Input, Button} from 'react-native-elements'
import {size} from 'lodash'
import * as firebase from 'firebase'

import { Constants } from '../../Common/Constants/Constants'
import { reauthenticate }  from '../../utils/api'

export default function ChangePasswordForm (props) {
    const {setShowModal, toastRef} = props

    const [showActualPassword, setshowActualPassword] = useState(false)
    const [showNewPassword, setshowNewPassword] = useState(false)
    const [showRepeatNewPassword, setshowRepeatNewPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValue())
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async () => {
        let isSetErrors = true
        let errorsTmp = {}
        setErrors({})
        if (!formData.password || 
            !formData.newPassword || 
            !formData.repeatNewPassword
        ){
            errorsTmp= {
                password: !formData.password ? 'La contraseña no puede estar vacía' : '',
                newPassword: !formData.newPassword ? 'La contraseña no puede estar vacía' : '',
                repeatNewPassword: !formData.repeatNewPassword ? 'La contraseña no puede estar vacía' : ''
            }            
        }
        else if (formData.newPassword !== formData.repeatNewPassword) {
            errorsTmp = {
                newPassword: 'Las contraseñas no son iguales',
                repeatNewPassword: 'Las contraseñas no son iguales '
            }
        }

        else if (size(formData.newPassword) < 6) {
            errorsTmp = {
                newPassword: 'La contraseña tiene que tener mas de 6 caracteres',
                repeatNewPassword: 'La contraseña tiene que tener mas de 6 caracteres',
            }
        }
        else {
            setIsLoading(true)
            await reauthenticate(formData.password).then(async () => {
                await firebase.auth()
                .currentUser.updatePassword(formData.newPassword).then(() => {
                    isSetErrors = false
                    setIsLoading(false)
                    setShowModal(false)
                    firebase.auth().signOut()                    
                    })
                    .catch((error) => {
                        errorsTmp = {
                            other : 'Error al actualizar la contraseña'
                        }
                        setIsLoading(false)
                    })
                
            }) 
            .catch((error) => {
                setIsLoading(false)
                errorsTmp = {
                    password: 'La contraseña no es correcta'
                }
            })
            
        }
        isSetErrors && setErrors(errorsTmp)
    }

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})   
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder='Contraseña actual'
                containerStyle={styles.input}
                secureTextEntry={!showActualPassword}
                rightIcon= {{
                    type: 'material-community',
                    name: showActualPassword? 'eye-off-outline' : 'eye-outline',
                    color: Constants.Colors.brandGreenColor,    
                    onPress: ()=> {setshowActualPassword(!showActualPassword)} 
                }}
                onChange={(e) => onChange(e,'password')}      
                errorMessage={errors.password}          
            />
            <Input 
                placeholder='Nueva contraseña'
                containerStyle={styles.input}
                secureTextEntry={!showNewPassword}
                rightIcon= {{
                    type: 'material-community',
                    name: showNewPassword? 'eye-off-outline' : 'eye-outline',
                    color: Constants.Colors.brandGreenColor,
                    onPress: ()=> {setshowNewPassword(!showNewPassword)} 
                }}            
                onChange={(e) => onChange(e,'newPassword')}
                errorMessage={errors.newPassword}

            />
            <Input 
                placeholder='Repetir nueva contraseña'
                containerStyle={styles.input}
                secureTextEntry={!showRepeatNewPassword}
                rightIcon= {{
                    type: 'material-community',
                    name: showRepeatNewPassword? 'eye-off-outline' : 'eye-outline',
                    color: Constants.Colors.brandGreenColor,
                    onPress: ()=> {setshowRepeatNewPassword(!showRepeatNewPassword)}     
                }}            
                onChange={(e) => onChange(e,'repeatNewPassword')}
                errorMessage={errors.repeatNewPassword}
            />
            <Button
                title='Cambiar contraseña'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            <Text>{errors.other}</Text>
        </View>
    )

}

function defaultFormValue (){
    return {
        password: '',
        newPassword: '',
        repeatNewPassword: ''
    }
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: Constants.Colors.brandGreenColor
    }
})