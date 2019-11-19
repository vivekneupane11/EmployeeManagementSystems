import React, { Component } from 'react';
import request from 'request';
import DocumentCard from './Documentcard';

class ViewDocument extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employee: []
            // val: props.match.value
        };
    }

    componentDidMount() {
        const val = this.props.individual;
        var url = '';
        var method = '';
        var myObj = '';
        if (val) {
            url = 'http://localhost:4000/get-ind_documents';
            method = 'POST';
            myObj = {
                email: this.props.email
            };
        } else {
            url = 'http://localhost:4000/get-org_documents';
            method = 'GET';
            myObj = {
                email: ''
            };
        }

        request(
            {
                url: url,
                method: method,
                json: true, // <--Very important!!!
                body: myObj
            },
            function(error, response, body) {
                const datas = [];
                console.log(response);

                response.body.data.map(data => {
                    const obj = [
                        {
                            _id: data._id,
                            filename: data.myFile,
                            title: data.title,
                            description: data.description,
                            department: data.department,
                            visibility: data.visibility
                        }
                    ];
                    Array.prototype.push.apply(datas, obj);
                });
                this.setState({
                    documents: datas,
                    fetch: true
                });
            }.bind(this)
        );
    }

    render() {
        return (
            <div>
                {this.state.fetch && (
                    <DocumentCard
                        datas={this.state.documents}
                        notification={this.state.val}
                    />
                )}
            </div>
            // <h1>hello</h1>
        );
    }
}

export default ViewDocument;
