import {
    Modal,
    Box,
    Typography,
    IconButton,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Stack,
} from '@mui/material';
import { IoClose } from "react-icons/io5";
import { styled } from '@mui/material/styles';


const TableCellComponent = styled(TableCell)(({ theme }) => ({
    fontSize: "14px",
    fontWeight: 500,
    padding: "12px 25px",
    whiteSpace: "nowrap",
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
                        lg: '40%',
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

                <Divider />
                <Stack direction="row" justifyContent="space-between" margin="15px 0">
                    <Box>
                        <h3 style={{ fontSize: "18px", margin: "0px" }}>{item?.trading_name}</h3>
                        <p style={{ fontSize: "12px", margin: "0px" }}>MADE IN INDIA</p>
                        <p style={{ fontSize: "12px", margin: "0px" }}>Manufactured by</p>
                        <h3 style={{ fontSize: "16px", margin: "0px" }}>Tejaswi Nonwovens Pvt. Ltd</h3>

                    </Box>
                    <Box
                        component="img"
                        src={qr}
                        alt="QR Code"
                        sx={{
                            width: "1181px",
                            maxWidth: 200,
                            height: 'auto',
                            borderRadius: 2,
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            p: 1,
                        }}
                    />
                </Stack>

                <Table sx={{ border: "1px solid #ccc" }}>
                    <TableHead>
                        <TableRow>
                            <TableCellComponent>
                                Roll No
                            </TableCellComponent>
                            <TableCellComponent sx={{ borderRight: "1px solid #ccc" }}>
                                : {item?.serial_number}
                            </TableCellComponent>
                            <TableCellComponent>
                                Colour
                            </TableCellComponent>
                            <TableCellComponent >
                                : {item?.colour?.name}
                            </TableCellComponent>
                        </TableRow>
                        <TableRow>
                            <TableCellComponent>
                                Length
                            </TableCellComponent>
                            <TableCellComponent sx={{ borderRight: "1px solid #ccc" }}>
                                : {item?.length}
                            </TableCellComponent>
                            <TableCellComponent>
                                Width
                            </TableCellComponent>
                            <TableCellComponent>
                                : {item?.width}
                            </TableCellComponent>
                        </TableRow>
                        <TableRow>
                            <TableCellComponent>
                                Quality
                            </TableCellComponent>
                            <TableCellComponent sx={{ borderRight: "1px solid #ccc" }}>
                                : {item?.quality?.name}
                            </TableCellComponent>
                            <TableCellComponent>
                                GSM
                            </TableCellComponent>
                            <TableCellComponent>
                                : {item?.gsm}
                            </TableCellComponent>
                        </TableRow>
                        <TableRow>
                            <TableCellComponent>
                                Gross Weight
                            </TableCellComponent>
                            <TableCellComponent sx={{ borderRight: "1px solid #ccc" }}>
                                : {item?.gross_weight}
                            </TableCellComponent>
                            <TableCellComponent>
                                Net Weight
                            </TableCellComponent>
                            <TableCellComponent>
                                : {item?.net_weight}
                            </TableCellComponent>
                        </TableRow>
                    </TableHead>
                </Table>
            </Box>
        </Modal>
    );
};

export default ProductBillModal;
