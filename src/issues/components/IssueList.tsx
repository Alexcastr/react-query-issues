import { IssueItem } from './IssueItem';
import { Issue, State } from '../interfaces';
import { FC } from 'react';


export interface IssueItemProps {
    issues: Issue[];
    state?: State
    onStateChanged: (state?: State) => void;
}

export const IssueList: FC<IssueItemProps> = ({issues, state, onStateChanged}) => {
    return (
     <div className="card border-white">
      <div className="card-header bg-dark">
       <ul className="nav nav-pills card-header-pills">
        <li className="nav-item">
         <a
          onClick={() => onStateChanged()}
          className={`nav-link ${!state ? "active" : ""}`}
         >
          All
         </a>
        </li>
        <li className="nav-item">
         <a
          onClick={() => onStateChanged(State.Open)}
          className={`nav-link ${state === State.Open ? "active" : ""}`}
         >
          Open
         </a>
        </li>
        <li className="nav-item">
         <a
          onClick={() => onStateChanged(State.Closed)}
          className={`nav-link ${state === State.Closed ? "active" : ""}`}
         >
          Closed
         </a>
        </li>
       </ul>
      </div>
      <div className="card-body text-dark">
       {issues.map((issue) => (
        <IssueItem key={issue.id} issue={issue} />
       ))}
      </div>
     </div>
    );
}
