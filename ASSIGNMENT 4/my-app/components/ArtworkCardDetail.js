import useSWR from 'swr';
import Error from 'next/error'
import Card from 'react-bootstrap/Card';

export default function ArtworkCard(props){
    const { data, error } = useSWR('https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}'); 
    
    if(error){
        return (<><Error statusCode={404} /></>);
    }
  
    else if( data == null || data == undefined ) {
        return(null);
    }
  
    else {
        return (
            <>
            <Card style={{ width: '18rem' }}> 
            {data?.primaryImageSmall && <Card.Img variant = "top" src = {data?.primaryImageSmall}/>}
            
              <Card.Body>
                <Card.Title>{data?.title ? data.title : 'N/A'}</Card.Title>
                <Card.Text>
                  <strong>Date : </strong> {data?.objectDate ? data.objectDate : 'N/A'}<br/>
                  <strong>Classification : </strong> {data?.classification ? data.classification : 'N/A'}<br/>
                  <strong>Medium : </strong> {data?.medium ? data.medium : 'N/A'}<br/><br/>

                  <strong>Artist : </strong> {data?.artistDisplayName ? data.artistDisplayName + " " : 'N/A'}
                    {data?.artistDisplayName && 
                    ((<a href={data?.artistWikidata_URL} style={{textDecoration: 'none'}} target = '_blank' rel = "noreferrer">
                        <span style = {{color: 'black'}}>(</span>
                        <u>wiki</u> 
                        <span style={{color: 'black'}}> )</span></a>))}<br/>
                  <strong>Credit Line : </strong> {data?.creditLine ? data.creditLine : 'N/A'}<br/>
                  <strong>Dimensions : </strong> {data?.dimensions ? data.dimensions : 'N/A'}<br/><br/>

                

                </Card.Text>
                
              </Card.Body>
            </Card>
            </>
          );
    }
}