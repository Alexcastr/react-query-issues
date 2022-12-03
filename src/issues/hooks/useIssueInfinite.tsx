import { useInfiniteQuery } from '@tanstack/react-query'
import { State, Issue } from '../interfaces';
import { githubApi } from '../../api/githubApi';


interface Props {
  state?: State;
  labels: string[];
  page?: number;
}
interface QueryProps{
  pageParams?: number,
  queryKey: (string | Props)[]
}


const getIssues = async ({ pageParams= 1, queryKey }:QueryProps):Promise<Issue[]> =>{

  const [,,args] = queryKey;
  const { state, labels } = args as Props;


  //ahora hacer la configuración de los filtros con los params, configurando la url
  const params = new URLSearchParams();
  // aqui le estamos agregando a la url closed | open
  if (state) params.append("state", state);
  // ejemplo se construye la url de esta manera: https://api.github.com/repos/facebook/react/issues?state=closed&labels=Component:%20Developer%20Tools,Component:%20Hooks
  
  // Ahora si tambien queremos filtrar por labels, tenemos que agregarlos a la url
  if(labels.length > 0) {
    const labelsString = labels.join(","); // esto nos devuelve un string con los labels separados por comas
    params.append("labels", labelsString);
  }

  // la siguiente configuracion es para que solo me traiga una pagina, de 5 en 5 issues
  params.append("page", pageParams?.toString() || "1");
  params.append("per_page", "5");
 
  
  const { data } = await githubApi.get<Issue[]>("/issues", {params}); 

  return data;
}


export const useIssueInfinite = ({state, labels}:Props) => {


const issueQuery = useInfiniteQuery(
 //cache
 ["issues", "infinite", { state, labels }],
  // la función
  (data)=> getIssues(data),
  {
    getNextPageParam: (lastPage, pages ) => {
      if ( lastPage.length === 0 ) return;

      return pages.length + 1;
  },
  }
);
 


  return {
   issueQuery,
  };
}
