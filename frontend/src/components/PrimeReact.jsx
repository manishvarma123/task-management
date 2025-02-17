import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import api from "../api/user.js";

const PrimeReact = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // Page starts at 1
  const [rows, setRows] = useState(6); // Rows per page
  const [totalPages, setTotalPages] = useState(1); // Total pages

  const fetchAllUser = async () => {
    try {
      const res = await api.getAllUser({
        page: page,
        limit: rows,
        searchQuery: searchQuery,
      });
      setProducts(res?.data?.data.allUser);
      setFilteredProducts(res?.data?.data.allUser);
      setTotalPages(res?.data?.data.totalPages); // Update total pages
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Create a Sr.no column using the index
  const srNoTemplate = (rowData, { rowIndex }) => {
    return (page - 1) * rows + rowIndex + 1; // +1 to make the serial number 1-based (not 0-based)
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handlePageChange = (e) => {
    setPage(e.page + 1); // PrimeReact returns 0-based page index, so add 1
    setRows(e.rows);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1); // Decrease page number
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1); // Increase page number
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, [page, rows, searchQuery]); // Refetch data whenever page or rows change

  return (
    <div className="w-full h-full p-4">
      <h2 className="font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4 flex justify-between items-center">
        <span>All Employee List</span>
        <InputText
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name/email"
          className="text-sm border-2 border-slate-200 px-3 py-1"
        />
      </h2>

      <div className="p-4">
        <DataTable
          value={filteredProducts}
          // paginator
          rows={rows}
          // first={(page - 1) * rows}  // Adjust for 0-based index in pagination
          // totalRecords={filteredProducts.length}  // Update total records for pagination
          // onPage={handlePageChange}    // Trigger page change on pagination
          rowsPerPageOptions={[5, 10, 20]}
          tableStyle={{ minWidth: "50rem" }}
        >
          {/* Sr.no Column */}
          <Column body={srNoTemplate} header="Sr.no" />

          {/* Other columns */}
          <Column field="fullName" header="Name" />
          <Column field="email" header="Email" />
          <Column field="plan" header="Plan" />
          <Column field="role" header="Role" />
        </DataTable>

        <div className="flex justify-center items-center gap-3 mt-4 text-center">
          <div className="flex items-center gap-3">
            <button className="bg-slate-100" onClick={handlePrevious} disabled={page <= 1}>Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button className="bg-slate-100" onClick={handleNext} disabled={page >= totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeReact;
