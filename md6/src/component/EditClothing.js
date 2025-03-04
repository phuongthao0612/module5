import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import * as clothingService from "../services/ClothingService";
import {Container, Button} from "react-bootstrap";
import {toast} from "react-toastify";
import * as typeService from "../services/TypeService";

const EditClothing = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [typesList, setTypesList] = useState([]);
    const [initialValues, setInitialValues] = useState({
        code: "",
        name: "",
        date: "",
        quantity: 1,
        types: "",
    });

    useEffect(() => {
        const fetchClothing = async () => {
            const typesData = await typeService.getAllTypes();
            setTypesList(typesData);
            const clothing = await clothingService.getClothingById(id);
            console.log("Dữ liệu nhận được từ API:", clothing);

            if (clothing) {
                setInitialValues({
                    code: clothing.code || "",
                    name: clothing.name || "",
                    date: formatDateForInput(clothing.date) || "",
                    quantity: clothing.quantity || 1,
                    types: clothing.types?.id? String(clothing.types.id): "",
                });
            }
        };
        fetchClothing();
    }, [id]);

    const formatDateForInput = (dateString) => {
        console.log("Giá trị date nhận được:", dateString);
        if (!dateString || typeof dateString !== "string") return "";
        const parts = dateString.split("/");
        return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : "";
    }


    const formatDateForServer = (dateString) => {
        const parts = dateString.split("-");
        return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : "";
    };

    const clothingSchema = Yup.object().shape({
        name: Yup.string()
            .required("Tên sản phẩm không được để trống")
            .max(100, "Tên không được quá 100 ký tự"),
        date: Yup.date()
            .required("Ngày nhập không được để trống")
            .max(new Date(), "Ngày không được lớn hơn ngày hiện tại"),
        quantity: Yup.number()
            .required("Số lượng không được để trống")
            .integer("Số lượng phải là số nguyên")
            .min(1, "Số lượng phải lớn hơn 0"),
        types: Yup.string().required("Chọn loại sản phẩm"),
    });

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Chỉnh Sửa Sản Phẩm</h2>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={clothingSchema}
                onSubmit={async (values) => {
                    const selectedType = typesList.find(t => String(t.id) === values.types);
                    const updatedValues = {
                        ...values,
                        date: formatDateForServer(values.date),
                        types: selectedType ? { id: selectedType.id, name: selectedType.name } : null
                    };
                    await clothingService.updateClothing(id, updatedValues);
                    toast.success("Cập nhập thành công")
                    navigate("/");
                }}
            >
                {({isSubmitting}) => (
                    <Form className="border p-4 rounded shadow">
                        <div className="mb-3">
                            <label className="form-label">Mã Sản Phẩm</label>
                            <Field name="code" type="text" className="form-control"/>
                            <ErrorMessage name="code" component="div" className="text-danger"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tên Sản Phẩm</label>
                            <Field name="name" type="text" className="form-control"/>
                            <ErrorMessage name="name" component="div" className="text-danger"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ngày Nhập</label>
                            <Field name="date" type="date" className="form-control"/>
                            <ErrorMessage name="date" component="div" className="text-danger"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Số Lượng</label>
                            <Field name="quantity" type="number" className="form-control"/>
                            <ErrorMessage name="quantity" component="div" className="text-danger"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Loại Sản Phẩm</label>
                            <Field as="select" name="types" className="form-select">
                                <option value="">Chọn loại</option>
                                {typesList.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="types" component="div" className="text-danger"/>
                        </div>

                        <div className="text-center">
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                Cập Nhật
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default EditClothing;
