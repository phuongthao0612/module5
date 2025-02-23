import { Component } from "react";
import "./ToDoList.css"; // Import file CSS

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            item: "",
        };
    }

    handleChange = (event) => {
        this.setState({ item: event.target.value });
    };

    handleAddItem = () => {
        if (this.state.item.trim() !== "") {
            this.setState((prevState) => ({
                list: [...prevState.list, prevState.item],
                item: "",
            }));
        }
    };

    render() {
        return (
            <div className="container">
                <h2>Todo List</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Nhập công việc..."
                        value={this.state.item}
                        onChange={this.handleChange}
                        className="input"
                    />
                    <button onClick={this.handleAddItem} className="button">
                        Add
                    </button>
                </div>
                <ul className="list">
                    {this.state.list.map((todo, index) => (
                        <li key={index} className="item">{todo}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ToDoList;
