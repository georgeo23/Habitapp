import React from 'react';
import ToggleButton from "./ToggleButton";
import ReactModal from 'react-modal';
import HabitInfo from './HabitInfo';
ReactModal.setAppElement("#root");

class HabitList extends React.Component {
    state = { 
        isModalOpen: false,
        habit: ""
    }

    openModal = (e) => {
        // console.log(e.target.id)
        // console.log(this.props.habits[e.target.id].habit)
        this.setState({ isModalOpen: true })
        this.setState({ habit: this.props.habits[e.target.id].habit})
        
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }
    
    handleCheckbox = (e) => {
        this.setState({ checked: e.target.checked })
        console.log(this.state.checked)
    }
    
    submitEvent = (habit, eventDate) => {
        console.log(this.props.habits)
        const newEvent = {
            id: this.props.habits[0].user_id,
            habit: habit,
            date: eventDate
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(newEvent),
            headers: { 'Content-Type' : 'application/json' }
        }
        fetch(`http://localhost:5000/dashboard/events`, options)
        .then(console.log(newEvent))
        .catch(console.warn)
    }
    
    removeEvent = (habit, eventDate) => {
        const deleteEvent = {
            id: this.props.habits[0].user_id,
            habit: habit,
            date: eventDate
        }
        const options = {
            method: 'DELETE',
            body: JSON.stringify(deleteEvent),
            headers: { 'Content-Type' : 'application/json' }
        }
        fetch(`http://localhost:5000/dashboard/events`, options)
        .then(console.log(deleteEvent))
        .catch(console.warn)
    }
    
    render() {

        return (
            <>
                <div>
                    {this.props.habits.length !== 0 ? <h1>HELLO {this.props.habits[0].user_name}!</h1> : <h1>Hello</h1> }

                    {this.props.habits.map((item, idx) => {
                        return (
                            <div key={idx}>
                                <ul >
                                    <li>
                                        <button id={idx} onClick={e => this.openModal(e) }>{item.habit}</button>
                                    </li>

                                    <ToggleButton removeEvent={this.removeEvent} submitEvent={this.submitEvent} removeEvent={this.removeEvent} idx={idx} habit={item.habit}/> 

                                    <li>
                                        {item.frequency} times per week
                                    </li>
                                </ul>
                            </ div>
                        )
                    })}

                    <ReactModal isOpen= { this.state.isModalOpen }> 
                        <HabitInfo isModalOpen={this.state.isModalOpen} habit={ this.state.habit } submitEvent={ this.submitEvent } removeEvent={ this.removeEvent } closeModal={ this.closeModal } />
                    </ReactModal>
                                
                </div>
            </>
        )
    }
}

export default HabitList