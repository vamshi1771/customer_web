import React from "react";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";


const MuiPagination = ({pageCount,pageIndex,onChange}) =>{

    return(
        <>
        <Stack spacing={2}>
          <Pagination count={pageCount}  page={pageIndex} onChange={(event, pageNumber) => onChange((event, pageNumber))} variant="outlined" shape="rounded" />
        </Stack>
        </>
    );

}
export default MuiPagination;