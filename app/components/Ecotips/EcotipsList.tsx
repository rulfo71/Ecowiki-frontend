import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import GetEcotipsDto from '../../Dtos/Ecotips/GetEcotipsDto';
import { getEcotips as getEcotipsRepository} from '../../Repositories/EcotipsRepository';
import { isEmpty } from 'lodash';
import Ecotip from './Ecotip';
import Spinner from "react-native-loading-spinner-overlay";

export default function EcotipsList() {

    const [isLoading, setIsLoading] = useState(null)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [noMoreEcotips, setNoMoreEcotips] = useState(false)
    const [ecotips, setEcotips] = useState([])
    const [startEcotipId, setStartEcotipId] = useState('')
    
    useEffect(() => {
        (async () => {
            await getEcotips()
        })()
    }, [])

    const getEcotips = async () => {
        try {
            if (noMoreEcotips) return

            var getEcotipsDto = new GetEcotipsDto()

            getEcotipsDto.startEcotipId = startEcotipId
            isEmpty(startEcotipId) ? setIsLoading(true) : setIsLoadingMore(true)
            var response = await getEcotipsRepository(getEcotipsDto)
            setEcotips(ecotips.concat(response))
            if (response.length == 0) {
                setNoMoreEcotips(true)
                isEmpty(startEcotipId) ? setIsLoading(false) : setIsLoadingMore(false)
            } else {
                isEmpty(startEcotipId) ? setIsLoading(false) : setIsLoadingMore(false)                
                var newStartEcotipId = response[response.length - 1].id
                setStartEcotipId(newStartEcotipId)
            }
        } catch (error) {
            //poner toast
            console.log(`error: ${error} `);
            setIsLoading(false)
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>

            {ecotips.length == 0 && isLoading == false ? (
                <View>
                    {/* <Text>No tengo ecotips</Text> */}
                </View>
            ) : (
                    <ScrollView>
                        <Text style={styles.title}>Ecotips</Text>
                        <FlatList
                            data={ecotips}
                            renderItem={(ecotip) => <Ecotip ecotipParam= {ecotip.item} />}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReachedThreshold={0.2}
                            onEndReached={getEcotips}
                            ListFooterComponent={<FooterList isLoadingMore={isLoadingMore} isLoading={isLoading} />}
                        />
                    </ScrollView>
                )}
        </View>
    )
}

function FooterList(props) {
    const { isLoadingMore,isLoading } = props
    if (isLoadingMore || isLoading) {
        return (
            <View style={styles.loaderProducts} >
                <ActivityIndicator size='large' />
            </View>
        )
    }
    else {
        return (
            <View style={styles.notFoundProducts}>
                <Text>Por ahora no tenemos mas ecotips!</Text>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderProducts: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    notFoundProducts: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    }

})