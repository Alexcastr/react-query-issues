import { githubApi } from "../../api/githubApi";
import { Label } from "../interfaces/label";
import { useQuery } from "@tanstack/react-query";


const getLabels = async ():Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>("/labels?per_page=100",{
    headers:{
      Authorization: null
    }
  });
  
  return data;
}

export const useLabels = () => {

  const labelQuery = useQuery(["labels"], getLabels, {
    //staleTime: 1000 * 60 * 60
    // el placeholderdata es para que previamente cargue ya algunos datos y no aparezca el loading, ya tenga previamente datos cargados
    // el initialdata es parecido al placeholderdata pero es para que cargue los datos una sola vez y no se vuelva a cargar
    initialData: [],
   placeholderData: [
    {
     id: 791921801,
     node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
     url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
     name: "❤️",
     color: "ffffff",
     default: false,
    },
    {
    id: 710573595,
    node_id: "MDU6TGFiZWw3MTA1NzM1OTU=",
    url: "https://api.github.com/repos/facebook/react/labels/Component:%20Developer%20Tools",
    name: "Component: Developer Tools",
    color: "fbca04",
    default: false,
}
   ],
  });

  return {
    labelQuery
  };
};
