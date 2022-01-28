import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState, useMemo } from "react";
//import Disabled from "@material-ui/icons/DisabledByDefault"
const columns = [
    {
      id: 1,
      name: "Email",
      selector: (row) => row.user_email,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "RivalID",
      selector: (row) => row.rivalid,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: "Disable",
      cell:  (row) => <div className="flex justify-center pl-5"> <input type='checkbox' /> </div> ,
      sortable: true,
      reorder: true,
      wrap: true,
      wrap: true,
      maxWidth: '200px'
    },
  ];

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  tableWrapper: {
		style: {
			display: 'table',
      
		},
	},
  table: {
		style: {
			color: 'white', 
        backgroundColor : '#121825',
      height: '100%'
		}},
    header: {
      style: {
    
        color: 'white', 
        backgroundColor : '#121825',
       
      },
    },
    subHeader: {
      style: {
        color: 'pink', 
        backgroundColor : '#121825',
      },
    },
    headRow: {
      style: {
        backgroundColor : '#121825',
        borderBottomWidth: '0px',
        fontSize: '18px',
        color: '#FB385B'
      },
    },
  rows: {
      style: {
          color: 'white', 
          backgroundColor : '#121825'
      },
  },
  headCells: {
      style: {
        color: '#FB385B', 
        borderB: '0px',
        backgroundColor : '#121825'
      },
  },
  cells: {
      style: {
        color: 'white', 
        backgroundColor : '#121825'
      },
  },
  pagination: {
		style: {
			color: 'white',
			backgroundColor: '#121825',
			borderTopColor: 'white',
		},
    pageButtonsStyle: {
			color: 'white',
			fill: 'white',
			backgroundColor: 'transparent',
			'&:disabled': {
				cursor: 'unset',
			
			},
			'&:hover:not(:disabled)': {
				
			},
			'&:focus': {
				outline: 'none',
		
			},
		},},
    
    expanderButton: {
      style: {
        color: 'white',
        fill: 'white',
        backgroundColor: 'transparent',
        borderRadius: '2px',
        transition: '0.25s',
        height: '100%',
        width: '100%',
        '&:hover:enabled': {
          cursor: 'pointer',
        },
        '&:disabled': {
          color: 'gray',
        },
        '&:hover:not(:disabled)': {
          cursor: 'pointer',
          backgroundColor: 'gray',
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: 'white',
        },
        svg: {
          margin: 'auto',
        },
      },
    }
};

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
  		<input
  			id="search"
  			type="text"
        className="rounded-2xl px-2 "
  			placeholder="Filter By Email"
  			aria-label="Search Input"
  			value={filterText}
  			onChange={onFilter}
  		/>
  		
  	</>
  );

const Table = ({data}) => {
  const [filterText, setFilterText] = useState('');
  	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  	const filteredItems = data.filter(
  		item => item.user_email && item.user_email.toLowerCase().includes(filterText.toLowerCase()),
  	);
  
  	const subHeaderComponentMemo = useMemo(() => {
  		const handleClear = () => {
  			if (filterText) {
  				setResetPaginationToggle(!resetPaginationToggle);
  				setFilterText('');
  			}
  		};
  
  		return (
  			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
  		);
  }, [filterText, resetPaginationToggle]);

    return (
        <div className="p-5 sm:p-10 w-full ">
        
             <DataTable
             
          title="Users"
          columns={columns}
          data={filteredItems}
          defaultSortFieldId={1}
          sortIcon={<SortIcon />}
          pagination
          subHeader
    			subHeaderComponent={subHeaderComponentMemo}
          selectableRows
          customStyles={customStyles}
        />
       
        </div>
    )
}

export default Table;