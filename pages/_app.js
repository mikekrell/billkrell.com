import Head from 'next/head'
import Link from 'next/link'
import '../public/globals.css'
import "toastify-js/src/toastify.css"
import 'bulma'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'pure-react-carousel/dist/react-carousel.es.css';
import useWindowSize from '../hooks/use-window-size';
import {useScroll} from '../hooks/useScroll'
import {useState, useEffect} from 'react'
import Subscribe from '../components/Subscribe'
import Router from 'next/router'
import {useRouter} from 'next/router'
import { GTMPageView } from '../utils/GTM';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const size = useWindowSize();
  let scroll = null;
  if (typeof window !== 'undefined') {
    scroll = useScroll();
  }
  const [menu, setMenu] = useState(false)
  const [int, setInt] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const start = () => {
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     setLoading(false);
  //   };
  //     Router.events.on("routeChangeStart", start);
  //     Router.events.on("routeChangeComplete", end);
  //     Router.events.on("routeChangeError", end);
  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   }

  // })

  useEffect(()=>{
    setInterval(()=>{
      setInt(true)
      setTimeout(()=>{
        setInt(false)
      },1000)
    }, 8000)

    const handleRouteChange = (url) => GTMPageView(url);

    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [])

  useEffect(()=>{
    if (typeof window !== 'undefined') {
      if ((window.innerHeight + Math.ceil(window.pageYOffset + 1)) >= document.body.offsetHeight) {
        setAtBottom(true)
      } else {
        setAtBottom(false)
      }
    }
  }, [scroll?.scrollY])

  return (
    <>
    <Head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PJSCN7S')
              <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJSCN7S"
          height="0" width="0" style={{"display":"none","visibility":"hidden"}}></iframe></noscript>
                `,
          }}
        />
        
    </Head>
      <nav className="navbar is-fixed-top has-background-light"  role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item ml-5">
              <Link href="/">
              <a>
                <img alt="nav-logo" src="/billkrell_logo.png" className="image"></img>
              </a>
              </Link>
            </a>
          </div>
          <div className="navbar-start">

          </div>
          <div className="navbar-end">
          </div>
      </nav>
      <Component loading={loading} {...pageProps} />
      <div className="container is-full">
        <div className="column is-centered">
          {atBottom ? null : 
          <a href="tel:+15039563956">
            <button className={int ? "button fab fab-active fab-shadow is-rounded has-background-success-dark" : "button fab fab-shadow is-rounded has-background-success-dark"}>
              <span>
                <figure className="image is-48x48 noheight">
                  <img className="is-rounded" src="https://media-exp1.licdn.com/dms/image/C5603AQH_6_OPXQjhfQ/profile-displayphoto-shrink_400_400/0?e=1605744000&v=beta&t=_tgK9cTp2iI2pwszZ16GTluy0PbktUrhNAj9MTGF7s4" />
                </figure>
              </span>

              <span className="subtitle has-text-white has-text-weight-bold" style={{ "marginLeft": "10px", "marginRight": "10px" }}>(503)956-3956</span>
            </button>
          </a>}
        </div>
      </div>
      {router.pathname == '/newsletter' ? null : <Subscribe></Subscribe>}
      
    </>
  )
}

export default MyApp
