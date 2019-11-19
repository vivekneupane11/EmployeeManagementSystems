import React from 'react';
import './style.scss';


class Dropdown extends React.Component {
    constructor(){
    super();

    this.state = {
        displayMenu: false,
        title:"",
        value:"",
        name:"",
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.showData= this.showData.bind(this);
  
    };

    componentDidMount(){
        this.setState({
            title: this.props.title,
            value: this.props.title,
            name: this.props.name
        })
    }

    showDropdownMenu(event) {     
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
        document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    showData(){        
        return this.props.datas.map( data => {            
            return(
                <li key={data._id} onClick={(e)=> {this.clickItem(e,data.name)}}>
                    <div className="round"></div>{data.name}                    
                </li>
            )
        }       
        )
    }

    clickItem(e,name){
        e.preventDefault();
        this.setState({
            value: name
        })
        this.props.onChange(name, this.state.name)
    }

    render() {
        return (
            <div  className="dropdown">
                <div className="dropdown-button" onClick={this.showDropdownMenu}> {this.state.value} </div>

                {this.state.displayMenu ? (
                    <ul>
                        {this.showData()}
                    </ul>
                ) : (null)}           
            

        </div>

        );
    }
    }

export default Dropdown;