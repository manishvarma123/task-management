import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../api/user.js';

const PrimeReact = () => {
  const [products, setProducts] = useState([]);

  const fetchAllUser = async () => {
    try {
      const res = await api.getAllUser();
      setProducts(res?.data?.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Create a Sr.no column using the index
  const srNoTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1; // +1 to make the serial number 1-based (not 0-based)
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className="w-full h-full p-4">
      <h2 className="font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4">
        All Employee List
      </h2>

      <div className="p-4">
        <DataTable value={products} paginator rows={5}>
          {/* Sr.no Column */}
          <Column body={srNoTemplate} header="Sr.no"/>

          {/* Other columns */}
          <Column field="fullName" header="Name" />
          <Column field="email" header="Email" />
          <Column field="plan" header="Plan" />
          <Column field="role" header="Role" />
          {/* <Column header="Action" /> */}
        </DataTable>
      </div>
    </div>
  );
};

export default PrimeReact;
