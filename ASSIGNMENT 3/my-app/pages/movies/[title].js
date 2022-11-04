import {useRouter} from 'next/router'
import useSWR from 'swr'
import Error from 'next/error'
import MovieDetails from '../../components/MovieDetails'
import PageHeader from '../../components/PageHeader'

export default function MovieTitle() {
    const router = useRouter();
    const { title } = router.query;

    const { data, error } = useSWR(`https://nice-pear-lamb-cuff.cyclic.app/api/movies?page=1&perPage=10&title=${title}`);

    if(data == null || data == undefined){
      return null;
    }
    else{
      if(data.length <= 0){
        return (<><Error statusCode={404} /></>);
      }
      else{
        return(
        <>
          {data.map(movie => (
            <div key={movie._id}>
              <PageHeader text={movie.title} />
              <MovieDetails movie={movie} />
            </div>
          ))}
        </>
        )
      }
    }
    
   
    
  }