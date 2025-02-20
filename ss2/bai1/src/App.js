import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const students = [
        { company: 'Alfreds Futterkiste', contact: 'Maria Anders', country: 'Germany' },
        { company: 'Centro comercial Moctezuma', contact: 'Francisco Chang', country: 'Mexico' },
        { company: 'Ernst Handel', contact: 'Roland Mendel', country: 'Austria' },
        { company: 'Island Trading', contact: 'Helen Bennett', country: 'UK' },
        { company: 'Laughing Bacchus Winecellars', contact: 'Yoshi Tannamuri', country: 'Canada' },
        { company: 'Magazzini Alimentari Riuniti', contact: 'Giovanni Rovelli', country: 'Italy' }
    ];
    return (
        <div className="container mt-4">
            <h1 className="text-center text-primary">Students</h1>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                        <td>{student.company}</td>
                        <td>{student.contact}</td>
                        <td>{student.country}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
