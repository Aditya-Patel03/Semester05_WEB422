import { Container } from 'react-bootstrap';
import MainNav from '../components/MainNav';

export default function Layout(props){
    return (
        <>
        <MainNav /><br />
        <Container>
            {props.children}
        </Container><br />
        <nav className='fixed-bottom'>
        <footer text-color='black'>
            @ADPATEL
        </footer>
        </nav>
        </> )
}