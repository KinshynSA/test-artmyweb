import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Table, Select } from "antd";
import { getUsers } from "../../api";
import urls from "../../constants/urls";
import { PageWrapper } from "../../components";


const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
];
  

export default function Users(){
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState();
    const navigate = useNavigate();
    
    async function importUsers(){
        setLoading(true);
        const [users] = await getUsers({
            page: currentPage,
        });
        setUsers(filterUsers(users.data));
        setLoading(false);
    };
    
    useEffect(() => {
      importUsers(currentPage)
    }, [currentPage]);

    useEffect(() => {
      setUsers(filterUsers(users));
    }, [filter])

    function filterUsers(users){
      return users.filter(user => {
        if(!filter) return true;
        return user.gender === filter ? true : false; 
      })
    }

    return (
      <PageWrapper>
        <Select
          defaultValue=""
          style={{
            width: 120,
            marginBottom: 20,
          }}
          allowClear
          options={[
            {
              value: 'male',
              label: 'Male',
            },
            {
              value: 'female',
              label: 'Female',
            },
          ]}
          onChange={(e) => {
            setFilter(e)
          }}
        />

        <Table
            dataSource={users}
            columns={columns}
            rowKey={(item) => item.id}
            loading={loading}
            pagination={{ 
                pageSize: 20,
                total: 2500,
                showSizeChanger: false,
            }}
            onChange={(e) => {
                setCurrentPage(e.current)
            }}
            onRow={(record) => {
                return {
                  onClick: () => {
                    navigate(`${urls.urlEdit}/${record.id}`)
                  },
                };
            }}
        />
      </PageWrapper>
    )
}