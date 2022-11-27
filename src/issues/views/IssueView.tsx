import { Link, useParams, Navigate } from "react-router-dom";
import { LoadingIcon } from "../../share/components/LoadingIcon";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";

export const IssueView = () => {
 const params = useParams();

 const { id = "0" } = params;

 const { issueQuery, commentsQuery } = useIssue(+id);

 if (issueQuery.isLoading) {
  return <LoadingIcon />;
 }

 if (!issueQuery.data) {
  return <Navigate to="./issue/list" />;
 }

 return (
  <div className="row mb-5">
   <div className="col-12 mb-3">
    <Link to="./issues/list">Go Back</Link>
   </div>

   {/* Primer comentario */}
   <IssueComment issue={issueQuery.data} />

   {commentsQuery.isLoading ? (
    <LoadingIcon />
   ) : (
    commentsQuery.data?.map((issue) => (
     <IssueComment key={issue.id} issue={issue} />
    ))
   )}
  </div>
 );
};
