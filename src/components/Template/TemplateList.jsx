import React from "react";
import { ReactSortable } from "react-sortablejs";
import TemplateCard from "./TemplateCard";

const TemplateList = ({ templates, setTemplates, onEdit, onDelete }) => {
  return (
    <ReactSortable list={templates} setList={setTemplates} className="flex flex-wrap gap-4 justify-start">
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ReactSortable>
  );
};

export default TemplateList;
