import useSWR from 'swr';
import { useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Error from 'next/error';
import { Row, Col, Pagination } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ArtworkCard from '../../components/ArtworkCard';

const PER_PAGE = 12;

export default function Artwork(){
    const [page, setPage] = useState(1);
    const [artworkList, setArtworkList] = useState();
    const router = useRouter();

    let finalQuery = router.asPath.split('?')[1];
    const { data, error } = useSWR('https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}');

    function previousPage(){
        if(page > 1){
            setPage(prev => prev - 1);
        }
    }

    function nextPage(){
        if(page < 1){
            setPage(prev => prev + 1);
        }
    }

    useEffect(() => {
        if(data){
            let result =[];
            for (let i=0; i<data?.objectIDs?.length; i+=PER_PAGE){
                const results= data?.objectIDs.slice(i, i+ PER_PAGE);
                result.push(results);
            }

            setArtworkList(result);
        }
        setPage(1);
    },[data]);

    if(error){
        return (<>
            <Error statusCode={404}></Error>
            </>);
    }

    if(artworkList != null){

        return (<>
        <Row className='gy-4'>
            {artworkList.length>0 ? artworkList[page-1].map(item =>{
                return (
                    <Col lg={3} key={item}><ArtworkCard objectID={item}></ArtworkCard></Col>
                )
            }) :
            <Card>
                <Card.Body>
                    <Card.Text>
                        <strong> Nothing Found!! </strong><br/>
                        Please Try Something different.
                    </Card.Text>
                </Card.Body>
            </Card>
            }
        </Row>
        {artworkList.length>0 && 
        <Row>
            <Col>
            <br/>
            <Pagination>
                <Pagination.Prev onClick={previousPage}/>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}/>
            </Pagination>
            
            </Col>
        </Row>}

        
        {!artworkList && null}
        </>);
    }


}
