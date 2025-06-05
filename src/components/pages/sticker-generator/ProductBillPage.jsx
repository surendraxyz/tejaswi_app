import {
    Modal,
    Box,
    Typography,
    IconButton,
    Divider,
    Grid,
    Paper,
    InputLabel,
} from '@mui/material';
import { IoClose } from "react-icons/io5";
import { styled } from '@mui/material/styles';

const InputLabelComponent = styled(InputLabel)(({ theme }) => ({
    fontSize: "14px",
    fontWeight: 550,
    color: "#000",
    marginBottom: "8px",
}));

const ProductBillModal = ({ open, setOpen, item, qr }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 3,
                    maxHeight: '95vh',
                    overflowY: 'auto',
                    p: { xs: 2, sm: 4 },
                    width: {
                        xs: '95%',
                        sm: '90%',
                        md: '75%',
                        lg: '60%',
                    },
                }}
            >
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        Product Invoice
                    </Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <IoClose size={22} />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <InputLabelComponent>Product Number</InputLabelComponent>
                        <InputLabelComponent>{item?.product_number}</InputLabelComponent>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <InputLabelComponent>Serial Number</InputLabelComponent>
                        <InputLabelComponent>{item?.serial_number}</InputLabelComponent>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <InputLabelComponent>Gross Weight</InputLabelComponent>
                        <InputLabelComponent>{`${item?.gross_weight} kg`}</InputLabelComponent>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <InputLabelComponent>Net Weight</InputLabelComponent>
                        <InputLabelComponent>{`${item?.net_weight} kg`}</InputLabelComponent>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <InputLabelComponent>GSM</InputLabelComponent>
                        <InputLabelComponent>{item?.gsm}</InputLabelComponent>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <InputLabelComponent>Dimensions</InputLabelComponent>
                        <InputLabelComponent>{`${item?.length} × ${item?.width}`}</InputLabelComponent>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <InputLabelComponent>Production Date</InputLabelComponent>
                        <InputLabelComponent>{item?.production_date}</InputLabelComponent>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <InputLabelComponent>Shift</InputLabelComponent>
                        <InputLabelComponent>{item?.shift}</InputLabelComponent>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <InputLabelComponent>Trading Name</InputLabelComponent>
                        <InputLabelComponent>{item?.trading_name}</InputLabelComponent>
                    </Grid>
                </Grid>


                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        textAlign: 'center',
                        borderRadius: 3,
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                        QR Code
                    </Typography>
                    <Box
                        component="img"
                        src={qr}
                        alt="QR Code"
                        sx={{
                            width: '100%',
                            maxWidth: 200,
                            height: 'auto',
                            borderRadius: 2,
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            p: 1,
                        }}
                    />
                </Paper>
            </Box>
        </Modal>
    );
};

export default ProductBillModal;
