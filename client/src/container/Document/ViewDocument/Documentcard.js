import React from 'react';
import { withRouter } from 'react-router-dom';
import './documentcard.scss';
import Error from 'components/Toaster/index.jsx';

class DocumentCard extends React.Component {
    renderTable = () => {
        return this.props.datas.map((data, index) => {
            return (
                <div className="document-row " key={index}>
                    <div className="document-header">
                        <h4 className="card-title">{data.title}</h4>
                    </div>
                    <div className="document-body">
                        <p className="card-text">{data.description}</p>
                    </div>
                    <div className="document-footer">
                        <a href={data.filename}>
                            {' '}
                            <p className="card-text">{data.filename}</p>
                        </a>
                        <p className="card-text">{data.author}</p>
                    </div>
                </div>
            );
        });
    };

    handleClick(e, data) {
        this.props.history.push(`/admin/viewuser/${data._id}`, data);
    }

    render() {
        return (
            <div className="view-wrapper">
                <div className="view-container">
                    <div className="notification">
                        <h1>Document List</h1>

                        {this.props.notification && (
                            <div className="success-message">
                                <Error
                                    className={'success'}
                                    errorMessage={'New Document Added'}
                                />
                            </div>
                        )}
                    </div>
                    <div className="list-document ">{this.renderTable()}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(DocumentCard);
