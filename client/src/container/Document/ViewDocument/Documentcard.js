import React from 'react';
import { withRouter } from 'react-router-dom';
import Error from 'components/Toaster/index.jsx';
import './documentcard.scss';
import Notification from 'components/Notification';

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
                        <p>
                            {' '}
                            <a className="card-text" href={data.documentPath}>
                                Download
                            </a>
                        </p>
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
        let val;
        if (this.props.location.value) {
            val = this.props.location.value;
        }
        return (
            <div className="view-wrapper">
                {val && <Notification message={'  New Document Added!'} />}
                <div className="view-container">
                    <div className="notification">
                        <h1>Document List</h1>
                    </div>
                    <div className="list-document ">{this.renderTable()}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(DocumentCard);
