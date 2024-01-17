import { format } from 'date-fns'
// import ColumnFilter from './ColumnFilter';

export const COLUMNS = [
  {
    header: "Id",
    footer: "Id",
    accessorKey: "id",
    enableFilters: true
  },
  {
    header: "First Name",
    footer: "First Name",
    accessorKey: "first_name",
    enableFilters: true
  },
  {
    header: "Last Name",
    footer: "Last Name",
    accessorKey: "last_name",
    enableFilters: true
  },
  {
    header: "Dob",
    footer: "Dob",
    accessorKey: "date_of_birth",
    // Filter: ColumnFilter,
    // disableFilters: true,
    cell: ({ value }) => { 
      const today = new Date(value.toString());
      const formattedDate1 = format(today, 'dd MMMM YYYY');
      return formattedDate1}
    },
    {
      header: "Country",
      footer: "Country",
      accessorKey: "country",
    },
  ];
  
  export const GROUPED_COLUMNS = [
    {
      header: "Id",
      footer: "Id",
      accessorKey: "id",
    },
    {
      header: "Name",
      footer: "Name",
      columns: [
        {
          header: "First Name",
          footer: "First Name",
          accessorKey: "first_name",
        },
        {
          header: "Last Name",
          footer: "Last Name",
          accessorKey: "last_name",
        },
      ],
    },
    {
      header: "Info",
      footer: "Info",
      columns: [
        {
          header: "Dob",
          footer: "Dob",
          accessorKey: "date_of_birth",
        },
        {
          header: "Country",
          footer: "Country",
          accessorKey: "country",
        },
      ],
    },
  ];
  