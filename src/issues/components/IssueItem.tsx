import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { FC } from 'react';
import { Issue } from '../interfaces';
import { getIssueComments, getIssueInfo } from '../hooks/useIssue';
import { timeSince } from '../../helpers';



interface Props{
    issue: Issue;
}

export const IssueItem:FC<Props> = ({issue}) => {

    const navigate = useNavigate(); 
    // haciendo optimizaciones para pre-cargar datos cuando hacemos mouse hoover - vamos a reutilizar queryClient - 2 opciones veremos
    const queryClient = useQueryClient();

    const onMouseEnter = () => {
        queryClient.prefetchQuery(
            ['issue', issue.number], () => getIssueInfo(issue.number),
        );

        queryClient.prefetchQuery(
            ['issue', issue.number, 'comments'], () => getIssueComments(issue.number),
            );
    }
    // esta es otra opcion para pre-cargar datos cuando hacemos mouse hoover
    // const preSethData = () => {
    //     // en vez de agregar la funcion se agrega la data que se va a almacenar en el cache en este caso el issue
    //     queryClient.setQueryData(['issue', issue.number], issue,
    //     // esta update function es opcional, es para que se actualice el cache cierto tiempo que le digamos
    //     {
    //         updatedAt: new Date().getTime() + 100000,
    //     }
    //     );
        

    // }

    return (
     <div
      onMouseEnter={onMouseEnter}
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      className="card mb-2 issue"
     >
      <div className="card-body d-flex align-items-center">
       {issue.state === "open" ? (
        <FiInfo size={30} color="red" />
       ) : (
        <FiCheckCircle size={30} color="green" />
       )}
       <div className="d-flex flex-column flex-fill px-2">
        <span>Suggestion: {issue.title}</span>
        <span className="issue-subinfo">
         {/* tiene la fecha como string, lo va a ocnvertir en un objeto de tipo date */}
         #{issue.number} opened {timeSince(issue.created_at)} ago by
         <span className="fw-bold">{issue.user.login}</span>
        </span>
        <div>
         {issue.labels.map((label) => (
          <span
           key={label.id}
           className="badge rounded-pill m-1"
           style={{ background: `#${label.color}`, color: "black" }}
          >
           {label.name}
          </span>
         ))}
        </div>
       </div>

       <div className="d-flex align-items-center">
        <img
         src={`${issue.user.avatar_url}`}
         alt="User Avatar"
         className="avatar"
        />
        <span className="px-2">{issue.comments}</span>
        <FiMessageSquare />
       </div>
      </div>
     </div>
    );
}
