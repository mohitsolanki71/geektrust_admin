import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { Table, Radio } from "antd";
import axios from "axios";
import "./home.css";
const { Search } = Input;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selected, setSelected] = useState([]);
  const rowSelection = {
    onChange: (selectedRowid, selectedRows) => {
      console.log(
        `selectedRowid: ${selectedRowid}`,
        "selectedRows: ",
        selectedRows
      );
      setSelected(selectedRows);
    },
  };

  const head = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        users.length >= 1 ? (
          <div title="Sure to delete?" onClick={() => handleDelete(record.id)}>
            <a className="delete_link">Delete</a>
          </div>
        ) : null,
    },
  ];
  useEffect(() => {
    Getdata();
  }, []);

  const Getdata = async () => {
    try {
      let { data: dataList } = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      dataList = dataList.map((item) => {
        var temp = Object.assign({}, item);
        temp.key = item.id;
        return temp;
      });
      setUsers(dataList);
    } catch (e) {
      console.log(e);
    }
  };
  const onSearch = (value) => {
    if (value) {
      let searched = users;
      searched = searched.filter(
        (ele) =>
          ele.role === value ||
          ele.name.toLowerCase().includes(value) ||
          ele.email === value
      );
      setUsers(searched);
    } else {
      Getdata();
    }
  };

  const handleDelete = (id) => {
    const dataSource = users;
    setUsers(dataSource.filter((item) => item.id !== id));
    alert("Deleted Succesfully !!");
  };
  //   console.log(selectionType)
  const removeSelected = () => {
    const select = selected.map((e) => e.id);
    let afterdelete = users.filter((item) => {
      return !select.includes(item.id);
    });
    alert("Deleted Succesfully !!");
    setUsers(afterdelete);
    setSelected([]);
  };

  return (
    <>
      <Space direction="vertical">
        <Search
          placeholder="Search By Name , Mail or Role"
          onSearch={onSearch}
          enterButton
          allowClear
          style={{ width: 700 }}
        />
      </Space>
      <div style={{ width: "60%", margin: "auto" }}>
        <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        ></Radio.Group>
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={head}
          dataSource={users}
        />
      </div>
      {selected.length > 0 && (
        <button
          className="delete-selected-btn"
          onClick={() => removeSelected()}
        >
          Delete Selected
        </button>
      )}
    </>
  );
};

export default Home;
