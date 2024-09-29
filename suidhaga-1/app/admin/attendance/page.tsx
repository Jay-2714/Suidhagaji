"use client"
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_EXCEL_DATA } from '@/graphql/queries/bulkAdd.queries'
import { Table, Skeleton, Avatar, Dropdown, message, Select, Switch } from "antd";

interface DataType {
    key: React.Key;
    firstName: string;
    middleName: string;
    lastName: string;
    aadharNumber: number;
    batchMonth: string;
    batchNo: number;
    mobile: number;
  }

const Attendance = () => {
    const { Column, ColumnGroup } = Table;
    const{data,loading,error} = useQuery(GET_EXCEL_DATA);
    console.log(data);
  
  
  return (
    <div>
        <div className=' flex flex-row mb-[2%]'> 
            <div id='Date Picker' className='' >
                
            </div>
        </div>
        {data && <Table dataSource={data?.getEmployee}>
            <ColumnGroup title="Name">
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Middle Name" dataIndex="middleName" key="middleName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column title="mobile" dataIndex="mobile" key="mobile"/>
            <Column title="Aadharcard" dataIndex="aadharNumber" key="aadharNumber"/>
            <Column title="Batch Month"  dataIndex="batchMonth" key="batchMonth"/>
            <Column title="Batch No." dataIndex="batchNo" key="batchNo"/>
            <Column title="Roll Number" dataIndex="rollNumber" key="rollNumber"/>
              <Column
                  title="Attendance"
                  key="Attendance"
                  render={(_: any, record: DataType) => (
                    <Switch defaultChecked />
                  )}
              />
        </Table>}
    </div>
  )
}

export default Attendance;
