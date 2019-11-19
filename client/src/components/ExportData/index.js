import React from 'react';
import ReactExport from 'react-data-export';
import Button from 'components/Button/index.jsx';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExportData extends React.Component {
    render() {
        console.log(this.props.datas);
        return (
            <ExcelFile
                element={
                    <Button
                        className={'button--gradient-primary button--size-big'}
                        buttonName={'Export Users'}
                    />
                }
            >
                <ExcelSheet data={this.props.datas} name="Employees">
                    <ExcelColumn label="ID" value="id" />
                    <ExcelColumn label="Name" value="name" />
                    <ExcelColumn label="Email" value="email" />
                    <ExcelColumn label="Age" value="age" />
                    <ExcelColumn label="Contact" value="contact" />
                    <ExcelColumn label="Date of Birth" value="dob" />
                    <ExcelColumn label="Address" value="address" />
                </ExcelSheet>
            </ExcelFile>
        );
    }
}
export default ExportData;
