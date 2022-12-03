import { useState } from 'react';
import { useIssues } from '../hooks';

import { LoadingIcon } from '../../share/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces';
import { useIssueInfinite } from '../hooks/useIssueInfinite';




export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  // Este state(es una interfaz) es para el filtro de estado si es open or closed, debemos pasarlo al componente IssueList para saber si esta activo
  const [state, setState] = useState<State>()

 // para poder filtrar tenemos que pasarle el state y el selectedLabels al hook useIssues, y en este hook actualizarlo con el state y el selectedLabels, tambien en el cache
  const { issueQuery } = useIssueInfinite({ labels: selectedLabels, state });
  
  //funcion que al darle click al label, cambia el estado de selectedLabels (agreaga o quita)
  const onLabelChanged = (labelName: string)=>{

    //Si estan em el arreglo quiere decir que estan seleccionados,
    selectedLabels.includes(labelName)
    //   seteamos el arreglo con los labels que no estan seleccionados
     ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
     // si no incluye el labelname, lo agrega
     : setSelectedLabels([...selectedLabels, labelName]);
  }

  return (
   <div className="row mt-5">
    <div className="col-8">
     {issueQuery.isLoading ? (
      <LoadingIcon />
     ) : (
      <IssueList
       state={state}
       onStateChanged={(newState) => setState(newState)}
       issues={issueQuery.data?.pages.flat() || []}
      />
     )}
   <button 
   disabled={!issueQuery.hasNextPage}
   onClick={()=> issueQuery.fetchNextPage()}
   className='btn btn-outline-primary mt-3'>
    Load more...
   </button>
    </div>

    <div className="col-4">
     <LabelPicker
      selectedLabels={selectedLabels}
      onChange={(labelName) => onLabelChanged(labelName)}
     />
    </div>
   </div>
  );
}
