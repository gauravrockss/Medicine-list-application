import React from 'react';
import { GridOverlay, DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => ({
    border: 'none',
    '.MuiDataGrid-withBorderColor': {
        border: 'none',
    },
    '.MuiDataGrid-cell:is(:focus, :focus-within)': {
        outline: 'none',
    },
    '.MuiDataGrid-row': {
        borderBottom: '1px solid rgb(224 224 224)',
        fontWeight: 600,
        color: '#97a3b4',
    },

    '& .MuiDataGrid-main': {
        width: '100%',
        background: '#FFFFFF',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        padding: '8px',
        borderRadius: '6px',
        borderColor: 'transparent',
    },

    '& .MuiDataGrid-main .MuiDataGrid-columnHeaders': {
        backgroundColor: 'rgb(235 238 244 / 38%)',
        borderRadius: '8px',

        '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            color: '#b4b5b9',
            fontSize: '14px',
            textTransform: 'uppercase',
        },
        '& .MuiDataGrid-columnHeader:is(:focus, :focus-within)': {
            outline: 'none',
        },
    },

    '& .MuiDataGrid-cell': {
        display: 'inline-flex',
        alignItems: 'center',
    },
}));

const DataGrid = React.forwardRef((props, ref) => {
    const { slots, ...rest } = props;
    return (
        <StyledDataGrid
            ref={ref}
            disableColumnSelector
            disableColumnFilter
            disableColumnMenu
            slots={{
                ...slots,
                noRowsOverlay: () => (
                    <GridOverlay>
                        <Typography
                            variant='h4'
                            color='text.secondary'
                            textAlign='center'
                            sx={{ wordSpacing: '2px' }}>
                            No data available
                        </Typography>
                    </GridOverlay>
                ),
            }}
            {...rest}
        />
    );
});

export default DataGrid;
