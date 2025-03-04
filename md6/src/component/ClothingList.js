import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Table, Button, Container, Form} from "react-bootstrap";
import * as clothingService from "../services/ClothingService";

const ClothingList = () => {
    const [clothing, setClothings] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchType, setSearchType] = useState("");
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const getAll = async () => {
            let data = await clothingService.getAllClothings();
            setClothings(data);
            let uniqueTypes = [...new Set(data.map(item => item.types?.name).filter(Boolean))];
            setTypes(uniqueTypes);
        };
        getAll();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const filteredClothing = clothing.filter((item) => {
        const matchesName = item.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesType = searchType === "" || item.types?.name === searchType;
        return matchesName && matchesType;
    });

    const sortedClothing = [...filteredClothing].sort((a, b) => a.quantity - b.quantity);

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Clothing</h2>

            <Form className="d-flex mb-3">
                <Form.Control
                    type="text"
                    placeholder="Tìm theo tên sản phẩm..."
                    className="me-2"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <Form.Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="">Tất cả loại</option>
                    {types.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </Form.Select>
            </Form>

            <Table striped bordered hover>
                <thead className="table-dark">
                <tr>
                    <td>Mã Sản Phẩm</td>
                    <td>Tên Sản Phẩm</td>
                    <td>Ngày Nhập</td>
                    <td>Số Lượng</td>
                    <td>Loại Sản Phẩm</td>
                    <td>Chức Năng</td>
                </tr>
                </thead>
                <tbody>
                {sortedClothing.length > 0 ? (
                    sortedClothing.map((item) => (
                        <tr key={item.id}>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{formatDate(item.date)}</td>
                            <td>{item.quantity}</td>
                            <td>{item?.types?.name || "Không có loại"}</td>
                            <td>
                                <Link to={`/clothings/edit/${item.id}`}>
                                    <Button variant="warning" className="me-2">
                                        Cập Nhật
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    );
};

export default ClothingList;
