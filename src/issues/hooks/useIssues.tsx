import { useState, useEffect } from 'react';

import { Issue, State } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { useQuery } from '@tanstack/react-query';



// Esta interfaz nos ayudara a definir del hook lo que necesitamos para traer los issues, y tambien para filtrarlos
interface Props {
  state?: State;
  labels: string[];
  page?: number;
}
// mandamos los dos argumentos y tambien en el useIssue le pasamos los args(que son dos labels puede estar [] y un state que es opcional)
const getIssues = async ({labels, state, page }:Props ):Promise<Issue[]> =>{


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
  params.append("page", page?.toString() || "1");
  params.append("per_page", "5");
 
  
  const { data } = await githubApi.get<Issue[]>("/issues", {params}); 

  return data;
}



export const useIssues = ({state, labels}: Props) => {
  //un estado para la paginación, tambien debe enviarse por parametro a la funcion getIssues
  const [page, setPage] = useState<number>(1)

  // el siguiente useEffect se hace para que cuando se filtre por labels vuelva a la pagina 1
  useEffect(() => {
    setPage(1)
  }, [state, labels])

  const issueQuery = useQuery(
    // no importa el orden, useQuery va a saber los valores que cambian
    ["issues", {state, labels, page}],
    //aqui pasamos tambien, los labels y el state para el filtro
     () => getIssues({labels, state, page}),
  );

  const nextPage = () => {
    //si data es igual a 0 no hay data
    if(issueQuery.data?.length === 0) return;
    setPage(page + 1);
  }
  const prevPage = () => {
    //si data es igual a 0 no hay data
    if(page>1)  setPage(page - 1);
   
  }
  return {
   // properties
   issueQuery,
   //getters
   // un truco para que cuando se este haciendo fetching aparezca cargando
   page:issueQuery.isFetching?' Loading...':page,
   // methods
    nextPage,
    prevPage,
  };
}
