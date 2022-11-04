import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import MovieDetails from"../components/MovieDetails";
import PageHeader from"../components/PageHeader";
//cyclic app: https://nice-pear-lamb-cuff.cyclic.app/

export async function getStaticProps() {
    // // Call an external API endpoint to get posts
    // return new Promise((resolve,reject)=>{
    //   fetch('https://nice-pear-lamb-cuff.cyclic.app/api/movies/_id').then(res=>res.json()).then(data=>{
    //     resolve({ props: { movie: data } })
    //   })
    // })
    const res = await fetch('https://nice-pear-lamb-cuff.cyclic.app/api/movies/573a139af29313caabcf0859');
  const data = await res.json();

  return { props: { movie: data } };
}

export default function About(props) {
   //console.log(props);
    return (
        <>
        <PageHeader text="About the Developer:  Patel Aditya Dharmesh"/>
        <Card>
            <Card.Body>
                Hello! Myself Aditya. I am a student in Seneca College at Newnham Campus. I am in Computer Programming And Analysis Student.
                Although I am learning multiple coding languages and frameworks I am particularly interested in Web Development on the Front-end perspective of a Web app.
                <br/><br/>
                It&apos;s difficult to choose a favourite, but<Link href="/movies/Dark City" passHref><a>&quot; Dark City &quot;</a></Link> (released in 1998) is one that I always enjoy watching.
            </Card.Body>
            <MovieDetails movie={props.movie} />
        </Card>
        </> 
    );
    
}