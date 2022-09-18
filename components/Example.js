import {useEffect, useState} from 'react'
import {val, getComponent} from '../sanity'

export default function Example() {

    const [data, setData] = useState(false);

    useEffect(() => {
        getComponent("example").then((component) => setData(component))
    }, [])

    return <>
        {val(data.title)}
    </>
}