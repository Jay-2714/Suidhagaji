'use client'
import React, { useState } from 'react';
import { read, utils } from "xlsx";
import { GET_EXCEL_DATA } from '@/graphql/queries/bulkAdd.queries';
// import { BulkAdd } from '@/graphql/mutations/bulkAdd.mutations';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { format } from 'path';
import { BULK_ADD } from '@/graphql/mutations/employee.mutation';
import toast from 'react-hot-toast';

const ExcelReader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [formattedData, setFormattedData] = useState<Array<{ [key: string]: string }>>([]);
    const headers = ['title', 'firstName', 'middleName', 'lastName', 'mobile', 'aadharNumber', 'rollNumber', 'batchMonth', 'batchNo']
    // const [addEmployee] = useMutation(BULK_ADD);
    const[addEmployee , {loading , error }] = useMutation(BULK_ADD);

    const handleFileChange = (e : any) => {
        console.log("Hello");
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile);
        let headers: any;
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const data = event.target.result;
            const workbook = read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(sheet, { header: 1 });
            headers = jsonData[0];
            const formattedData = jsonData.slice(1).map((row:any) => {
                const obj: { [key: string]: string } = {};
                for (let i = 0; i < headers.length; i++) {
                    obj[headers[i]] = row[i] ? row[i] : "";
                }
                return obj;
            });
            console.log(headers);
            setFormattedData(formattedData);
            console.log(formattedData);
        };
        reader.readAsBinaryString(selectedFile);
        console.log(headers);
    };

    const handleSubmit = () => {
        console.log(formattedData);
        try {
            addEmployee({
                variables: {
                    employee: formattedData
                }
            })
            .then(() => {toast.success(`File Uploaded`)})
            .catch((e)=>{
                console.log(e)
                toast.error(e.message)
            })
            
        } catch (error : any) {
            console.log(error);
            toast.error(error.message)
            throw new Error(`error uploading the file`)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center p-4">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    onClick={() => {
                        setFile(null);
                        setFormattedData([]);
                    }}
                    className="mr-2"
                />
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Upload All
                </button>
            </div>
            {
                formattedData?.length > 0 && (
                    <table className="w-full border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-gray-200">
                                {headers.map((header, index) => (
                                    <th key={index} className="p-2 font-bold text-center border border-gray-300">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {formattedData.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    {headers.map((header, index) => (
                                        <td key={index} className="p-2 border-t border border-gray-300 text-center">{row[header]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    );
};

export default ExcelReader;