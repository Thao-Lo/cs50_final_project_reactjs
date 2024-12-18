import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
function ProductItem({ id, name, price, handleDeleteProduct }) {
    const handleDeleteClick = () => {
        handleDeleteProduct(id)
    }

    return (
        <Grid container spacing={2}>
            <Grid size={1}>
                <div>{id}</div>
            </Grid>
            <Grid size={6}>
                <div>{name}</div>
            </Grid>
            <Grid size={2}>
                <div>{price}</div>
            </Grid>
            <Grid size={3}>                
                    <Button variant="outlined" onClick={handleDeleteClick}>Remove</Button>               
            </Grid>
        </Grid>
    )
}
export default ProductItem;