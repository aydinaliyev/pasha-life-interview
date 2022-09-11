import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AlertDialog from "../dialog/Dialog";
import { GET_INVOICES,DELETE_INVOICE } from '../../redux/types';
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import MenuItem from "@mui/material/MenuItem";
import { SentimentSatisfied } from "@mui/icons-material";




const Datatable = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [say,setSay] = useState('');
  const [mebleg, setMebleg] = useState('');
  const [toggle, setToggle] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusF,setStatusF] = useState();

  
  let data = useSelector(state => state.invoices)
  const dispatch = useDispatch()

  const sayFilterHandler = (e)=>{
    setSay(e.target.value)
  }

  const handleToggle = ()=>{
    setToggle(!toggle)
  }

  const mebglegFilterHandler = (e)=>{
    setMebleg(e.target.value)
  }

  const statusFilterHandler = (e)=>{
    setStatusF(e.target.value)
  }
  
 

  const handleSearch = (val)=>{
    setSearchFilter(val)
  }
  


  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };


  const handleDeleteClick = () => {
    handleDialogOpen();
  };

  const handleDelete = (id) => {
    dispatch({ type: DELETE_INVOICE, id })
    handleDialogClose()
  };



  useEffect(() => dispatch({ type: GET_INVOICES }), [])

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/new" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                setId(params.id); 
                console.log(id);
                handleDeleteClick();
              }
              }
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <p>Qaimələr</p>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent='space-between' direction='row'>
          <Grid item xs={6}>
            <TextField id="search"  onKeyUp={(e)=>handleSearch(e.target.value)}/>
          </Grid>
          <Grid justifyContent='flex-end' item xs={2}>
            <Button variant="outlined" startIcon={<FilterAltOutlinedIcon />} onClick={()=>handleToggle()}>Filter</Button>
            <Link to="/users/new" className="link">
              <Button variant="contained" startIcon={<AddOutlinedIcon/>}>Yeni</Button>
            </Link>
          </Grid>

             { toggle && (<Grid direction='row' container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent='flex-start' style={{marginLeft:'2px'}}>
                <Grid xs={2} item>
                  <InputLabel id="say-label">Mehsul Sayi</InputLabel>
                  <Select 
                    labelId="say-label"
                    id="say-select"
                    value={say}
                    label="Mehsul Sayi"
                    onChange={sayFilterHandler}
                    sx={{ m: 1, width: 100 }}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </Grid>
                <Grid xs={2} item>
                  <InputLabel id="mebleg-label">Mebleg araligi</InputLabel>
                  <Select
                    labelId="mebleg-label"
                    id="mebleg-select"
                    value={mebleg}
                    label="Mebleg araligi"
                    onChange={mebglegFilterHandler}
                    sx={{ m: 1, width: 100 }}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={'100<'}>100 den asagi</MenuItem>
                    <MenuItem value={'100 - 200'}>100 - 200</MenuItem>
                    <MenuItem value={'200>'}>200 den yuxari</MenuItem>
                  </Select></Grid>
                <Grid xs={2} item>
                <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status-select"
                    value={statusF}
                    label="Mebleg araligi"
                    onChange={statusFilterHandler}
                    sx={{ m: 1, width: 100 }}
                  >
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={'active'}>Aktiv</MenuItem>
                    <MenuItem value={'xitam olunub'}>Xitam olunub</MenuItem>
                    <MenuItem value={'gozleyir'}>Gozleyir</MenuItem>
                  </Select>
                </Grid>
              </Grid>)}
      </Grid>
      </div>

      <DataGrid
        className="datagrid"
        rows={data.filter(a=>a.username && (a.username.includes(searchFilter)) || a.productCount == searchFilter )}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
      />
      <AlertDialog open={open} handleDialogClose={handleDialogClose} handleDelete={handleDelete} id={id} />
    </div>
  );
};

export default Datatable;
