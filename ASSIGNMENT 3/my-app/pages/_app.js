//import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Layout'
import {SWRConfig} from 'swr';
import Layout from '../components/Layout';
import 'next/link'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function MyApp({ Component, pageProps }) {
  return (<Layout>
      <SWRConfig value={{ fetcher: (...args) => fetch(...args).then((res) => res.json()) }}>
        <Component {...pageProps}/><br/>
      </SWRConfig>
    </Layout>
    )
}

export default MyApp
