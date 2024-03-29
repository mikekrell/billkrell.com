import { useState, useEffect } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Head from 'next/head'
import EquipmentCard from '../components/EquipmentCard'
import useWindowSize from '../hooks/use-window-size';
import EquipmentPage from './used/[slug]'

var contentful = require('contentful');


function Home({ equipment, loading } ){ 
    const router = useRouter();
    const size = useWindowSize();
    const [windowSize, setWindowSize] = useState({height:0, width:0})
    const [swipeLeft, setSwipeLeft] = useState(false)
    const [modalActive, setModalActive] = useState(false)

    const handleModalOpen = () => setModalActive(true)
    const handleModalClose = () => setModalActive(false)

    useEffect(() => { 
        if (size) {
            setWindowSize({ height: size.height, width: size.width})
        }
    }, [size])

    useEffect(()=>{
        console.log(loading)
    }, [loading] )


    return (
            <>
                <Head>
                    <title>Bill Krell | Feenaughty</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <meta name="description" content="Our used equipment available for purchase. Sign up for my weekly newsletter, and get access to all our new/used inventory on a regular basis, as well as industry info." />

                    <meta property="og:site_name" content="Bill Krell / Feenaughty" key="ogsitename" />
                    <meta property="og:title" content="Used Inventory - Bill Krell / Feenaughty" key="ogtitle" />
                    <meta property="og:description" content="Our used equipment available for purchase. Sign up for my weekly newsletter, and get access to all our new/used inventory on a regular basis, as well as industry info." key="ogdesc" />
                    <link rel="icon" href="/favicon.ico" />

                </Head>
                <section className="section has-background-light mt-2">
                    <div className="container">
                        <h1 className="title mt-5">Used Inventory</h1>
                        <h2 className="subtitle">
                            A complete list of what we currently have in our <strong>Inventory</strong>. If you see anything you like, please contact me.
                    </h2>
                    </div>
                </section>
                <section className="section">
                <div className="container" style={{ overflowX: 'hidden' }}>
                        <div className="table-container">
                            <div className="columns is-multiline">
                                {equipment.map((equip, i) => (
                                    <div className="column is-one-third-desktop is-half-tablet" >
                                        <Link href={`/used/${equip.fields.slug}`} as={`/used/${equip.fields.slug}`}>
                                        <a>
                                            <EquipmentCard swipeLeft={swipeLeft} key={i} equip={equip}></EquipmentCard> 
                                        </a>
                                    </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </>
    )
}

export const getServerSideProps = async () => {
        // Call an external API endpoint to get posts.
        var client = contentful.createClient({
            space: process.env.CONTENTFUL_SPACE,
            accessToken: process.env.CONTENTFUL_TOKEN
        })

        const resp = await client.getEntries({ content_type: 'equipment' })
        const equipment = await resp.items

    return {
        props: {
            equipment
        },
    }
}


export default Home
