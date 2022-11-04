import {Container} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


export default function PageHeader(props) {
    return (
      <>
      <Card className="bg-light fw-bold" style={{ width: '18rem' }}>
            <Card.Body>
            {props.text}
            </Card.Body>

        </Card><br /><br />
        </>
    );
  
}



