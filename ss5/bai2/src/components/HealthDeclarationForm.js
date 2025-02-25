import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function HealthDeclarationForm() {
    const validationSchema = Yup.object({
        fullName: Yup.string().required("Họ tên không được để trống."),
        passport: Yup.string().required("Số hộ chiếu / CMND không được để trống."),
        birthYear: Yup.number()
            .required("Năm sinh không được để trống.")
            .min(1901, "Năm sinh phải lớn hơn 1900."),
        nationality: Yup.string().required("Quốc tịch không được để trống."),
        province: Yup.string().required("Tỉnh thành không được để trống."),
        district: Yup.string().required("Quận / huyện không được để trống."),
        ward: Yup.string().required("Phường / xã không được để trống."),
        address: Yup.string().required("Địa chỉ không được để trống."),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số.")
            .required("Số điện thoại không được để trống."),
        email: Yup.string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email không hợp lệ.")
            .required("Email không được để trống."),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log("Dữ liệu gửi:", values);
        toast.success("Gửi tờ khai thành công!");
        resetForm();
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Tờ khai y tế</h2>
            <Formik
                initialValues={{
                    fullName: "",
                    passport: "",
                    birthYear: "",
                    gender: "",
                    nationality: "",
                    company: "",
                    department: "",
                    insurance: false,
                    province: "",
                    district: "",
                    ward: "",
                    address: "",
                    phone: "",
                    email: ""
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label>Họ tên</label>
                        <Field name="fullName" type="text" className="custom-input" />
                        <ErrorMessage name="fullName" component="p" className="error" />
                    </div>
                    <div>
                        <label>Số hộ chiếu / CMND</label>
                        <Field name="passport" type="text" className="custom-input" />
                        <ErrorMessage name="passport" component="p" className="error" />
                    </div>
                    <div>
                        <label>Năm sinh</label>
                        <Field name="birthYear" type="number" className="custom-input" />
                        <ErrorMessage name="birthYear" component="p" className="error" />
                    </div>
                    <div>
                        <label>Giới tính</label>
                        <Field name="gender" type="radio" value="Nam" /> Nam
                        <Field name="gender" type="radio" value="Nữ" /> Nữ
                    </div>
                    <div>
                        <label>Quốc tịch</label>
                        <Field name="nationality" type="text" className="custom-input" />
                        <ErrorMessage name="nationality" component="p" className="error" />
                    </div>
                    <div>
                        <label>Công ty làm việc</label>
                        <Field name="company" type="text" className="custom-input" />
                    </div>
                    <div>
                        <label>Bộ phận làm việc</label>
                        <Field name="department" type="text" className="custom-input" />
                    </div>
                    <div>
                        <label>
                            <Field name="insurance" type="checkbox" /> Có thẻ bảo hiểm y tế
                        </label>
                    </div>

                    <h3 className="text-xl font-bold mt-4">Địa chỉ liên lạc tại Việt Nam</h3>
                    <div>
                        <label>Tỉnh thành</label>
                        <Field name="province" type="text" className="custom-input" />
                        <ErrorMessage name="province" component="p" className="error" />
                    </div>
                    <div>
                        <label>Quận / huyện</label>
                        <Field name="district" type="text" className="custom-input" />
                        <ErrorMessage name="district" component="p" className="error" />
                    </div>
                    <div>
                        <label>Phường / xã</label>
                        <Field name="ward" type="text" className="custom-input" />
                        <ErrorMessage name="ward" component="p" className="error" />
                    </div>
                    <div>
                        <label>Địa chỉ</label>
                        <Field name="address" type="text" className="custom-input" />
                        <ErrorMessage name="address" component="p" className="error" />
                    </div>
                    <div>
                        <label>Điện thoại</label>
                        <Field name="phone" type="text" className="custom-input" />
                        <ErrorMessage name="phone" component="p" className="error" />
                    </div>
                    <div>
                        <label>Email</label>
                        <Field name="email" type="email" className="custom-input" />
                        <ErrorMessage name="email" component="p" className="error" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4">
                        Gửi tờ khai
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default HealthDeclarationForm;
