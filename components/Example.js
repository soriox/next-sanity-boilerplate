import {useEffect, useState} from 'react'
import {getComponent} from '../sanity'

export default function Example() {

    const [data, setData] = useState(false);

    useEffect(() => {
        getComponent().then((component) => setData(component))
    }, [])

    return <>
        
    </>
}