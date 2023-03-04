


import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from '@rneui/base';
import { Formik } from 'formik';
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenThree = () => {

    const yupschema = Yup.object().shape({
        latitude: Yup.string().required('Latitude is required'),
        longitude: Yup.string().required('longitude is Required'),
    });
    const [initialValues, setinitialValues] = useState({latitude: '', longitude: '' })
    const [prevvalue, setprevvalue] = useState({latitude: '', longitude: '' })
    const [isdistance, setisdistance] = useState("")

    const getvalue = async() =>{
        const jaonawait = await AsyncStorage.getItem('user');
        if(jaonawait){
            const jsondata = JSON.parse(jaonawait);
            setprevvalue({
                latitude: jsondata.latitude, 
                longitude: jsondata.longitude
            }) 
        }
    }
    React.useEffect(()=>{ 
        getvalue()    
    },[])

    function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
      
    const  getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
      }


    const onSubmit = async (data) => {

       const distance  =  getDistanceFromLatLonInKm(prevvalue.latitude,data.latitude,prevvalue.longitude,data.longitude);
       setisdistance(distance)
    };


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
                                <Button onPress={handleSubmit} title="Calculate" />
                            </View>
                        )}
                    </Formik>



                    <View style={styles.distancecontainer}>
                        <Text style={{fontSize:20}}>
                            Distance in Km :- {Number(isdistance).toFixed(2)} KM
                        </Text>
                        <Text style={{fontSize:20}}>
                            Distance in miles :-  {Number(isdistance  * 0.621371).toFixed(2)} MIlES
                        </Text>
                    </View>


                </View>
            </View>
        </SafeAreaView>
    )
}

export default ScreenThree


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
    },
    distancecontainer:{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop:50
    }
})