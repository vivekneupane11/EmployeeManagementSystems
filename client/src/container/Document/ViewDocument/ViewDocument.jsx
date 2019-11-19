import React, { Component } from 'react';
import decoder from 'jwt-decode';
import { getdocuments } from 'actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import DocumentCard from './Documentcard';

class ViewDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // notification: this.props.match.params,
            employee: []
        };
    }

    componentDidMount() {
        const isIndividual = this.props.individual;
        const decoded = decoder(localStorage.getItem('token_id'));
        let role;
        if (decoded.role === 'Employee') {
            role = true;
        } else {
            role = false;
        }
        const datas = [];
        this.props.getdocuments(isIndividual, this.props.id, role);
        setTimeout(() => {
            const val = JSON.parse(this.props.response.data.content);
            val.map(data => {
                const obj = [
                    {
                        _id: data._id,
                        filename: data.myFile,
                        title: data.title,
                        documentPath: data.documentPath,
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
        }, 1000);
    }

    render() {
        console.log(this.props);

        return (
            <div>
                {this.state.fetch && (
                    <DocumentCard
                        datas={this.state.documents}
                        notification={this.props.location}
                    />
                )}
            </div>
        );
    }
}

ViewDocument.propTypes = {
    getdocuments: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    response: state.getdata.res
});

export default connect(
    mapStateToProps,
    { getdocuments }
)(withRouter(ViewDocument));
