import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers, deleteUser} from '../redux/actions';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    return (
        <div>
            <h2>User List</h2>
            <button onClick={() => dispatch(getUsers())}>Get Users</button>

            {users.length > 0 && (
                <table border="1" width="100%" cellPadding="10">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>
                                <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;
