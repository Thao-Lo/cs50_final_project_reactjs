function DateListComponent () {
    //initial state of DateList
    const [datesData, setDatesData] = useState({
        dates: [],
        currentPage: null,
        datesPerPage: 0,
        totalPages: 0,
        totalRows: 0
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

    //Data grid columns - key, header name and size 
    const columns = [
        { field: 'index', headerName: 'No', width: 90 },
        { field: 'date', headerName: 'Date', width: 140 },
        { field: 'time', headerName: 'Time', width: 140 },
        { field: 'id', headerName: 'Date Id', width: 100 },   
    ];   

    const fetchDateList = async () => {
        setIsLoading(true)
        const result = await retrieveDateList(paginationModel.page, paginationModel.pageSize);
        if (result.error) {
            setError(result.message);
            return;
        }
        setError(null);
        setDatesData({
            dates: result.dates,
            currentPage: result.currentPage,
            datesPerPage: result.datesPerPage,
            totalPages: result.totalPages,
            totalRows: result.totalDates
        })
        setIsLoading(false)
    }
    // Fetch user list based on pagination 
    useEffect(() => {       
        fetchDateList();       
    }, [paginationModel])
   

    //render date list for each row
    const rows = datesData.dates && datesData.dates.map(({ id, date, time }, index) => ({
        index: paginationModel.page * paginationModel.pageSize + index + 1,
        date, time, id

    }))
    const handlePaginationChange = (newModel) => {
        setPaginationModel(newModel);
    }
    if (error) return <Box>{error}</Box>
    if (isLoading) return <Box>Loading Date Data .... </Box>

    return (
        <>
            <Box>
                <Typography variant="h6" sx={{ pl: 1 }}>Date List:</Typography>
                <TableContainer sx={{ height: 900, width: '100%' }}>
                    <Paper sx={{ height: 600, maxWidth: 1000 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            rowCount={datesData.totalRows}
                            pagination
                            paginationMode="server"
                            pageSizeOptions={[5, 10]}
                            onPaginationModelChange={handlePaginationChange}
                            paginationModel={paginationModel}
                            checkboxSelection
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </TableContainer>

            </Box>
        </>
    )
}
export default DateListComponent;