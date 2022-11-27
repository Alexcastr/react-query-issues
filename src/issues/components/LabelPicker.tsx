import { FC } from "react";
import { LoadingIcon } from "../../share/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels"


interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker:FC<Props> = ({ onChange, selectedLabels }) => {

  const { labelQuery } = useLabels();

  if (labelQuery.isLoading) {
    return <LoadingIcon/>;
  }

  return (

   <div>
    {labelQuery.data?.map((label) => (
     <span
     key={label.id}
     //cuando le da click al label, el onChange cambia poniendo el labelname o quitando
     onClick={()=>onChange(label.name)}
      className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
      style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
     >
      {label.name}
     </span>
    ))}
   </div>
  );
}
