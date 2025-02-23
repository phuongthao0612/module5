import {Component} from "react";
class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
                { id: 1, name: "Nguyễn Văn A", age: 20, address: "Hà Nội" },
                { id: 2, name: "Trần Thị B", age: 21, address: "Hồ Chí Minh" },
                { id: 3, name: "Lê Văn C", age: 22, address: "Đà Nẵng" },
            ],
        }
    }
    render() {
        return (
            <div>
                <h2>Danh sách sinh viên</h2>
                <table border="1" width="100%">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ và Tên</th>
                        <th>Tuổi</th>
                        <th>Địa chỉ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.address}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Student;