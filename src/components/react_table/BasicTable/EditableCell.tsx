import { useEffect, useState } from "react";

const EditableCell = ({props} : { props : any}) => {
    const initialValue = props.getValue()
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    props.table.options.meta?.updateCellData(
        props.row.index,
        props.column.id,
        value
    )
  }

  useEffect(() => {
    setValue(initialValue)
  },[initialValue])


  return (
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export default EditableCell;
