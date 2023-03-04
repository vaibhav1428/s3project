import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from '@rneui/base';
import { Formik } from 'formik';
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ScreenTwo = () => {

    const navigate = useNavigation();
    const yupschema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Name is Required'),
        latitude: Yup.string().required('Latitude is required'),
        longitude: Yup.string().required('longitude is Required'),
    });
    const [initialValues, setinitialValues] = useState({ name: '', latitude: '', longitude: '' })

    const getvalue = async() =>{
        const jaonawait = await AsyncStorage.getItem('user');
        if(jaonawait){
            const jsondata = JSON.parse(jaonawait);
            setinitialValues({name: jsondata.name, 
                latitude: jsondata.latitude, 
                longitude: jsondata.longitude
            }) 
        }
    }
    React.useEffect(()=>{ 
        getvalue()    
    },[])



    const onSubmit = async (data) => {
        await AsyncStorage.setItem('user',JSON.stringify({
            name:data.name,
            latitude : data.latitude,
            longitude :data.longitude
        }));
        Alert.alert("success", "data is saved successfuy")
    };


    const gotonext = async() =>{
        const jaonawait = await AsyncStorage.getItem('user');
        if(jaonawait){
            navigate.navigate('screenThree')
        }
        else{
            Alert.alert("please complete details to continue")
        }

    }





    // <Input
    // label="Enter your name"
    //     placeholder="Enter your name"
    //     onBlur={onBlur}
    //     onChangeText={onChange}
    //     value={value}
    //     errorStyle={{ color: 'red' }}
    // errorMessage={  errors?.NAME?.message.toString() }
    // />


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.views}>
                <View style={styles.input}>
                    <Formik
                    enableReinitialize={true} 
                        initialValues={initialValues}
                        onSubmit={values =>onSubmit(values)}
                        validationSchema={yupschema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors , touched }) => (
                            <View>
                                <View style={styles.inputarea}>
                                    <TextInput
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        placeholder="enter your name"
                                        style={styles.inputcontainer}
                                    />
                                    <Text style={{ color: 'red' }}>{errors.name || touched.name}</Text>
                                </View>

                                <View style={styles.inputarea}>
                                    <TextInput
                                        onChangeText={handleChange('latitude')}
                                        onBlur={handleBlur('latitude')}
                                        placeholder="enter  latitude"
                                        value={values.latitude}
                                        style={styles.inputcontainer}
                                    />
                                    <Text style={{ color: 'red' }}>{errors.latitude || touched.latitude}</Text>

                                </View>
                                <View style={styles.inputarea}>
                                    <TextInput
                                        onChangeText={handleChange('longitude')}
                                        onBlur={handleBlur('longitude')}
                                        placeholder="enter longitude"
                                        value={values.longitude}
                                        style={styles.inputcontainer}
                                    />
                                    <Text style={{ color: 'red' }}>{errors.longitude || touched.longitude}</Text>
                                </View>
                                <Button onPress={handleSubmit} title="Submit" />
                            </View>
                        )}
                    </Formik>

                    <Button style={{marginTop:15}} onPress={gotonext} title="next" />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ScreenTwo


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    views: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    input: {
        width: Dimensions.get('screen').width * 0.90,
    },
    button: {
        width: 200,
        marginTop: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    inputcontainer: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,


    },
    inputarea: {
        marginBottom: 15
    }
})