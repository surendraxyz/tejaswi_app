import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventory } from "../../../features/inventory/inventorySlice";

const Container = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "calc(100vh - 70px)",
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
    marginBottom: "30px"
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "20px",
    fontWeight: 600,
}));

const TableCellComponent = styled(TableCell)(({ theme }) => ({
    fontSize: "14px",
    fontWeight: 500,
    color: "#E5E5E8",
    padding: "12px 25px",
    whiteSpace: "nowrap",
}));

const TableCellContainer = styled(TableCell)(({ theme }) => ({
    padding: "12px 25px",
}));

const CategoryNotFound = styled(TableCell)(({ theme }) => ({
    fontSize: "22px",
    fontWeight: 600,
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&.MuiTableCell-root": {
        border: "0px",
    },
}));


function InventoryPage() {
    const runFunction = useRef(false)
    const dispatch = useDispatch()

    const { data } = useSelector((state) => state.inventory)

    useEffect(() => {
        if (!runFunction.current) {
            dispatch(getInventory())
            runFunction.current = true
        }
    }, [dispatch])

    return (
        <Container>
            <InnerContainer>
                <BoxContainer elevation={2}>
                    <Header>
                        <Title>Inventory</Title>
                    </Header>
                    <TableContainerComponent>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ background: "#2B2C40" }}>
                                    <TableCellComponent sx={{ width: "10%" }}>
                                        Product Code
                                    </TableCellComponent>

                                    <TableCellComponent sx={{ width: "10%" }}>
                                        Type
                                    </TableCellComponent>
                                    <TableCellComponent sx={{ width: "10%" }} align="center">
                                        Weight
                                    </TableCellComponent>
                                    <TableCellComponent sx={{ width: "10%" }} align="center">
                                        Color
                                    </TableCellComponent>
                                    <TableCellComponent sx={{ width: "10%" }} align="center">
                                        Quality
                                    </TableCellComponent>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            <CategoryNotFound>No Inventory Found.</CategoryNotFound>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data?.map((data, index) => {
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCellContainer>
                                                    {data?.product_code
                                                        ? data?.product_code
                                                        : "-"}
                                                </TableCellContainer>
                                                <TableCellContainer>
                                                    {data?.type}
                                                </TableCellContainer>
                                                <TableCellContainer align="center">
                                                    {data?.weight
                                                        ? data?.weight
                                                        : "-"}
                                                </TableCellContainer>
                                                <TableCellContainer align="center">
                                                    {data?.color ? data?.color : "-"}
                                                </TableCellContainer>
                                                <TableCellContainer align="center">
                                                    {data?.quality ? data?.quality : "-"}
                                                </TableCellContainer>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainerComponent>
                </BoxContainer>
            </InnerContainer>
        </Container>
    )
}

export default InventoryPage