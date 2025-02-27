import { useQuery } from '@tanstack/react-query';
import { Issue } from '../interfaces';
import { githubApi } from '../../api/githubApi';

export const getIssueInfo = async (issueNumber: number ):Promise<Issue>=>{
  const {data} = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
}

export const getIssueComments = async (issueNumber: number ):Promise<Issue[]>=>{
  const {data} = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
}

export const useIssue = (issueNumber: number) => {

  const issueQuery = useQuery(
    ['issue', issueNumber],
    ()=> getIssueInfo(issueNumber),
  )

  const commentsQuery = useQuery(
   ["issue", issueNumber, "comments"],
   () => getIssueComments(issueQuery.data!.number),

   // la siguiente funcionalidad es de useQuery nos brinda y es que commentsQuery se ejecute hasta que issueQuery se resuelva
   {
    enabled: issueQuery.data !== undefined,
   }
  );

  
  return {
    issueQuery,
    commentsQuery,
  }
  
}
