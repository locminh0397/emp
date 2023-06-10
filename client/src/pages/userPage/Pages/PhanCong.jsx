import React, { useEffect, useState, useMemo } from 'react';
import { Header } from '../components';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import PhanCongTime  from './PhanCongTime';

export default function PhanCong() {
  const [dataNhanVien, setDataNhanVien] = useState(null);// Lay du lieu data tu api
  const [selectedRowData, setSelectedRowData] = useState();
  const token = useSelector(state => state.token);// Lay token kiem tra xac thuc
  const user = useSelector(state => state.user);// Lay token kiem tra xac thuc
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowExpand = (row) => {
    const expandedRowIds = [...expandedRows];
    const rowIndex = expandedRows.findIndex((r) => r === row.STT);

    if (rowIndex >= 0) {
      expandedRowIds.splice(rowIndex, 1);
    } else {
      expandedRowIds.push(row.STT);
    }

    setExpandedRows(expandedRowIds);
  };

  const expandableRowsComponent = ({ data }) => {
    return (
      <div>
       <PhanCongTime data ={data} />
      </div>
    );
  };

   const getDSNV = async () => {
    const res = await fetch(`/api/user/nhanvienphongban/${user.idPhongBan}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();   
    setDataNhanVien(data);
    }    
  useEffect(() => {    
    getDSNV();
  }, [])
  let data = [];
   if (!dataNhanVien) return null;  
    data = dataNhanVien.nhanViens.map((item, index) => {
    return {
      STT: index + 1,
      HoTen: item.HoTen,
      Email: item.Email,
      ChucVu: item.chucvu[0].TenChucVu
    };
  });
  
  const customStyle = {
    rows: {
      style: {
        fontSize: '14px',
        fontWeight: '600'
      }
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }
  }
  
  const columns = [
    {
      name: 'STT',
      selector: row => row.STT,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Họ Tên',
      selector: row => row.HoTen,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.Email,
      sortable: true,
    },
    {
      name: 'Chức Vụ',
      selector: row => row.ChucVu,
      sortable: true,
    },
    
  ]
  return (
    <div id="notifi">
      <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
        <Header title="Phân Công" />
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">         
          <div className='mt-12 mb-8 flex flex-col gap-12'>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>              
              <div className='p-6 px-0 pt-0 pb-2'>
                {/* {successNotification && (<div className='mx-6 mb-3 px-4 py-3 border rounded-lg bg-green-600 text-xl text-white'>{successNotification}</div>)} */}               
                <DataTable
                  className='overflow-auto'
                  customStyles={customStyle}
                  responsive
                  columns={columns}
                  data={data}                            
                  paginationComponentOptions={[10, 20, 30]}
                  highlightOnHover
                  selectableRowsHighlight      
                  expandableRows
                  expandableRowExpanded={(row) => expandedRows.includes(row.STT)}
                  onRowClicked={handleRowExpand}
                  expandableRowsComponent={expandableRowsComponent}                  
                />               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
