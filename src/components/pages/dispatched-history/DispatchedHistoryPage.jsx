import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getDispatchHistoryData } from "../../../features/dispatch/dispatchSlice";

const Container = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "max-content",
    background: "#06060",
    padding: "30px 0px",
}));


const InnerContainer = styled(Box)(({ theme }) => ({
    width: "90%",
    margin: "auto",
}));

const BoxContainer = styled(Paper)(({ theme }) => ({
    padding: "20px"
}));

const TableContainerComponent = styled(TableContainer)(({ theme }) => ({
    marginTop: "30px",
    background: "#FFFFFF",
    borderRadius: "5px",
}));

const Header = styled(Box)(({ theme }) => ({
    marginBottom: "30px",
    display: "flex",
    justifyContent: "space-between"
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "20px",
    fontWeight: 600,
}));


const TableCellContainer = styled(TableCell)(({ theme }) => ({
    padding: "12px 25px",
}));

function DispatchedHistoryPage() {
    const runFunction = useRef(false)
    const dispatch = useDispatch()

    const { dispatchData } = useSelector((state) => state.dispatch)

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        if (isNaN(date)) return '';
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };


    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Dispatch History", 14, 15);

        dispatchData?.forEach((dispatch) => {
            const startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 25;

            doc.setFontSize(12);
            doc.text(`Dispatch ID: ${dispatch.id || ''}`, 14, startY);
            doc.text(`Client: ${dispatch.select_client || ''}`, 14, startY + 6);
            doc.text(`Date: ${formatDate(dispatch.created_at)}`, 14, startY + 12);
            doc.text(`Items: ${dispatch.total_items || 0} | Total Weight: ${dispatch.total_weight || 0}`, 14, startY + 18);

            autoTable(doc, {
                startY: startY + 24,
                head: [['Product Number', 'Type', 'Weight', 'Color', 'Quality']],
                body: dispatch.scanned_items?.map(item => ([
                    item.product_number || '-', item.product_type || '-', item.weight || '-', item.colour || '-', item.quality || '-'
                ])) || [],
            });
        });

        doc.save('dispatch-history.pdf');
    };




    useEffect(() => {
        if (!runFunction.current) {
            dispatch(getDispatchHistoryData())
            runFunction.current = true
        }
    }, [dispatch])
    return (
        <Container>
            <InnerContainer>
                <BoxContainer elevation={2}>
                    <Header>
                        <Title>Dispatched History</Title>
                        <Button variant="contained" sx={{ textTransform: "capitalize" }} onClick={downloadPDF}><BsFileEarmarkPdfFill style={{ marginRight: "10px" }} />Download PDF</Button>
                    </Header>

                    <TableContainerComponent>
                        <Table>
                            {dispatchData?.map((dispatch, index) => (
                                <React.Fragment key={index}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: "150px", fontSize: "14px", fontWeight: 600, padding: "8px 0" }}>
                                                Dispatch Id
                                            </TableCell>
                                            <TableCell sx={{ fontSize: "14px", padding: "8px 0" }}>
                                                : {dispatch?.id}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 600, padding: "8px 0" }}>
                                                Client
                                            </TableCell>
                                            <TableCell sx={{ padding: "8px 0" }}>
                                                : {dispatch?.select_client}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 600, padding: "8px 0" }}>
                                                Date
                                            </TableCell>
                                            <TableCell sx={{ padding: "8px 0" }}>
                                                : {formatDate(dispatch?.created_at)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 600, padding: "8px 0" }}>
                                                Items
                                            </TableCell>
                                            <TableCell sx={{ padding: "8px 0" }}>
                                                : {dispatch?.total_items} | Total Weight: {dispatch?.total_weight}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {dispatch?.scanned_items?.map((item, itemIndex) => (
                                            <TableRow key={itemIndex} hover >
                                                <TableCellContainer>{item?.product_number || '-'}</TableCellContainer>
                                                <TableCellContainer>{item?.product_type || '-'}</TableCellContainer>
                                                <TableCellContainer align="center">{item?.weight || '-'}</TableCellContainer>
                                                <TableCellContainer align="center">{item?.colour || '-'}</TableCellContainer>
                                                <TableCellContainer align="center">{item?.quality || '-'}</TableCellContainer>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </React.Fragment>
                            ))}
                        </Table>
                    </TableContainerComponent>
                </BoxContainer>
            </InnerContainer>
        </Container>
    )
}

export default DispatchedHistoryPage